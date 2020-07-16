import * as utils from '../utils/'

const {exec} = require('child_process')

const execWithPromise = utils.promisify(exec)

export interface CertificateModel {
    certFile: string,
    keyFile: string,
    ip: string
}

export class Certificate {
    readonly certFilePath: string;
    readonly keyFilePath: string;

    constructor(certFilePath: string, keyFilePath: string) {
        this.certFilePath = certFilePath;
        this.keyFilePath = keyFilePath;
    }

    /**
     * create - create certificate with provided names and IP
     * @param certFile
     * @param keyFile
     * @param ip
     */

    async create({certFile, keyFile, ip}: CertificateModel) {
        //https://github.com/FiloSottile/mkcert
        //mkcert -key-file key.pem -cert-file cert.pem example.com *.example.com
        await execWithPromise('mkcert -install')
        await execWithPromise(`mkcert -cert-file ${certFile} -key-file ${keyFile} localhost 127.0.0.1 ::1 ${ip}`)
    }

    /**
     * isExist check if certificate files exists in provided path
     *
     * @return {boolean}
     */
    isExists() {
        const certFileExists = utils.isExists(this.certFilePath);
        const certKeyFileExists = utils.isExists(this.keyFilePath);
        return (certFileExists && certKeyFileExists);
    }
}
