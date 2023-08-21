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
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';




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
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/get/users/all`)
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data through frontend..', error);
    })

    axios.get(`http://localhost:5000/get/users/byDept?dept=${selectedFilter}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data through frontend..', error);
      });

  },[selectedFilter])

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }
  const sortedData = [...userData].sort((a,b) => {
    if(sortOrder === 'asc'){
      return a.id - b.id;
    }
    else{
      return b.id - a.id;
    }
  })

  const handleFilterIconClick = () => {
    setFilterVisible(!filterVisible);
  }
  const handleFilterSelect = (event) => {
    setSelectedFilter(event.target.value);
    // axios.get(`http://localhost:5000/get/users/byDept?dept=${selectedFilter}`)
    //   .then((response) => {
    //     setUserData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data through frontend..', error);
    //   });
    setFilterVisible(false);
  }

    return(
      <div>
        <IconButton size='large' sx={{ml:140, mt:1, fontSize:20}} onClick={handleFilterIconClick}>
          <FilterAltRoundedIcon sx={{color:'black'}}/>
        </IconButton>
        {filterVisible && (
                <select style={{height:35}} value={selectedFilter} onChange={handleFilterSelect} >
                  <option disabled>All</option>
                  <option value="App Engg">App Engg</option>
                  <option value="Cloud Engg">Cloud Engg</option>
                  <option value="IOT Engg">IOT Engg</option>
                </select>
              )}
        <TableContainer component={Paper} sx={{height:'490px',mt:2, width:'75%', ml:21}} >
        <Table stickyHeader sx={{ minWidth: '75%', borderWidth:4, borderColor:'black' }} aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell align="right" sx={{fontSize:'16px'}}>
                <b>Id</b>{''}
                <IconButton onClick={handleSort}>
                  {sortOrder === 'asc' ? (
                    <ArrowUpwardIcon sx={{color:'white', mt:-0.5}} />
                  ) : (
                    <ArrowDownwardIcon sx={{color:'white'}} />
                  )}
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center" sx={{fontSize:'16px'}}><b>Name</b></StyledTableCell>
              <StyledTableCell align="center" sx={{fontSize:'16px'}}><b>Email</b></StyledTableCell>
              <StyledTableCell align="center" sx={{fontSize:'16px'}}><b>Department</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((userdata) => (
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
    </div>
    )
}

export default RenderTable;