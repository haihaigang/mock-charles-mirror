import express from "express"
const router = express.Router()

router.use((req, res, next) => {
  console.log('admin middleware')
  next()
})

router.all('/admin', (req, res, next) => {
  console.log('admin')
  res.end('admin')
})

export default router