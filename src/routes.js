import HomePage from "components/homePage";

import CreateDutyPage from "components/Duties/CreateDutyPage";
import DutiesPage from "components/Duties/DutiesPage";
import UpdateDutyPage from "components/Duties/UpdateDutyPage";

import CreateRankPage from "components/Ranks/CreateRankPage";
import UpdateRankPage from "components/Ranks/UpdateRankPage";
import RanksPage from "components/Ranks/RanksPage";

import VolunteersPage from "components/Volunteers/VolunteersPage";
import CreateVolunteerPage from "components/Volunteers/CreateVolunteerPage";
import UpdateVolunteerPage from "components/Volunteers/UpdateVolunteerPage";
import ShowVolunteerPage from "components/Volunteers/ShowVolunteerPage";

import ServicesPage from "./components/services/servicesPage";
import ShowServicePage from "./components/services/showServicePage";
import CreateServicePage from "./components/services/createServicePage";

import GuardsPage from "./components/Guards/GuardsPage";
import CreateGuardPage from "./components/Guards/CreateGuardPage";
import UpdateGuardPage from "./components/Guards/UpdateGuardPage";
import ShowGuardPage from "./components/Guards/ShowGuardPage";

import EventsPage from "./components/Events/EventsPage";
import CreateEventPage from "./components/Events/CreateEventPage";

import TrainingsPage from "./components/Trainings/TrainingsPage";
import CreateTrainingPage from "./components/Trainings/CreateTrainingPage";
import UpdateTrainingPage from "./components/Trainings/UpdateTrainingPage";

import CoursesPage from "./components/Courses/CoursesPage";
import CreateCoursePage from "./components/Courses/CreateCoursePage";
import UpdateCoursePage from "./components/Courses/UpdateCoursePage";
import ShowCoursePage from "./components/Courses/ShowCoursePage";
import RecycleBinPage from "./components/RecycleBin/RecycleBinPage";

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
    name: "Crear Tipo de Servicio",
    component: CreateDutyPage,
  },
  {
    path: "/duties/:id/edit",
    name: "Editar Tipo de Servicio",
    component: UpdateDutyPage,
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
    component: CreateRankPage,
  },
  {
    path: "/ranks/:id/edit",
    name: "Editar Rango",
    component: UpdateRankPage,
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
    component: UpdateVolunteerPage,
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
    path: "/guards/:id/edit",
    name: "Editar Guardia",
    component: UpdateGuardPage,
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

const eventRoutes = [
  {
    path: "/events",
    name: "Libro de Novedades",
    icon: "fas fa-users",
    component: EventsPage,
    showOnSidebar: true,
  },
  {
    path: "/events/create",
    name: "Registrar Evento",
    component: CreateEventPage,
  },
];

const trainingRoutes = [
  {
    path: "/trainings",
    name: "Prácticas",
    icon: "fas fa-users",
    component: TrainingsPage,
    showOnSidebar: true,
  },
  {
    path: "/trainings/create",
    name: "Crear Práctica",
    component: CreateTrainingPage,
  },
  {
    path: "/trainings/:id/edit",
    name: "Editar Práctivas",
    component: UpdateTrainingPage,
  },
];

const coursesRoutes = [
  {
    path: "/courses",
    name: "Cursos",
    icon: "fas fa-users",
    component: CoursesPage,
    showOnSidebar: true,
  },
  {
    path: "/courses/create",
    name: "Crear Curso",
    component: CreateCoursePage,
  },
  {
    path: "/courses/:id/edit",
    name: "Editar Curso",
    component: UpdateCoursePage,
  },
  {
    path: "/courses/:id",
    name: "Curso",
    component: ShowCoursePage,
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
  ...volunteerRoutes,
  ...dutiesRoutes,
  ...ranksRoutes,
  ...guardRoutes,
  ...coursesRoutes,
  ...trainingRoutes,
  ...servicesRoutes,
  ...eventRoutes,
  {
    path: "/recycleBin",
    name: "Papelera de Reciclaje",
    icon: "nc-icon nc-chart-pie-35",
    component: RecycleBinPage,
    showOnSidebar: true,
  },
];

export default routes;
