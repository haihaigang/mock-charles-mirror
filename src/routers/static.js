import express from 'express'
import path from 'path'
import fs from 'fs'

const router = express.Router()

router.get('*', (req, res, next) => {
  res.sendFile(req.params[0], {
    root: path.resolve(process.cwd(), '../static')
  })
})

export default router
