import { Command } from 'commander/esm.mjs';
import CaesazCipher from './caesar-cipher.js'
import fs from 'fs'
import checkArgs from './checkArgs.js'
import { pipeline } from 'stream';

const program = new Command();

program
    .option('-a, --action <type>', 'set action type')
    .option('-s, --shift <number>', 'set shift of code')
    .option('-i, --input <path>', 'file from where input text will read')
    .option('-o, --output <path>', 'file where output text will wright')
    .parse()

const options = program.opts();

const outputInfo = (chunk) => {
    if (fs.existsSync(options.output)) {
        return fs.createWriteStream(options.output, { flags: 'a' })
    } else {
        return process.stdout
    }
}

checkArgs(options)

const cipher = new CaesazCipher(options.action, options.shift)

if (fs.existsSync(options.input)) {
    pipeline(
        fs.createReadStream(options.input, "utf8"),
        cipher,
        outputInfo(),
        (err) => {
            if (err) {
                console.error(err)
            }
        }
    )
} else {
    pipeline(
        process.stdin,
        cipher,
        outputInfo(),
        (err) => {
            if (err) {
                console.error(err)
            }
        }
    )



    // process.stdin.pipe(cipher).pipe(process.stdout.write)
    // process.stdin.on('data', (data) => {
    //     const result = cipher(options.action, options.shift, data.toString('utf-8'))
    //     outputInfo(result)
    // })
}