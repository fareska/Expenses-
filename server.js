const express = require('express')
const app = express()
const api = require('./server/routes/api')
const Expense = require('./server/model/Expense')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expensesDB', {useNewUrlParser: true})


const data = require(`./data`)
data.forEach(d => {
    let e = new Expense ({
        name:  d.item,
        amount: d.amount,
        date:  d.date,
        group: d.group
    })
    e.save()
});


app.use('/', api)


const port = 4100
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})