import React, { useState, useEffect } from 'react';

import { useForm, Controller } from "react-hook-form";

import { Button } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
import MaterialUIPickers from "../../common/datepicker/Datepicker.common";
import moment from "moment";
import 'react-day-picker/lib/style.css';
// import { formatDate } from 'react-day-picker/moment';
import { APIS } from "../../../config/Api.config";
import { api } from "../../../helpers/Api.helper";
import ContainerBox from '../../common/hoc/ContainerBox.hoc';




const AddGxMachine = (props) => {
    const editData = props.location?.state
    console.log("editData", editData)
    const { register, handleSubmit, errors, setValue, control ,watch} = useForm();

    const [siteList, setSiteList] = useState([])
    console.log("windowprops", props)
    const [warrantyStart, setWarrantyStart] = useState(editData ? editData.warrantyStart : null);
    const [warrantyEnd, setWarrantyEnd] = useState(editData ? editData.warrantyEnd : null);
    const [caliberation, setCaliberation] = useState(editData ? editData.calibrationDate : null);
    const [installationDate, setInstallationDate] = useState(editData ? editData.dateInstalled : null);
    const [operatedDate, setOperatedDate] = useState(editData ? editData.lastOperated : null);
    const [size, setSize] = useState(editData?.modules.length || 0);

    const fetch = async () => {
        let site_list_result = await api(APIS.site_list)
        setSiteList(site_list_result.data)
    }

    useEffect(() => {
        fetch()
    }, [])



    const onEdit = async (data) => {
        console.log("Editdata", data)

        var filteredModulename = data?.name?.filter(Boolean);
        console.log("filtered", filteredModulename)

        var filterednewserial = data?.newserial?.filter(Boolean);
        console.log("filtered", filterednewserial)

        let module = [];
        if (filteredModulename && filterednewserial) {
            for (let index = 0; index < filteredModulename.length; index++) {
                module.push({ name: filteredModulename[index], serial: filterednewserial[index] })
            }
        }
        console.log("module", module)

        let body = {
            "code": data.code,
            "serial": data.serial,
            "warrantyStartDate": moment(data.warrantyStart).format('YYYY-MM-DD'),
            "warrantyEndDate": moment(data.warrantyEndDate).format('YYYY-MM-DD'),
            "calibrationDate": moment(data.caliberation).format('YYYY-MM-DD'),
            "modules": module,
            "site": data.site
        }
        let machine_post_result = await api(
            APIS.machine_response+`${editData.id}/`,
            "PUT",
            body)

            console.log(machine_post_result)
            if(machine_post_result.status===200){
                props.history.push("/gx-machine")
            }
    }

    const onAdd = async (data) => {
        console.log("Add data", data)
        console.log("Add warrantyStart", warrantyStart)
        console.log("Add warrantyEnd", warrantyEnd)
        // console.log("Add caliberationDate", caliberationDate)

        var filteredModulename = data?.name?.filter(Boolean);
        console.log("filtered", filteredModulename)

        var filterednewserial = data?.newserial?.filter(Boolean);
        console.log("filtered", filterednewserial)

        let module = [];
        if (filteredModulename && filterednewserial) {
            for (let index = 0; index < filteredModulename.length; index++) {
                module.push({ name: filteredModulename[index], serial: filterednewserial[index] })
                // const element = array[index];
            }
        }
        console.log("module", module)

        let body = {
            "code": data.code,
            "serial": data.serial,
            "warrantyStartDate": moment(data.warrantyStart).format('YYYY-MM-DD'),
            "warrantyEndDate": moment(data.warrantyEndDate).format('YYYY-MM-DD'),
            "dateInstalled": moment(data.installationDate).format('YYYY-MM-DD'),
            "lastOperated": operatedDate,
            "calibrationDate": moment(data.caliberation).format('YYYY-MM-DD'),
            "modules": module,
            "site": data.site
        }
        let machine_post_result = await api(
            APIS.machine_response,
            "POST",
            body)

            console.log(machine_post_result)
            if(machine_post_result.status===201){
                props.history.push("/gx-machine")
            }
    }

    const onSubmit = data => {
        editData ? onEdit(data) : onAdd(data)
    };

    function createArrayWithNumbers(length) {
        return Array.from({ length }, (_, k) => k);
    }

    const addModule = () => {
        setSize(size + 1)
    }
    const removeModule = () => {
        if (size > 0) {
            setSize(size - 1)
        }
    }

    return (
        <ContainerBox title={editData ? "Edit GxMachine" : "Add GxMachine"}>

            <div className="addgxmachine">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="addgxmachine-form">

                        <div className="addgxmachine-form-site form">
                            <label>GX-SITE</label>
                            <select name="site" ref={register({ required: true })} className={`${errors.site && 'showerror'}`} >
                                {!editData && <option value={null} >Select</option>}
                                {
                                    siteList.length > 0 && siteList.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index} selected={editData?.site?.id === item?.id} >{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className="addgxmachine-form-row">

                            <div className="addgxmachine-form-code form">
                                <label>Code</label>
                                <input name="code" defaultValue={editData ? editData.code : null} ref={register({ required: true })} className={`${errors.code && 'showerror'} `} />
                            </div>

                            <div className="addgxmachine-form-serial form" >
                                <label>Serial Number</label>
                                <input name="serial" defaultValue={editData ? editData.serial : null} ref={register({ required: true })} className={`${errors.serial && 'showerror'} `} />
                            </div>
                        </div>

                        <div className="addgxmachine-form-row">
                            <div className="addgxmachine-form-startdate date" >
                                <label>GX Warranty Start Date</label>
                                {/* <MaterialUIPickers DateChange={handleWarrantyStartDate}  initialDate={editData ? editData.warrantyStartDate : null}/> */}

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Controller
                                        name="warrantyStart"
                                        control={control}
                                        defaultValue={editData ? new Date(editData.warrantyStartDate) : null}
                                        rules={{ required: true }}
                                        as={
                                            <KeyboardDatePicker
                                                label="Event date"
                                                format="yyyy-MM-dd"
                                                margin="normal"
                                                value={warrantyStart}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                            />
                                        }
                                    />
                                    {errors.warrantyStart && <div>error</div>}
                                </MuiPickersUtilsProvider>

                            </div>
                            <div className="addgxmachine-form-startdate date" >
                                <label>GX Warranty End Date</label>
                                {/* <MaterialUIPickers DateChange={handleWarrantyEndDate} initialDate={editData ? editData.warrantyEndDate : null} /> */}
                            
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Controller
                                        name="warrantyEndDate"
                                        control={control}
                                        defaultValue={editData ? new Date(editData.warrantyEndDate) : null}
                                        rules={{ required: true }}
                                        as={
                                            <KeyboardDatePicker
                                                label="Event date"
                                                format="yyyy-MM-dd"
                                                margin="normal"
                                                value={warrantyEnd}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                            />
                                        }
                                    />
                                    {errors.warrantyEndDate && <div>error</div>}
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>

                        <div className="addgxmachine-form-row">
                            <div className="addgxmachine-form-startdate date">
                                <label>Calliberation Date</label>
                                {/* <MaterialUIPickers DateChange={handleCaliberationDate}  /> */}
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Controller
                                        name="caliberation"
                                        control={control}
                                        defaultValue={editData ? new Date(editData.calibrationDate) : null}
                                        rules={{ required: true }}
                                        as={
                                            <KeyboardDatePicker
                                                label="Event date"
                                                format="yyyy-MM-dd"
                                                margin="normal"
                                                value={caliberation}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                            />
                                        }
                                    />
                                    {errors.caliberation && <div>error</div>}
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        {!editData &&
                            <div className="addgxmachine-form-row" >
                                <div className="addgxmachine-form-startdate date">
                                    <label>Installation Date</label>
                                    {/* <MaterialUIPickers DateChange={handleInstallationDate}   /> */}
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Controller
                                        name="installationDate"
                                        control={control}
                                        defaultValue={editData ? new Date(editData.dateInstalled) : null}
                                        rules={{ required: true }}
                                        as={
                                            <KeyboardDatePicker
                                                label="Event date"
                                                format="yyyy-MM-dd"
                                                margin="normal"
                                                value={installationDate}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                            />
                                        }
                                    />
                                    {errors.installationDate && <div>error</div>}
                                </MuiPickersUtilsProvider>
                                </div>
                                <div className="addgxmachine-form-startdate date">
                                    <label>Last Operated</label>
                                    {/* <MaterialUIPickers DateChange={handleOperatedDate}  /> */}
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Controller
                                        name="operatedDate"
                                        control={control}
                                        defaultValue={editData ? new Date(editData.lastOperated) : null}
                                        rules={{ required: true }}
                                        as={
                                            <KeyboardDatePicker
                                                label="Event date"
                                                format="yyyy-MM-dd"
                                                margin="normal"
                                                value={operatedDate}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                            />
                                        }
                                    />
                                    {errors.operatedDate && <div>error</div>}
                                </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        }


                        <div className="addgxmachine-form-row">
                            <Button type="button" onClick={addModule} variant="contained" color="primary" className="addgxmachine-form-button">
                                ADD Module
                            </Button>
                            {size > 0 &&
                                <Button type="button" onClick={removeModule} variant="contained" color="secondary" className="addgxmachine-form-button">
                                    Remove
                                </Button>}
                        </div>

                        {createArrayWithNumbers(size).map(index => {
                            return (
                                <div className="addgxmachine-form-row">

                                    <div className="form" >
                                        <label>Name</label>
                                        <input name={`name[${index}]`} defaultValue={editData?.modules.length ? editData.modules[index].name : null} ref={register({ required: true })} />
                                    </div>

                                    <div className="form" >
                                        <label>Serial Number</label>
                                        <input name={`newserial[${index}]`} defaultValue={editData?.modules.length ? editData.modules[index].serial : null} ref={register({ required: true })} />
                                    </div>

                                </div>

                            );
                        })}
                        <div className="addgxmachine-form-row">

                            <Button type="submit" variant="contained" color="primary" >submit</Button>

                        </div>
                    </div>
                </form>

            </div>
        </ContainerBox>
    );
}

export default AddGxMachine;