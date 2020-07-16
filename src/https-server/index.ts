import {HttpsServer, ServerConfig, ServerConfigBuilder} from "./https-server";
import {format, homeDir, ipAddress} from "../utils";
import {Certificate} from "./certificate";


async function main() {
  const certKeyFileTemplate = '%s-key.pem'
  const certFileTemplate = '%s.pem'
  const certDirectory = homeDir() + '/cert'

  const localIP = ipAddress()

  const certificate: Certificate = new Certificate(
    format(certFileTemplate, localIP),
    format(certKeyFileTemplate, localIP),
    certDirectory
  );

  if (!certificate.isExists()) {
    await certificate.create(localIP)
  }

  const serverConfig = {
    root: '../',
    port: 8001,
    proxy: 'http://localhost:3000'
  }

  const config: ServerConfig = new ServerConfigBuilder(serverConfig.root)
    .setCertificate(certificate)
    .setPort(serverConfig.port)
    .setProxy(serverConfig.proxy)
    .build()

  const server: HttpsServer = new HttpsServer(config);
  await server.start();
}

main()
  .catch(reason => {
    console.log('FAILED')
    console.log(reason)
  });
