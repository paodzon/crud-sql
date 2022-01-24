const express =require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type , Authorization');
    next();
})
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database: 'nodemysql'
})


db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('My SQL IS CONNECTED')
})

app.get('/createdb' , (req, res,next) =>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('database created');
    })
})

//CREATE TABLE
app.get('/poststable',(req,res,next) =>{
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';

    db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('POSTS TABLE CREATED');
    })
})


//INSERT POST
app.post('/addpost', (req, res,next)=>{
    const title = req.body.title;
    const body = req.body.body

    const post = {title,body}

    let sql = 'INSERT INTO posts SET ?';
    db.query(sql, post, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send({message:'POST ADDED'})
    })
})


//GET POSTS 
app.get('/getposts', (req,res,next)=>{
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) =>{
        if(err) throw err;
        console.log(results);
        res.send({posts: results})
    })
})

//GET POST
app.get('/getpost/:id', (req,res,next) =>{
    let sql = `SELECT * FROM posts WHERE id =${req.params.id}`;
    db.query(sql, (err,result) =>{
        if(err) throw err;
        res.send(...result);
    })
})

//DELETE POST 
app.delete('/deletepost/:id', (req,res,next) =>{
    let sql = `DELETE FROM posts WHERE id=${req.params.id}`
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.send('DELETE POST')
    })
})

app.post('/updatepost/:id', (req, res, next) =>{

    const title = req.body.title;
    const body = req.body.body;

    const updatedPost = {title,body}
    const sql =`UPDATE posts SET ? WHERE id=${req.params.id}`
    db.query(sql, updatedPost, (err, result) =>{
        if(err) throw err;
        console.log(result)
        res.send('UPDATED POST')
    })


})

app.listen(8080);