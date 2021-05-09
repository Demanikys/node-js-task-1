const arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

import { Transform } from 'stream'

class CaesazCipher extends Transform {
    constructor(type, shift) {
        super()
        this.type = type
        this.shift = shift
    }

    _shiftSymbol(symbol, shift) {
        if (arr_en.includes(symbol)) {
            let index = arr_en.findIndex((item) => item === symbol) + shift

            if (index < 0) {
                index = 26 + index
            } else if (index > 25) {
                index = index % 26
            }

            return arr_en[index]
        } else if (arr_EN.includes(symbol)) {
            let index = arr_EN.findIndex((item) => item === symbol) + shift

            if (index < 0) {
                index = 26 - index
            } else if (index > 25) {
                index = index % 26
            }

            return arr_EN[index]
        } else {
            return symbol
        }
    }

    _transform = (chunk, encoding, callback) => {
        let text = chunk.toString().split('')

        if (this.type === 'decode') {
            this.shift = -this.shift
        }

        this.shift = this.shift % 26

        const transformChunk = (text.map((symbol) => {
            return this._shiftSymbol(symbol, this.shift)
        })).join('')

        this.push(`${transformChunk}\n`)
        callback()
    }

    _flush(callback) {
        callback()
    }
}



export default CaesazCipher