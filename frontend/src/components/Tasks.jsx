import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Navbar from "./Navbar";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';



const Tasks = () => {

  const {name} = useParams();
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [newTask, setNewTask] = useState('');   //add task feature
  const [open, setOpen] = useState(false);          //add task feature
  const [editTask, setEditTask] = useState('');       //edit feature
  const [editOpen, setEditOpen] = useState(false);    //edit feature
  const [taskToEdit, setTaskToEdit] = useState(null);   //edit feature
  const [tasks, setTasks] = useState([]);   //task rendering feature
  const [completedTasks, setCompletedTasks] = useState([]);   //check icon feature
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);    //delete feature
  const [taskToDelete, setTaskToDelete] = useState(null);   //delete feature
  const [instructionOpen, setInstructionOpen] = useState(false)   // instruction feature


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://focusflowbackend.netlify.app/get/users/byName?name=${name}`);
        const userEmail = response.data.email;
        setLoggedInEmail(userEmail);
      }
      catch(error){
        toast.error('Error fetching corresponding user data')
      }
    }

    const fetchTaskData = async () => {
      try{
        const tasks_fetch = await axios.get(`https://focusflowbackend.netlify.app/get/tasks/byName?name=${name}`);
        // console.log('Fetched tasks:', tasks_fetch.data);
        
        // Separate tasks into completed and incomplete
        const completedTasks = tasks_fetch.data.filter((task) => task.status);
        // console.log(completedTasks)
        // const incompleteTasks = tasks_fetch.data.filter((task) => !task.status);

        // Update state with the tasks and completed tasks
        // setTasks(tasks_fetch.data);
        setTasks(tasks_fetch.data.map(task => ({ ...task, status: task.status === true })));
        setCompletedTasks(completedTasks);
        
      }
      catch(error){
        toast.error('Error fetching tasks data')
      }
    }

    fetchUserData();
    fetchTaskData();
  },[name]);
  
  //for the add task backdrop feature
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  //for the edit task backdrop feature
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleEditOpen = (task) => {
    setTaskToEdit(task);
    setEditTask(task.task); // Set the edit task input to the task's current value
    setEditOpen(true);
  };

  //for delete backdrop feature
  const handleDeleteOpen = (task) => {
    setTaskToDelete(task);
    setDeleteConfirmationOpen(true);
  };
  // Function to close the delete confirmation dialog
  const handleDeleteClose = () => {
    setDeleteConfirmationOpen(false);
  };

  //add task feature
  const handleAddTask = async () => {
    //checking if the input field is empty or not before proceeding
    if (newTask === '') {
      toast.warning('Please enter a task first');
      return;
    }

    try {
      const taskData = {
        email: loggedInEmail, 
        name: name,   
        task: newTask
      };
      const response = await axios.post('https://focusflowbackend.netlify.app/add/task', taskData);
      if (response.status === 201) {
        setNewTask('');
        toast.success('Task Added');
        const tasksResponse = await axios.get(`https://focusflowbackend.netlify.app/get/tasks/byName?name=${name}`);
        setTasks(tasksResponse.data);
      } 
      else {
        toast.error('Could not add task');
      }
    } 
    catch (error) {
      toast.warning('Error adding task');
    }
    setOpen(false);
  };


  //for edit task feature
  const handleEditTask = async () => {
    if (editTask === '') {
      toast.warning('Please enter a new task before saving');
      return;
    }
  
    try {
      const taskData = {
        name: name,
        task: taskToEdit.task, // Using the task from taskToEdit
        newTask: editTask,
      };
  
      const response = await axios.put('https://focusflowbackend.netlify.app/update/task', taskData);
  
      if (response.status === 200) {
        toast.success('Task Updated');
        setEditTask(''); // Clearing the edit task field
        setEditOpen(false); // Closing the edit task dialog
        setTaskToEdit(null); // Resetting the task being edited
  
        // Now update the tasks state with the updated data
        const updatedTasks = tasks.map((t) =>
          t.id === taskToEdit.id ? { ...t, task: editTask } : t
        );
        setTasks(updatedTasks);
      } else {
        toast.error('Could not update task');
      }
    } catch (error) {
      toast.warning('Error updating task');
    }
  };
  
  // const toggleTaskStatus = async (taskId, userName, taskName) => {
  //   // Check if the task is completed
  //   const isCompleted = completedTasks.includes(taskId);
  //   // console.log('Before clicking:', completedTasks);
  //   // console.log('Task ID:', taskId);
  //   // console.log('Is Completed:', isCompleted);
  //   // Define the new status
  //   const newStatus = !isCompleted;
  //   console.log('New Status:', newStatus);
    
  //   await axios.put(`http://localhost:5000/update/task/status`, { name: userName, task: taskName, status: newStatus })
  //   if (isCompleted) {
  //     // Task is completed, mark it as incomplete
  //     // const updatedTasks = completedTasks.filter((id) => id !== taskId);
  //     const updatedCompletedTasks = isCompleted ? completedTasks.filter(id => id !== taskId) : [...completedTasks, taskId];
  //     setCompletedTasks(updatedCompletedTasks);
  //   } else {
  //     // Task is incomplete, mark it as completed
  //     setCompletedTasks([...completedTasks, taskId]);
  //   }

  //   // console.log('After clicking:', completedTasks);
  // };

  const toggleTaskStatus = async (taskId, userName, taskName) => {
    try {
      const isCompleted = completedTasks.includes(taskId);
      const newStatus = !isCompleted;
  
      await axios.put(`https://focusflowbackend.netlify.app/update/task/status`, { name: userName, task: taskName, status: newStatus });
  
      // Update the tasks state based on the new status
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
      );
  
      // Update the completedTasks state based on the new status
      setCompletedTasks((prevCompletedTasks) =>
        newStatus ? [...prevCompletedTasks, taskId] : prevCompletedTasks.filter((id) => id !== taskId)
      );
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  
  //for delete task feature
  const handleDeleteTask = async () => {
    try{
        const taskData = {
          name : name,
          task : taskToDelete.task
        }

        const response = await axios.delete('https://focusflowbackend.netlify.app/delete/task', { data: taskData });
        if(response.status === 204){
          toast.success('Task deleted');
          setTaskToDelete(null);
          const updatedTasks = tasks.filter((t) => t.id !== taskToDelete.id);
          setTasks(updatedTasks);
    }
        }
      catch(error){
        toast.error('Could not delete task');
        // console.error('Error deleting task', error);
      }
      setDeleteConfirmationOpen(false);
    }
  
  // for instruction backdrop feature
  const handleInstructionClose = () => {
    setInstructionOpen(false);
  };
  const handleInstructionOpen = () => {
    setInstructionOpen(true);
  };
  
    return(
        <div style={{background:'linear-gradient(to left top, #403b4a, #e7e9bb)',height:'100vh'}}>
          <Navbar name={name} />
          <Container sx={{mt:4, ml:1, maxWidth:'800px'}}>
            <IconButton onClick={handleInstructionOpen} size='small' sx={{ml:0, mt:-2}}>
              <InfoOutlinedIcon sx={{color:'black', fontSize:'40px'}} fontSize='small' />
            </IconButton>
            <IconButton onClick={handleOpen} size='large' sx={{ml:'482px', mt:-2}}>
              <AddCircleOutlineIcon sx={{color:'black', fontSize:'60px'}} fontSize='large' />
            </IconButton>
          </Container>

          {/* backdrop for add icon */}
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Add a new task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                color='info'
                multiline
                rows={2}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddTask} variant='text' sx={{mt:-1}}><b>Add</b></Button>
            </DialogActions>
          </Dialog>

          {/* backdrop for edit icon */}
          <Dialog open={editOpen} onClose={handleEditClose} fullWidth>
            <DialogTitle>Edit task</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                variant="outlined"
                color='info'
                multiline
                rows={2}
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditTask} variant='text' sx={{mt:-1}}><b>Save</b></Button>
            </DialogActions>
          </Dialog>
          
          {/* delete task feature */}
          <Dialog open={deleteConfirmationOpen} onClose={handleDeleteClose} fullWidth>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this task?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteTask} variant='text'>
                Delete
              </Button>
              <Button onClick={handleDeleteClose} variant='text'>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/* backdrop for instructions icon */}
          <Dialog open={instructionOpen} onClose={handleInstructionClose} sx={{width:'auto',height:'auto' }}>
            <DialogTitle align='center' fontSize={'30px'}><b>Instructions</b></DialogTitle>
            <DialogContent sx={{mt:-2}}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AddCircleOutlineIcon sx={{fontSize:'40px', color:'black'}} />
                </ListItemIcon>
                <ListItemText style={{marginLeft:4}} primary="Click this to add a new task" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ml:0.5}}>
                  <CheckCircleOutlineIcon sx={{fontSize:'30px', color:'green'}} />
                </ListItemIcon>
                <ListItemText primary="Click this to mark the task as complete" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ml:0.5}}>
                  <EditIcon color='info' sx={{fontSize:'30px'}}/>
                </ListItemIcon>
                <ListItemText primary="Click this to edit the task content" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ml:0.5}}>
                  <DeleteIcon color='error' sx={{fontSize:'30px'}}/>
                </ListItemIcon>
                <ListItemText primary="Click this to delete the task" />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ml:0.5}}>
                  <CheckCircleOutlineIcon sx={{fontSize:'30px', color:'gray'}} />
                </ListItemIcon>
                <ListItemText primary="Click this to mark the task as incomplete" 
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      (After logging-in or refreshing, if you wish to mark the task as incomplete, <b>DOUBLE CLICK</b> this icon to mark the task as incomplete)
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            </DialogContent>
          </Dialog>

          <Container maxWidth="lg" sx={{overflowY:'auto', height:453, mt:0, ml:2}}>
            <Grid container spacing={2} sx={{mt:0}}>
              {tasks.map((task) => (
                <Grid item xs={6} sm={6} key={task.id}>
                  <Card variant="elevation" elevation={7} sx={{width:'560px', height:'130px', backgroundColor:'black', borderRadius:'15px'}}>
                    <CardContent sx={{position:'relative', width:'525px', height:'65px', overflowY:'auto', 
                          
                    }}>
                        <Typography variant='overline'   sx={{fontSize:'12px',lineHeight: '1.8',
                          // color: completedTasks.includes(task.id) && task.status ? 'lightgreen' : 'white',
                          color: completedTasks.includes(task.id) || task.status ? 'lightgreen' : 'white',
                          fontWeight: completedTasks.includes(task.id) || task.status ? 'bold' : 'normal',
                        }}
                        >
                          {task.task}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{mt:-3}}>
                      <Typography
                        sx={{
                          position: 'relative',
                          mt:0,
                          ml:50,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                        }} 
                      >
                        <IconButton onClick={() => toggleTaskStatus(task.id, task.name, task.task)}
                          sx={{
                            color: task.status ? 'white' : 'lightgreen',
                          }}
                        >
                          <CheckCircleOutlineIcon fontSize='medium' />
                        </IconButton>
                        <IconButton color='info' sx={{ml:0}} onClick={() => handleEditOpen(task)}>
                          <EditIcon fontSize='medium' />
                        </IconButton>
                        <IconButton color='inherit' sx={{ml:0}} onClick={() => handleDeleteOpen(task)}>
                          <DeleteIcon sx={{color:'red'}} fontSize='medium' />
                        </IconButton>
                      </Typography>
                    
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

          </Container>
          


        </div>
    )
}

export default Tasks;
