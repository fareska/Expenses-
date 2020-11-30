const express = require('express')
const { get } = require('mongoose')
const router = express.Router()

const Expense = require('../model/Expense')

router.get('/expenses', function(req, res){
    Expense.find({})
    .sort({date: -1})
    .exec(function(err, data){
        console.log(err)
        res.send(data)
    })  
})

router.post('/expense', function(req, res){
    const getExpense = req.body
    const e = new Expense(getExpense)
    e.save()
    // const e = new Expense({
    //     name: getExpense.name,
    //     amount: getExpense.amount,
    //     group: getExpense.group,
    //     date: getExpense.date||   
    // })
    res.send('Expense saved')
})

router.put('/update', function(req, res){
    const getUpdate =req.body
    getUpdate.group1
    getUpdate.group2
    Expense.findOneAndUpdate({group:getUpdate.group1}, {group:getUpdate.group2}, function(err, e){
        res.send(`The group of the expense ${e.name} has been changed from ${e.group}
        to ${getUpdate.group2}`)
    })
})

// router.put('/update', function(req, res){

// })

module.exports = router