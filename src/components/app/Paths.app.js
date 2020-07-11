// ALL ROUTES, PATH AND RESTRICTION ARE ADDED HERE

// ROUTES
import LoginPage from "../loginPage/LoginPage";
import SigninPage from "../signinPage/SigninPage";
import DashboardPage from "../dashboardPage/DashboardPage";
// import DashboardDetailsPage from "../dashboardDetailsPage/DashboardDetailsPage";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import MachineStatusPage from "../machineStatusPage/MachineStatusPage";
import GxSitesPage from "../gxSitesPage/GxSitesPage";
import GxmachinePage from "../gxMachinePage/GxMachinePage";
import ResultPage from "../resultPage/ResultPage";
import TicketPage from "../ticketPage/TicketPage";
import DashboardDetailPage from "../dashboardDetailPage/DashboardDetailPage"
import AddGxMachine from "../gxMachinePage/addGxMachine/AddGxMachine";
import AddGxSite from "../gxSitesPage/addgxSite/AddGxSite";
import EditMachineStatus from "../machineStatusPage/editMachineStatus/EditMachineStatus";
import AddTicket from "../ticketPage/addTicket/AddTicket";
import EditGxSite from "../gxSitesPage/editgxSite/EditGxSite";
import UsersPage from "../usersPage/UsersPage";
import AddUsers from "../usersPage/addUsers/AddUsers";
import UsersDetails from "../usersPage/usersDetails/UsersDetails";

// PUBLIC PATHS => THESE ARE ACCESSIBLE WITHOUT LOGIN
// PUBLIC PATHS HAS restricted key => IF TRUE THEY CANNOT BE ACCESSED WITH LOGGED USER
// key prop can be acessed in withLink by navigation.routes.[key] which gives object { name, path }
export const PUBLIC_PATHS = [
  {
    key: "Root",
    name: "Root",
    path: "/",
    component: LoginPage,
    restricted: true
  }, 
  {
    key: "Login",
    name: "Login",
    path: "/log-in",
    component: LoginPage,
    restricted: true
  }, 
  {
    key: "Signin",
    name: "Signin",
    path: "/sign-in",
    component: SigninPage,
    restricted: true
  },
  {
    // Define just path and component keys for NotFoundPage
    path: null,
    component: NotFoundPage
  }
];

// PUBLIC PATHS => THESE ARE NOT ACCESSIBLE WITHOUT LOGIN
export const PRIVATE_PATHS = [
  // {
  //   key: "Dashboard",
  //   name: "Dashboard",
  //   path: "/",
  //   component: DashboardPage
  // },
  {
    key: "Dashboard",
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    component: DashboardPage,
    visible: true

  },
  {
    key: "Dashboard Details",
    name: "Dashboard Details",
    path: "/dashboard/:id",
    exact: true,
    component: DashboardDetailPage,
    visible: true
  },
  {
    key: "Machine Status",
    name: "Machine Status",
    path: "/machine-status",
    exact: true,
    component: MachineStatusPage,
    visible: true
  },
  {
    key: "GX Sites",
    name: "GX Sites",
    path: "/sites",
    exact: true,
    component: GxSitesPage,
    visible: true
  },
  {
    key: "GX Machine",
    name: "GX Machine",
    path: "/gx-machine",
    exact: true,
    component: GxmachinePage,
    visible: true
  },
  {
    key: "Results",
    name: "Results",
    path: "/result",
    exact: true,
    component: ResultPage,
    visible: true
  },
  {
    key: "Tickets",
    name: "Tickets",
    path: "/ticket",
    exact: true,
    component: TicketPage,
    visible: true
  },
  {
    key: "Add GxMachine",
    name: "Add GxMachine",
    path: "/gx-machine/add",
    exact: true,
    component: AddGxMachine,
    visible: true
  },
  {
    key: "Edit GxMachine",
    name: "Edit GxMachine",
    path: "/gx-machine/edit/:id",
    exact: true,
    component: AddGxMachine,
    visible: true
  },
  {
    key: "Add GxSite",
    name: "Add GxSite",
    path: "/sites/add",
    exact: true,
    component: AddGxSite,
    visible: true
  },
  {
    key: "Edit GxSite",
    name: "Edit GxSite",
    path: "/sites/edit/:id",
    exact: true,
    component: AddGxSite,
    visible: true
  },
  {
    key: "Edit MachineStatus",
    name: "Edit MachineStatus",
    path: "/machine-status/edit/:id",
    exact: true,
    component: AddTicket,
    visible: true
  },
  {
    key: "Add Ticket",
    name: "Add Ticket",
    path: "/ticket/add",
    exact: true,
    component: AddTicket,
    visible: true
  },
  {
    key: "Edit Ticket",
    name: "Edit Ticket",
    path: "/ticket/edit/:id",
    exact: true,
    component: AddTicket,
    visible: true
  },
  {
    key: "Users",
    name: "Users",
    path: "/users",
    exact: true,
    component:UsersPage,
    visible: true
  },
  {
    key: "Add Users",
    name: "Add Users",
    path: "/users/add",
    exact: true,
    component: AddUsers,
    visible: true
  },
  {
    key: "Edit Users",
    name: "Edit Users",
    path: "/users/edit/:id",
    exact: true,
    component: AddUsers,
    visible: true
  },
  {
    key: "Users Details",
    name: "Users Details",
    path: "/users/:id",
    exact: true,
    component:UsersDetails,
    visible: true
  }

];