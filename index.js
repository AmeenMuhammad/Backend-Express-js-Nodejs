//const express = require('express');
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const app = express();
const PORT = process.env.PORT || 3000;
//const path = require('path');

dotenv.config();  // Load variables from .env
const port = process.env.PORT;
const dbHost = process.env.DB_HOST;

//const UserRoute = require('./routes/users');
//const { console } = require('inspector');
//const { send } = require('process');

//const axios = require('axios');

//Middleware
app.use(express.json());

//app.use('/id/users', UserRoute);

//Basic Route
// ===================================================================

const apiPath = "/api/users"
app.get(apiPath, (req, res) => {
  res.json({ 
    name: 'Anas',
    email: 'alihasnain@gmail.com',
    age: 20,
    city: 'Karachi',
    country: 'Pakistan'
  });
});

const myChoriApi = "/ali-self-medication";
const url = "https://apidb.dvago.pk/AppAPIV3/GetProductBannersBySlugV1&Slug=AppHomePageProductCarouselOne&BranchCode=48&ProductID=&limit=0,10";

  
app.get(myChoriApi, async (req, res) => {

const response = await axios.get(url);
  
  res.json({
    message: "Chori retrieved successfully",
    myChori: response.data
  });
});

const myJson = "/json-api";
const data = [
  {
    id: 1,
    name: 'Anas',
    email: 'anas@gmail.com',
  },
  {
    id: 2,
    name: 'Ali',
    email: 'ali@gmail.com',
  },
  {
    id: 3,
    name: 'Ahmed',
    email: 'ahmed@gmail.com',
  }
]
app.get(myJson, (req, res) => {
  res.json(
  {
    message: "Users retrieved successfully",
    myUsers: data
  }
  );
});

app.post(myJson, (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
        error: "Missing required fields"
      });
    }
    
    const newUser = {
      id: data.length + 1,
      name: name,
      email: email
    };
    
    // Add to data array
    data.push(newUser);
    
    res.status(201).json({
      message: "User added successfully",
      newUser: newUser,
      totalUsers: data.length
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Error adding user",
      error: error.message
    });
  }
});

app.put(`${myJson}/:id`, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    
    // Find user by ID
    const userIndex = data.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
        error: "User with this ID does not exist"
      });
    }
    
    if (!name || !email) {
      return res.status(400).json({
        message: "PUT requires all fields (name and email)",
        error: "Missing required fields for complete resource replacement",
        note: "PUT replaces the entire resource, so all fields are required"
      });
    }
    
    // Replace the entire user object
    const updatedUser = {
      id: userId,
      name: name,
      email: email
    };
    
    data[userIndex] = updatedUser;
    
    res.json({
      message: "User completely replaced (PUT)",
      updatedUser: updatedUser,
      note: "PUT replaced the entire resource with new data"
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message
    });
  }
});

app.patch(`${myJson}/:id`, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    
    // Find user by ID
    const userIndex = data.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
        error: "User with this ID does not exist"
      });
    }
    
    if (!name && !email) {
      return res.status(400).json({
        message: "PATCH requires at least one field to update",
        error: "No fields provided for update",
        note: "PATCH allows partial updates, so at least one field should be provided"
      });
    }
    
    // Get current user data
    const currentUser = data[userIndex];
    
    const updatedUser = {
      ...currentUser,
      ...(name && { name: name }),
      ...(email && { email: email })
    };
    
    data[userIndex] = updatedUser;
    
    res.json({
      message: "User partially updated (PATCH)",
      updatedUser: updatedUser,
      changes: {
        name: name ? `Changed from "${currentUser.name}" to "${name}"` : "No change",
        email: email ? `Changed from "${currentUser.email}" to "${email}"` : "No change"
      },
      note: "PATCH updated only the provided fields, keeping other fields unchanged"
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message
    });
  }
});


//=================================================================

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

//module.exports = app;