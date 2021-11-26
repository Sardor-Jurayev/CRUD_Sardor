// console.log('May node be with you')

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient





// MONGODB //


MongoClient.connect('mongodb://127.0.0.1:27017', {
    useUnifiedTopology: true})
    .then(client => {
console.log('Connected to Database')


    const db = client.db('War-stars')
    const quotesCollection = db.collection('quotes')




    app.use(bodyParser.urlencoded({ extended: true}))
    app.use(bodyParser.json())
    app.use(express.static('public'))




     app.get('/', (req, res) => {
        res.sendFile('/Users/sardor.jurayev/Documents/nodeJS/index.html');



            // res.render(view, locals)
     })
 
    app.post('/quotes', (req, res) => {

        quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))

        quotesCollection.findOne({'name':req.body.name, 'quote':req.body.quote})
        .then(resulta => {
            console.log(resulta)
            })
            .catch(error => console.error(error))
    })

    app.post('/update', (req,res)=>{
        console.log(req.body)
        res.redirect('/')
        quotesCollection.updateOne({'name':req.body.name},{$set: {quote:req.body.quote}})
        .then(resultat => {
            console.log(resultat)
        })
        .catch(error => console.error(error))
    })

    app.post('/delet', (req,res)=>{
        console.log(req.body)
        res.redirect('/')
        quotesCollection.deleteOne({'name':req.body.name})
        .then(resultat => {
            console.log(resultat)
        })
        .catch(error => console.error(error))
    })


    app.listen(3000, function() {
        console.log('listening on 3000')
    })

})
.catch(console.error)

