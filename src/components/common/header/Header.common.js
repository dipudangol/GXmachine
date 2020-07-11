import React, { useRef } from "react";
import { withLink } from "../../../dgenerate/core/hocs";
import { useAuth } from "../../../dgenerate";

import { Dropdown, useDropdown } from "../../../dgenerate/ui";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "../dropdown/Dropdown.common";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {

    const dropdownRef = useRef();
    const { dropdownHandlers, toggle } = useDropdown(dropdownRef);
    // auth has isLoggedIn, userRole and authHandlers that is passed in Provider.
    const { isLoggedIn, userRole, handleLogout,showSidebar,togglenav } = useAuth();

    let drawerClass = "header-container"
    if (showSidebar === false) {
        drawerClass = "header-container moveleftheader"
    }
    return isLoggedIn ? (
        <div className={drawerClass}>
            <div className="header">
                <div className="header-top">
                    <div className="header-top-left">
                        <div onClick={() => togglenav(showSidebar)}  >
                            <span className="icon">
                                <AiOutlineMenu/>

                            </span>
                        </div>
                        <span className="header-title">
                            DASHBOARD
                        </span>

                    </div>
                    <div className="header-top-right">

                        <Dropdown
                            ref={dropdownRef}
                            {...dropdownHandlers}
                            render={() =>
                                <div className="header-top-right-logged" onClick={toggle}>
                                    <span className="header-top-right-logged-role">
                                        {userRole.toUpperCase()}
                                    </span>
                                </div>
                            }
                        >
                            <DropdownMenu>
                                <DropdownMenuItem danger={true} onClick={handleLogout}>LOGOUT</DropdownMenuItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>

                </div>
            </div>
        </div>
    ) : null
}

export default withLink(Header);