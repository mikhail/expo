package abi39_0_0.org.unimodules.core.interfaces;

import android.content.Context;

import abi39_0_0.org.unimodules.core.ExportedModule;
import abi39_0_0.org.unimodules.core.ViewManager;

import java.util.Collections;
import java.util.List;

public interface Package {

  default List<? extends InternalModule> createInternalModules(Context context) {
    return Collections.emptyList();
  }

  default List<? extends ExportedModule> createExportedModules(Context context) {
    return Collections.emptyList();
  }

  /**
   * @param context A context which you can use when initializing view managers,
   *                however remember NOT TO KEEP REFERENCES TO IT. View managers
   *                are reused between refreshes of the application, so keeping
   *                reference to the context in view managers makes it leak.
   */
  default List<? extends ViewManager> createViewManagers(Context context) {
    return Collections.emptyList();
  }

  default List<? extends expo.modules.core.interfaces.SingletonModule> createSingletonModules(Context context) {
    return Collections.emptyList();
  }
}
