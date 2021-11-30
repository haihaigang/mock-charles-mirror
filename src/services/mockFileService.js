import path from "path"
const MOCK_ROOT_PATH = "../mock";

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