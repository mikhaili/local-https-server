/**
 * isExist check if certificate files exists in provided path
 *
 * @param path - path to the file
 * @return {boolean}
 */

import * as fs from "fs";

export function isExists(path) {
  try {
    fs.accessSync(`${path}`, fs.constants.R_OK)
    console.log(`${path}`, 'can read/write')
  } catch (err) {
    console.error(`${path}`, 'no access!' + JSON.stringify(err))
    return false
  }
  return true
}
