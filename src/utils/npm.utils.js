import util from 'util';
import child_process from 'child_process';
const exec = util.promisify(child_process.exec);

class NPM {
  static async runCommand(cmd, options) {
    const { stdout, stderr } = await exec(cmd, options);

    if (stderr && stderr !== "") {
      const hasErrors = stderr.split("\n").map(m => m.trim()).some(m => m && m !== "" && m.indexOf("npm WARN") === -1);
      if (!hasErrors) {
        stderr = "";
      }
    }

    return { stdout, stderr };
  }

  static async init() {
    return NPM.runCommand('npm init -y');
  }
}

export default NPM;