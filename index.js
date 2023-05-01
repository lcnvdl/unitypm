#!/usr/bin/env node

/** @typedef {import('./src/base/base-command.js').default} BaseCommand */

import colors from 'colors';
import { Command } from 'commander';
import packg from './package.json' assert { type: 'json' };
import Environment from './src/environment.js';
import InitCommand from './src/commands/init.command.js';
import InstallCommand from './src/commands/install.command.js';
import PublishCommand from './src/commands/publish.command.js';
import ListCommand from './src/commands/list.command.js';

const { name, description, version } = packg;

const program = new Command();

program.name(name).description(description).version(version);

//  Environment
const environment = new Environment();
environment.initialize();

/** @type { BaseCommand[] } */
const allCommands = [
  new InitCommand(),
  new InstallCommand(environment),
  new PublishCommand(environment),
  new ListCommand(environment),
];

for (const command of allCommands) {
  command.attachToProgram(program);
}

//  Init
console.log(colors.cyan(`\n${name} v${version}\nhttps://forjagames.itch.io\nHome directory: ${environment.appdir}\n`));

program.parse();