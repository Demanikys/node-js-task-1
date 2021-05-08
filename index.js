import { Command } from 'commander/esm.mjs';
import cipher from './caesar-cipher.js'
const program = new Command();

program
    // .version('0.0.1')
    .option('-a, --action <type>', 'set action type')
    .option('-s, --shift <number>', 'set shift of code')
    .option('-t, --text <text>', 'set code/encode text')
    .parse()

const options = program.opts();

const result = cipher(options.action, options.shift, options.text)
console.log(result)