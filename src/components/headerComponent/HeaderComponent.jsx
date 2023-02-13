import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {getDrawerListAsync} from '../reportSlice';
import { useEffect } from 'react';
import {drawerListJson} from '../reportSlice';
import { useSelector, useDispatch } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop:'65px'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));
  

export default function HeaderComponent(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const dispatch = useDispatch();

  const drawerList = useSelector(drawerListJson);
  const [openMenu, setOpenMenu] = React.useState([true,false,false,false]);
  const [flag,setFlag] = React.useState(true);
  const [selectedMenu,setSelectedMenu] = React.useState({menu:"Dashboard"});

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
   dispatch(getDrawerListAsync());

  });


  
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
     return;
   }
   props.setDrawer(open);
   };

  const handleClick = (index) => (event) => {
    console.log("===>>",index);
    let open = [...openMenu];
    open[index] = !open[index];
    console.log(open);
    setOpenMenu(open);
    setFlag(!flag);
    setSelectedMenu(drawerList[index]);
   };


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}
                 >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Report Cataloging
          </Typography>
        
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => toggleDrawer(true)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
            <Drawer anchor={'left'} open={props.drawer}
            classes={{
                paper: classes.drawerPaper,
              }}
            variant="persistent"
            onClose={toggleDrawer(false)}>

        <div className={classes.drawerHeader}>
          <IconButton >
            {theme.direction === 'ltr' ? <ChevronLeftIcon onClick={toggleDrawer(false)} /> : <ChevronRightIcon onClick={toggleDrawer(true)} />}
          </IconButton>
        </div>
        


            <List>
        {drawerList.map((text, index) => (
          <div>
          <ListItem style={{ color:  selectedMenu.menu === text.menu ? "white" : "black",  backgroundColor: selectedMenu.menu === text.menu ? "#3f51b5" :""}} button key={text} onClick={handleClick(index)}>
            <ListItemText primary={text.menu} />
          </ListItem>
           
          </div>
        ))}
          </List>  
      
          </Drawer>

        

        
        </Toolbar>
      </AppBar>
    </div>
  );
}
