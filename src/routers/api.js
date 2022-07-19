import express from "express"
import path from "path";
import MockFileService from "../services/MockFileService.js";
import ForwardAndSaveFileService from '../services/ForwardAndSaveFileService.js'
import ForwardOpenConfig from "../config/ForwardOpenConfig.js";

const router = express.Router()
const VIEWS_NAME_DIR = "dir";

router.all('*', async (req, res, next) => {
  if (ForwardOpenConfig.isOpen() && !sameOrigin(req.headers)) {
    let forwardAndSaveFileService = new ForwardAndSaveFileService(res.locals.mockDomain, req)
    let dfdData = await forwardAndSaveFileService.start()
    if (dfdData.status) {
      res.status(dfdData.status).send(dfdData.message)
    } else {
      res.json(dfdData)
    }
    return res.end()
  }

  let mfs = new MockFileService(res.locals.mockDomain, req.originalUrl)

  // 目录不存在
  if (mfs.isNotExist()) {
    notFound(res)
    return
  }

  // 文件
  if (mfs.isFile()) {
    let data = mfs.readFile()
    res.json(data)
    res.end()
    return
  }

  // 目录
  let files = getFiles(mfs)
  res.render(VIEWS_NAME_DIR, {
    files,
    dir: req.path,
    mockDomain: res.locals.mockDomain,
    isForwardOpen: ForwardOpenConfig.isOpen(),
  })
});

/**
 * 获取目录下的文件信息
 * @returns
 */
function getFiles(mfs) {
  let files = mfs.readDirs()
  let last = mfs.getParentDir()
  files.splice(0, 0, last)

  return files
}

function notFound(res) {
  res.status(404).end("404"); 
  res.end()
}

function sameOrigin(headers) {
  return headers.referer && headers.host.indexOf(headers.referer) > 0
}

export default router