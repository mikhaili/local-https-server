import {Config, HttpsServer} from "./https-server";
import {getLocalIP, isExists} from "../utils";
import {Certificate} from "./certificate";
import path from "path";

const user = process.env.USER || ''

const util = require('util')

async function main() {

    const certKeyFileTemplate = '%s-key.pem'
    const certFileTemplate = '%s.pem'
    const certDirectoryTemplate = '/Users/%s/cert'

    const localIP = getLocalIP()

    const certDirectory = util.format(certDirectoryTemplate, user)
    const certFilePath = path.join(certDirectory, util.format(certFileTemplate, localIP))
    const certKeyFilePath = path.join(certDirectory, util.format(certKeyFileTemplate, localIP))

    const certificate: Certificate = new Certificate(certFilePath, certKeyFilePath);


    if (!certificate.isExists()) {
        await certificate.create({certFile: certFilePath, ip: localIP, keyFile: certKeyFilePath})
    }
    const config: Config = new Config({certificate: certificate, port: 8001})

    const server: HttpsServer = new HttpsServer(config);
    await server.start();
}

main()
    .catch(reason => {
        console.log('FAILED')
        console.log(reason)
    });
