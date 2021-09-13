import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import { WritableAtom, useAtom } from 'jotai';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '25ch',
    },
  }),
);


export const BlockInput: React.FC<{label: string, writableAtom: WritableAtom<any, any>, error: string}> = (props) => {
    const classes = useStyles();
    const [input, setInput] = useAtom(props.writableAtom);

    const invalidError = (num: number) => {
      let block = Number(num);
      if(block === 0) {
        return "Blocks start at 1 !";
      } else {
        return "";
      }
    }

    const getError = (num: number, propsError: string) => {
      const nativeError = invalidError(num);
      if(nativeError.length > 0)
        return nativeError
      else {
        return propsError;
      }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let castNumber = Number(event.target.value);
      if(!isNaN(castNumber))
        setInput(Number(event.target.value));
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            error={getError(input, props.error).length > 0}
            helperText={getError(input, props.error)}
            label={props.label}
            value={input}
            onChange={handleChange}
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
          />
        </form>
    )
}