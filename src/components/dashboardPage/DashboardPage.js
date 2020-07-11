import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../helpers/Api.helper";
import { APIS } from "../../config/Api.config"

import { withLink } from "../../dgenerate/core/hocs"
import ShowDataCard, { ShowListCard } from "./showDataBox/ShowDataBox";
import NepalMap from "./nepalMap/NepalMap";
import ContainerBox from '../common/hoc/ContainerBox.hoc';
const DashboardPage = ({ navigation }) => {
  let list = [
    'NATIONAL TUBERCULOSIS CENTRE_BHAKTAPUR : NTCGX01',
    'TIKAPUR HOSPITAL_ KAILALI : THKGX01',
    'DAMAULI DISTRICT HOSPITAL_ TANAHU_TANAHU : DDHTGX01']

  const [totalMachineResults, setTotalMachineResults] = useState();
  const [totalGxMachine, setTotalGxMachine] = useState();
  const [totalGxSites,setTotalGxSites]=useState();
  const [expiringMachine,setExpiringMachine]=useState([]);
  const [calibrationMachine,setCalibrationMachine]=useState([]);
  useEffect(() => {
    async function fetch() {
      let total_machine_result_response = await api(APIS.total_machine_results);
      console.log(total_machine_result_response)
      setTotalMachineResults(total_machine_result_response.data.count)
      let total_gx_machines_response = await api(APIS.total_gx_machines)
      setTotalGxMachine(total_gx_machines_response.data.count)
      let total_gx_sites_response = await api(APIS.total_gx_sites)
      setTotalGxSites(total_gx_sites_response.data.count)
      let expiring_machine_response = await api(APIS.expiring_machine)
      setExpiringMachine(expiring_machine_response.data)
      let calibration_machine_response= await api(APIS.calibration_machine)
      console.log(calibration_machine_response.data)
      setCalibrationMachine(calibration_machine_response.data)
    }
    fetch();
  },[]);
  return (
    <ContainerBox>
      <div className="dashboard">
        {/* Dashboard Page
            <button onClick={ ()=>navigate(routes.Dashboard.path+"/"+1)}>
              detail
            </button>
           */}
        <NepalMap />

        <div className="dashboard-cards">
          <ShowDataCard title="Total Machine Results" data={totalMachineResults} />
          <ShowDataCard title="Total No of GX Machines" data={totalGxMachine} />
          <ShowDataCard title="Total GX Sites" data={totalGxSites} />
          <ShowListCard title="GX machine warranty expiring in 6 months" data={expiringMachine} />
          <ShowListCard title="GX machine that needs calibration in 6 months" data={calibrationMachine} />
          <ShowListCard title="GX Machine Running Today" data={false} />
          <ShowDataCard title="ERROR COUNT" data={totalMachineResults} />
          <ShowDataCard title="RIF Resistant COUNT" data={totalMachineResults} />
        </div>


      </div>
    </ContainerBox>
  )
}

export default withLink(DashboardPage);