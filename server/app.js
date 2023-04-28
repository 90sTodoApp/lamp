const express = require('express')
const app = express()
const PORT = 3000
var path=require('path')

const router = require('./routes/toDoRoutes')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(router)

app.listen(PORT, () => {
    console.log(`LAMP is running on port ${PORT}`)
})