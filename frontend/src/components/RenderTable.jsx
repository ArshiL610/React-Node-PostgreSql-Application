import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  
const RenderTable = () => {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/get/users`)
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data through frontend..', error);
    })
  },[])


    return(
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Id</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Department</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((userdata) => (
            <StyledTableRow key={userdata.id}>
              <StyledTableCell component="th" scope="row" align='center'>
                {userdata.id}
              </StyledTableCell>
              <StyledTableCell align="center">{userdata.username}</StyledTableCell>
              <StyledTableCell align="center">{userdata.email}</StyledTableCell>
              <StyledTableCell align="center">{userdata.dept}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default RenderTable;