import ListCommand from "../src/commands/list.command.js";
import Environment from "../src/environment.js";

const env = new Environment();

describe('ListCommand', () => {
  describe('#ctor', () => {
    it('should work fine', () => {
      new ListCommand(env);
    });
  });
});