import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    function backHome() {
        navigate('/');
    }

    return(
        <div className="appbar" style={{marginBottom: "2%"}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: "1"}}>
                        <Button onClick={backHome} color='inherit'>Land Contribution</Button>
                    </Typography>
                    {/* <Button style={{ marginRight: "5%"}} color='inherit' onClick={backHome}> go back </Button> */}
                </Toolbar>
            </AppBar>
        </div>
    )
}