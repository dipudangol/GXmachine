import React, { useState } from 'react';

import { useForm } from "react-hook-form";
import { Button } from '@material-ui/core'
import ContainerBox from '../../common/hoc/ContainerBox.hoc';

import { APIS } from "../../../config/Api.config";
import { api } from "../../../helpers/Api.helper";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
const EditGxSite = (props) => {
    const editData = props.location?.state
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        console.log("data", data)
        let body={
                id: 1,
                name: data.name,
                longitude: data.longitude,
                latitude: data.latitude,
                contactName: data.contactName,
                contactPhone:  data.contactPhone,
                contactEmail:  data.contactEmail,
                province:  data.province,
                machine_count:  data.machine_count,
            
        }
        let edit_response = await api(APIS.sites_response+`${editData.id}/`,"PUT",body,
            {
                'Authorization': 'Token 1c1988b02f174b0fb95080e6b73275ebb18a1cde'
            })

        console.log("window",edit_response)
        edit_response&&
        toast.success('Site Updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            });
    };
    console.log("windowprops", props)

    return (
        <ContainerBox title={editData?"Edit Gx Site":"Add Gx Site"}>
            <div className="addgxsite">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="addgxsite-form">
                        {/* <div className="addgxsite-form-row"> */}

                            <div className="addgxsite-form-name form">
                                <label>Name</label>
                                <input name="name" ref={register({ required: true })} defaultValue={editData ? editData.name : null} className={`${errors.name && 'showerror'} `} />
                            </div>
                        {/* </div> */}
                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-site form">
                                <label>Province</label>
                                <select name="province" defaultValue={editData ? editData.province : null} ref={register({ required: true })} className={`${errors.province && 'showerror'}`} >
                                    <option value="">Select </option>
                                    <option value="1">Province 1</option>
                                    <option value="2">Province 2</option>
                                    <option value="3">Province 3</option>
                                    <option value="4">Province 4</option>
                                    <option value="5">Province 5</option>
                                    <option value="6">Province 6</option>
                                    <option value="7">Province 7</option>
                                </select>
                            </div>
                            <div className="addgxsite-form-machine form">
                                <label>No. of Machine</label>
                                <input name="machine_count" type="number" defaultValue={editData ? editData.machine_count : null}ref={register({ required: true })} className={`${errors.machine_count && 'showerror'} `} />
                            </div>
                            
                        </div>
                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-latitude form">
                                <label>Latitude</label>
                                <input name="latitude" type="number" defaultValue={editData ? editData.latitude : null}ref={register({ required: true })} className={`${errors.latitude && 'showerror'} `} />
                            </div>
                            <div className="addgxsite-form-longitude form">
                                <label>Longitude</label>
                                <input name="longitude" type="number" defaultValue={editData ? editData.longitude : null} ref={register({ required: true })} className={`${errors.longitude && 'showerror'} `} />
                            </div>

                        </div>

                        
                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-contactname form">
                                <label>Contact Name</label>
                                <input name="contactName" defaultValue={editData ? editData.contactName : null} ref={register()} className={`${errors.contactName && 'showerror'} `} />
                            </div>
                            <div className="addgxsite-form-contactphone form">
                                <label>Contact Phone</label>
                                <input name="contactPhone" type="number" defaultValue={editData ? editData.contactPhone : null} ref={register()} className={`${errors.contactPhone && 'showerror'} `} />
                            </div>
                        
                        </div>
                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-email form">
                                <label>Contact Email</label>
                                <input name="contactEmail" defaultValue={editData ? editData.contactEmail : null} ref={register()} className={`${errors.contactEmail && 'showerror'} `} />
                            </div>                        
                        </div>
                        

                        <div className="addgxsite-form-row">

                            <Button type="submit" variant="contained" color="primary" >submit</Button>

                        </div>
                    </div>
                </form>

            </div>
        </ContainerBox>
    );
}

export default EditGxSite;