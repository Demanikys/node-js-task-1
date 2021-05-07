import { Command } from 'commander/esm.mjs';
const program = new Command();

program
    .command('hello')
    .action(() => console.log('help'))
