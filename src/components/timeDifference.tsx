import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Box, Divider, List, ListItem, ListItemText } from '@material-ui/core';
import { endDateTimeAtom, startDateTimeAtom } from '../modules/time';
import {  useAtomValue } from 'jotai/utils';
import { generateDeltaTimes, DeltaTime } from '../util/timeTools';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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


export const TimeDifference: React.FC = () => {
    const classes = useStyles();
    const startDateTime =  useAtomValue(startDateTimeAtom);
    const endDateTime =  useAtomValue(endDateTimeAtom);

    const {
        deltaYears,
        deltaMonths,
        deltaWeeks,
        deltaDays,
        deltaHours,
        deltaMinutes
    }: DeltaTime = {...generateDeltaTimes(startDateTime.date, endDateTime.date)};

    return (
        <div className={classes.root}>
            <Divider />
            <List>
                <Box pl={0}>
                    <ListItem>
                        <AccessTimeIcon />
                        <ListItemText primary="Time between blocks"/>
                    </ListItem>
                </Box>
                { deltaYears ?
                    <ListItem>
                        <ListItemText primary={`${deltaYears} Year(s)`}/>
                    </ListItem>
                    : null
                }
                { deltaMonths ?
                    <ListItem>
                        <ListItemText primary={`${deltaMonths} Month(s)`}/>
                    </ListItem>
                    : null
                }

                { deltaWeeks ?
                    <ListItem>
                        <ListItemText primary={`${deltaWeeks} Week(s)`}/>
                    </ListItem>
                    : null
                }
                { deltaDays ?
                    <ListItem>
                        <ListItemText primary={`${deltaDays} Day(s)`}/>
                    </ListItem>
                    : null
                }
                { deltaHours ?
                    <ListItem>
                        <ListItemText primary={`${deltaHours} Hour(s)`}/>
                    </ListItem>
                    : null
                }
                { deltaMinutes ?
                    <ListItem>
                        <ListItemText primary={`${deltaMinutes} Minutes`}/>
                    </ListItem>
                    : null
                }
                
            </List>
        </div>
    )
}