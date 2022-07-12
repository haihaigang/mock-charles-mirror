import path from "path"
import fs from "fs"
import MockFile from "../models/MockFile.js"

/**
 * 保存文件队列的服务，拦截转发的接口内容按接口路由存储文件
 */
class SaveFileQueueService {
  queue = []

  append(mockDomain, originalUrl, data) {
    this.queue.push({
      mockDomain,
      originalUrl,
      data
    })

    if (!this.isDoing) {
      this.start()
    }
  }

  start() {
    while (true) {
      let data = this.queue.shift()
      if (!data) {
        this.isDoing = false
        break
      }

      this.isDoing = true
      this.saveFile(data)
    }
  }

  saveFile({ mockDomain, originalUrl, data }) {
    let mockFile = new MockFile(mockDomain, originalUrl)
    mockFile.saveFile(data)
    console.log('success save file', mockFile.absoluteFilePath)
  }
}

export default new SaveFileQueueService()