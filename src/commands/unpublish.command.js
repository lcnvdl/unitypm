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
    return super.attachToProgram(program).option('-f, --force', 'Force to delete');
  }

  async run(value, options) {
    const pck = this.readAndValidatePackage();

    try {
      await this.unlinkFromNode();
    }
    catch (err) {
      if (!options.force) {
        throw err;
      }
      else {
        this.logError(err);
        console.log('Error ignored because \'force\' is enabled.')
      }
    }

    this.removeFromLibraryAndSave(pck);
  }

  removeFromLibraryAndSave(pck) {
    this.environment.load();
    const existing = this.environment.library.packages.findIndex(m => m.name === pck.name);

    if (existing === -1) {
      throw new Error('The package was not published.')
    }

    this.environment.library.packages.splice(existing, 1);

    console.log(`Package '${pck.name}' removed.`);

    this.environment.save();
  }

  readAndValidatePackage() {
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

  async unlinkFromNode() {
    const npm = this.environment.npm;

    console.log(`Running 'npm unlink'...`);
    const result = await npm.runCommand('npm unlink');
    if (result.stderr) {
      throw new Error(result.stderr + '. If you want to force the unpublish you can use the --force option.');
    }
    this.logSuccess();
  }
}