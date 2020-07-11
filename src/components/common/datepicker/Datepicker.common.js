import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
    // The first commit of Material-UI
    const [fromDate, setFromDate] = React.useState(new Date(props.initialDate || Date.now()));
    
    const handleDateChange = (date) => {
        setFromDate(date);
        props.DateChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label={props.label}
                    format="MM/dd/yyyy"
                    value={fromDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
        </MuiPickersUtilsProvider>
    );
}