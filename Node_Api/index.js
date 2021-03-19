const express = require('express')//npm install express
const app =express()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/jobhunt'; 
mongoose.connect(dbUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database connected");
});
mongoose.set('useFindAndModify', false);

app.use('/company', require('./routes/company'))

const PORT =  4000;
app.listen(PORT, () =>    {
    console.log(`Listening to port ${PORT}`)
});