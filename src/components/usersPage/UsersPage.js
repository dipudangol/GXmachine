import React, { useState, useEffect } from 'react';
import ContainerBox from '../common/hoc/ContainerBox.hoc';
import { Button } from "@material-ui/core";
import { withLink } from "../../dgenerate/core/hocs/links.hoc";
import { getByPlaceholderText } from '@testing-library/react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { api } from '../../helpers/Helpers';
import { APIS } from '../../config/Config';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const UsersPage = ({ navigation }) => {
    const classes = useStyles();
    const { navigate, routes } = navigation;
    const [userData, setUserData] = useState();
    const { register, handleSubmit, errors, watch } = useForm();

    const userDetailHandler = (data) => {
        navigate({
            pathname: routes["Users"].path+'/'+ data.id,
        })
    }
    const editUser = (data) => {
        console.log("Lets Edit")
        navigate({
            pathname: routes["Users"].path + "/edit/" + data.id,
            state: data
        })
    }
    const deleteUser = async(data) =>{
        console.log("DELETE")
        let res=await api(APIS.users+data.id,"DELETE")
        window.location.reload();
    }


    const fetchUser = async () => {
        const res = await api(APIS.users);
        setUserData(res.data.results);
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <ContainerBox title="Users">
            <div>
                Users Page
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={() => navigate(routes["Add Users"].path)} variant="contained" color="primary">
                        Add Users
                    </Button>

                    <div className="gxsite-select form">
                        <form onSubmit={handleSubmit(onsubmit)}>
                            <input name="searchvalue" ref={register()} placeholder="Search" />
                            <Button type="submit" variant="contained" color="primary">search</Button>
                        </form>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>S.N</TableCell>
                                <TableCell align="right">username</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">email</TableCell>
                                <TableCell align="right">User Type</TableCell>
                                <TableCell align="right">Province</TableCell>
                                <TableCell align="right">District</TableCell>
                                <TableCell align="right">Municipality</TableCell>
                                <TableCell align="right">Ward</TableCell>
                                <TableCell align="right">Health Facility</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData && userData.map((item, index) => (
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="right" style={{ cursor: "pointer" }} onClick={() => userDetailHandler(item)} key={index}>{item.username}</TableCell>
                                    <TableCell align="right">{item.first_name}</TableCell>
                                    <TableCell align="right">{item.last_name}</TableCell>
                                    <TableCell align="right">{item.email}</TableCell>
                                    <TableCell align="right">{item.user_type}</TableCell>
                                    <TableCell align="right">{item.province}</TableCell>
                                    <TableCell align="right">{item.district}</TableCell>
                                    <TableCell align="right">{item.municipality}</TableCell>
                                    <TableCell align="right">{item.wards}</TableCell>
                                    <TableCell align="right">{item.hi}</TableCell>
                                    <Button variant="contained" onClick={() => { editUser(item) }} color="primary">Edit</Button> <Button onClick={()=>{ deleteUser(item) }} color="secondary">Delete</Button>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </ContainerBox>

    )
}
export default withLink(UsersPage);