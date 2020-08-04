const express = require('express');
var router = express.Router();
const path = require('path');

const app = express();
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000;

app.use(express.static(__dirname+'/build'));

app.get('*',function(req,res){
    res.redirect('/')
});

app.listen(port, () => console.log(`Servidor corriendo en el puerto: ${host}:${port}`))