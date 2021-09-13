import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    navButton: {
        width: 90,
        height: 50,
        borderRadius: 10,
        margin: 5
    },
    stxColors: {
        background: '#5546FF',
        color: '#FFFFFF'
    },
    background: {
        background: '#000000',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const TopBar: React.FC = () => {
    const classes = useStyles();
    return (
        <AppBar position="static" className={classes.stxColors}>
            <Button className={`${classes.navButton} ${classes.stxColors}`}>STX Time</Button>
        </AppBar>
    )
}