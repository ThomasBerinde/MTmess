import React, {useState} from 'react';
import { Avatar, Button, Grid, Paper, TextField } from '@material-ui/core';
import  AddReaction  from '@mui/icons-material/AddReaction';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Typography, AvatarGroup, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {

    const buttonStyle = {
        margin:'55px 0'
    }
    const paperStyle={ padding: 20 ,
        height:'70vh',
        width : 280,
        margin:"20px auto",} // vf - viewport height

    const avatarStyle = {
        backgroundColor: '#21bfa6',
    }

    const gridAvatarStyle = {
        display:'inline-block',
        margin:"40px 60px"
    }

    let navigate = useNavigate();

    const [ok, setOk] = useState(false);
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');

    const clickHandler = async () => {
        const response = await fetch(`http://localhost:8080/user/find/log?name=${name}&password=${password}`)
        try {
            const data = await response.json()
            /*console.log(data)*/
            setOk(true);
            setUser(name);
            navigate('/feed');
        }
        catch {
            alert("Incorrect credentials!")
        }
    }

    return(
        <Grid>
            <Paper elevation={15} style={paperStyle}>

                <Grid align='center'>
                    <Avatar style={avatarStyle}> <AddReaction/>  </Avatar>
                    <Typography variant="h4" fullwidth={true}> MTmess </Typography>
                    <TextField label='Username' placeholder='Enter username' fullwidth={true} required
                               value={name} onChange={(e)=>setName(e.target.value)}/>
                    <TextField label='Password' placeholder='Enter password' type='password' fullwidth={true} required
                               value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <Button variant='contained'
                            type='submit'
                            color='primary'
                            fullwidth={true}
                            style={buttonStyle} onClick={() => clickHandler()}> 'Log in'  </Button>
                </Grid>

                <Typography>
                    <Link href="#"> Forgot Password? </Link>
                </Typography>

                <Typography> Not a member?
                    <Link href="/register">Register </Link>
                </Typography>

                <Grid style={gridAvatarStyle}>
                    <AvatarGroup max={4}>
                        <Link href="#"> <Avatar style={avatarStyle}> <GoogleIcon/>  </Avatar> </Link>
                        <Link href="#"> <Avatar style={avatarStyle}> <FacebookIcon/>  </Avatar> </Link>
                        <Link href="#"> <Avatar style={avatarStyle}> <TwitterIcon/>  </Avatar> </Link>
                        <Link href="#"> <Avatar style={avatarStyle}> <LinkedInIcon/>  </Avatar> </Link>
                    </AvatarGroup>
                </Grid>

            </Paper>
        </Grid>
    );
}

export default Login;
