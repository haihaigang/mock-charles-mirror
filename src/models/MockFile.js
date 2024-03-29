import fs from "fs";
import path from "path";
import moment from "moment";
import { formatByteSize } from '../common/formatByteSize.js'
import { MOCK_ROOT_PATH } from "../constant/root-paths.js";

class MockFile {
  static ENCODING = "utf-8";

  // mockDomain = 'api-qa.shouwuapp.com'
  // filePath = '/v1/goods?id=1001'
  constructor(mockDomain, filePath) {
    this.mockDomain = mockDomain;
    this.rootPath = "";
    this.filePath = "";
    this.absoluteFilePath = "";
    this.pathname = "";
    this.filename = "";
    this.fileSize = 0;
    this.isFile = false;
    this.editLink = '';
    this.isNotExist = true;

    this.init(filePath);
  }

  init(filePath) {
    this.filePath = _formatFilePath(filePath);
    this.rootPath = path.resolve(
      MOCK_ROOT_PATH,
      this.mockDomain
    );
    this.absoluteFilePath = path.join(this.rootPath, _encodeNameForCharles(this.filePath))
    
    const { dir, name, ext } = path.parse(this.filePath)
    this.filename = name
    this.pathname = dir
    this.absoluteParentPath = path.join(this.rootPath, this.pathname)
    
    let statInfo = this.statFile(this.absoluteFilePath)
    this.isNotExist = !statInfo
    if (statInfo) {
      this.mtimeStr = moment(statInfo.mtime).format('YYYY-MM-DD hh:mm:ss')
      if (statInfo.isFile()) {
        this.isFile = true
        this.fileSize = statInfo.size
        this.fileSizeStr = formatByteSize(this.fileSize)
        this.editLink = '/admin?url=' + encodeURIComponent(this.filePath)
        this.filename += ext
      } else {
        this.filePath = this.filePath + '/'
        this.filename = name + '/'
      }
    }
  }

  readFile() {
    let data = fs.readFileSync(this.absoluteFilePath, {
      encoding: MockFile.ENCODING
    })
    return JSON.parse(data);
  }

  saveFile(data) {
    if (typeof data === "object") {
      data = JSON.stringify(data);
    }
    
    this.tryMkdir()

    fs.writeFileSync(this.absoluteFilePath, data, {
      encoding: MockFile.ENCODING,
    });
  }

  tryMkdir() {
    try {
      fs.mkdirSync(this.absoluteParentPath, { recursive: true})
    } catch (e) {
      if (e.code === "EEXIST") {
        // console.log(`mkdir error: exists ${this.absoluteParentPath}`);
      } else {
        throw e;
      }
    }
  }

  statFile() {
    if (fs.existsSync(this.absoluteFilePath)) {
      return fs.statSync(this.absoluteFilePath)
    }

    return null
  }

  readDirs() {
    return fs.readdirSync(this.absoluteFilePath)
  }

  mkdir() {
    return fs.mkdirSync(this.absoluteFilePath, { recursive: true})
  }
}

function _formatFilePath(filePath) {
  // filePath = _removeUnusedSlash(filePath);
  // filePath = _encodeNameForCharles(filePath);
  filePath = decodeURIComponent(filePath)

  return filePath;
}

function _removeUnusedSlash(filePath) {
  // req.path 至少含有一个 "/"，这里移除结尾 "/"
  filePath = filePath.replace(/\/$/, "");
  return filePath;
}

/**
 * 若存在参数，为了兼容 charles 保存的文件，需要把文件名称编码
 * @param {*} filePath
 * @returns
 */
function _encodeNameForCharles(filePath) {
  let urls = filePath.split("?");
  if (urls.length === 2) {
    filePath = urls[0] + encodeURIComponent("?" + urls[1]).toLowerCase();
  }
  return filePath
}

export default MockFile;
