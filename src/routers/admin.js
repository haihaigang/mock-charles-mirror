import express from "express"
import fs from "fs"
import path from "path"

const router = express.Router()
const VIEWS_NAME_ADMIN = 'admin'

router.use((req, res, next) => {
  console.log('admin middleware')
  next()
})

router.all('/', (req, res, next) => {
  res.render(VIEWS_NAME_ADMIN);
})

router.get('/getApi', (req, res, next) => {
  let { url } = req.query
  if (!url) throw new Error('参数错误，缺少参数 url')

  let urls = url.split("?")
  if (urls.length === 2) {
    // 若存在参数，为了兼容 charles 保存的文件，需要把文件名称编码
    url = urls[0] + encodeURIComponent("?" +urls[1]).toLowerCase()
  }
  let filePath = path.resolve(getMockFileRootPath(res), url)
  try{
    let data = readFile(filePath)
    res.json(JSON.parse(data));
  } catch(e) {
    if (e.code === 'ENOENT') {
      throw e
    }
    console.error(e)
  }
})

router.post('/saveApi', (req, res, next) => {
  const { url, content} = req.body
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

  let filePath = path.resolve(getMockFileRootPath(res), url)
  let pathname = filePath.split('/').slice(0,-1).join('/')
  
  try {
    fs.mkdirSync(pathname)
  } catch(e) {
    if (e.code === 'EEXIST') {
      console.log(`mkdir error: exists ${pathname}`)
    } else {
      throw e
    }
  }
  save(filePath, content)
  res.json({})
})

const MOCK_ROOT_PATH = "../mock";
function getMockFileRootPath(res) {
  return path.resolve(process.cwd(), MOCK_ROOT_PATH, res.locals.mockDomain || "");
}


function save(filePath, data) {
  fs.writeFileSync(filePath, data)
}

function readFile(mockFilePath) {
  return fs.readFileSync(mockFilePath, { encoding: "utf-8" });
}

export default router