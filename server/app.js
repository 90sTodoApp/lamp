const express = require('express')
const app = express()
const PORT = 3000

const routes = 
app.get('/',(req,res) => {
    res.json('Home Page')

})

app.listen(PORT, () => {
    console.log(`LAMP is running on port ${PORT}`)
})