import React, { useState, useEffect } from "react";
import ContainerBox from "../common/hoc/ContainerBox.hoc";
import { Button } from "@material-ui/core";
import { withLink } from "../../dgenerate/core/hocs/links.hoc";
import MaterialTable from 'material-table';
import { api } from "../../helpers/Api.helper";
import { APIS } from "../../config/Api.config";
import Pagination from '@material-ui/lab/Pagination';

const TicketPage = ({ navigation }) => {
    const  {routes,navigate}=navigation;   
    const [tableDataArray, setTableDataArray] = useState()

    const fetch = async (event, newPage=1) => {
        let ticket_list = await api(APIS.ticket_list+`?page=${newPage}`)
        console.log(ticket_list)        
        setTableDataArray(ticket_list.data)
    }

    useEffect(() => {
        fetch()
    }, [])

    const addTicketHandler = () => {
        navigate(routes["Add Ticket"].path)
    }

    const toEditpage = (datas) => {
        console.log('Redirect to Add Ticket Page with selected id')
        navigate({
            pathname: routes["Tickets"].path+"/edit/"+datas.id,
            state: datas
        })
    }

    const toDeletepage=async(datas)=>{
        console.log("Call DELETE Api on Particular id.",datas)
        let site_list_result=await api(
            APIS.ticket_list+`${datas.id}/`,
            "DELETE",
            {
                Accept: "application/json",
                "Content-Type": "application/json", 
            })
            console.log("site_list_result",site_list_result)
            fetch()
            // site_list_result&& props.history.push("/ticket")
    }
    return (
        <ContainerBox title="Tickets">
            <div className="ticket">
                Ticket Page
                <Button onClick={addTicketHandler} variant="contained" color="primary">Add Ticket</Button>
                <MaterialTable
                    title="Tickets"
                    columns={[
                        { title: 'ID', field: 'id' },
                        { title: 'Date', field: 'created_at' },
                        { title: 'Site', field: 'site.name' },
                        { title: 'Description', field: 'description' },
                        { title: 'Status', field: 'status' }
                    ]}
                    
                    data={tableDataArray?.results}

                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClickEdit: (event, rowData) => toEditpage(rowData),
                            onClickDelete: (event, rowData) => toDeletepage(rowData)
                        }
                    ]}
                    components={{
                        Action: props => (
                            <>
                                <Button
                                    onClick={(event) => props.action.onClickEdit(event, props.data)}
                                    color="primary"
                                    variant="contained"
                                    style={{ textTransform: 'none', background: 'green' }}
                                    size="small"
                                >
                                    Edit
                            </Button>

                                <Button
                                    onClick={(event) => props.action.onClickDelete(event, props.data)}
                                    color="primary"
                                    variant="contained"
                                    style={{ textTransform: 'none', background: 'red' }}
                                    size="small"
                                >
                                    Delete
                            </Button>
                            </>
                        )
                    }}

                    options={{
                        actionsColumnIndex: -1,
                        emptyRowsWhenPaging: false,
                        search: false,
                        paging: false
                        // pageSizeOptions: [5, 10],
                        // pageSize: 10
                    }}
                />
                 <div style={{width:'100%',display:'flex'}}>
                <Pagination style={{ marginLeft:'auto',marginTop:20,display:'inline-block'}} count={ Math.ceil(tableDataArray?.count/10)} boundaryCount={1} variant="outlined" shape="rounded" onChange={fetch} />
            </div>
            </div>
        </ContainerBox>
    )
}

export default withLink(TicketPage);