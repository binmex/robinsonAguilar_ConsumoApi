const express = require('express')
const path = require('path')

const app = express();
const PORT = 3000

//midelware
app.use(express.json())
app.use(express.static(path.join(__dirname,'./public')))

//enrutamiento
app.use("/",require('./routes/route'))


app.listen(PORT,()=>console.log(`server ready at ${PORT}`))