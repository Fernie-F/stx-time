import React from 'react';
import { Paper, Grid, makeStyles, Theme, createStyles, Button, BottomNavigation } from '@material-ui/core';
import { StartBlockInput } from './startBlockInput';
import { EndBlockInput } from './endBlockInput';
import { DateDisplay } from './dateDisplay';
import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { endReadAtom, startReadAtom } from '../modules/blocks';
import { writeEndDateTimeFromBlockAtom, writeStartDateTimeFromBlockAtom } from '../modules/time';
import { TimeDifference } from './timeDifference';
import { TimezoneSelect } from './timezoneSelect';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    subtitle: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    void: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    timePaper: {
        margin: "auto",
        maxWidth: 350,
        height: 510,
    },
    timeContainerGrid: {
      justify: "center",
      width: 100,
    },
    left: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    stxColors: {
        background: '#5546FF',
        color: '#FFFFFF'
    },
    right: {
      padding: theme.spacing(2),
      textAlign: 'right',
      color: theme.palette.text.primary,
    }
  }),
);


export const ConverterContainer: React.FC = () => {
    const classes = useStyles();
    const startDateBlock = useAtomValue(startReadAtom);
    const endDateBlock = useAtomValue(endReadAtom);
    const [startDateTime, setStartDateTime] = useAtom(writeStartDateTimeFromBlockAtom);
    const [endDateTime, setEndDateTime] = useAtom(writeEndDateTimeFromBlockAtom);


    const handleClick = () => {
      setStartDateTime(startDateBlock);
      setEndDateTime(endDateBlock);
    }

    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.title}>
                  Convert STX Block Time to Time
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <TimezoneSelect />
            </Grid>
            <Grid xs={6} item >
              <Paper className={`${classes.left}  ${classes.timePaper}`}>
                  <StartBlockInput />
                  <Paper elevation={1} >
                    <DateDisplay date={startDateTime} header={"Start Date"} />
                  </Paper>
                  
                  <Box mt={5}>
                    <Button
                      onClick={handleClick}
                      variant="contained"
                      className={`${classes.stxColors}`}>
                      Calculate Duration
                    </Button>
                  </Box>
                </Paper>
            </Grid>
            <Grid xs={6} item >
                <Paper className={`${classes.left}  ${classes.timePaper}`}>
                    <EndBlockInput />
                    <Paper elevation={1}>
                      <DateDisplay date={endDateTime} header={"End Date"} />
                      <TimeDifference />
                    </Paper>
                </Paper>
            </Grid>
          </Grid>
          
          <BottomNavigation>
          </BottomNavigation>
          
          DISCLAIMER: The dates displayed are based on average block time which is around 10 minutes per block. The dates provided are approximations.
        </div>
    )
}