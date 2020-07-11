import React,{useState} from 'react';
import { useAuth } from "../../../dgenerate";
const ContainerBox = ({title,children}) => {
    // const [showSidebar, setShowSidebar] = useState(true);

    const {togglenav,showSidebar } =useAuth();
    let containerdrawerClass = "containerbox-container"
    if (showSidebar === false) {
        containerdrawerClass = "containerbox-container moveleftdrawer"
    }

    return ( 
        <div className={containerdrawerClass}>
            <div className="containerbox">
                <h3>{title&&title.toUpperCase()}</h3>
                {children}
            </div>
            
        </div> );
}
 
export default ContainerBox;