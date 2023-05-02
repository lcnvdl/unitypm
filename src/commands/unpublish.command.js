/** @typedef {import('commander').Command} Command */
/** @typedef {import('../environment.js').default} Environment */

import BaseCommand from '../base/base-command.js';
import assert from 'assert';

export default class UnpublishCommand extends BaseCommand {
  /**
   * @param {Environment} environment
   */
  constructor(environment) {
    super('unpublish', 'Unpublish the package.')

    this.environment = environment;

    assert.ok(environment);
  }

  /**
   * @param {Command} program Program
   */
  attachToProgram(program) {
    return super.attachToProgram(program)
      .argument('[name]', 'Package name (Optional. Default: current directory package.)')
      .option('-f, --force', 'Force to delete');
  }

  async run(value, options) {
    let pckName = value || null;

    try {
      const pck = this.readAndValidatePackage(value);
      pckName = pck.name;
    }
    catch (err) {
      if (!options.force || !pckName) {
        throw err;
      }
      else {
        this.logError(`ERR*ignored*: ${err.message || err}`);
        this.logInfo(' - Error ignored because \'force\' is enabled.')
      }
    }

    try {
      if (pckName) {
        await this.unlinkFromNode(pckName);
      }
    }
    catch (err) {
      if (!options.force) {
        throw err;
      }
      else {
        this.logError(`ERR*ignored*: ${err.message || err}`);
        this.logInfo(' - Error ignored because \'force\' is enabled.')
      }
    }

    this.removeFromLibraryAndSave(pckName, options.force);
  }

  removeFromLibraryAndSave(pckName, force) {
    this.environment.load();
    const existing = this.environment.library.packages.findIndex(m => m.name === pckName);

    if (existing === -1) {
      if (force) {
        this.logWarn('WARN: The package was not published.');
      }
      else {
        throw new Error('The package was not published.')
      }
    }
    else {
      this.environment.library.packages.splice(existing, 1);
      console.log(`Package '${pckName}' removed.`);
    }

    this.environment.save();
  }

  readAndValidatePackage(pckName) {
    if (pckName) {
      const specificPck = this.environment.library.get(pckName);
      if (!specificPck) {
        throw new Error(`Package '${pckName}' is missing.`);
      }

      return specificPck;
    }

    const fs = this.environment.fs;

    if (!fs.existsSync('./package.json')) {
      throw new Error(`Local package is missing.`);
    }

    console.log(`Reading 'package.json'...`);
    const pck = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

    if (!pck.name) {
      throw new Error('Missing package name');
    }

    this.logSuccess();

    return pck;
  }

  async unlinkFromNode(pckName) {
    const npm = this.environment.npm;

    console.log(`Running 'npm unlink --save ${pckName}'...`);
    const result = await npm.runCommand('npm unlink --save ' + pckName, { cwd: this.environment.appdir });
    if (result.stderr) {
      throw new Error(result.stderr + '. If you want to force the unpublish you can use the --force option.');
    }
    this.logSuccess();
  }
}