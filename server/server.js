const express= require('express')
const app = express();
const PORT = process.env.PORT || 8080;
const { sequelize } = require ('./db')

const router = require('./routes/toDoRoutes')

//const models = require("./server/models")

// setting up sequilze with MySql
//const env = require('dotenv').config()

app.use(router)
app.use(express.json())

//app.use("/chat/messages", messageRoute)
//app.use("/chat/auth", userRoute)


app.listen(PORT, () => {
sequelize.sync(
  {force: false}
);
  console.log("Server is ruuning on port" + PORT)
})                    