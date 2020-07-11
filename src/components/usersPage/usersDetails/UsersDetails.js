import React,{useState, useEffect} from 'react';
import ContainerBox from '../../common/hoc/ContainerBox.hoc';
import { api } from '../../../helpers/Helpers';
import { APIS } from '../../../config/Api.config';
const UsersDetails=(props)=>{
    const [userData,setUserData]=useState();
    const { match }=props;
    const { params }=match;

    const fetchUser = async() =>{
        const res= await api(APIS.users+params.id+'/')
        setUserData(res.data);
    }
    useEffect(()=>{
        fetchUser();
    },[])
    
    return(
        <ContainerBox>
            <div>
                <p>Users Detail Page</p>
                {userData && <p>Username:{userData.username}</p>}
            </div>
        </ContainerBox>
    )
}
export default UsersDetails;