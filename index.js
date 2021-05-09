import { Command } from 'commander/esm.mjs';
import cipher from './caesar-cipher.js'
import fs from 'fs'

const program = new Command();

program
    .option('-a, --action <type>', 'set action type')
    .option('-s, --shift <number>', 'set shift of code')
    .option('-i, --input <path>', 'file from where input text will read')
    .option('-o, --output <path>', 'file where output text will wright')
    .parse()

const options = program.opts();

if (options.action !== 'encode' && options.action !== 'decode') {
    console.error('Action type is invalid!')
    process.exit(-1)
}

if (!options.shift || options.shift % 1 !== 0) {
    console.error('Have no shift, or shift is not integer number!')
    process.exit(-1)
}

if (fs.existsSync(options.input)) {
    const readStream = fs.createReadStream(options.input, "utf8")
    readStream.on('data', (chunk) => {
        const result = cipher(options.action, options.shift, chunk)
        outputInfo(result)
    })
} else {
    //read from cmd
}

const outputInfo = (chunk) => {
    if (fs.existsSync(options.output)) {
        const writeStream = fs.createWriteStream(options.output)
        writeStream.write(chunk)
    } else {
        console.log(chunk)
    }
}


// const result = cipher(options.action, options.shift, text)
// console.log(result)