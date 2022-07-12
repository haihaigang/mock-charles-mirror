import ForwardApiService from "./ForwardApiService.js"
import SaveFileQueueService from "./SaveFileQueueService.js"

class ForwardAndSaveFileService {
  constructor(mockDomain, req) {
    this.mockDomain = mockDomain
    this.req = req
  }

  async start() {
    let forwardApiService = new ForwardApiService(this.mockDomain, this.req)
    let resData = await forwardApiService.send()
    if (!resData.status) {
      SaveFileQueueService.append(this.mockDomain, this.req.originalUrl, resData)
    }
    return resData
  }
}

export default ForwardAndSaveFileService