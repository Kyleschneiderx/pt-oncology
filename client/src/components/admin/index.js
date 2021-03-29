import React, {useEffect, useState} from 'react'

import axios from 'axios';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import moment from 'moment';

// import {moment} from 'moment'

//table from material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const Admin =(props) => {
    console.log(props.userId)

    const [patients, setPatients] = useState([])

    useEffect(()=>{
        const body = {
            query:`
            {
                getPatients(userId:"${props.userId}"){
                  patients{
                    _id
                    DOB
                    firstName
                    lastName
                    # date_of_diagnosis
                    # status
                  }
                }
              }
              `  
          }
          console.log(props.token, "body")
        
          const request = fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+ props.token
            },
            body: JSON.stringify(body)
          })
            .then(res => {    
              return res.json();
            })
            .then(resData => {
              console.log(resData, "resData");
              setPatients(resData.data.getPatients.patients)
              return (resData.data.login)
            })
            .catch(err => {
              console.log(err, "error");
            });

    }, [props])





        console.log(props, "second Props")
        return(
        <>
        <div style={{ display: "flex", justifyContent: 'flex-end' }}>
        <Link to={`/intro/${props.userId}`}>
            <Button variant="contained" color="primary">
                ADD PATIENT 
            </Button>
        </Link>
        </div>
            <div>
            <TextField
          id="outlined-full-width"
          label="Search"
          style={{ margin: 6 }}
          placeholder="Search Patient Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
        </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient</TableCell>
                            <TableCell>Date of Birth</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { patients.map((item, index)=>(
                            <TableRow key={index}>
                                <TableCell>
                                    <Link to={`/admin/posts/edit/${item._id}`}>{item.firstName} {item.lastName}</Link>
                                </TableCell>
                                  <TableCell>{moment(item.DOB).format("MM/DD/YY")}</TableCell>
                                {/* <TableCell>{moment(item.createdAt).format("MM/DD/YY")}</TableCell>
                                <TableCell>{item.DOB}</TableCell> */}

                            </TableRow>
                        ))

                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </>
        )




}


function mapStateToProps(state){
    return {
        userId: state.auth.userId,
        token: state.auth.token
    }
}

export default connect(mapStateToProps)(Admin);


