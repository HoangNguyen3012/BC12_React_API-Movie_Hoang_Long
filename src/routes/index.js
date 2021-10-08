// Client Routes
import Home from "containers/client/Home/Home";
import MovieDetail from "containers/client/MovieDetail/MovieDetail";
import Review from "containers/client/Review/Review";
import SeatPlan from "containers/client/SeatPlan/SeatPlan";
import Theater from "containers/client/Theater/Theater";
import About from "containers/client/About/About";
import ClientDetail from "containers/client/ClientDetail/ClientDetail";
// Admin Routes
import Dashboard from "containers/admin/Dashboard/Dashboard";
import EditMovie from "containers/admin/Movie/EditMovie/EditMovie";
import Movie from "containers/admin/Movie/MovieList/Movie";
import AddUser from "containers/admin/User/AddUser/AddUser";
import UserList from "containers/admin/User/UserList/UserList";
import AddMovie from "containers/admin/Movie/AddMovie/AddMovie";

export const clientRoutes = [
    {
        path: '/',
        component: Home,
        exact: true,
        isPrivate: false,
    },
    {
        path: '/theater',
        component: Theater,
        exact: false,
        isPrivate: false,
    },
    {
        path: '/review',
        component: Review,
        exact: false,
        isPrivate: false,
    },
    {
        path: '/about',
        component: About,
        exact: false,
        isPrivate: false,
    },
    {
        path: '/movie-detail/:movieId',
        component: MovieDetail,
        exact: false,
        isPrivate: false,
    },
    {
        path: '/seat-plan/:showTimeId',
        component: SeatPlan,
        exact: false,
        isPrivate: true,
    },
    {
        path: '/client',
        component: ClientDetail,
        exact: false,
        isPrivate: true,
    },
];

export const adminRoutes = [
    {
        path: '/admin',
        component: Dashboard,
        exact: true,
        isPrivate: true,
    },
    {
        path: '/admin/user',
        component: UserList,
        exact: false,
        isPrivate: true,
    },
    {
        path: '/admin/addUser',
        component: AddUser,
        exact: false,
        isPrivate: true,
    },
    {
        path: '/admin/movie',
        component: Movie,
        exact: true,
        isPrivate: true,
    },
    {
        path: '/admin/editMovie:movieId',
        component: EditMovie,
        exact: false,
        isPrivate: true,
    },
    {
        path: '/admin/addMovie',
        component: AddMovie,
        exact: false,
        isPrivate: true,
    },
];