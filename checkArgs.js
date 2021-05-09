import fs from 'fs'

const checkArgs = (options) => {
    if (options.action !== 'encode' && options.action !== 'decode') {
        process.stderr.write('error: Action type is invalid!')
        process.exit(-1)
    }

    if (!options.shift || options.shift % 1 !== 0) {
        process.stderr.write('error: Have no shift, or shift is not integer number!')
        process.exit(-1)
    }

    if (options.input && !fs.existsSync(options.input)) {
        process.stderr.write(`error: The input file has been passed, but it can't be read`)
        process.exit(-1)
    }

    if (options.output && !fs.existsSync(options.output)) {
        process.stderr.write(`error: The output file has been passed, but it can't be written`)
        process.exit(-1)
    }
}

export default checkArgs
