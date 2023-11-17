import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {toast} from 'react-toastify';
import axios from 'axios';

const RatingFeature = () => {
  const [userRating, setUserRating] = useState(0);
  const [openRatingModal, setOpenRatingModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (newValue) => {
    setUserRating(newValue);
    setOpenRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setOpenRatingModal(false);
  };

  const handleFeedbackSubmit = async () => {
    // console.log(`Name: ${name}, Email: ${email}, Feedback: ${feedback}, Rating: ${userRating}`);
    try {
      const reviewData = {
        rating : userRating,
        name   : name,
        email : email,
        feedback : feedback,
      }

      const response = await axios.post(`https://focusflowbackend.netlify.app/addReview/reviews`, reviewData);
      if(response.status === 201){
        setUserRating(0);
        setName('');
        setEmail('');
        setFeedback('');
        toast.success('Feedback sent successfully');
        setOpenRatingModal(false);
      }
      else{
        toast.info('Could not send feedback, try again');
      }
    }

    catch(error) {
      toast.warning('Error sending feedback, try again later');
    }


  };

  return (
    <>
      <div>
        We would love an honest rating :) {' '}
        <span style={{ cursor: 'pointer' }} onClick={() => handleRatingChange(0)}>
          <b style={{color:'orange'}}>Rate here!</b>
        </span>
      </div>

      <Dialog open={openRatingModal} onClose={handleCloseRatingModal}>
        <DialogTitle align='center'>Rate your experience</DialogTitle>
        <DialogContent>
          <Rating
            name="user-rating"
            value={userRating}
            onChange={(event, newValue) => handleRatingChange(newValue)}
            sx={{ml:25}}
            size='large'
          />
          <TextField
            required
            size='small'
            label="Your Name"
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            required
            size='small'
            label="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Feedback"
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            margin="dense"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackSubmit}>Submit</Button>
          <Button onClick={handleCloseRatingModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RatingFeature;
