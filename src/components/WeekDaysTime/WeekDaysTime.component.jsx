import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import React from 'react';

const WeekDayTime = (props) => {

    const {value1, value2, setValue1, setValue2, dia, array, onArrayChange} = props;

    return(

        <div className="card">
            <div className="p-fluid p-grid">
                <div className="p-field p-col-12 p-md-4">
                    <Checkbox inputId="cb1" value={dia} onChange={onArrayChange} checked={array.includes(dia)}></Checkbox>
                    <span className="p-field p-col-12 p-md-3">{dia}</span>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <Calendar timeOnly showTime hourFormat="24" value={value1} onChange={(e) => setValue1(e.value)}></Calendar>
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <Calendar timeOnly showTime hourFormat="24" value={value2} onChange={(e) => setValue2(e.value)}></Calendar>
                </div>                                         
            </div>
        </div>
    );
}

export default WeekDayTime;