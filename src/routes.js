import HomePage from "components/homePage";

import DutiesPage from "components/Duties/DutiesPage";
import EditDutyPage from "components/Duties/EditDutyPage";

import EditRankPage from "components/Ranks/EditRankPage";
import RanksPage from "components/Ranks/RanksPage";

import VolunteersPage from "components/Volunteers/VolunteersPage";
import CreateVolunteerPage from "components/Volunteers/CreateVolunteerPage";
import ShowVolunteerPage from "components/Volunteers/ShowVolunteerPage";
import ServicesPage from "./components/services/servicesPage";
import ShowServicePage from "./components/services/showServicePage";
import CreateServicePage from "./components/services/createServicePage";
import GuardsPage from "./components/Guards/GuardsPage";
import CreateGuardPage from "./components/Guards/CreateGuardPage";
import ShowGuardPage from "./components/Guards/ShowGuardPage";

const dutiesRoutes = [
  {
    path: "/duties",
    name: "Tipos de Servicios",
    // icon: "fas fa-ambulance",
    icon: "nc-icon nc-settings-90",
    component: DutiesPage,
    showOnSidebar: true,
  },
  {
    path: "/duties/create",
    name: "Crear Servicio",
    component: EditDutyPage,
  },
];

const ranksRoutes = [
  {
    path: "/ranks",
    name: "Rangos",
    icon: "nc-icon nc-vector",
    component: RanksPage,
    showOnSidebar: true,
  },
  {
    path: "/ranks/create",
    name: "Crear Rango",
    component: EditRankPage,
  },
];

const servicesRoutes = [
  {
    path: "/services",
    name: "Servicios",
    icon: "fas fa-ambulance",
    component: ServicesPage,
    showOnSidebar: true,
  },
  {
    path: "/services/create",
    name: "Crear Servicio",
    component: CreateServicePage,
  },
  {
    path: "/services/:id",
    name: "Servicios",
    component: ShowServicePage,
  },
];

const volunteerRoutes = [
  {
    path: "/volunteers",
    name: "Voluntarios",
    icon: "fas fa-users",
    component: VolunteersPage,
    showOnSidebar: true,
  },
  {
    path: "/volunteers/:id/edit",
    name: "Editar Voluntario",
    component: CreateVolunteerPage,
  },
  {
    path: "/volunteers/create",
    name: "Crear Voluntario",
    component: CreateVolunteerPage,
  },
  {
    path: "/volunteers/:id",
    name: "Voluntario",
    component: ShowVolunteerPage,
  },
];
const guardRoutes = [
  {
    path: "/guards",
    name: "Guardias",
    icon: "fas fa-users",
    component: GuardsPage,
    showOnSidebar: true,
  },
  {
    path: "/guards/create",
    name: "Crear Guardia",
    component: CreateGuardPage,
  },
  {
    path: "/guards/:id",
    name: "Guardia",
    component: ShowGuardPage,
  },
];

const routes = [
  {
    path: "/",
    name: "Inicio",
    icon: "nc-icon nc-chart-pie-35",
    component: HomePage,
    showOnSidebar: true,
  },

  {
    path: "/courses",
    name: "Cursos",
    icon: "fas fa-book-medical",
    component: HomePage,
    showOnSidebar: true,
  },
  ...dutiesRoutes,
  ...ranksRoutes,
  ...servicesRoutes,
  ...volunteerRoutes,
  ...guardRoutes,
];

export default routes;
