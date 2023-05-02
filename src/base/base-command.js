/** @typedef {import('commander').Command} Command */

import colors from 'colors';

/**
 * @abstract
 */
class BaseCommand {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  /**
   * @param {Command} program Program
   */
  attachToProgram(program) {
    return program.command(this.name)
      .description(this.description)
      .action(async (value, options) => {
        try {
          const result = this.run(value, options);

          if (result instanceof Promise) {
            await result;
          }
        }
        catch (err) {
          this.throw(`ERR: ${err.message || err}`);
        }
      });
  }

  /**
   * @abstract
   * @param {string} value Value
   * @param {*} options Selected options
   */
  run(value, options) {
    throw new Error('Abstract method');
  }

  throw(error) {
    console.error(colors.red(error));
  }

  logError(msg) {
    console.error(colors.red(error));
  }

  logSuccess(msg) {
    console.log(colors.green(msg || ' - Ok'));
  }
}

export default BaseCommand;