import * as React from 'react';
import {makeStyles} from '2material-ui/core/styles';
import Card from '@material-ui/core/card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/core/Pagination';
import {reportList} from '../json/ReportJson';
import Divider from '@material-ui/core/Divider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {filterList} from '../json/FilterJson';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import star from '../../../star.svg';
import '../../../App.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth:275,
        width:'75%',
        marginTop:'2%',
        marginLeft:'10%'
    },
    root1: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0,0.5),
        },
    },
    bullet: {
        diaplay: 'inline-block',
        margin:'0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    content: {
        display:"table-cell",
        width:"70%",
        height:"150px",
        padding:"10px",
        verticalAlign: "middle"
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }


}));

export default function MainContent(props) {
    const classes = useStyles();
    const [firstIndex, setFirstIndex] = React.useState(0);
    const [lastIndex, setLastIndex] = React.useState(5);
    const [openMenu,setOpenMenu] = React.useState([true,false,false,false]);
    const [flag, setFlag] = React.useState(true);
    const [checked, setChecked] = React.useState([]);
    const [radioValue, setRadioValue] = React.useState("");

    const bull = <span className={classes.bullet}>*</span>;

    useEffect(() => {
        filterList.map(x=> {
            if(x.type==="checkbox") {
                let checkedList = [...checked];
                for(let i=0;i<x.subMenu.length;i++) {
                    checkedList.push(false);
                }
                setChecked(checkedList);
            }
        })
    }, [])

    const handleChange = (event,value) => {
        setFirstIndex(lastIndex*(value-1));
        setLastIndex(lastIndex*(value-1) + 5);
    }

    const handleClick = (index) => (event) => {
        let open = [...openMenu];
        open[index] = !open[index];
        setOpenMenu(open);
        setFlag(!flag);
    }

    const handleCheckbox = (index) => (event) => {
        let checkedList = [...checked];
        checkedList[index] = event.target.checked;
        setChecked(checkedList);
    }

    const handleRadioButton = (event) => {
        setRadiButton(event.target.value);
    }

    return(
        <div style={{display:"grid", gridTemplateColumns: "20% 80%", "marginLeft": props.drawer ? "20%":"0%"}}>
         <div>
            <List>
             {filterList.map((text, index) => (
                <div>
                    <ListItem button key={text} onClick={handleClick(index)}>
                        <ListItemText primary={text.menu} />
                        {openMenu[index]==true ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in = {openMenu[index]} timeout="auto" unmountOnExit>
                        <List component="div">
                            {text.type=="list" && List.subMenu.map(x => {
                                return(
                                    <ListItem button key={x.name} className={classes.nested}>
                                        <ListItemText primary={x.name} />
                                    </ListItem>
                                )
                            })}

                            {text.type=="checkbox" && text.subMenu.map((x,i) => {
                                return(
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked[i]}
                                            onChange={handleCheckbox(i)}
                                            color = "primary"
                                        />
                                        }
                                        label={x.name}
                                        style={{marginLeft:"15px"}}
                                    />
                                )
                            })}

                            {text.type == "radiobutton" && text.subMenu.map((x,i) => {
                                return(
                                    <FormControl component="fieldset"
                                    style={{marginLeft:"25px"}}>
                                    <RadioGroup value={radioValue} onClick={handleRadioButton} onChange={handleRadioButton}>
                                        <FormControlLabel value={x.name} control={<Radio/>} label={x.name} />
                                    </RadioGroup>
                                    </FormControl>
                                )
                            })}
                        </List>
                        </Collapse>
                </div>
             ))}   
            </List>
        </div>   


        <div>
            {reportList.slice(firstIndex,lastIndex).map((text,index) => (
                <Card className={classes.root}>
                    <CardContent>
                        <Grid container alignItems="center" clsName={classes.root1}>
                            <div className={classes.content}>
                                <Typography className={classes.title} color="textSecondry" gutterBottom>
                                    {text.reportName}
                                </Typography>

                            </div>

                            <Divider orientation="vertical" flexItem />
                            <div style={{paddingLeft:"10%"}}>
                                <img src={star}/>
                                <img src={star}/>
                                <img src={star}/>
                            </div>
                        </Grid>
                    </CardContent>
                </Card>
            ))}

            <div style={{float:"right", marginRight:"5%", marginTop:"2%"}}>
                <Pagination count={reportList.length%5} onChange={handleChange} />
            </div>
        </div>
        </div>
    )
}