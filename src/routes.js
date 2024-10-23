import HomePage from "components/homePage";

import VolunteersPage from "components/Volunteers/VolunteersPage";
import CreateVolunteerPage from "components/Volunteers/CreateVolunteerPage";
import UpdateVolunteerPage from "components/Volunteers/UpdateVolunteerPage";

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

import UsersPage from "./components/Users/UsersPage";
import CreateUserPage from "./components/Users/CreateUserPage";
import UpdateUserPage from "./components/Users/UpdateUserPage";

import EventsPage from "./components/Events/EventsPage";
import UpdateEventPage from "components/Events/UpdateEventPage";

import LoginPage from "./components/Login/LoginPage";
import RecycleBinPage from "./components/RecycleBin/RecycleBinPage";

/**
 * This file defines the routing configuration for the application.
 * It imports various components representing different pages and maps them to specific paths.
 * Each route object contains:
 * - `path`: The URL path for the route.
 * - `name`: A human-readable name for the route.
 * - `icon` (optional): An icon class for displaying in the sidebar.
 * - `component`: The React component to render when the route is accessed.
 * - `showOnSidebar` (optional): A boolean indicating whether the route should be displayed in the sidebar.
 * - `onlyAdmin` (optional): A boolean indicating if the route is restricted to admin users only.
 *
 * The routes are grouped by feature, such as services, guards, trainings, courses, users, and events.
 */

const servicesRoutes = [
  {
    path: "/services",
    name: "Servicios",
    icon: "fa fa-ambulance",
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
    icon: "fa fa-handshake-angle",
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
    icon: "fa fa-calendar-days",
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
    icon: "fa fa-rectangle-list",
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
    icon: "fa fa-person-through-window",
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
    icon: "fa fa-person-chalkboard",
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
];

const routes = [
  {
    path: "/",
    name: "Inicio",
    icon: "fa fa-chart-pie",
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
  ...guardRoutes,
  ...coursesRoutes,
  ...trainingRoutes,
  ...servicesRoutes,
  ...eventRoutes,
  ...usersRoutes,
  {
    path: "/recycleBin",
    name: "Pap. de Reciclaje",
    icon: "fa fa-trash",
    component: RecycleBinPage,
    showOnSidebar: true,
    onlyAdmin: true,
  },
];

export default routes;
