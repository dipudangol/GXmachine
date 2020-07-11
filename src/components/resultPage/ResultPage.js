import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from "react-bootstrap/Table";
import ContainerBox from "../common/hoc/ContainerBox.hoc";
import { Button,Grid } from "@material-ui/core";
import { withLink } from "../../dgenerate/core/hocs/links.hoc";
import MaterialUIPickers from "../common/datepicker/Datepicker.common";
import moment from "moment";
import { api } from "../../helpers/Api.helper";
import { APIS } from "../../config/Api.config";
import Pagination from '@material-ui/lab/Pagination';

const ResultPage = () => {
    const [fromDate,setFromDate]=useState("");
    const [toDate,setToDate]=useState("");
    const [tableData,setTableData]=useState();
    const [tableDataArray, setTableDataArray] = useState()
    const [siteList, setSiteList] = useState([])
    const [siteValue, setSiteValue] = useState()
    const [search, setSearch] = useState(false)
    console.log("Site List",siteList)

    const fetchSiteList = async () => {
        let site_list_result = await api(APIS.site_list).catch(error=>{console.log(site_list_result.error)})
        setSiteList(site_list_result.data)
    }
    const fetchReport = async() =>{
        const response=await api(APIS.get_report_data,"POST")
        //console.log("Response",response)
        setTableData(response.data)
    }

    const fetchResult = async (newPage=1) => {
        console.log("search=false", newPage)
        let machine_result = await api(APIS.machine_result+`?page=${newPage}`)
        console.log(machine_result)
        setTableDataArray(machine_result.data)
    }
    
    useEffect(()=>{
        fetchReport();
        fetchResult();
        fetchSiteList();
    },[])

    const page = async (event, newPage=1) => {
        search?
            searchResult(newPage)
       :
            fetchResult(newPage)
    }

    


    //Set From Date
    const fromDateChangeHandler=(data)=>{
        console.log('From Change',moment(data).format('YYYY-MM-DD'))
        setFromDate(moment(data).format('YYYY-MM-DD'));
    }

    //Set To Date
    const toDateChangeHandler=(data)=>{
        
        console.log('To Change',moment(data).format('YYYY-MM-DD'))
        setToDate(moment(data).format('YYYY-MM-DD'));
    }

    const searchHandler =()=>{
        console.log('Data According to date');
        (toDate||fromDate||siteValue)&& setSearch(true);
        (toDate||fromDate)&&setSearch(true)&&searchReport();
        (toDate||fromDate||siteValue)&& searchResult();

    }

    const searchReport = async() =>{
        console.log("seacrh Report")
        const response=await api(
            APIS.get_report_data,
            "POST",
            {
                end_date: toDate,
                start_date: fromDate,
            })
        console.log("Response",response)
        setTableData(response.data)
    }

    const searchResult = async (newPage=1) => {
        console.log("seacrh Result")
        let machine_result = await api(
            APIS.machine_result+`search/?page=${newPage}`,
            "POST",
            {
                end_date: toDate,
                start_date: fromDate,
                site_id:siteValue
            })
        console.log(machine_result)
        setTableDataArray(machine_result.data)
    }

    const [mtbData, setMtbData] = useState({
    })

    const changevalue = (e) => {
        console.log(e.target.value)
        setSiteValue(e.target.value)
    }

    return (
        <ContainerBox title="Results">
            <div className="result">
                Result Page
            
                <Grid container justify="space-around">
                <MaterialUIPickers DateChange={fromDateChangeHandler} label="From" /* toDateChange={toDateChangeHandler} */ />
                <MaterialUIPickers DateChange={toDateChangeHandler} label="To" /* toDateChange={toDateChangeHandler} */ />
                <select onChange={changevalue}>
                                <option value={null} >Select Site</option>
                                {
                                    siteList.length > 0 && siteList.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.name}</option>
                                            )
                                        })
                                    }
                                    
                                </select>
            </Grid>
            <Button onClick={searchHandler}>Go</Button>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>MTB ND</th>
                            <th>MTB+RIF S</th>
                            <th>MTB+RIF R</th>
                            <th>MTB+RIF I</th>
                            <th>Error</th>
                            <th>Invalid</th>
                            <th>No Results</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{tableData && tableData.MTB_NOT_DETECTED}</td>
                            <td>{tableData && tableData.MTB_RIF_S}</td>
                            <td>{tableData && tableData.MTB_RIF_R}</td>
                            <td>{tableData && tableData.MTB_RIF_I}</td>
                            <td>{tableData && tableData.ERROR}</td>
                            <td>{tableData && tableData.INVALID}</td>
                            <td>{tableData && tableData.NO_RESULT}</td>
                        </tr>
                    </tbody>
                </Table>
                <MaterialTable
                    title="MACHINE RESULTS"
                    columns={[
                        { title: 'Site', field: 'machine.site.name' },
                        { title: 'Machine ID', field: 'machine.code' },
                        { title: 'Instrument Serial Number', field: 'instrument_serial_number' },
                        { title: 'Module Serial Number', field: 'module_serial_number' },
                        { title: 'MTB Result', field: 'mtb_result' },
                        { title: 'RIF Resistance Result', field: 'rif_result' },
                        { title: 'Sample ID', field: 'sample_id' },
                        { title: 'Test Date', field: 'test_date' },
                        { title: 'Error', field: 'error' },
                        { title: 'Version', field: 'software_version' }
                    ]}
                    data={tableDataArray?.results}
                   
                    options={{
                        actionsColumnIndex: -1,
                        emptyRowsWhenPaging: false,
                        search: false,

                        pageSizeOptions:[20,50,100]   ,
                        pageSize:20,
                        paging:false

                    }}
                />
                <div style={{width:'100%',display:'flex'}}>
                    <Pagination style={{ marginLeft:'auto',marginTop:20,display:'inline-block'}} count={ Math.ceil(tableDataArray?.count/100)} boundaryCount={1} variant="outlined" shape="rounded" onChange={page} />
                </div>
            </div>
        </ContainerBox >
    )
}
export default withLink(ResultPage);