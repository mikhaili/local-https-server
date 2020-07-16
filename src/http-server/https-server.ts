export class Config {
    readonly certFilePath: string;
    readonly keyFilePath: string;
    readonly port: number;

    constructor({certificate: certificate, port: port}) {
        console.log(certificate);
        console.log(port);
        this.certFilePath = certificate.certFilePath
        this.keyFilePath = certificate.keyFilePath
        this.port = port;
    }
}

import {spawn} from "child_process";

export class HttpsServer {
    private readonly certFilePath: string;
    private readonly keyFilePath: string;
    private readonly port: number;

    constructor(props: Config) {
        const {certFilePath, keyFilePath, port} = props
        this.certFilePath = certFilePath
        this.keyFilePath = keyFilePath
        this.port = port
    }

    async start() {
        const httpServer = spawn(`http-server`, ['../', '-p', `${this.port}`, '--cors=*', '--ssl', '--cert', `${this.certFilePath}`, '--key', `${this.keyFilePath}`])
        //, '-P http://localhost:3000'
        httpServer.stdout.on('data', function (data) {
            console.log(data.toString())
        })

        httpServer.stderr.on('data', function (data) {
            console.error(data.toString())
        })

        httpServer.on('exit', function (code) {
            console.log('child process exited with code ' + code.toString())
        })
    }

}
