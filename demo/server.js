'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const combo = require('../').combo

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
    res.end(fs.readFileSync(path.join(__dirname, './test.html')))
  } else {
    const match = req.url.match(/query=([^&]+)/)
    let query
    if (match) {
      query = decodeURIComponent(match[1])
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
      combo(query, res, req)
    } else {
      res.end('')
    }
  }
})

// http://localhost:3000/?query=[UserInfo(%7B%20%22uin%22%3A%200%20%7D)%2CUserInfo(%7B%20%22uin%22%3A%20123%20%7D)]
server.listen(3000, () => {
  console.log('just try: http://localhost:3000/?query=[UserInfo(%7B%20%22uin%22%3A%200%20%7D)%2CUserInfo(%7B%20%22uin%22%3A%20123%20%7D)]')
})
