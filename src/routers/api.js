import express from "express"
import path from "path";
import MockFileService from "../services/mockFileService.js";

const router = express.Router()
const VIEWS_NAME_DIR = "dir";

router.use((req, res, next) => {
  console.log(`====== start ${req.originalUrl}`);
  next()
})

router.all('*', (req, res, next) => {
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
    mockDomain: res.locals.mockDomain
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

export default router