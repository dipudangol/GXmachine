import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { api } from "../../helpers/Api.helper";
import { APIS } from "../../config/Api.config"
import ContainerBox from "../common/hoc/ContainerBox.hoc";
import DisplayDataBox from "./displayDataBox/DisplayDataBox";

const MachineStatusPage = () => {
    const [machineStatus,setMachineStatus]=useState();
    const fetch = async () => {
        let machine_status_response = await api(APIS.machine_status_result)
        // console.log("machine_status_response",machine_status_response)
        setMachineStatus(machine_status_response.data)
    }
    useEffect(() => {
        fetch();
    },[]);

    const onTicketCreate=()=>{
        toast.success('Ticket Created Successfully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
            fetch();
    }

    console.log("machineStatus",machineStatus)
    return (
        <ContainerBox title="Machine Status">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                />

            <div className="machinestatus">
                MachineStatus Page
            </div>
            <div style={{
                 display:'grid',
                 gridTemplateColumns:'repeat(auto-fit, minmax(500px, 1fr))',
                 columnGap:20,
                 rowGap:20
            }}>
                <DisplayDataBox data={machineStatus?.delay_7_days} title="Delay More than 7 days" toast={onTicketCreate}/>
                <DisplayDataBox data={machineStatus?.delay_5_6_days} title="Delay for 5-6 days" toast={onTicketCreate}/>
                <DisplayDataBox data={machineStatus?.delay_3_4_days} title="Delay for 3-4 days"toast={onTicketCreate}/>
                <DisplayDataBox data={machineStatus?.delay_1_2_days} title="Delay for 1-2 days" toast={onTicketCreate}/>

            </div>
        </ContainerBox>
    )
}

export default MachineStatusPage;