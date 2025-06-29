const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

const UserRoute = require('./routes/users');
const { console } = require('inspector');
const { send } = require('process');

//Middleware
app.use(express.json());

app.use('/id/users', UserRoute);

//Basic Route

app.get('/', (req, res)=>{

    res.json({
        message: 'Hello World 424',
        name: 'Ameen Muhammad',
        email: 'ameenmuhammadjat@gmail.com',
        address: 'karachi'
    });
});

// multiple name id age , use array 

app.get('/itm.txt', (req, res) => {
    
    const user = [
        {
            id: 1,
            name: "Ameen",
            email: "ameen@gmail.com",
            address: "Karachi"
        },{
            id: 2,
            name: "Ali",
            email: "ali@gmail.com",
            address: "Badin"
        },
        {
            id: 3,
            name: "Sarfraz",
            email: "sarfraz@gmail.com",
            address: "Badin"
        },
        {
            id: 4,
            name: "sansar",
            eamil: "sansar@gmail.com",
            address: "Badin"
        }
    ]
    
    //res.json(user);
    // uase jasonp = json with padding

    res.jsonp(user);
});
// use method redirct file open 
app.get('/page.txt' , (req, res)=>{
    res.redirect(301,'https://www.google.com');
});

app.get('/demo.txt', (req, res) => {
    res.send(" Page Demo");
});

app.get('/demo/:id', (req, res) => {
    res.send(req.params);
});

app.get('/user/:userid-:bookid', (req, res) =>{
    res.send(req.params);
});

app.get('/search', (req, res) => {
    res.send(req.query);
});

app.set('view engine', 'ejs');      // enging template ejs , view html files

app.use(express.json()) // json file serve
app.use(express.urlencoded({extends: false}));

app.get('/post/:userid', (req, res) => { // send request for post man body
    //res.send(req.body); // request send post man body json format

    // use localhost broser data show , method 
    //res.send(req.hostname); // use data send localhost broswer display
    //res.send(req.ips) // (ip) or (ips) use for ip addreess find on , server run only
    //res.send(req.method); // find use method , get , post , put , delete
    //res.send(req.originalUrl); // find use route name url , eg, me use '/post'  
    //res.send(req.path) // use for only route name , can't other value
    //res.send(req.protocol) // use for protocol find
    //res.send(req.secure) // find url secure not secure , find boolean value true or  false 
    res.send(req.route) // use complete detaile route name, path, method
});
 // complete parameters 
 // use for methosd first method html accept yes no 

app.get('/method', (req, res) => {
    if (req.accepts('html')) {
        res.send("<h1> Hello HTML Code Well come node js programming </h1>");
    }else if(req.accepts('json')){
        //res.send("<h2> Hello JSON formt code </h2>");
        res.send({message: 'Hello JSON use message function keyword'});
    }
    else if(req.accepts('xml')){
        res.send("<meeage> Hello XML format code </message> ");
    }
    else{
        res.send("error can't support method");
    }
});

 app.set('views', path.join(__dirname, 'views'));

app.get('/safe', (req, res) => {
    res.render('user');      // redirect use htlm file exicute
});

app.get('/download', (req, res)=> {
    
    //res.download('./files/1st semestr.pdf', 'Document.pdf'); // download
    // use sendfile method

    res.sendFile(__dirname + '/files/download.jpg');
});

// error route file code 404 display 

// app.get('/error.txt', (res, req)=> {
//     res.statusCode(404);
// })
// second method only alow varaible decalear value serch on url brwoser

app.get('/itm', (req, res) =>{
    
    const name = req.query.name
    const email = req.query.email
    const age = req.query.age

    res.send(`Serch result Name: ${name}, Email: ${email} , Age: ${age}`);
});
 
/// status coded error 404 => not found, 301 = > permentent file, 302 => temporary file 

app.get('/error', (req, res)=> {
    res.status(404);
});

// header check respomse send 

app.get('/header', (req, res)=> {

    //res.send(req.headers); // use full detail route , hot name , path, connectoin , 
    //res.send(req.headers.host); // use only host name , eq localhost:3000 e.t.c
    //res.send(req.get("Host")); // use only host name localhost:3000
    //res.send(req.get ("connection")); // ceck for connecction live or not live 
    res.send(req.get("Accept")); // use html https detail find 
    // console.console.log(res.headersSent);
    // res.send("wellcome node js code");
    // console.log(res.headersSent);
});

// use method condition statmwnt last method 
// use only post method can't suport get
app.post('/format', (req, res) => {
    if (req.is('application/json')) {
        res.send("valid json format code")
    } else if(req.is('text/html')){
        res.send("valid html format code");
    } else{
        res.status(400).send("error can't supported content type");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port locahal host 300  ${PORT}`);
});

module.exports = app;