import React, { useState, useEffect } from 'react';
import ContainerBox from '../../common/hoc/ContainerBox.hoc';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { api } from '../../../helpers/Api.helper';
import { APIS } from '../../../config/Api.config';
import Select from 'react-select';

const AddUsers = (props) => {
    const editData = props?.location?.state;
    console.log("Yes Edit", editData)
    //console.log("Province",editData.province[0]);
    const { register, handleSubmit, watch, errors } = useForm();
    const [province, setProvince] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [usedProvince, setUsedProvince] = useState([]);
    const [district, setDistrict] = useState();
    //const [selectedDistrict, setSelectedDistrict] = useState();
    const [usedDistrict, setUsedDistrict] = useState([]);
    const [municipality, setMunicipality] = useState();
    const [selectedMunicipality, setSelectedMunicipality] = useState();
    const [usedMunicipality, setUsedMunicipality] = useState([])
    const [ward, setWard] = useState();
    const [selectedWard, setSelectedWard] = useState();
    const [usedWard, setUsedWard] = useState();
    const [healthFacility, setHealthFacility] = useState();
    const [usedHealthFacility, setUsedHealthFacility] = useState([]);
    const [username, setUsername] = useState();

    const provinceChangeHandler = (selectedProvince) => {
        console.log("Check", selectedProvince)
        setSelectedProvince(selectedProvince);
    }
    const districtChangeHandler = (event) => {
        //setSelectedDistrict(event.target.value);
    }
    const municipalityChangeHandler = (event) => {
        //setSelectedMunicipality(event.target.value);
    }
    const wardChangeHandler = (event) => {
        setSelectedWard(event.target.value);
    }

    const fetchProvince = async () => {
        const res = await api(APIS.get_province)
        console.log("Provicne Data", res.data.results);
        setProvince(res.data.results);
    }
    usedProvince && console.log("Used Province", usedProvince)
    const fetchDistrict = async () => {
        console.log("Selected Province", selectedProvince)
        if (usedProvince && usedProvince.length > 0) {
            let test_array = []
            for (let i = 0; i < usedProvince.length; i++) {
                const res = await api(APIS.get_district + usedProvince[i].value + '/')
                console.log("<<<<<<<<<<<<<<<<<<<<<<<<<", res.data)
                test_array = test_array.concat(res.data);
                setDistrict(test_array);
            }
            console.log("Test Array District", test_array);
            //setUsedDistrict(test_array);
        }
    }

    usedDistrict && console.log("Used District", usedDistrict)
    const fetchMunicipality = async () => {
        if (usedDistrict && usedDistrict.length > 0) {
            let test_array = []
            for (let i = 0; i < usedDistrict.length; i++) {
                const res = await api(APIS.get_municipalites + usedDistrict[i].value + '/')
                test_array = test_array.concat(res.data);
                setMunicipality(test_array);
            }
            console.log("Test Array Municipality", test_array)
            //setMunicipality(res.data)
        }
    }

    usedMunicipality && console.log("Used Municipality", usedMunicipality)
    const fetchWard = async () => {
        if (usedMunicipality && usedMunicipality.length > 0) {
            let test_array = []
            for (let i = 0; i < usedMunicipality.length; i++) {
                const res = await api(APIS.get_ward + usedMunicipality[i].value + '/')
                console.log("##########################", res.data)
                test_array = test_array.concat(res.data);
                setWard(test_array)
            }

        }
    }

    usedWard && console.log("Used Ward", usedWard)
    const fetchHealthFacility = async () => {
        if (usedWard && usedWard.length > 0) {
            console.log("Goooooooood")
            let test_array = []
            for (let i = 0; i < usedWard.length; i++) {
                const res = await api(APIS.get_health_facility + usedWard[i].value + '/')
                console.log("*************************", res.data)
                test_array = test_array.concat(res.data)
                setHealthFacility(test_array)
            }
        }
    }

    useEffect(() => {
        fetchProvince();
        fetchDistrict();
        fetchMunicipality();
        fetchWard();
        fetchHealthFacility();
    }, [usedProvince, usedDistrict, usedMunicipality, usedWard, usedHealthFacility])

    const onsubmit = async (data) => {
        //province_data=[]
        let formData = new FormData();
        if (usedProvince.length > 0) {
            for (let i = 0; i < usedProvince.length; i++) {
                formData.append('province', usedProvince[i].value)
            }
        }
        if (usedDistrict.length > 0){
            for (let i = 0; i < usedDistrict.length; i++) {
                formData.append('district', usedDistrict[i].value)
            }
        } 
        if (usedMunicipality.length > 0){
            for (let i = 0; i < usedMunicipality.length; i++) {
                formData.append('municipality', usedMunicipality[i].value)
            }
        }
        if (usedWard.length > 0){
            for (let i = 0; i < usedWard.length; i++) {
                formData.append('wards', usedWard[i].value)
            }
        } 
        if (usedHealthFacility.length>0){
            for (let i = 0; i < usedHealthFacility.length; i++) {
                formData.append('hi', usedHealthFacility[i].value)
            }
        } 
        formData.append('username', data.username);
        formData.append('password', data.password);
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('email', data.email);
        formData.append('user_type', data.user_type);

        try {
            let req = null
            {
                editData ? req = await api(APIS.users + '2'+'/', "PUT", formData, {
                    Accept: "application/json",
                    "Content-Type": "multipart/formdata",
                }) : req = await api(APIS.users, "POST", formData, {
                    Accept: "application/json",
                    "Content-Type": "multipart/formdata",
                })
            }
            console.log('Here is status', req.status);
            if (req.status == 201) {
                alert('User Added');
                props.history.push('/users');
            }
            if (req.status == 200) {
                alert('User Edited');
                props.history.push('/users');
            }

        }
        catch (error) {
            console.log("Here", error)
        }

        // try {
        //     let response = await fetch('http://no-such-url');
        //   } catch(err) {
        //     alert(err); // TypeError: failed to fetch
        //   }

    }

    const cancelHandler = () => {
        props.history.push('/users');
    }
    //Multi Select Province Option Set
    let provinceOptions = []
    let temp_pro = []
    for (let p in province) {
        temp_pro[p] = { value: province[p].id, label: province[p].name.substring(2) }
        //console.log("Temporary Variable",temp_pro[p])
        provinceOptions.push(temp_pro[p])
    }
    console.log("Final Province", provinceOptions)
    //Multi Select District OptionSet
    let districtOptions = []
    let temp_dis = []
    for (let p in district) {
        temp_dis[p] = { value: district[p].id, label: district[p].name.substring(2) }
        //console.log("Temporary Variable", temp[p])
        districtOptions.push(temp_dis[p])
    }
    console.log("Final District", districtOptions)

    //Multi Select Municipality OptionSet
    let municipalityOptions = []
    let temp_mun = []
    for (let p in municipality) {
        temp_mun[p] = { value: municipality[p].id, label: municipality[p].name.substring(2) }
        //console.log("Temporary Variable", temp[p])
        municipalityOptions.push(temp_mun[p])
    }
    console.log("Final Municipality", municipalityOptions)

    //Multi Select Ward OptionSet
    let wardOptions = []
    let temp_ward = []
    for (let p in ward) {
        temp_ward[p] = { value: ward[p].id, label: ward[p].name.substring(2) }
        //console.log("Temporary Variable", temp[p])
        wardOptions.push(temp_ward[p])
    }
    console.log("Final Ward", wardOptions)

    //Multi Select Health Facility OptionSet
    let healthFacilityOptions = []
    let temp_healthFacility = []
    for (let p in healthFacility) {
        temp_healthFacility[p] = { value: healthFacility[p].id, label: healthFacility[p].name.substring(2) }
        //console.log("Temporary Variable", temp[p])
        healthFacilityOptions.push(temp_healthFacility[p])
    }
    console.log("Final healthFacility", healthFacilityOptions)

    usedProvince.length > 0 && console.log("=========================", usedProvince.length, usedProvince[0].value)

    // const provinceOptions=[
    //     {value:'0',label:'Province 1'},
    //     {value:'1',label:'Province 2'},
    //     {value:'2',label:'Province 3'},
    //     {value:'3',label:'Province 4'},
    //     {value:'4',label:'Province 5'},
    //     {value:'5',label:'Province 6'},
    //     {value:'6',label:'Province 7'}
    // ]
    //usedProvince[0] && console.log("I am here", usedProvince[0].value)

    return (
        <ContainerBox title={editData ? "Edit GX Users" : "Add GX Users"}>
            <div className="addgxsite">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                />

                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className="addgxsite-form">

                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-name form">
                                <label>Username</label>
                                <input name="username" defaultValue={editData ? editData.username : null} ref={register({ required: true })} className={`${errors.name && 'showerror'} `} />
                            </div>
                            <div className="addgxsite-form-name form">
                                <label>Password</label>
                                <input name="password" defaultValue={editData ? editData.password : null} ref={register({ required: true })} className={`${errors.name && 'showerror'} `} />
                            </div>
                        </div>

                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-name form">
                                <label>First Name</label>
                                <input name="first_name" defaultValue={editData ? editData.first_name : null} ref={register({ required: true })} className={`${errors.name && 'showerror'} `} />
                            </div>
                            <div className="addgxsite-form-name form">
                                <label>Last Name</label>
                                <input name="last_name" defaultValue={editData ? editData.last_name : null} ref={register({ required: true })} className={`${errors.name && 'showerror'} `} />
                            </div>
                        </div>
                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-name form">
                                <label>Email</label>
                                <input name="email" defaultValue={editData ? editData.email : null} ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} className={`${errors.name && 'showerror'} `} />
                            </div>
                        </div>

                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-site form">
                                <label>User Type</label>
                                <select name="user_type" defaultValue={editData ? editData.user_type : null} ref={register({ required: true })} className={`${errors.province && 'showerror'}`} >
                                    <option value="">Select </option>
                                    <option value="1">Admin</option>
                                    <option value="2">Center</option>
                                    <option value="3">Province</option>
                                    <option value="4">ddddd</option>
                                    <option value="5">District</option>
                                    <option value="6">GX Sites</option>
                                </select>
                            </div>
                            <div className="addgxsite-form-site form">
                                <label>Province</label>
                                <Select
                                    name="province"
                                    // defaultValue={editData ? editData.province[0] : null}
                                    value={usedProvince}
                                    onChange={setUsedProvince}
                                    options={provinceOptions}
                                    isMulti

                                // options={province && province.map((item, index) => {
                                //     return <option value={item.id} key={index}>{(item.name).substring(2)}</option>
                                // })}
                                />


                                {/* <select name="province" defaultValue={editData ? editData.province[0] : null} ref={register({ required: true })} onChange={provinceChangeHandler} className={`${errors.province && 'showerror'}`} >
                                    <option value={null}>Select Province</option>
                                    {province && province.map((item, index) => {
                                        return <option value={item.id} key={index}>{(item.name).substring(2)}</option>
                                    })}
                                </select> */}
                            </div>
                        </div>

                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-site form">
                                <label>District</label>
                                <Select
                                    name="district"
                                    value={usedDistrict}
                                    onChange={setUsedDistrict}
                                    options={districtOptions}
                                    isMulti
                                />
                                {/* <select name="district" defaultValue={editData ? editData.district[0] : null} ref={register({ required: true })} onChange={districtChangeHandler} className={`${errors.province && 'showerror'}`} >
                                    <option value={null}>Select District</option>
                                    {district && district.map((item, index) => {
                                        return <option value={item.id} key={index}>{(item.name).substring(4)}</option>
                                    })}
                                </select> */}
                            </div>
                            <div className="addgxsite-form-site form">
                                <label>Municipality</label>
                                <Select
                                    name="municipality"
                                    value={usedMunicipality}
                                    onChange={setUsedMunicipality}
                                    options={municipalityOptions}
                                    isMulti
                                />
                                {/* <select name="municipality" defaultValue={editData ? editData.municipality[0] : null} ref={register({ required: true })} onChange={municipalityChangeHandler} className={`${errors.province && 'showerror'}`} >
                                    <option value={null}>Select Municipality</option>
                                    {municipality && municipality.map((item, index) => {
                                        return <option value={item.id} key={index}>{(item.name).substring(5)}</option>
                                    })}
                                </select> */}
                            </div>
                        </div>
                        <div className="addgxsite-form-row">
                            <div className="addgxsite-form-site form">
                                <label>Ward</label>
                                <Select
                                    name="ward"
                                    value={usedWard}
                                    onChange={setUsedWard}
                                    options={wardOptions}
                                    isMulti
                                />
                                {/* <select name="ward" defaultValue={editData ? editData.wards[0] : null} ref={register({ required: true })} onChange={wardChangeHandler} className={`${errors.province && 'showerror'}`} >
                                    <option value={null}>Select Ward</option>
                                    {ward && ward.map((item, index) => {
                                        return <option value={item.id} key={index}>{(item.name).substring(6)}</option>
                                    })}
                                </select> */}
                            </div>
                            <div className="addgxsite-form-site form">
                                <label>Health Facilities</label>
                                <Select
                                    name="health_facility"
                                    value={usedHealthFacility}
                                    onChange={setUsedHealthFacility}
                                    options={healthFacilityOptions}
                                    isMulti
                                />
                                {/* <select name="health_facility" defaultValue={editData ? editData.hi[0] : null} ref={register({ required: true })} className={`${errors.province && 'showerror'}`} >
                                    <option value={null}>Select Health Facility</option>
                                    {healthFacility && healthFacility.map((item, index) => {
                                        return <option value={item.id} key={index}>{(item.name).substring(0)}</option>
                                    })}
                                </select> */}
                            </div>
                        </div>
                        <div className="addgxsite-form-row">
                            {editData ? <Button type="submit" variant="contained" color="primary" >Update</Button> : <Button type="submit" variant="contained" color="primary" >Submit</Button>}
                            <Button onClick={cancelHandler} variant="contained" color="secondary" >Cancel</Button>
                        </div>
                    </div>
                </form>
            </div>
        </ContainerBox >
    )
}
export default AddUsers;