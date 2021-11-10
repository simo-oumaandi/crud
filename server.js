const express = require('express')
const path = require('path')
const mongooose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const userSchema = mongooose.Schema({
    name: String,
    age: Number
})
const User = mongooose.model('user', userSchema)



app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

const uri = 'mongodb://localhost:27017/testDB'
app.post('/', bodyParser.urlencoded({ extends: true }), (req, res) => {
    mongooose.connect(uri, (err) => {
        let newUser = new User({
            name: req.body.name,
            age: req.body.age
        })
        newUser.save((err, result) => {
            console.log(result)
            mongooose.disconnect()
            res.redirect('/')
        })
    })
})


app.listen(8080, () => console.log('Server Running !'))

