import express from "express"
import fs from "fs";
import path from "path";
import MockFileService from "../services/mockFileService.js";

const router = express.Router()
const VIEWS_NAME_DIR = "dir";

router.use((req, res, next) => {
  console.log('api middleware')
  next()
})

router.all('*', (req, res, next) => {
  console.log(`====== start ${req.originalUrl}`);

  let mfs = new MockFileService(res.locals.mockDomain, req.originalUrl)

  if (!fs.existsSync(mfs.file.absoluteParentPath)) {
    return notFound(res)
  }

  try {
    let data = mfs.readFile()
    res.json(data);
  } catch(e) {
    if (e.message.startsWith('EISDIR')) {
      // 是目录
      let files = getDirInfo(mfs.file);
      res.render(VIEWS_NAME_DIR, { files, dir:req.path });
    } else if (e.message.startsWith('ENOENT')) {
      // 文件不存在
      notFound(res)
    } else throw e
  }
});

/**
 * 获取目录下的文件信息
 * @returns
 */
function getDirInfo(mFile) {
  let files = fs.readdirSync(mFile.absoluteFilePath);
  return files.map((file) => {
    let absolutePath = path.resolve(mFile.absoluteFilePath, file);
    let statInfo = fs.statSync(absolutePath);
    let link = file + "/";

    if (statInfo.isFile()) {
      link = decodeURIComponent(file);
    }

    let relPath = path.join(mFile.filePath, link)

    return {
      link,
      isFile: statInfo.isFile(),
      size: statInfo.size,
      editLink: '/admin?url=' + encodeURIComponent(relPath)
    };
  });
}

function notFound(res) {
  res.status(404).end("404"); 
}

export default router