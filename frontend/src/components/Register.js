import React, { useState } from 'react'
import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core'
import  AddReaction  from '@mui/icons-material/AddReaction'
import { Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";



const Register = () => {
    const buttonStyle = {
        margin:'55px 0'
    }

    const paperStyle={ padding: 20 ,
        height:'80vh',
        width : 280,
        margin:"20px auto",} // vf - viewport height

    const avatarStyle = {
        backgroundColor: '#21bfa6',
    }

    let navigate = useNavigate();

    // Used for exporting to backend
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [hashedpassword,setPassword]=useState('');

    const clickHandler=(e)=>{
        e.preventDefault()
        const user={name,email,hashedpassword}
        console.log(user)
        if ( user.name === "" || user.email === "" || user.hashedpassword === "" )
        {
            alert("Invalid credentials");
            navigate('/');
            return;
        }
        console.log(user)
        fetch("http://localhost:8080/user/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user),
        }).then((response)=>{
            console.log("Response : " + response.body);
            if (response.body === "Failed to add user") {
                alert("User already exists!")
            }
        })
        alert("Registration was successful!");
        navigate("/");
        }

    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                    <Avatar style={avatarStyle}> <AddReaction/>  </Avatar>
                    <Typography variant="h4" fullwidth={true}> MTmess </Typography>

            <TextField label='Username' placeholder='Enter username' fullwidth={true} required
            value={name} onChange={(e)=>setName(e.target.value)} /> {/* Using react hooks to save the name to the state variable */}

            <TextField label='Email' placeholder='Enter email' fullwidth={true} required
            value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <TextField label=' ' placeholder='Enter birthdate' type='date' fullwidth={true}/>

            <TextField label='Password' placeholder='Enter password' type='password' fullwidth={true} required
            value={hashedpassword} onChange={(e)=>setPassword(e.target.value)}/>

            <Button variant='contained' type='submit' color='primary' fullwidth={true} style={buttonStyle} onClick={clickHandler}> Register </Button>


            <Typography>
            <Button href="/" variant='contained' type='submit' color='primary' fullwidth={true} style={buttonStyle}> Back </Button>
            </Typography>
            </Grid>
        </Paper>
    </Grid>
    );
};

export default Register;
