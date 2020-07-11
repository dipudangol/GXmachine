import React from 'react';
import { withLink } from "../../../dgenerate/core/hocs";
import { APIS } from "../../../config/Api.config";
import { api } from "../../../helpers/Api.helper";
const DisplayDataBox = ({ data, title,navigation,toast }) => {
    const {routes,navigate}=navigation;


    const directToEdit=(datas)=>{
        // console.log("directToEdit",datas)
        navigate({
            pathname: routes["Machine Status"].path+"/edit/"+datas.id,
            state: datas.ticket
        })
        // navigate(routes["Edit MachineStatus"].path)
    }

    const onTicketCreate=async(id)=>{
        console.log("item",id);
        let createTicket= await api(
            APIS.ticket_list,
            "POST",
            {
                description: "",
                site: id,
                status: "picked"
            })

            console.log("add_ticket_result",createTicket)
            if(createTicket.status===201){
                toast();
            }
        
        
    }
    return (
        <div className="delay" >
            <h4>
                {title}
            </h4>
            <div>
                {data && data.map((item, index) => {
                    return <div className="delay-list" key={index}>
                        <div className="delay-list-row" >
                            <div>
                                {item?.site?.name} : {item?.code}
                            </div>
                            {item?.ticket ?
                            <div className="delay-list-row-content"  >
                                <div  style={{ display: 'flex' }}>
                                    <div className="delay-list-row-content-status" >
                                        Status: <span >{item?.ticket?.status}</span>
                                    </div>
                                    {item?.ticket?.description && <div className="delay-list-row-content-description" >
                                        Description: <span >{item?.ticket?.description}</span>
                                    </div>}
                                </div>
                                <div>

                                    <div className="delay-list-row-content-edit" onClick={()=>directToEdit(item)}>Edit Ticket</div>
                                </div>
                            </div>
                            :
                            <div>

                                <div className="delay-list-row-create" onClick={()=>onTicketCreate(item?.site?.id)}>Create Ticket</div>
                            </div>
                            }
                        </div>
                        <hr /></div>
                })}
            </div>
        </div>
    );
}

export default withLink(DisplayDataBox);