import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useAtomValue } from 'jotai/utils';
import { CalculatedDate, timezoneAtom } from '../modules/time';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    dividerFullWidth: {
      margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
    dividerInset: {
      margin: `5px 0 0 ${theme.spacing(9)}px`,
    },
  }),
);

interface DateDisplayProps {
    date: CalculatedDate;
    header: string;
};

export const DateDisplay: React.FC<DateDisplayProps> = (props) => {
    const classes = useStyles();
    const timeZone = useAtomValue(timezoneAtom);

    return (
        <List className={classes.root} >
            <ListItem>
                <ListItemText 
                  primary={`${props.date.estimated ? "Estimated" : ""} ${props.header}`}
                  secondary={props.date.date.toLocaleString("en-US", {timeZone})} 
                />
            </ListItem>
        </List>
    )
}