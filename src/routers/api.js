import express from "express"
import fs from "fs";
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
      let dirs = getDirLink(req.path);
      res.render(VIEWS_NAME_DIR, {
        files,
        dir: req.path,
        dirs,
        lastDir: dirs.length > 0 ? dirs[dirs.length - 1] : []
      });
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

    if (statInfo.isFile()) {
      file = decodeURIComponent(file)
    }
    
    let relPath = path.join(mFile.filePath, file)

    return {
      file,
      link: relPath,
      isFile: statInfo.isFile(),
      size: statInfo.size,
      editLink: '/admin?url=' + encodeURIComponent(relPath)
    }
  });
}

function notFound(res) {
  res.status(404).end("404"); 
}

// '/v1/name' => [['/v1', '/v1'], ['/name', '/v1/name']]
// '/v1/name/' => [['/v1', '/v1/'], ['/name/', '/v1/name/']]
function getDirLink(path) {
  const slash = '/'
  let isEndsWithSlash = path.endsWith(slash)
  let dirArr = path.split(slash).filter(dir => !!dir)
  let pDirArr = []

  return dirArr.map((dir, i) => {
    pDirArr.push(dir)
    return {
      name: `${slash}${dir}${(isEndsWithSlash && i === dirArr.length - 1) ? slash : ''}`,
      link: `${slash}${pDirArr.join(slash)}${isEndsWithSlash ? slash : ''}`,
    }
  })
}

export default router