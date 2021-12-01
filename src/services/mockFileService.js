import MockFile from "../models/MockFile.js";

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
}

export default MockFileService