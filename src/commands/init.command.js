/** @typedef {import('commander').Command} Command */

import fs from 'fs';
import NPM from '../utils/npm.utils.js';
import BaseCommand from '../base/base-command.js';

class InitCommand extends BaseCommand {
  constructor() {
    super('init', 'Creates a package file for the Unity project.')
  }

  /**
   * @param {Command} program Program
   */
  attachToProgram(program) {
    super.attachToProgram(program);
  }

  async run(value, options) {
    if (fs.existsSync('./package.json')) {
      throw new Error(`Package already exists.`);
    }

    const result = await NPM.init();
    if (result.stderr) {
      throw new Error(result.stderr);
    }

    console.log(result.stdout);
  }
}

export default InitCommand;