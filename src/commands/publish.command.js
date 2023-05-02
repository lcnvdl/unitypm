/** @typedef {import('commander').Command} Command */
/** @typedef {import('../environment.js').default} Environment */

import BaseCommand from '../base/base-command.js';
import assert from 'assert';

export default class PublishCommand extends BaseCommand {
  /**
   * @param {Environment} environment
   */
  constructor(environment) {
    super('publish', 'Publish the package locally.');

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
    const pck = this.readAndValidatePackage();

    await this.linkToNode();

    this.addToLibraryAndSave(pck);
  }

  addToLibraryAndSave(pck) {
    this.environment.load();
    const existing = this.environment.library.findIndex(pck.name);

    const metadata = { ...pck, date: new Date() };

    if (existing !== -1) {
      this.environment.library.packages[existing] = metadata;
      console.log(`Package '${pck.name}' updated.`);
    }
    else {
      this.environment.library.packages.push(metadata);
      console.log(`Package '${pck.name}' added to library.`);
    }

    this.environment.save();
  }

  readAndValidatePackage() {
    const { fs } = this.environment;

    if (!fs.existsSync('./package.json')) {
      throw new Error(`Package is missing. Please run 'upm init' or 'unitypm init'.`);
    }

    console.log(`Reading 'package.json'...`);
    const pck = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

    if (!pck.name) {
      throw new Error('Missing package name');
    }

    if (!pck.version) {
      throw new Error('Missing package version');
    }

    this.logSuccess();

    return pck;
  }

  async linkToNode() {
    const { npm } = this.environment;

    console.log(`Running 'npm link'...`);
    const result = await npm.runCommand('npm link');
    if (result.stderr) {
      throw new Error(result.stderr);
    }
    this.logSuccess();
  }
}