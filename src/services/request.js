/**
 *
 * @desc 请求底层封装
 * @date 2019-03-12
 *
 */

import axios from 'axios'

class Request {
  constructor() {}

  async axios(options) {
    try {
      const res = await axios(options)
      return res.data
    } catch (err) {
      throw err
    }
  }

}

export default Request
