import {spawn} from "child_process";
import {Certificate} from "./certificate";

export class ServerConfigBuilder {
  private _certificate: Certificate;
  private _port: number;
  private _proxy: string;
  private readonly _root: string;

  constructor(root: string) {
    this._root = root
  }

  setProxy(proxy: string) {
    this._proxy = proxy
    return this
  }

  setPort(port: number) {
    this._port = port
    return this
  }

  setCertificate(certificate: Certificate) {
    this._certificate = certificate
    return this;
  }

  build() {
    return new ServerConfig(this)
  }

  get certificate() {
    return this._certificate
  }

  get proxy() {
    return this._proxy
  }

  get root() {
    return this._root
  }

  get port() {
    return this._port
  }
}

export class ServerConfig {
  readonly certFilePath: string;
  readonly keyFilePath: string;
  readonly port: number;
  readonly proxy: string;
  readonly root: string;

  constructor(builder: ServerConfigBuilder) {
    this.certFilePath = builder.certificate.certFilePath
    this.keyFilePath = builder.certificate.keyFilePath
    this.port = builder.port;
    this.root = builder.root;
    this.proxy = builder.proxy;
  }
}

export class HttpsServer {
  private readonly certFilePath: string;
  private readonly keyFilePath: string;
  private readonly port: number;
  private readonly root: string;
  private readonly proxy: string;

  constructor(props: ServerConfig) {
    const {certFilePath, keyFilePath, root, proxy, port} = props
    this.certFilePath = certFilePath
    this.keyFilePath = keyFilePath
    this.root = root
    this.proxy = proxy
    this.port = port
  }

  async start() {
    console.log(__dirname);
    const args = [
      `${this.root}`,
      '-p', `${this.port}`,
      '--cors=*',
      '--ssl', '--cert', `${this.certFilePath}`, '--key', `${this.keyFilePath}`,
      '-P', `${this.proxy}`
    ];
    const httpServer = 'http-server'
    spawn(httpServer, args, {stdio: 'inherit'})
  }

}
