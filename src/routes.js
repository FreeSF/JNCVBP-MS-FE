

import HomePage from "components/homePage";

import DutiesPage from "components/Duties/DutiesPage";
import EditDutyPage from "components/Duties/EditDutyPage";

import EditRankPage from "components/Ranks/EditRankPage";
import RanksPage from "components/Ranks/RanksPage";

import VolunteersPage from "components/Volunteers/VolunteersPage";
import EditVolunteerPage from "components/Volunteers/EditVolunteerPage";
import ShowVolunteerPage from "components/Volunteers/ShowVolunteerPage";




const dutiesRoutes =
  [{
    path: "/duties",
    name: "Tipos de Servicios",
    // icon: "fas fa-ambulance",
    icon: "nc-icon nc-settings-90",
    component: DutiesPage,
    showOnSidebar: true
  },
  {
    path: "/duties/create",
    name: "Crear Servicio",
    component: EditDutyPage
  }]

const ranksRoutes =
  [{
    path: "/ranks",
    name: "Rangos",
    icon: "nc-icon nc-vector",
    component: RanksPage,
    showOnSidebar: true
  },
  {
    path: "/ranks/create",
    name: "Crear Rango",
    component: EditRankPage
  }]

const volunteerRoutes =
  [{
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
  }]

const routes =
  [{
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
  ...dutiesRoutes,
  ...ranksRoutes,
  ...volunteerRoutes
  ];

export default routes;
