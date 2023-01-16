import * as React from 'react';
import { styled, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemButton from '@material-ui/core/ListItemButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { drawerList } from '../json/DrawerJson';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow:1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow:1,
    },
    root: {
        display:'flex',
    },
    appBar:{
        transition: theme.transitions.create(['margin','width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide:{
        display: 'none'.
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
        display:'flex',
        alignItems:'center',
        padding: theme.spacing(0,1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow:1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.durtion.leavingScreen,
        }),
     marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft:0,
    },
    nested: {
        paddingLeft: theme.spacing(4)
    },
}));

export default function HeaderComponent(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();

    const[openMenu, setOpenMenu] = React.useState([true,false,false,false]);
    const [flag, setFlag] = React.useState(true);
    const [selectedMenu,setSelectedMenu] = React.useState({menu:"Dashboard"});

    const handleClose = () => {
        setAnchorEl(null);
    }

    const toggleDrawer = (open) => (event) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        props.setDrawer(open);
    }

    const handleClick = (index) => (event) => {
        let open = [...openMenu];
        open[index] = !open[index];
        setOpenMenu(open);
        setFlag(!flag);
        setSelectedMenu(drawerList[index]);
    }
}

return(
    <div className={classes.root}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Report Cataloging
          </Typography>
          
            <div>
              <IconButton
                size="large"
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
            variant = "persistent"
            onClose={toggleDawer(false)}>

            <div className={classes.drawerHeader}>
                <IconButton>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon onClick={toggleDrawer(false)}/> : <ChevronRightIcon onClick={toggleDrawer(true)}/>}
                </IconButton>
            </div>

            <List>
                {drawerList.map((text,index) => {
                    <div>
                        <ListItem style={{color: selectedMenu.menu == text.menu ? "white":"black", backgroundColor: selectedMenu.menu == text.menu ? "#3f51b5":""}} 
                        button key={text} onClick={handleClick(index)}>
                            <ListItemText primary={text.menu} />
                        </ListItem>
                    </div>
                })}
            </List>
            </Drawer>
            
        </Toolbar>
      </AppBar>
    
    </div>
)

