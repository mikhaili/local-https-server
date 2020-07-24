import {HttpsServer, ServerConfig, ServerConfigBuilder} from "./https-server";
import {format, ipAddress, homedir} from "../utils/";
import {Certificate} from "./certificate";
import {globalConfig} from "../config/"

async function main() {
  const httpsServerConfig = globalConfig.httpsServerConfig

  const localIP = ipAddress();
  const {cert} = httpsServerConfig;

  const certificate: Certificate = new Certificate(
    format(cert.fileTemplate, localIP),
    format(cert.keyFileTemplate, localIP),
    format(cert.directory, homedir())
  );

  if (!certificate.isExists()) {
    console.info('Creating new certificate ...')
    await certificate.create(localIP)
  }

  const config: ServerConfig = new ServerConfigBuilder(httpsServerConfig.root)
    .setCertificate(certificate)
    .setPort(httpsServerConfig.port)
    .setProxy(httpsServerConfig.proxy)
    .build();

  const server: HttpsServer = new HttpsServer(config);
  await server.start();
}

main()
  .catch(reason => {
    console.log('FAILED');
    console.log(reason);
  });
