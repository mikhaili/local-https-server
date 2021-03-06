import * as fastify from 'fastify'
import {IncomingMessage, Server, ServerResponse} from 'http'
import * as fs from "fs";
import {promisify} from '../utils/';
import {globalConfig} from "../config/";

// Create a http server. We pass the relevant typings for our http version used.
// By passing types we get correctly typed access to the underlying http objects in routes.
// If using http2 we'd pass <http2.Http2Server, http2.Http2ServerRequest, http2.Http2ServerResponse>
// @ts-ignore
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify.fastify({logger: true})

const opts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string'
          }
        }
      }
    }
  }
}
const jsonpServerConfig = globalConfig.jsonpServerConfig

server.get('/ping', opts, (request, reply) => {
  reply
    .code(200)
    .send({pong: 'it worked!'})
})

server.get('/request', opts, async (request, reply) => {
  //@ts-ignore
  const {callback, filename} = request.query
  const fName = filename || 'default'
  const file = `./mocks-response/${fName}.json`
  try {
    const readFile = promisify(fs.readFile)
    const data = await readFile(file, 'utf8')

    return reply
      .code(200)
      .send(`${callback}(${data})`)

  } catch (err) {
    console.error(
      `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
    return reply
      .code(500)
      .send(err)
  }
});

// @ts-ignore
const start = async () => {
  try {
    await server.listen(jsonpServerConfig.port, jsonpServerConfig.address);
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

process.on("uncaughtException", error => {
  console.error(error);
});
process.on("unhandledRejection", error => {
  console.error(error);
});

start()
