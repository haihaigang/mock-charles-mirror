import express from 'express'
import ForwardOpenConfig from '../config/ForwardOpenConfig.js'

const router = express.Router()

router.get('/getForwardOpen', (req, res, next) => {
  let status = ForwardOpenConfig.isOpen()
  res.json(status)
})

router.post('/toggleForwardOpen', (req, res, next) => {
  ForwardOpenConfig.isOpen() ? ForwardOpenConfig.close() : ForwardOpenConfig.open()
  res.json(ForwardOpenConfig.isOpen())
})

export default router
