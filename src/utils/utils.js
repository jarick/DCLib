/**
 * @ignore
 */
export const bigInt = require('big-integer')

/**
 * @ignore
 */
const web3_sha3 = require('web3/packages/web3-utils/src/soliditySha3.js')

/**
 * @ignore
 */
export const sha3 = web3_sha3

/**
 * Convert BET from decimal, to "human" format, ex: 110000000 = 1.1BET 
 * 
 * @example
 * > DCLib.Utils.bet2dec(11241451412)
 * 
 * @example
 * // method return Num form BET format
 * 
 * > 112.41
 * 
 * @param  {number} val - Bet for convert in decimal format 
 * @param  {number} r - values after zero
 * @return {number} - bet in human format
 */
export function bet2dec(val, r=2){
	return +(val / 100000000).toFixed(r)
}

/**
 * Conver decimal, to BET format 1.1BEY = 110000000
 *
 * @example
 * DCLib.Utils.bet2dec(112.41)
 *
 * @example
 * // method return Num from decimal format
 *
 * > "11241000000"
 *
 * @export
 * @param {number} val - value in BET format
 * @returns {number} - value in decimal format
 *
 */
export function bet4dec(val){
	let b = ''+(val*100000000)
	if (b.indexOf('.')>-1) {
		b = b.split('.')[0]*1
	}
	return b*1
}

/**
 * @ignore 
 */
export function clearcode(string){
	return string.toString()
		.split('\t').join('')
		.split('\n').join('')
		.split('  ').join(' ')
}


/**
 * ## DCLib.Utils.checksum(string)
 * Convert string value in sha3 format
 * 
 * @example
 * DCLib.Utils.checksum('hello world')
 * > "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
 * 
 * @example
 * DCLib.Utils.checksum(1234)
 * > "0x17fa14b0d73aa6a26d6b8720c1c84b50984f5c188ee1c113d2361e430f1b6764"
 * 
 * @export
 * @param {any} string - value to convert
 * @returns - String in sha3 format
 */
export const checksum = function(string){
	return sha3(clearcode(string) )
}


/**
 * ## DCLib.Utils.hashName
 * Convert to sha3 format and truncates value
 * 
 * @example
 * DCLib.Utils.hashName('hello world')
 * > "47173285"
 * 
 * @example
 * DCLib.Utils.hashName(1234)
 * > "17fa14b0"
 * 
 * 
 * @param {any} name - value to translate
 */
export const hashName = name =>{
	return web3_sha3(name).substr(2,8)
}

/**
 * ## DCLib.Utils.toFixed(value, precision)
 * change the position of the comma after 1 
 * character by the set value
 * 
 * @example
 * DCLib.Utils.toFixed(0.100220,3)
 * > 0.101
 * 
 * @example
 * DCLib.Utils.toFixed(0.100220,30)
 * > 0.10022000000000002
 * 
 * @param {Number} value - Value to change
 * @param {Number} precision - the value to which you want to offset the comma
 */
export const toFixed = (value, precision) => {
	precision = Math.pow(10, precision)
	return Math.ceil(value * precision) / precision
}

/**
 * ## DCLib.Utils.numToHex(num)
 * turn num in hex format 
 * 
 * @example
 * DCLib.Utils.numToHex(1000086799878)
 * 
 * @example
 * // method return
 * 
 * > "e8d9d18606"
 * 
 * @param {Number} num - value for turn in hex format
 * @returns {String} - value in hex format 
 */
export const numToHex = (num) => {
	return num.toString(16)
}

/**
 * ## DCLib.Utils.HexToNum(str)
 * turn hex in num format 
 * 
 * @example
 * DCLib.Utils.hexToNum("e8d9d18606")
 * 
 * @example
 * // method return
 * 
 * > 1000086799878
 * 
 * @param {String} str - value for turn in num format
 * @returns {String} - value in num format
 */
export const hexToNum = (str) => {
	return parseInt(str, 16)
}

