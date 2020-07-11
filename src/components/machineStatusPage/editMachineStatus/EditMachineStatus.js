import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import ContainerBox from "../../common/hoc/ContainerBox.hoc";
import { APIS } from "../../../config/Api.config";
import { api } from "../../../helpers/Api.helper";


const EditMachineStatus = (props) => {
    const editData = props.location?.state
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        console.log("data", data)
    };
    const [siteList, setSiteList] = useState([])
    const fetch = async () => {
        let site_list_result = await api(APIS.site_list)
        setSiteList(site_list_result)
    }

    useEffect(() => {
        fetch()
    }, [])

    // console.log("stieList",siteList)
    return (
        <ContainerBox>

            <div className="editmachinestatus">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="editmachinestatus-form">

                        <div className="editmachinestatus-form-site form">
                            <label>GX-SITE</label>
                            <select name="site" ref={register({ required: true })} defaultValue={editData ? editData?.site?.id : null} className={`${errors.site && 'showerror'}`} >

                                {
                                    siteList.length > 0 && siteList.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                        <div className="editmachinestatus-form-row">

                            <div className="editmachinestatus-form-code form">
                                <label>Code</label>
                                <input name="code" ref={register({ required: true })} defaultValue={editData ? editData?.code : null} className={`${errors.code && 'showerror'} `} />
                            </div>

                            <div className="editmachinestatus-form-serial form" >
                                <label>Serial Number</label>
                                <input name="serial" ref={register({ required: true })} defaultValue={editData ? editData?.serial : null} className={`${errors.serial && 'showerror'} `} />
                            </div>
                        </div>
                        <div className="editmachinestatus-form-row">

                            <Button type="submit" variant="contained" color="primary" >submit</Button>

                        </div>
                    </div>
                </form>

            </div>
        </ContainerBox>
    );
}

export default EditMachineStatus;