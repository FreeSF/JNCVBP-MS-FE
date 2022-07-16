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

import ServicesPage from "components/Services/ServicesPage";
import CreateServicePage from "components/Services/CreateServicePage";
import UpdateServicePage from "components/Services/UpdateServicePage";
import ShowServicePage from "./components/Services/ShowServicePage";

import GuardsPage from "./components/Guards/GuardsPage";
import CreateGuardPage from "./components/Guards/CreateGuardPage";
import UpdateGuardPage from "./components/Guards/UpdateGuardPage";
import ShowGuardPage from "./components/Guards/ShowGuardPage";

import TrainingsPage from "./components/Trainings/TrainingsPage";
import CreateTrainingPage from "./components/Trainings/CreateTrainingPage";
import UpdateTrainingPage from "./components/Trainings/UpdateTrainingPage";

import CoursesPage from "./components/Courses/CoursesPage";
import CreateCoursePage from "./components/Courses/CreateCoursePage";
import UpdateCoursePage from "./components/Courses/UpdateCoursePage";
import ShowCoursePage from "./components/Courses/ShowCoursePage";

import UsersPage from "./components/Users/UsersPage";
import CreateUserPage from "./components/Users/CreateUserPage";
import UpdateUserPage from "./components/Users/UpdateUserPage";

import EventsPage from "./components/Events/EventsPage";
import UpdateEventPage from "components/Events/UpdateEventPage";

import LoginPage from "./components/Login/LoginPage";
import RecycleBinPage from "./components/RecycleBin/RecycleBinPage";

const dutiesRoutes = [
  {
    path: "/duties",
    name: "Tipos de Servicios",
    // icon: "fas fa-ambulance",
    icon: "nc-icon nc-settings-90",
    component: DutiesPage,
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
    path: "/services/:id/edit",
    name: "Editar Servicio",
    component: UpdateServicePage,
  },
  {
    path: "/services/:id",
    name: "Servicio",
    component: ShowServicePage,
  },
];

const volunteerRoutes = [
  {
    path: "/volunteers",
    name: "Voluntarios",
    icon: "fas fa-user-nurse",
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

const usersRoutes = [
  {
    path: "/users",
    name: "Usuarios",
    icon: "fas fa-users",
    component: UsersPage,
    showOnSidebar: true,
    onlyAdmin: true,
  },
  {
    path: "/users/create",
    name: "Usuarios",
    icon: "fas fa-users",
    component: CreateUserPage,
    onlyAdmin: true,
  },
  {
    path: "/users/:id/edit",
    name: "Usuarios",
    icon: "fas fa-users",
    component: UpdateUserPage,
    onlyAdmin: false,
  },
];
const guardRoutes = [
  {
    path: "/guards",
    name: "Guardias",
    icon: "fas fa-hospital-user",
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
    icon: "fas fa-clock",
    component: EventsPage,
    showOnSidebar: true,
  },
  {
    path: "/events/:id/edit",
    name: "Editar Evento",
    component: UpdateEventPage,
  },
];

const trainingRoutes = [
  {
    path: "/trainings",
    name: "Prácticas",
    icon: "fas fa-briefcase-medical",
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
    icon: "fas fa-book-medical",
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
  {
    path: "/login",
    name: "Login",
    icon: "nc-icon nc-chart-pie-35",
    component: LoginPage,
    showOnSidebar: false,
    hideTheSidebar: true,
    noAuthRoute: true,
  },
  ...volunteerRoutes,
  ...dutiesRoutes,
  ...ranksRoutes,
  ...guardRoutes,
  ...coursesRoutes,
  ...trainingRoutes,
  ...servicesRoutes,
  ...eventRoutes,
  ...usersRoutes,
  {
    path: "/recycleBin",
    name: "Papelera de Reciclaje",
    icon: "nc-icon nc-chart-pie-35",
    component: RecycleBinPage,
    showOnSidebar: true,
    onlyAdmin: true,
  },
];

export default routes;
