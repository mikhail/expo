package host.exp.exponent.storage

import android.content.Context
import android.content.SharedPreferences
import host.exp.exponent.analytics.EXL
import java.io.*
import java.lang.IllegalArgumentException
import java.util.*

/**
 * An installation ID provider - it solves two purposes:
 * - in installations that have a legacy UUID persisted in shared-across-expo-modules SharedPreferences,
 *   migrates the UUID from there to a non-backed-up file,
 * - provides/creates a UUID unique per an installation.
 *
 * Similar class exists in expo-constants and expo-notifications.
 */
class ExponentInstallationId internal constructor(
  private val context: Context, // We only remove the value from old storage once it's set and saved in the new storage.
  private val sharedPreferences: SharedPreferences
) {
  private var mUuid: String? = null

  fun getUUID(): String? {
    // If it has already been cached, return the value.
    if (mUuid != null) {
      return mUuid
    }

    // Read from non-backed-up storage
    val uuidFile = nonBackedUpUuidFile
    try {
      FileReader(uuidFile).use { fileReader ->
        BufferedReader(fileReader).use { bufferedReader ->
          // Cache for future calls
          mUuid = UUID.fromString(bufferedReader.readLine()).toString()
        }
      }
    } catch (e: IOException) {
      // do nothing, try other sources
    } catch (e: IllegalArgumentException) {
    }

    // We could have returned inside try clause,
    // but putting it like this here makes it immediately
    // visible.
    if (mUuid != null) {
      return mUuid
    }

    // In November 2020 we decided to move installationID (backed by LEGACY_UUID_KEY value) from backed-up SharedPreferences
    // to a non-backed-up text file to fix issues where devices restored from backups have the same installation IDs
    // as the devices where the backup was created.
    val legacyUuid = sharedPreferences.getString(LEGACY_UUID_KEY, null)
    if (legacyUuid != null) {
      mUuid = legacyUuid
      var uuidHasBeenSuccessfullyMigrated = true
      try {
        FileWriter(uuidFile).use { writer -> writer.write(legacyUuid) }
      } catch (e: IOException) {
        uuidHasBeenSuccessfullyMigrated = false
        EXL.e(TAG, "Error while migrating UUID from legacy storage. $e")
      }

      // We only remove the value from old storage once it's set and saved in the new storage.
      if (uuidHasBeenSuccessfullyMigrated) {
        sharedPreferences.edit().remove(LEGACY_UUID_KEY).apply()
      }
    }

    // Return either value from legacy storage or null
    return mUuid
  }

  fun getOrCreateUUID(): String {
    val uuid = getUUID()
    if (uuid != null) {
      return uuid
    }

    // We persist the new UUID in "session storage"
    // so that if writing to persistent storage
    // fails subsequent calls to get(orCreate)UUID
    // return the same value.
    mUuid = UUID.randomUUID().toString()
    try {
      FileWriter(nonBackedUpUuidFile).use { writer -> writer.write(mUuid) }
    } catch (e: IOException) {
      EXL.e(TAG, "Error while writing new UUID. $e")
    }
    return mUuid!!
  }

  private val nonBackedUpUuidFile: File
    get() = File(context.noBackupFilesDir, UUID_FILE_NAME)

  companion object {
    private val TAG = ExponentInstallationId::class.java.simpleName

    const val LEGACY_UUID_KEY = "uuid"
    const val UUID_FILE_NAME = "expo_installation_uuid.txt"
  }
}
