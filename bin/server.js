#!/usr/bin/env node

import { spawn } from "child_process"
import minimist from "minimist"

let argv = minimist(process.argv.slice(2))

if (argv.h || argv.help) {
  console.log([
    'usage: mock-charles-mirror [options]',
    '',
    'options:',
    '  -p --port       使用的端口号。[3007]',
    '  -h --help       查看所有命令。',
  ].join('\n'))
  process.exit()
}

if (argv.p || argv.port) {
  process.env.PORT = argv.p || argv.port
}

let url = new URL('../src/index.js', import.meta.url)
const result = spawn(
  process.execPath,
  [].concat(url.pathname),
  { stdio: 'inherit' }
)