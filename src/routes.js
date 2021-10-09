

import HomePage from "components/homePage";

import VolunteersPage from "components/Volunteers/VolunteersPage";
import CreateVolunteerPage from "components/Volunteers/CreateVolunteerPage";
import ShowVolunteerPage from "components/Volunteers/ShowVolunteerPage";
import ServicesPage from "./components/services/servicesPage";
import ShowServicePage from "./components/services/showServicePage";
import CreateServicePage from "./components/services/createServicePage";

const routes = [
  {
    path: "/",
    name: "Inicio",
    icon: "nc-icon nc-chart-pie-35",
    component: HomePage,
    showOnSidebar: true
  },
  {
    path: "/courses",
    name: "Cursos",
    icon: "fas fa-book-medical",
    component: HomePage,
    showOnSidebar: true
  },
  {
    path: "/services",
    name: "Servicios",
    icon: "fas fa-ambulance",
    component: ServicesPage,
    showOnSidebar: true
  },
  {
    path: "/services/create",
    name: "Crear Servicio",
    component: CreateServicePage
  },
  {
    path: "/services/:id",
    name: "Servicios",
    component: ShowServicePage
  },
  {
    path: "/volunteers",
    name: "Voluntarios",
    icon: "fas fa-users",
    component: VolunteersPage,
    showOnSidebar: true
  },
  {
    path: "/volunteers/:id/edit",
    name: "Editar Voluntario",
    component: CreateVolunteerPage
  },
  {
    path: "/volunteers/create",
    name: "Crear Voluntario",
    component: CreateVolunteerPage
  },
  {
    path: "/volunteers/:id",
    name: "Voluntario",
    component: ShowVolunteerPage
  },
];

export default routes;
