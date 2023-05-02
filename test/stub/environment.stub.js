import Environment from "../../src/environment.js";
import FilesStub from './files.stub.js';
import NPMStub from './npm.stub.js';

export default class EnvironmentStub extends Environment {
  constructor() {
    super(new FilesStub(), new NPMStub());
  }
}