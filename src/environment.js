import { homedir } from 'os'
import path from 'path';
import fs from 'fs';

export default class Environment {
  constructor() {
    this.library = { packages: [] };
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
    if (!fs.existsSync(this.appdir)) {
      fs.mkdirSync(this.appdir);
    }

    if (!fs.existsSync(this.libFile)) {
      this.save();
    }
    else {
      this.load();
    }
  }

  exists(name) {
    return this.library.packages.some(m => m.name === name);
  }

  load() {
    this.library = JSON.parse(fs.readFileSync(this.libFile, 'utf-8'));
    this.library.packages = this.library.packages || [];
  }

  save() {
    fs.writeFileSync(this.libFile, JSON.stringify(this.library), 'utf-8');
  }
}