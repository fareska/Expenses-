const express = require('express')
const router = express.Router()
const moment = require('moment')

const Expense = require('../model/Expense')

router.get('/expenses', function(req, res){
    const start = moment(req.query.d1).format()
    const end = moment(req.query.d2).format()
    if(req.query.d1){
        if(req.query.d2){
            Expense.find(
                {$and:[
                    {date: {$lt:end}},
                    {date: {$gt:start}}
                ]}
            ).sort({date: -1}).exec(function(err, expenses){res.send(expenses)})
        }else{
            Expense.find({date: {$gt:start}})
            .sort({date: -1})
            .exec(function(err, expenses){res.send(expenses)})
        }
    }else{
        Expense.find({})
        .sort({date: -1})
        .exec(function(err, data){
            console.log(err)
            res.send(data)
        })  
    }
})

router.post('/expense', function(req, res){
    const getExpense = req.body
    const e = new Expense(getExpense)
    e.save()
    // const e = new Expense({ /// option 2 -- don't know witch one is better practice
    //     name: getExpense.name,
    //     amount: getExpense.amount,
    //     group: getExpense.group,
    //     date: getExpense.date|| moment().format()   
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

router.get('/expenses/:group', function(req, res){
    const group = req.params.group
    const check = req.query.total
    if (check === "true"){
        Expense.aggregate([
            {$match:{group: group}},
            {$group:{ _id: group, total:{$sum:"$amount"}}  }
        ])
        .exec(function(err, theSum){
            res.send(theSum)
        })
    } else{
        Expense.find({group: group}, function(err, expenses){
            res.send(expenses)
        })
    }
})

module.exports = router