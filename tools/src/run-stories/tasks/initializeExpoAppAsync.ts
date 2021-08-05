import fs from 'fs';
import path from 'path';

import { runExpoCliAsync } from '../../ExpoCLI';
import Logger from '../../Logger';
import { getExamplesRoot, getPackageRoot, getProjectName, getProjectRoot } from '../helpers';

export async function initializeExpoAppAsync(packageName: string) {
  const projectRoot = getProjectRoot(packageName);
  const examplesRoot = getExamplesRoot();
  const projectName = getProjectName(packageName);

  if (fs.existsSync(projectRoot)) {
    // @ts-ignore
    fs.rmdirSync(projectRoot, { recursive: true, force: true });
  }

  // 1. initialize expo project w/ name
  await runExpoCliAsync('init', [projectName, '-t', 'bare-minimum', '--no-install'], {
    cwd: examplesRoot,
    stdio: 'ignore',
  });

  // expo install -- these will setup the app.config plugins section which is necessary for applying mods
  // package.json

  const packageRoot = getPackageRoot(packageName);
  // eslint-disable-next-line
  const templateRoot = path.resolve(projectRoot, '../../template-files/stories-templates');

  // package.json
  const defaultPkg = require(path.resolve(templateRoot, 'pkg.json'));
  const projectPkg = require(path.resolve(projectRoot, 'package.json'));
  const packagePkg = require(path.resolve(packageRoot, 'package.json'));

  const mergedPkg = {
    ...projectPkg,
    ...defaultPkg,
  };

  // configure story server
  mergedPkg.expoStories = {
    projectRoot,
    watchRoot: packageRoot,
  };

  // remove dependencies from excluded autolinked packages
  const extraNodeModules: any = packagePkg.expoStories?.packages ?? {};

  mergedPkg.dependencies = {
    ...mergedPkg.dependencies,
    ...extraNodeModules,
  };

  mergedPkg['expo-yarn-workspaces'] = {
    symlinks: [...mergedPkg['expo-yarn-workspaces'].symlinks, ...Object.keys(extraNodeModules)],
  };

  mergedPkg.name = projectName;

  fs.writeFileSync(
    path.resolve(projectRoot, 'package.json'),
    JSON.stringify(mergedPkg, null, '\t')
  );

  const expoDeps = Object.keys(packagePkg.expoStories?.packages) || [];

  // 4. yarn + install deps
  Logger.log('🧶 Installing js dependencies');
  await runExpoCliAsync('install', expoDeps, {
    cwd: projectRoot,
    stdio: 'ignore',
  });

  // remove .git repo for newly built project
  // @ts-ignore
  fs.rmdirSync(path.resolve(projectRoot, '.git'), { force: true, recursive: true });
}
