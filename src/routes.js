

import HomePage from "components/homePage";

import VolunteersPage from "components/Volunteers/VolunteersPage";
import EditVolunteerPage from "components/Volunteers/EditVolunteerPage";
import ShowVolunteerPage from "components/Volunteers/ShowVolunteerPage";

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
    component: HomePage,
    showOnSidebar: true
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
    component: EditVolunteerPage
  },
  {
    path: "/volunteers/create",
    name: "Crear Voluntario",
    component: EditVolunteerPage
  },
  {
    path: "/volunteers/:id",
    name: "Voluntario",
    component: ShowVolunteerPage
  },
];

export default routes;
