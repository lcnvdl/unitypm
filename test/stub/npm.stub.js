export default class NPMStub {
  constructor() {
    this.commands = [];
  }

  async runCommand(cmd, options) {
    this.commands.push({ cmd, options });
    return { stdout: true };
  }

  async init() {
    return this.runCommand('npm init -y');
  }
}
