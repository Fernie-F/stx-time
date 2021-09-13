import React from 'react';
import { Link } from '@material-ui/core';
import { BlockInput } from './blockInput';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { startBlockReadWriteAtom } from '../modules/blocks';
import { getLastBlockHeight } from '../util/blockchainApi';
import { useUpdateAtom } from 'jotai/utils';
import { Block } from '@stacks/blockchain-api-client';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(2),
    },
  }),
);

export const StartBlockInput: React.FC = () => {
    const classes = useStyles();
    const setStart = useUpdateAtom(startBlockReadWriteAtom);

    const preventDefault = (event: React.SyntheticEvent) => {
      getLastBlockHeight().then((block: Block) => setStart(block.height));
      
      event.preventDefault()
    };

    return (
        <div>
            <BlockInput label={"Starting Block"}
              writableAtom={startBlockReadWriteAtom}
              error={""} />
            <Link href="#" onClick={preventDefault} className={classes.margin}>
              <u>Set Starting Block to Now</u>
            </Link>
        </div>
    )
}

