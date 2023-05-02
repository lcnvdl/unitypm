export default class VersionsLibrary {
  constructor(file, fs) {
    this.libFile = file;
    this.packages = [];
    this.fs = fs;
  }

  /**
   * @param {string} name Package name
   * @returns {number} Index
   */
  findIndex(name) {
    return this.packages.findIndex(m => m.name === name)
  }

  /**
   * @param {string} name Package name
   * @returns {boolean} Existence
   */
  exists(name) {
    return this.packages.some(m => m.name === name);
  }

  loadOrCreate() {
    if (!this.fs.existsSync(this.libFile)) {
      this.save();
    }
    else {
      this.load();
    }
  }

  load() {
    const { packages } = JSON.parse(this.fs.readFileSync(this.libFile, 'utf-8'));
    this.packages = packages || [];
  }

  save() {
    this.fs.writeFileSync(this.libFile, JSON.stringify({ packages: this.packages }), 'utf-8');
  }
}