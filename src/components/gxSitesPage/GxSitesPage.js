import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { withLink } from "../../dgenerate/core/hocs"
import ContainerBox from "../common/hoc/ContainerBox.hoc";
import { APIS } from "../../config/Api.config";
import { api } from "../../helpers/Api.helper";
import MaterialTable from 'material-table';
import { Button } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
const GxSitesPage = ({ navigation }) => {
    const { navigate, routes } = navigation
    
    const { register, handleSubmit, errors } = useForm();

    const [tableDataArray, setTableDataArray] = useState()
    const [searchValue, setSearchValue] = useState("")
    const [search, setSearch] = useState(false)

    const page = async (event, newPage = 1) => {
        search ?
            onsearchSite(searchValue,newPage)
            :
            fetch(newPage)
    }

    const fetch = async (newPage = 1) => {
        let site_result = await api(APIS.sites_response + `?page=${newPage}`,"","",{'Authorization': 'Token a6d3f43b4e7df57d2b55582cd388b40321cbd2ca'})
        setTableDataArray(site_result.data)
    }

    const onsubmit = (data) => {
        
        if (data.searchvalue){
            setSearch(true)
            setSearchValue(data.searchvalue)
            onsearchSite(data.searchvalue)
        }
    }

    const onsearchSite = async (name,newPage=1) => {
        console.log("onsearchSitename",name)
        let site_result = await api(
            APIS.sites_response + `search/?page=${newPage}`,
            "POST",
            { name: name},
            {
                'Authorization': 'Token a6d3f43b4e7df57d2b55582cd388b40321cbd2ca'
            })
        console.log("onsearchSite",site_result.data)
        setTableDataArray(site_result.data)

    }

    useEffect(() => {
        fetch()
        // fetchSite()
    }, [])

    const toEditpage = (datas) => {
        navigate({
            pathname: routes["GX Sites"].path+"/edit/"+ datas.id,
            state: datas
        })
    }

    // const changevalue = (e) => {
    //     setSearchValue(e.target.value)
    // }


    return (
        <ContainerBox title="Gx Sites">
            <div className="gxsite">
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <Button onClick={() => navigate(routes["Add GxSite"].path)} variant="contained" color="primary">
                        Add
                    </Button>

                        <div className="gxsite-select form">
                    <form onSubmit={handleSubmit(onsubmit)}> 
                        <input name="searchvalue" ref={register()} placeholder="Search" />
                        <Button type="submit" variant="contained" color="primary">search</Button>
                    </form>
                        </div>
                </div>

                <MaterialTable
                    title="GX SITE LIST"
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Latitude', field: 'latitude' },
                        { title: 'Longitude', field: 'longitude' },
                        { title: 'Province', field: 'province' },
                        { title: 'Contact Number', field: 'contactName' },
                        { title: 'Contact Phone', field: 'contactPhone' },
                    ]}
                    data={tableDataArray?.results}
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
                        pageSizeOptions: [5, 10],
                        pageSize: 10,
                        paging: false,
                    }}
                />
                <div style={{ width: '100%', display: 'flex' }}>
                    <Pagination style={{ marginLeft: 'auto', marginTop: 20, display: 'inline-block' }} count={Math.floor(tableDataArray?.count / 10) + 1} boundaryCount={1} variant="outlined" shape="rounded" onChange={page} />
                </div>
            </div>
        </ContainerBox>
    )
}

export default withLink(GxSitesPage);