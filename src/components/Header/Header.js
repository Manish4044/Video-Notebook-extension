import React from 'react'
import { makeStyles } from '@mui/styles';
import {NoteOutlined, ShareOutlined, MenuOutlined, CloseOutlined} from '@mui/icons-material';

const useStyles = makeStyles({
  header: {
    width:"100%",
    fontSize:"25px",
    color:"grey",
    display:"flex",
    justifyContent:"space-between"
  },
  clickableIcon: {
    color: 'grey',
    '&:hover': {
    color: 'black',
    },
    cursor:'pointer',
  },
});

function Header() {

    const logo = "chrome-extension://hbklahkfbghjgbclbfcnhpfmajkagnci/icons/48x48_red.png";
    const classes = useStyles();

    return (
    <div className={classes.header}>
      <div>
          <img src={logo} className={classes.clickableIcon} width="25px" height="25px" alt="Logo"/>
          <NoteOutlined  className={classes.clickableIcon}  color="inherit" sx={{ml:1}} fontSize="inherit"/>
          <ShareOutlined className={classes.clickableIcon} color="inherit" sx={{ml:1}} fontSize="inherit"/>
      </div>
      <div>
        <MenuOutlined className={classes.clickableIcon} sx={{ml:1}} color="inherit" fontSize="inherit"/>
        <CloseOutlined  className={classes.clickableIcon} sx={{ml:1}} color="inherit"  fontSize="inherit"/>
      </div>
    </div>
    )
}

export default Header