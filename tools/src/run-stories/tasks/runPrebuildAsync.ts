import { getConfig } from '@expo/config';
import { compileModsAsync, withStaticPlugin } from '@expo/config-plugins';
import {
  withAndroidExpoPlugins,
  withIosExpoPlugins,
  getLegacyExpoPlugins,
} from '@expo/prebuild-config';
import spawnAsync from '@expo/spawn-async';
import fs from 'fs';
import path from 'path';

import Logger from '../../Logger';
import { getPackageRoot, getProjectRoot, getTargetName } from '../helpers';

export async function runPrebuildAsync(packageName: string) {
  const targetName = getTargetName(packageName);
  const projectRoot = getProjectRoot(packageName);

  if (fs.existsSync(path.resolve(projectRoot, 'react-native.config.js'))) {
    fs.unlinkSync(path.resolve(projectRoot, 'react-native.config.js'));
  }

  const appJsonPath = path.resolve(projectRoot, 'app.json');
  const appJson = require(appJsonPath);
  const bundleId = `com.expostories.${targetName}`;

  appJson.expo.android = {
    package: bundleId,
  };

  appJson.expo.ios = {
    bundleIdentifier: bundleId,
  };

  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, '\t'), { encoding: 'utf-8' });

  let { exp: config } = getConfig(projectRoot);

  const packageRoot = getPackageRoot(packageName);
  const packagePkg = require(path.resolve(packageRoot, 'package.json'));

  const plugins: string[] = [];
  const packages = packagePkg.expoStories?.packages || {};
  const legacyPlugins = getLegacyExpoPlugins();

  Object.keys(packages).forEach((pkg: string) => {
    if (legacyPlugins.includes(pkg)) {
      plugins.push(pkg);
    }
  });

  plugins.reduce((prev, plugin) => {
    return withStaticPlugin(prev, {
      // hide errors
      _isLegacyPlugin: true,
      plugin,
      // If a plugin doesn't exist, do nothing.
      fallback: (config) => config,
    });
  }, config);

  // // Add all android built-in plugins
  if (!config.android) config.android = {};
  config.android.package = packageName ?? config.android.package ?? `com.placeholder.appid`;
  config = withAndroidExpoPlugins(config, {
    package: config.android.package,
  });

  // // Add all ios built-in plugins
  if (!config.ios) config.ios = {};
  config.ios.bundleIdentifier = config.ios.bundleIdentifier ?? `com.placeholder.appid`;
  config = withIosExpoPlugins(config, {
    bundleIdentifier: config.ios.bundleIdentifier,
  });

  await compileModsAsync(config, {
    projectRoot,
    platforms: ['ios', 'android'],
    assertMissingModProviders: false,
  });
}
