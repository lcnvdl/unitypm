import fs from 'fs';

export default class Files {
  existsSync(path) {
    return fs.existsSync(path);
  }

  mkdirSync(path) {
    return fs.mkdirSync(path);
  }

  readdirSync(path) {
    return fs.readdirSync(path);
  }

  statSync(path) {
    return fs.statSync(path);
  }

  rmdirSync(path, opts) {
    return fs.rmdirSync(path, opts);
  }

  rmSync(path, opts) {
    return fs.rmSync(path, opts);
  }

  copyFileSync(src, dest) {
    return fs.copyFileSync(src, dest);
  }

  readFileSync(path, opts) {
    return fs.readFileSync(path, opts);
  }

  writeFileSync(path, content, opts) {
    return fs.writeFileSync(path, content, opts);
  }
}