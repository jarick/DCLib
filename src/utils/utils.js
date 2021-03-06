
export const bigInt = require('big-integer')

const web3sha3 = require('web3-utils/src/soliditySha3.js')

export const sha3 = web3sha3

/**
 * Convert BET from decimal, to "human" format, ex: 110000000 = 1.1BET
 * @param  {number} bets
 * @param  {number} toFixed - values after zero
 * @return {number} - bet in human format
 */
export function dec2bet (val, r = 2) {
  return +(val / 100000000).toFixed(r)
}

/**
 * Conver decimal, to BET format
 *
 * @export
 * @param {number} val - value in decimal format
 * @returns {number} - value in BETS FIRMAT
 *
 * @example
 * DCLib.Utils.bet2dec(31024891841492)
 * return: 310248.92
 */
export function bet2dec (val) {
  let b = '' + (val * 100000000)
  if (b.indexOf('.') > -1) {
    b = b.split('.')[0] * 1
  }
  return b * 1
}

/**
 * @ignore
 */
export function clearcode (string) {
  return string.toString()
    .split('\t').join('')
    .split('\n').join('')
    .split('  ').join(' ')
}

export const checksum = function (string) {
  return sha3(clearcode(string))
}

export const hashName = name => {
  return web3sha3(name).substr(2, 8)
}

export const toFixed = (value, precision) => {
  precision = Math.pow(10, precision)
  return Math.ceil(value * precision) / precision
}

export const numToHex = (num) => {
  return num.toString(16)
}

export const hexToNum = (str) => {
  return parseInt(str, 16)
}

export const hexToString = (hex) => {
  let str = ''
  for (let i = 0; i < hex.length; i += 2) { str += String.fromCharCode(parseInt(hex.substr(i, 2), 16)) }
  return str
}

export const pad = (num, size) => {
  let s = num + ''
  while (s.length < size) s = '0' + s
  return s
}

export const buf2hex = buffer => {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}
export const buf2bytes32 = buffer => {
  return '0x' + buf2hex(buffer)
}

export const remove0x = (str) => {
  if (str.length > 2 && str.substr(0, 2) === '0x') {
    str = str.substr(2)
    console.log('0x prefix removed from  ' + str.substr(0, 8) + '...')
  }
  return str
}

export const add0x = (str) => {
  if (str.substr(0, 2) !== '0x') {
    console.log('0x prefix added to ' + str.substr(0, 8) + '...')
    str = '0x' + str
  }
  return str
}

export const makeSeed = () => {
  var str = '0x'
  var possible = 'abcdef0123456789'

  for (var i = 0; i < 64; i++) {
    if (new Date().getTime() % 2 === 0) {
      str += possible.charAt(Math.floor(Math.random() * possible.length))
    } else {
      str += possible.charAt(Math.floor(Math.random() * (possible.length - 1)))
    }
  }

  return web3sha3(numToHex(str))
}

export const concatUint8Array = function (buffer1, buffer2) {
  var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
  tmp.set(new Uint8Array(buffer1), 0)
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
  return tmp.buffer
}
