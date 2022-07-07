import express from 'express'
import path from 'path'
import fs from 'fs'
import MockDomain from '../models/MockDomain.js'

const router = express.Router()

router.get('/getMockDomains', (req, res, next) => {
  let files = fs.readdirSync(path.resolve(process.cwd(), '../mock'))
  if (files) {
    files = files.filter(file => !["README.md"].includes(file))
  }
  res.json(files)
})

router.post('/changeMockDomain', (req, res, next) => {
  let { domain } = req.body
  if (!domain) throw new Error('参数错误，缺少参数 domain')

  MockDomain.set(domain)
  res.json({})
})

export default router
