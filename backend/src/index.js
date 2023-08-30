const express = require('express');

//solve cors issue
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000;
const Pool = require('pg').Pool;
  //Enter here your Postres database details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'node_react_project',
    password: 'postgres',
    dialect: 'postgres',
    port: 5432
});
  
  //Database connection and also please create postgres database first
pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})
  
//get all users
app.get('/get/users/all', (req, res, next) => {
    console.log("TEST DATA :");
    pool.query('Select * from users')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

//post req
app.post('/post/user', (req, res) => {
    const { email, name, password } = req.body;

    // Check if the required fields are present in the request body
    // if (!email || !name || !password) {
    //     return res.status(400).json({ message: 'All fields are required' });
    // }

    // Insert the new user into the "users" table
    pool.query('INSERT INTO users (email, name, password) VALUES ($1, $2, $3)', [email, name, password])
        .then(newUser => {
            res.status(201).json(newUser.rows[0]);
        })
        .catch(error => {
            console.error('Error adding user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

//get by id
app.get('/get/users/byId',(req,res,next) => {
    const userId = req.query.id;
    console.log("Fetching user data for id:", userId);
    pool.query('Select * from users where id = $1', [userId])
    .then(userData => {
        console.log(userData);
        if(userData.rows.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(userData.rows[0]);
        }
    })
    .catch(error =>{
        console.log("Error fetching the client data :",error);
        res.status(500).send("Internal Server Error");
    })
})

//get user data by name or username (for filter feature)
app.get('/get/users/byName',(req,res,next) => {
    const Username = req.query.username;
    console.log("Fetching user data for name:", Username);
    pool.query('Select * from users where username = $1', [Username])
    .then(userData => {
        // console.log(userData);
        if(userData.rows.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(userData.rows[0]);
            console.log('Successfully fetched user data')
        }
    })
    .catch(error => {
        console.log("Error fetching the client data : ", error);
        res.status(500).send("Internal Server Error");
    })
});

//get user data by dept name (for filter feature)
// app.get('/get/users/byDept',(req,res) => {
//     const Dept = req.query.dept;
//     console.log("Fetching user data for the dept : ", Dept);
//     pool.query('Select * from users where dept = $1', [Dept])
//     .then(userData => {
//         if(userData.rows.length === 0){
//             res.status(404).send("user not found");
//         }
//         else{
//             res.send(userData.rows);
//             console.log('Successfully fetched user data')
//         }
//     })
//     .catch(error => {
//         console.log("Error fetching the client data : ", error);
//         res.status(500).send("Internal server error");
//     })
// })

//login request
// In your Node.js backend (app.js or a dedicated route file)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Check if the email and password match a user in the database
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
      .then(result => {
        if (result.rows.length === 0) {
          // No user found with the provided email and password
          res.status(401).json({ message: 'Authentication failed' });
        } else {
          // User authenticated successfully
          res.status(200).json({ message: 'Authentication successful', user: result.rows[0] });
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
  

app.listen(port, () => {
  console.log(`React-Node App is running on port ${port}.`);
});