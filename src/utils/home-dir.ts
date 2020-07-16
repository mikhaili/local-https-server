/**
 * ipAddress function fetch local ip
 * @return {string}
 */
export function homeDir(): string {
  return require('os').homedir()
}
