import express from "express"
import path from 'path'
import MockFileService from "../services/mockFileService.js"

const router = express.Router()
const VIEWS_NAME_ADMIN = 'admin'

router.all('/', (req, res, next) => {
  res.render(VIEWS_NAME_ADMIN);
})

router.get('/getApi', (req, res, next) => {
  let { url } = req.query
  if (!url) throw new Error('参数错误，缺少参数 url')

    let mfs = new MockFileService(res.locals.mockDomain, url)
    res.json(mfs.readFile())
})

router.post('/saveApi', (req, res, next) => {
  let { url, content} = req.body
  if (!url) throw new Error('参数错误，缺少参数 url')
  if (!content) throw new Error('参数错误，缺少参数 content')

  try{
    JSON.parse(content)
  } catch(e) {
    if (e instanceof SyntaxError) {
      throw new Error('语法错误，参数 content 不是正确的 JSON 格式')
    }
    console.error(e)
  }

  let mfs = new MockFileService(res.locals.mockDomain, url)
  mfs.saveFile(content)

  res.json({})
})

router.post('/saveDir', (req, res, next) => {
  let { dir, url } = req.body
  if (!dir) throw new Error('参数错误，缺少参数 dir')
  if (!url) throw new Error('参数错误，缺少参数 url')
  
  let mfs = new MockFileService(res.locals.mockDomain, path.join(dir, url))
  mfs.file.mkdir()
  res.json({})
})

export default router