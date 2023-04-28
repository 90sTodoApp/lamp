const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')


app.get('/',(req,res) => {
    res.render('home.ejs')

})

app.listen(PORT, () => {
    console.log(`LAMP is running on port ${PORT}`)
})