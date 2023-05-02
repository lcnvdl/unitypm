import { homedir } from 'os'
import path from 'path';
import VersionsLibrary from './versions-library.js';
import Files from './utils/files.utils.js';
import NPM from './utils/npm.utils.js';

export default class Environment {
  /**
   * @param {Files} [files] Files manager
   * @param {NPM} [npm] NPM
   */
  constructor(files, npm) {
    /** @type {Files} */
    this.fs = files || new Files();
    /** @type {NPM} */
    this.npm = npm || new NPM();

    this.library = new VersionsLibrary(this.libFile, this.fs);
  }

  get homedir() {
    return homedir();
  }

  get appdir() {
    return path.join(this.homedir, '.unitypm');
  }

  get libFile() {
    return path.join(this.appdir, 'library.json');
  }

  initialize() {
    if (!this.fs.existsSync(this.appdir)) {
      this.fs.mkdirSync(this.appdir);
    }

    this.library.loadOrCreate();
  }

  load() {
    this.library.load();
  }

  save() {
    this.library.save();
  }
}