import { freemem, totalmem, uptime } from 'node:os'

export default eventHandler((event) => {
  setResponseHeaders(event, {
    'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*',
  })

  return {
    ok: true,
    freeSystemMemoryInBytes: freemem(),
    totalSystemMemoryInBytes: totalmem(),
    uptimeInSeconds: uptime(),
  }
})
