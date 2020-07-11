import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table'
import { withLink } from "../../dgenerate/core/hocs"
import ContainerBox from "../common/hoc/ContainerBox.hoc";
import { APIS } from "../../config/Api.config";
import { api } from "../../helpers/Api.helper";
import { Button } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { BASE_URL } from "../../config/Config";

const GxmachinePage = ({ navigation }) => {
    const { routes, navigate } = navigation
    const [tableDataArray, setTableDataArray] = useState()

    
    const fetch = async (event, newPage=1) => {
        let machine_result = await api(APIS.machine_response+`?page=${newPage}`)
        console.log(machine_result.data)
        setTableDataArray(machine_result.data)
    }

    useEffect(() => {
        fetch()
    }, [])

    const toEditpage = (datas) => {
        navigate({
            pathname: routes["GX Machine"].path+"/edit/"+datas.id,
            state: datas
        })
    }
    return (
        <ContainerBox title="Gx Machine">

            <div className="gxmachine">

            <button onClick={() => navigate(routes["Add GxMachine"].path)}>
                    Add
            </button>

            <MaterialTable
                title="GX MACHINE LIST"
                columns={[
                    { title: 'Code', field: 'code' },
                    { title: 'Serial No.', field: 'serial' },
                    { title: 'Site', field: 'site.name' },
                    { title: 'No. of Modules', field: 'modules.length' },
                ]}
                data={tableDataArray?.results}
                // data={(query) =>
                //     api(
                //       APIS.machine_response +
                //         `?page=${query.page + 1}`
                //     ).then((result) => ({
                //       data: result.results,
                //       page: query.page,
                //       totalCount: parseInt(result.count),
                //     }))
                //   } 
                
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => toEditpage(rowData)
                    }
                ]}
                components={{
                    Action: props => (
                        <Button
                            onClick={(event) => props.action.onClick(event, props.data)}
                            color="primary"
                            variant="contained"
                            style={{ textTransform: 'none', background: 'green' }}
                            size="small"
                        >
                            Edit
                    </Button>
                    )
                }}
                options={{
                    actionsColumnIndex: -1,
                    emptyRowsWhenPaging: false,
                    search: false,
                    paging: false,
                    // pageSizeOptions:[5,10],
                    // pageSize:10
                }}
            />
 <div style={{width:'100%',display:'flex'}}>
                <Pagination style={{ marginLeft:'auto',marginTop:20,display:'inline-block'}} count={ Math.ceil(tableDataArray?.count/10)} boundaryCount={1} variant="outlined" shape="rounded" onChange={fetch} />
            </div>
            {/* <Button disabled={!tableDataArray?.previous} color="primary" variant="contained" onClick={() => fetch(tableDataArray.previous.slice(31))}>prev</Button>

            <Button disabled={!tableDataArray?.next} color="primary" variant="contained" onClick={() => fetch(tableDataArray.next.slice(31))}>next</Button> */}
        </div>
    </ContainerBox>
    )
}

export default withLink(GxmachinePage);
