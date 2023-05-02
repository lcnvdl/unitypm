export default class FilesStub {
  constructor() {
    this.files = {};
  }

  existsSync(path) {
    return !!this.files[path];
  }

  mkdirSync(path) {
    this.files[path] = [];
  }

  readdirSync(path) {
    return this.files[path];
  }

  statSync(path) {
    return fs.statSync(path);
  }

  rmdirSync(path) {
    delete this.files[path];
  }

  copyFileSync(src, dest) {
    this.files[dest] = this.files[src];
  }

  readFileSync(path, opts) {
    return this.files[path];
  }

  writeFileSync(path, content, opts) {
    if (typeof content !== 'string') {
      throw new Error('Content should be a string');
    }
    this.files[path] = content;
  }
}