/**
 * ## DCLib.Utils.hexToString(hex)
 * convert hex String to String format
 * 
 * @example
 * DCLib.Utils.hexToString('0x4920686176652031303021')
 * 
 * @example
 * // method return
 * > " I have 100!"
 * 
 * @param {String} hex - hash message 
 * @returns {String} - String message
 */
export const hexToString = (hex) => {
	let str = ''
	for (let i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
	return str
}

/**
 * ## DCLib.Utils.pad(num, size)
 * method need for add quantity 0 
 * that must be set before the value
 * 
 * @example
 * DCLib.Utils.pad(1, 10)
 * > "0000000001"
 * 
 * @example
 * DCLib.Utils.pad(1, 2)
 * > "01"
 * 
 * @param {Number} num - value to change
 * @param {Number} size - Quantity 0 that must be set before the value
 * 
 * @returns {String} - value  + n Quantity 0
 */
export const pad = (num, size) => {
	let s = num + ''
	while (s.length < size) s = '0' + s
	return s
}

/**
 * ## DCLib.Utils.buf2hex 
 * Convert value to to hex format and buffered
 * 
 * @example
 * DCLib.Utils.buf2hex(111)
 * 
 * > "00000000000000000000000000000000000000000000000000000000000000000000000000000
 * 000000000000000000000000000000000000000000000000000000000000000000000000000000000
 * 0000000000000000000000000000000000000000000000000000000000000000"
 * 
 * @param {Number} buffer - number and number.toString value
 * @returns {String} - value to convert in hex and buffered
 */
export const buf2hex = buffer => {
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('')
}

/**
 * ## DCLib.Utils.bufTobytes32(buffer)
 * Convert value to byte32 format and buffered
 * 
 * @example
 * DCLib.Utils.buf2bytes32('11')
 * 
 * > "0x0000000000000000000000"
 * 
 * @param {Number} buffer - number and number.toString value 
 * @returns {String} - value to convert in bytes32 and buffered
 */
export const buf2bytes32 = buffer => {
	return '0x'+buf2hex(buffer)
}

/**
 * ## DCLib.Utils.remove0x(str)
 * method removed '0x' from value
 * 
 * @example
 * DCLib.Utils.remove0x('0x1o3k4j5nnj')
 * 
 * > 1o3k4j5nnj
 * 
 * @param {String} str - hash String which one removed '0x'
 * @returns {String} - value without '0x'
 */
export const remove0x = (str) => {
	if (str.length > 2 && str.substr(0,2)=='0x') {
		str = str.substr(2)
		console.log('0x prefix removed from ', str)
	}
	return str
}

/**
 * ## DCLib.Utils.add0x(str)
 * method add '0x' from value
 * 
 * @example
 * DCLib.Utils.remove0x('1o3k4j5nnj')
 * 
 * > 0x1o3k4j5nnj
 * 
 * @param {String} str - value which one added '0x'
 * @returns {String} - value with '0x'
 */
export const add0x = (str) => {
	if (str.substr(0,2)!='0x') {
		console.log('0x prefix added to', str)
		str = '0x'+str
	}
	return str
}

/**
 * ## DCLib.Utils.makeSeed()
 * method generates string value in sha3 format
 * 
 * @example 
 * DCLib.Utils.makeSeed()
 * 
 * > "0x2579780f0a202e33795a049e21817b00648de38f4403d57869227f779f37ff0a"
 * 
 * @requires {String} - value in sha3 format
 */
export const makeSeed = () => {
	var str = '0x'
	var possible = 'abcdef0123456789'

	for (var i = 0; i < 64; i++) {
		if ( new Date().getTime() % 2 == 0) {
			str += possible.charAt(Math.floor(Math.random() * possible.length))
		} else {
			str += possible.charAt(Math.floor(Math.random() * (possible.length - 1)))
		}
	}

	return web3_sha3(numToHex(str))
}

/**
 * @todo Write description
 * 
 * @param {String} buffer1 - value buferr 1 
 * @param {String} buffer2 - value buffer 2
 * @requires {Array}
 */
export const concatUint8Array = function(buffer1, buffer2) {
	var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
	tmp.set(new Uint8Array(buffer1), 0)
	tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
	return tmp.buffer
}
