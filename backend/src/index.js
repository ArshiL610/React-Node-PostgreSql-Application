const express = require('express');
// encrypting password imports
const bcrypt = require('bcrypt');
const { hashPassword, verifyPassword } = require('./passwordUtils');

// nodemailer package import for email sending feature
const nodemailer = require('nodemailer');
// const randomstring = require('randomstring');

//solve cors issue import
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());   // for cross origin permission

const port = 5000;
const Pool = require('pg').Pool;

//Enter here your Postres database details
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'node_react_project',
    password: 'Arshil@2001',
    dialect: 'postgres',
    port: 5432
});
  
  //Database connection 
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

//post req for signup and email trigger upon signup
app.post('/post/user', async (req, res) => {
    const { email, name, password } = req.body;
    const hashedPassword = await hashPassword(password);

    //transporter with email service
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'focusflow244@gmail.com',
        pass: 'injhzqgiyoqecpzu',
      },
    });

    const mailOptions = {
      from: 'focusflow244@gmail.com',
      to: email,
      subject: 'Welcome to Focus Flow - Your Note-Taking Companion!',
      text: `Dear ${name},
  
Welcome to Focus Flow, your new note-taking companion. We're delighted that you've joined our community of note-takers who value organization, productivity, and the power of well-structured notes.

Focus Flow is here to help you capture ideas, organize your thoughts, and keep track of important information. Whether you're a student, a professional, or just someone looking to make your life more organized, our platform is designed with you in mind.

Here's what Focus Flow has to offer:
- Seamless note creation and management
- Customizable features that adapt to your unique needs
- A clutter-free workspace to spark your creativity

Now, go ahead and start creating notes that will keep you at the top of your game. Should you ever have questions or need assistance, our support team is always here to help.

Thank you for choosing Focus Flow as your note-taking ally. Let's turn your thoughts into actionable insights and make note-taking an enjoyable experience!

Warm regards,
The Focus Flow Team`,
    };

    // Insert the new user into the "users" table
    pool.query('INSERT INTO users (email, name, password) VALUES ($1, $2, $3)', [email, name, hashedPassword])
        .then(newUser => {
            res.status(201).json(newUser.rows[0]);
            transporter.sendMail(mailOptions, (error, info) => {
              if(error){
                console.log(error);
                res.status(500).json({ message: 'Failed to send welcome email' });
              }
              else{
                console.log('Welcome Email sent: ' + info.response);
                res.status(200).json({ message: 'Welcome email sent successfully'});
              }
            })
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

//get user data by name 
app.get('/get/users/byName',(req,res,next) => {
    const name = req.query.name;
    console.log("Fetching user data for name:", name);
    pool.query('Select * from users where name = $1', [name])
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

app.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  // Retrieve the user's hashed password from the database
  pool.query('SELECT * FROM users WHERE email = $1', [email])
    .then(result => {
      if (result.rows.length === 0) {
        // No user found with the provided email
        res.status(401).json({ message: 'Authentication failed' });
      } else {
        // Compare the provided password with the hashed password
        const hashedPassword = result.rows[0].password;
        verifyPassword(password, hashedPassword)
          .then((passwordsMatch) => {
            if (passwordsMatch) {
              // User authenticated successfully
              console.log(result.rows[0])
              res.status(200).json({ message: 'Authentication successful', user: result.rows[0] });
            } else {
              // Passwords do not match
              res.status(401).json({ message: 'Authentication failed' });
            }
          })
          .catch(error => {
            console.error('Error during password verification:', error);
            res.status(500).json({ message: 'Internal Server Error' });
          });
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

  
//data insertion into 'tasks' table
app.post('/add/task',(req,res) => {
    const {email, name, task} = req.body;
    //insert query
    pool.query(`INSERT INTO tasks (email, name, task) values ($1, $2, $3)`, [email, name, task])
    .then(newTask => {
        res.status(201).json(newTask.rows[0]);
    })
    .catch(error => {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    })
})

//data retrieval from 'tasks' based on name
app.get('/get/tasks/byName',(req,res) => {
    const name = req.query.name;
    console.log("Fetching tasks for name:", name);
    pool.query('Select * from tasks where name = $1', [name])
    .then(taskData => {
        if(taskData.rows.length === 0){
            res.status(404).send("User not found");
        }
        else{
            res.send(taskData.rows);
            console.log('Successfully fetched tasks data')
        }
    })
    .catch(error => {
        console.log("Error fetching the tasks data : ", error);
        res.status(500).send("Internal Server Error");
    })
});

//updating data based on name and existing task values
app.put('/update/task', (req, res) => {
    const { name, task, newTask } = req.body;
    // Update query
    pool.query(
      'UPDATE tasks SET task = $1 WHERE name = $2 AND task = $3',
      [newTask, name, task]
    )
      .then(updatedTask => {
        if (updatedTask.rowCount === 0) {
          res.status(404).json({ message: 'Task not found or task does not match' });
        } else {
          res.json({ message: 'Task updated successfully' });
        }
      })
      .catch(error => {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });

//updating task data based on name and existing status value
app.put('/update/task/status', (req, res) => {
    const { name, task, status } = req.body;
    // Update query
    pool.query(
      'UPDATE tasks SET status = $1 WHERE name = $2 AND task = $3',
      [status, name, task]
    )
      .then(updatedTask => {
        if (updatedTask.rowCount === 0) {
          res.status(404).json({ message: 'Task not found or task does not match' });
        } else {
          res.json({ message: 'Status of task updated successfully' });
        }
      })
      .catch(error => {
        console.error('Error updating status of task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
  
//delete data from tasks table
app.delete('/delete/task', (req,res) => {
    const {name, task} = req.body;
    //query
    pool.query('DELETE from tasks where task = $1 and name = $2', [task,name])
    .then(() => {
        res.status(204).json({ message: 'Task deleted successfully' });
        console.log('Task deleted for name:', name);
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
})


// otp-sending feature via email
app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  // Generating a random OTP with numbers only
  const otpLength = 6;
  const otp = generateRandomNumericOTP(otpLength);

  // Creating a transporter with the email service
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'focusflow244@gmail.com',
      pass: 'injhzqgiyoqecpzu',
    },
  });

  const mailOptions = {
    from: 'focusflow244@gmail.com',
    to: email,
    subject: 'OTP for Password Reset',
    text: `Your OTP for password reset is: ${otp}`,
  };

  pool.query('INSERT INTO otp (email, otp) VALUES ($1, $2) RETURNING id', [email, otp])
    .then(result => {
      const otpId = result.rows[0].id;
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).json({ message: 'Failed to send OTP' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ message: 'OTP sent successfully', otpId });
        }
      });
    })
    .catch(error => {
      console.error('Error generating OTP and saving to database:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

// Function to generate a random numeric OTP
function generateRandomNumericOTP(length) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}


// otp-verifying feature
app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Query the OTP table to find a matching OTP
  pool.query('SELECT id FROM otp WHERE email = $1 AND otp = $2', [email, otp])
    .then(result => {
      if (result.rows.length > 0) {
        // If a matching OTP is found, you can consider it verified
        // Optionally, you can also delete the OTP record from the table to prevent multiple verifications
        const otpId = result.rows[0].id;
        pool.query('DELETE FROM otp WHERE id = $1', [otpId])
          .then(() => {
            res.status(200).json({ message: 'OTP verified' });
          })
          .catch(error => {
            console.error('Error deleting OTP record:', error);
            res.status(500).json({ message: 'Internal Server Error' });
          });
      } else {
        res.status(401).json({ message: 'Invalid OTP' });
      }
    })
    .catch(error => {
      console.error('Error verifying OTP:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});


//reset password feature
app.put('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  //transporter with email service
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'focusflow244@gmail.com',
      pass: 'injhzqgiyoqecpzu',
    },
  });

  try {
    const mailOptions = {
      from: 'focusflow244@gmail.com',
      to: email,
      subject: 'Password Update Notification - Focus Flow',
      text: `Dear User,
    
This is a notification from Focus Flow regarding your account.
    
We want to inform you that your password has been successfully updated. If you initiated this change, you can disregard this message. However, if you did not make this change, please contact our support team immediately.
    
Remember to keep your password secure and do not share it with anyone. If you have any concerns or questions, feel free to reach out to our support team.
    
Thank you for using Focus Flow for your note-taking needs.
    
Best regards,
The Focus Flow Team`,
    };
    
    // hashing the new password before storing it in the database
    const hashedNewPassword = await hashPassword(password);

    // Updating the user's password in the database-table 'users'
    pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedNewPassword, email])
      .then(updatedUser => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (updatedUser.rowCount === 0) {
            res.status(404).json({ message: 'User not found' });
          } else {
            res.status(200).json({ message: 'Password reset successful' });
            res.status(200).json({ message: 'Update email sent successfully'});
          }
        })
      })
      .catch(error => {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  } 
  catch (error) {
    console.error('Error hashing the new password:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//data insertion in the 'reviews' table for the ratings feature
app.post('/addReview/reviews',(req,res) => {
  const {rating, name, email, feedback} = req.body;
  //insert query
  pool.query(`INSERT INTO reviews (rating, name, email, feedback) VALUES ($1, $2, $3, $4)`, [rating, name, email, feedback])
  .then(newReview => {
    res.status(201).json(newReview.rows[0]);
  })
  .catch(error => {
    console.error('Error adding review: ',error);
    res.status(500).json({message: 'Internal Server Error'});
  })
}); 


app.listen(port, () => {
  console.log(`React-Node App is running on port ${port}.`);
});