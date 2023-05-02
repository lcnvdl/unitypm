import { expect } from "chai";
import EnvironmentStub from './stub/environment.stub.js';
import PublishCommand from "../src/commands/publish.command.js";

let env;

describe('InitCommand', () => {
  beforeEach(() => {
    env = new EnvironmentStub();
    env.initialize();
  });

  describe('#ctor', () => {
    it('should work fine', () => {
      new PublishCommand(env);
    });
  });

  describe('#run', () => {
    it('should fail if package.json does not exists', async () => {
      let error = null;

      try {
        const cmd = new PublishCommand(env);
        await cmd.run();
      }
      catch (err) {
        error = err;
      }

      expect(error).to.be.ok;
    });

    it('should run npm link', async () => {
      const cmd = new PublishCommand(env);
      cmd.environment.fs.writeFileSync('./package.json', JSON.stringify({ name: 'hola', version: '1.0.0', description: 'test' }), 'utf8');
      await cmd.run();

      expect(cmd.environment.npm.commands[0].cmd).to.eq('npm link');
    });

    it('new package should exists', async () => {
      const cmd = new PublishCommand(env);
      cmd.environment.fs.writeFileSync('./package.json', JSON.stringify({ name: 'hola', version: '1.0.0', description: 'test' }), 'utf8');
      await cmd.run();

      expect(cmd.environment.library.exists('hola')).to.be.true;
    });

    it('should save environment with new package', async () => {
      const cmd = new PublishCommand(env);
      cmd.environment.fs.writeFileSync('./package.json', JSON.stringify({ name: 'hola', version: '1.0.0', description: 'test' }), 'utf8');
      await cmd.run();

      console.log(cmd.environment.fs);

      const keys = Object.keys(cmd.environment.fs.files);

      expect(keys.length).to.eq(3);

      const packageObj = JSON.parse(cmd.environment.fs.files[keys[1]]);

      expect(JSON.stringify({ ...packageObj.packages[0], date: null })).to.eq('{"name":"hola","version":"1.0.0","description":"test","date":null}');
    });
  });
});