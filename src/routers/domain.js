import express from 'express'
import path from 'path'
import fs from 'fs'
import MockDomainConfig from '../config/MockDomainConfig.js'

const router = express.Router()

router.get('/getMockDomains', (req, res, next) => {
  let files =getMockDomains()
  res.json(files)
})

router.post('/changeMockDomain', (req, res, next) => {
  let { domain } = req.body
  if (!domain) throw new Error('参数错误，缺少参数 domain')

  let domains = getMockDomains()
  if (!domains.includes(domain)) throw new Error('参数错误，domain 不在可选范围')

  MockDomainConfig.set(domain)
  res.json({})
})


router.post('/addMockDomain', (req, res, next) => {
  let { domain } = req.body
  if (!domain) throw new Error('参数错误，缺少参数 domain')

  let domains = getMockDomains()
  if (domains.includes(domain)) throw new Error('参数错误，domain 已经存在')

  fs.mkdirSync(path.resolve(process.cwd(), '../mock', domain))
  res.json({})
})

function getMockDomains() {
  let files = fs.readdirSync(path.resolve(process.cwd(), '../mock'))
  if (files) {
    files = files.filter(file => !['README.md'].includes(file))
  }
  return files
}

export default router
