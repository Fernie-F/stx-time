import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { Theme, makeStyles, createStyles } from '@material-ui/core';
import { useAtom } from 'jotai';
import React from 'react';
import { timezoneWriteAtom } from '../modules/time';
import tzs from "../util/timezonesAlternatives.json";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(0),
            minWidth: 120,
        },
        select: {
            marginTop: theme.spacing(2),
            autoWidth: true,
        },
    }),
);

export const TimezoneSelect: React.FC = () => {
    const classes = useStyles();
    const [timezone, setTimezone] = useAtom(timezoneWriteAtom);
    
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTimezone(event.target.value as string);
    };
    
    return(
        <FormControl className={classes.formControl}>
            <InputLabel>{"Choose Your Timezone"}</InputLabel>
            <Select
                className={classes.select}
                value={timezone}
                onChange={handleChange}
            >
                {
                    Object.keys(tzs).map((key: string) => {
                        let times: any = tzs as any;
                        return <MenuItem value={key}>{`${key} (${times[key].offset})`}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}