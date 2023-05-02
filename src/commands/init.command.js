/** @typedef {import('commander').Command} Command */
/** @typedef {import('../environment.js').default} Environment */

import BaseCommand from '../base/base-command.js';
import assert from 'assert';

class InitCommand extends BaseCommand {
  /**
  * @param {Environment} environment
  */
  constructor(environment) {
    super('init', 'Creates a package file for the Unity project.');

    this.environment = environment;

    assert.ok(environment);
  }

  /**
   * @param {Command} program Program
   */
  attachToProgram(program) {
    super.attachToProgram(program);
  }

  async run(value, options) {
    const { fs, npm } = this.environment;

    if (fs.existsSync('./package.json')) {
      throw new Error(`Package already exists.`);
    }

    const result = await npm.init();
    if (result.stderr) {
      throw new Error(result.stderr);
    }

    console.log(result.stdout);
  }
}

export default InitCommand;