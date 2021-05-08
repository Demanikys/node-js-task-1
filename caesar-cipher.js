const arr_en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const shiftSymbol = (symbol, shift) => {
    if (arr_en.includes(symbol)) {
        let index = arr_en.findIndex((item) => item === symbol) + shift
        if (index < 0) {
            index = 26 + index
        } else if (index > 25) {
            index = index % 26
        }
        console.log(index)
        return arr_en[index]
    } else if (arr_EN.includes(symbol)) {
        let index = arr_EN.findIndex((item) => item === symbol) + shift
        if (index < 0) {
            index = 26 - index
        } else if (index > 25) {
            index = index % 25
        }
        return arr_EN[index]
    } else {
        return symbol
    }
}

const cipher = (type, shift, text) => {
    text = text.split('')

    if (type === 'decode') {
        shift = -shift
    }

    shift = shift % 26

    const result = text.map((symbol) => {
        return shiftSymbol(symbol, shift)
    })

    return result.join('')
}

export default cipher