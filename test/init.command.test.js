import { expect } from "chai";
import InitCommand from "../src/commands/init.command.js";
import EnvironmentStub from './stub/environment.stub.js';

describe('InitCommand', () => {
  describe('#ctor', () => {
    it('should work fine', () => {
      new InitCommand(new EnvironmentStub());
    });
  });

  describe('#run', () => {
    it('should fail if package.json already exists', async () => {
      let error = null;

      try {
        const cmd = new InitCommand(new EnvironmentStub());
        cmd.environment.fs.writeFileSync('./package.json', 'hola', 'utf8');
        await cmd.run();
      }
      catch (err) {
        error = err;
      }

      expect(error).to.be.ok;
    });

    it('should work fine', async () => {
      const cmd = new InitCommand(new EnvironmentStub());
      await cmd.run();

      expect(cmd.environment.npm.commands[0].cmd).to.eq('npm init -y');
    });
  });
});