/** @typedef {import('commander').Command} Command */
/** @typedef {import('../environment.js').default} Environment */

import path from 'path';
import BaseCommand from '../base/base-command.js';
import assert from 'assert';

export default class InstallCommand extends BaseCommand {
  /**
   * @param {Environment} environment
   */
  constructor(environment) {
    super('install', 'Installs a package.');

    this.environment = environment;

    assert.ok(environment);
  }

  /**
   * @param {Command} program Program
   */
  attachToProgram(program) {
    return super.attachToProgram(program)
      .argument('<name>', 'Package name')
      .option('-f, --force', 'Force to install');
  }

  async run(pckName, options) {
    const { fs, npm } = this.environment;

    if (!options.force && !this.environment.library.exists(pckName)) {
      throw new Error(`Package '${pckName}' not found. If you want to force the installation you can use the --force option.`);
    }

    console.log(`Running 'npm link ${pckName}'...`);
    const result = await npm.runCommand(`npm link ${pckName}`, { cwd: this.environment.appdir });
    if (result.stderr) {
      throw new Error(result.stderr);
    }
    this.logSuccess();

    const libraryFolder = path.join(this.environment.appdir, 'node_modules', pckName);
    if (!fs.existsSync(libraryFolder)) {
      throw new Error(`Missing '${libraryFolder}' directory.`);
    }

    if (!fs.existsSync('./unity-packages')) {
      console.log(`  Directory 'unity-packages' created`);
      fs.mkdirSync('./unity-packages');
    }

    const pckFolder = path.join('./unity-packages', pckName);
    if (fs.existsSync(pckFolder)) {
      if (options.force) {
        console.log(`Deleting '${pckFolder}'...`);
        fs.rmdirSync(pckFolder, { recursive: true });
      }
      else {
        throw new Error(`Package '${pckName}' was already installed. If you want to force the installation you can use the --force option.`);
      }
    }

    console.log(`Copying files...`);
    this.copyRecursiveSync(libraryFolder, pckFolder);
  }

  copyRecursiveSync(src, dest) {
    const fs = this.environment.fs;

    let exists = fs.existsSync(src);
    let stats = exists && fs.statSync(src);
    let isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach(childItemName => {
        this.copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  deleteRecursiveSync(src, dest) {
    const fs = this.environment.fs;

    let exists = fs.existsSync(src);
    let stats = exists && fs.statSync(src);
    let isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }
      fs.readdirSync(src).forEach(childItemName => {
        this.copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}