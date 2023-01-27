import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './composants/header';
import Box from '@mui/material/Box'
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import '../css/menu.css'


export default function Menu() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [idLand, setIdLand] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [textValue, setTextValue] = useState("");

    const onChangeId = e => {
        const data = e.target.value;
        setIdLand(data);
    }

    function lessThan2Number(value) {
        let res = value;
        if(res.toString().length === 1) {
            res = `0${res}`;
        }
        return res;
    }

    function changeDateValue(value) {
        const day = lessThan2Number(value.$D);
        const month = lessThan2Number(value.$M+1);
        return `${value.$y}-${month}-${day}`;
    }

    function goContributors() {
        if(!idLand || !dateStart || !dateEnd ) {
            setTextValue("Some values are empty"); 
            setOpen(true);
            console.log('no');
        } else if(isNaN(idLand)) {
            setTextValue("Id need to be a number");
            setOpen(true);
        } else if(dayjs(dateStart) > dayjs(dateEnd)) { 
            setTextValue("Date start can't be greater than date end");
            setOpen(true);
        } else if(dayjs(dateEnd).diff(dayjs(dateStart), 'days') > 6) {
            setTextValue("Need less than 7 days between date start and date end");
            setOpen(true);
        } else {
            navigate(`/landData/${idLand}/${changeDateValue(dateStart)}/${changeDateValue(dateEnd)}`);
        }
    }
    const handleClose = (event, reason) => {
        if(reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return(
        <>
        <Header/>
        <div className="head">
            <Box
                sx= {{
                    '& .MuiTextField-root': {m: 1, width: '25ch'}
                }}
                autoComplete='off'
            >
                <TextField
                    style={{width: '99%'}}
                    label='Id of your land'
                    onChange={e => onChangeId(e)}
                    value={idLand}
                    variant='outlined'
                />
                <div className="row">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={dateStart}
                            onChange={(newValue) => {
                                setDateStart(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            maxDate={new Date()}
                        />
                        <DatePicker
                            label="End Date"
                            value={dateEnd}
                            onChange={(newValue) => {
                                setDateEnd(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            maxDate={new Date()}
                        /> 
                    </LocalizationProvider>
                </div>
            </Box>
            <Button
                style={{ width: '100%', margin: "40px 0px"}}
                variant='contained'
                color='primary'
                size='large'
                onClick={goContributors}>Go to see your contributors
            </Button>

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='error'>
                    <AlertTitle>{textValue}</AlertTitle>
                </Alert>
            </Snackbar>
        </div>
        </>
    )
}