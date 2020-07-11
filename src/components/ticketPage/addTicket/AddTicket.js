import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ContainerBox from '../../common/hoc/ContainerBox.hoc';
import { Button } from '@material-ui/core'
import { api } from '../../../helpers/Helpers';
import { APIS } from '../../../config/Api.config';

const AddTicket = (props) => {
    const editData = props.location?.state;
    console.log("Incoming Data",props);
    
    const { register, handleSubmit, errors } = useForm();
    const [siteList,setSiteList]=useState([]);
    const [ticketDetail,setTicketDetail]=useState();
    
    const fetch = async () =>{
        let site_list_result=await api(APIS.site_list)
        setSiteList(site_list_result.data);
    }

    const fetchTicketDetail = async () =>{
        let ticket_detail=await api(APIS.ticket_list+`${editData.id}/`)
        console.log("ticket_detail",ticket_detail);
        if(ticket_detail.status===200){
            setTicketDetail(ticket_detail.data)
        }
    }

    useEffect(()=>{
        editData&&fetchTicketDetail()
        fetch()
    },[])
    console.log(siteList)

    const onEdit = async(data) => {
        let edit_ticket_result=await api(
            APIS.ticket_list+`${editData.id}/`,
            "PUT",
            {
                description: data.description,
                site: data.site,
                status: data.select
            })
            console.log("edit_ticket_result",edit_ticket_result)
            if(edit_ticket_result.status===200){
                props.history.goBack()
            }
    }

    const onAdd = async(data) => {
        let add_ticket_result=await api(
            APIS.ticket_list,
            "POST",
            {
                description: data.description,
                site: data.site,
                status: data.select
            })
            console.log("add_ticket_result",add_ticket_result)
            if(add_ticket_result.status===201){
                props.history.goBack()
            }
    }
    const onSubmit = async(data) => {
        console.log("data", data)
        editData?onEdit(data):onAdd(data)
    };

    console.log("editData",editData)
    return (
        <ContainerBox title={editData ? "Edit Ticket" : "Add Ticket"}>

            <div className="addgxmachine">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="addgxmachine-form">

                    <div className="editmachinestatus-form-site form">
                            <label>GX-SITE</label>
                            <select name="site" ref={register({ required: true })} className={`${errors.site && 'showerror'}`} >

                                {
                                    siteList.length > 0 && siteList.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index} selected={editData?.site?.id===item?.id}>{item.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>


                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-site form">
                                <label>Status</label>
                                <select name="select" defaultValue={editData ? editData.status : null} ref={register({ required: true })} className={`${errors.province && 'showerror'}`} >
                                    <option value="">Select </option>
                                    <option value="picked">Picked</option>
                                    <option value="working">Working</option>
                                    <option value="solved">Solved</option>
                                </select>
                            </div>
                        </div>

                        <div className="addgxsite-form-name form">
                            <label>Description</label>
                            <input name="description" ref={register({ required: true })} defaultValue={editData ? editData.description : null} className={`${errors.name && 'showerror'} `} />
                        </div>

                        <div className="addgxsite-form-row">
                            <Button type="submit" variant="contained" color="primary" >submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        </ContainerBox>

    )
}

export default (AddTicket);