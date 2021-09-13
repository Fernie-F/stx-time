import React from 'react';
import { BlockInput } from './blockInput';


import { endBlockReadWriteAtom } from '../modules/blocks';
import { endDateTimeAtom, startDateTimeAtom } from '../modules/time';
import { useAtomValue } from 'jotai/utils';

export const EndBlockInput: React.FC = () => {
    const startDateTime = useAtomValue(startDateTimeAtom);
    const endDateTime =  useAtomValue(endDateTimeAtom);
    
    const getErrorFromDates = (startDate: Date, endDate: Date) => {
        if((endDate.valueOf() - startDate.valueOf()) >= 0) {
          return "";
        } else {
          return "Ending block must be bigger than Starting block"
        }
    }

    return (
        <div>
            <BlockInput
                label={"Ending Block"}
                writableAtom={endBlockReadWriteAtom}
                error={
                    getErrorFromDates(startDateTime.date, endDateTime.date)
                } 
            />
        </div>
    )
}

