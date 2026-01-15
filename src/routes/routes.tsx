import { Suspense, type JSX } from "react";
import Home from "../components/home/home";
import { ROUTES } from "../constants/path.cons";
import { AuthLayout } from "../layouts/authLayouts";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/authentication/login";
import { RouteLayouts } from "../layouts/routeLayouts";
import Error404 from "../components/error404";

const { HOME, LOGIN } = ROUTES;

const withSuspense = (el: JSX.Element) => (
  <Suspense fallback={<div>Loading...</div>}>{el}</Suspense>
);

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: LOGIN, element: withSuspense(<Login />) }],
  },
  {
    element: <RouteLayouts />,
    children: [{ path: HOME, element: withSuspense(<Home />) }],
  },

  { path: "*", element: withSuspense(<Error404 />) },
]);
