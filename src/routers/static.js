import express from 'express'
import path from 'path'
import fs from 'fs'
import { STATIC_ROOT_PATH } from '../constant/root-paths.js'

const router = express.Router()

router.get('*', (req, res, next) => {
  res.sendFile(req.params[0], {
    root: STATIC_ROOT_PATH
  })
})

export default router
