#!/usr/bin/env node

import { spawn } from "child_process"

process.title = 'mock-charles-mirror'

let url = new URL('../src/index.js', import.meta.url)
const result = spawn(
  process.execPath,
  [].concat(url.pathname),
  { stdio: 'inherit' }
)