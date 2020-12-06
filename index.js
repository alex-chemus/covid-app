const express = require('express')
const app = express()

const PORT = process.env.PORT || 80;

app.use( express.static('dist') )

app.get('', (req, res) => {
    res.sendFile('./dist/index.html')
    res.end()
})

app.listen(PORT, () => {
    console.log('Server has been started')
})