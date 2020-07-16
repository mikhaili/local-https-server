/**
 * ipAddress function fetch local ip
 * @return {string}
 */
export function ipAddress(): string {
    return require('os').networkInterfaces().en0.find(elm => elm.family === 'IPv4').address
}
