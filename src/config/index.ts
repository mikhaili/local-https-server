import * as findConfig from 'find-config'

class Index {
  readonly config;

  constructor() {
    this.config = JSON.parse(findConfig.read('lhs.config.json'))
  }

  get httpsServerConfig() {
    return this.config.httpsServerConfig;
  }

  get jsonpServerConfig() {
    return this.config.jsonpServerConfig;
  }
}

export const globalConfig: Index = new Index();
