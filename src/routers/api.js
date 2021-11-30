import express from "express"
import fs from "fs";
import path from "path";
import process from "process";
import qs from "querystring";

const router = express.Router()
const MOCK_ROOT_PATH = "../mock";
const VIEWS_NAME_DIR = "dir";

router.use((req, res, next) => {
  console.log('api middleware')
  next()
})

router.all('*', (req, res, next) => {
  console.log(`====== start ${req.originalUrl}`);

  // 如何区分当前访问是接口？
  // 查找路由最后一部分，是文件就是接口
  // 接口返回文件内容，非接口返回目录下内容，否则返回 404

  // req.path 至少含有一个 "/"，这里移除最后一个 "/"
  let pathArr = req.path.replace(/\/$/, "").split("/");
  let lastPathName = pathArr.splice(-1, 1).join("");
  let parentPath = pathArr.join("/");
  let mockFilePath = getMockFilePathFromReq(res,parentPath);
  
  if (!fs.existsSync(mockFilePath)) {
    return notFound(res)
  }
  console.log(`"parentPath", ${parentPath}, ${lastPathName} ${mockFilePath}`);

  let files = getDirInfo(mockFilePath);
  let filename = lastPathName;
  if (Object.keys(req.query).length > 0) {
    filename += "?" + qs.stringify(req.query);
  }
  let oneFile = files.find((f) => f.filename === filename);

  if (oneFile) {
    console.log("find one file", oneFile);
    if (oneFile.isFile) {
      let data = readFile(oneFile.absolutePath);
      res.json(JSON.parse(data));
    } else {
      let files = getDirInfo(oneFile.absolutePath);
      res.render(VIEWS_NAME_DIR, { files });
    }
  } else {
    if (!lastPathName) {
      // 最后一部分路径为空 === 根目录
      // 根目录直接列出目录下内容
      return res.render(VIEWS_NAME_DIR, { files });
    }
    notFound(res);
  }
});

function getMockFileRootPath(res) {
  return path.resolve(process.cwd(), MOCK_ROOT_PATH, res.locals.mockDomain || "");
}

function getMockFilePathFromReq(res, reqPath) {
  reqPath = reqPath.replace(/^\//, "");
  return path.resolve(getMockFileRootPath(res), reqPath);
}

function readFile(mockFilePath) {
  return fs.readFileSync(mockFilePath, { encoding: "utf-8" });
}

/**
 * 获取目录下的文件信息
 * @param {string} filePath 目录的绝对地址
 * @returns
 */
function getDirInfo(filePath) {
  let files = fs.readdirSync(filePath);
  return files.map((file) => {
    let absolutePath = path.resolve(filePath, file);
    let statInfo = fs.statSync(absolutePath);
    let link = file + "/";
    let filename = file;

    if (statInfo.isFile()) {
      link = filename = decodeURIComponent(file);
    }

    return {
      filename,
      link,
      icon: statInfo.isFile() ? "_page" : "_blank",
      isDir: statInfo.isDirectory(),
      isFile: statInfo.isFile(),
      originFilename: file,
      absolutePath,
      size: statInfo.size,
    };
  });
}

function notFound(res) {
  res.status(404).end("404"); 
}

export default router