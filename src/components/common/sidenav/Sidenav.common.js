import React from "react";
import { NavLink } from "react-router-dom";
import { withLink, useAuth } from "../../../dgenerate"
import GXLOGO from "../../../assets/icons/gx_logo.png"

// IMPORT ICONS
import {RiDashboardLine, RiNotificationLine,RiRoadMapLine,RiTicketLine } from "react-icons/ri";
import { GoNote } from "react-icons/go";
import { GrInbox } from "react-icons/gr";
const SELECT_ICONS = {
  "Dashboard": <RiDashboardLine/>,
  "Machine Status": <RiNotificationLine/>,
  "GX Sites": <RiRoadMapLine/>,
  "Tickets":<RiTicketLine/>,
  "Results": <GoNote/>,
  "GX Machine": <GrInbox/> 
};

const Sidenav = ({ navigation }) => {
  const { routes } = navigation
  const { isLoggedIn,showSidebar } = useAuth();

  let drawerClasses = "sidenav-container"
    if (showSidebar === false) {
        drawerClasses = 'sidenav-container closedrawer'
    }
  return isLoggedIn ? (
    <div className={drawerClasses}>
      <div className="sidenav">
        <ul className="sidenav-nav">
          <div className="sidenav-nav-title" style={{}}>
              <NavLink
                to='/'
                activeClassName="sidenav-active"
              >
                <span className="icon">
                  <img src={GXLOGO} alt="GX LOGO" />
                </span>
                GXMIS
              </NavLink>
          </div>
          {
            routes["Dashboard"] &&
            <li className="sidenav-nav-item">
              <NavLink
                to={routes["Dashboard"].path}
                activeClassName="sidenav-active"
              >
                <span className="icon">
                            {
                              SELECT_ICONS[routes['Dashboard'].name]
                            }
                          </span>
                {routes["Dashboard"].name}
              </NavLink>
            </li>
          }
          {
            routes['Machine Status'] &&
            <li className="sidenav-nav-item">
              <NavLink
                to={routes['Machine Status'].path}
                activeClassName="sidenav-active"
              >
                <span className="icon">
                            {
                              SELECT_ICONS[routes['Machine Status'].name]
                            }
                          </span>
                {routes['Machine Status'].name}
              </NavLink>
            </li>
          }
          {
            routes['GX Sites'] &&
            <li className="sidenav-nav-item">
              <NavLink
                to={routes['GX Sites'].path}
                activeClassName="sidenav-active"
              >
                <span className="icon">
                            {
                              SELECT_ICONS[routes['GX Sites'].name]
                            }
                          </span>
                {routes['GX Sites'].name}
              </NavLink>
            </li>
          }
          
          {
            routes['GX Machine'] &&
            <li className="sidenav-nav-item">
              <NavLink
                to={routes['GX Machine'].path}
                activeClassName="sidenav-active"
              >
                <span className="icon">
                            {
                              SELECT_ICONS[routes['GX Machine'].name]
                            }
                          </span>
                {routes['GX Machine'].name}
              </NavLink>
            </li>
          }
          {
            routes['Results'] &&
            <li className="sidenav-nav-item">
              <NavLink
                to={routes['Results'].path}
                activeClassName="sidenav-active"
              >
                <span className="icon">
                            {
                              SELECT_ICONS[routes['Results'].name]
                            }
                          </span>
                {routes['Results'].name}
              </NavLink>
            </li>
          }
          {
            routes['Tickets'] &&
            <li className="sidenav-nav-item">
              <NavLink
                to={routes['Tickets'].path}
                activeClassName="sidenav-active"
              >
                <span className="icon">
                            {
                              SELECT_ICONS[routes['Tickets'].name]
                            }
                          </span>
                {routes['Tickets'].name}
              </NavLink>
            </li>
          }

          {
            routes['Users'] &&
            <li className="sidenav-nav-item">
              <NavLink
                to={routes['Users'].path}
                activeClassName="sidenav-active"
              >
                <span className="icon">
                            {
                              SELECT_ICONS[routes['Users'].name]
                            }
                          </span>
                {routes['Users'].name}
              </NavLink>
            </li>
          }
        
        </ul>
      </div>
    </div>
  ) : null
}

export default withLink(Sidenav);