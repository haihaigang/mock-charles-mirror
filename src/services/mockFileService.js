import MockFile from "../models/MockFile.js";
import path from 'path'

class MockFileService {
  constructor(mockDomain, filePath) {
    this.file = new MockFile(mockDomain, filePath)
  }
  
  readFile() {
    return this.file.readFile()
  }

  saveFile(data) {
    return this.file.saveFile(data)
  }

  readDirs() {
    let files = this.file.readDirs()
    return files.filter(file => !file.startsWith('.')).map(file => {
      return new MockFile(this.file.mockDomain, path.join(this.file.filePath, file))
    })
  }

  getParentDir() {
    let filename = '../'
    return {
      filename,
      filePath: path.join(this.file.filePath, filename),
      isFile: false,
      fileSize: 0,
      editLink: ''
    }
  }

  isNotExist() {
    return this.file.isNotExist
  }

  isFile() {
    return this.file.isFile
  }
}

export default MockFileService