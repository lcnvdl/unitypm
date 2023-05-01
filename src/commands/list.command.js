/** @typedef {import('commander').Command} Command */
/** @typedef {import('../environment.js').default} Environment */

import BaseCommand from '../base/base-command.js';
import assert from 'assert';

export default class ListCommand extends BaseCommand {
  /**
   * @param {Environment} environment
   */
  constructor(environment) {
    super('list', 'List of packages and versions.')
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
    console.log('Packages list: ');

    for (const pck of this.environment.library.packages) {
      console.log(`  ${pck.name} - v${pck.version}`);
      console.log(`\t${pck.description}`);
    }

    console.log('');
  }
}