import React,{useState} from "react";
import { Auth } from "../../dgenerate";
// import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from "../common/header/Header.common";
import Sidenav from "../common/sidenav/Sidenav.common";
// Export App with Auth Provider and Auth Screens inside it.
const App = () => {
    const isLoggedIn =localStorage.getItem("isLoggedin")?true:false;
    const token =localStorage.getItem("token");
    const[config,setConfig]=useState({isLoggedIn,userRole:"admin",token:token,showSidebar:true})
    return (
        <Auth.Provider
        authConfig={config}
            authHandlers={{
                handleLogin:(token)=>{
                    localStorage.setItem("isLoggedin",true);
                    localStorage.setItem("token",token);
                    setConfig({...config,isLoggedIn:true,userRole:'admin',token:token})
                },
                handleLogout:()=>{
                    localStorage.removeItem("isLoggedin");
                    setConfig({...config,isLoggedIn:false,userRole:'admin',token:null})
                },
                togglenav:(data)=>{
                    setConfig({...config,showSidebar:!data})
                }
            }}>
            <Sidenav/>
            <Header />

            
            <Auth.Screens />
        </Auth.Provider>
    )
}

export default App;