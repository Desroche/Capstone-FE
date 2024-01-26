import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";
import LoginPage from "../components/ProdSignup/pages/Login";
import SignupPage from "../components/ProdSignup/pages/Signup";
import Home from "../components/Home/Home";
import AdminDashboard from "../components/AdminDashboard/adminDashboard";
import ErrorPage from "../components/ErrorPage/errorPage";
import UserProfile from "../components/userProfile/profilePage";
import DietaryRestrictions from "../components/DietRestriction/dietSelect";

const Routes = () => {
  const { token } = useAuth();


  const routesForPublic = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ];


  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "home",
          element: <Home />
        },
        {
          path: "profile",
          element: <UserProfile />
        },
        {
          path: "diet",
          element: <DietaryRestrictions />
        },
        {
          path: "*",
          element: <ErrorPage />
        },
      ],
    },
  ];

  const routesForAdmin = [
    {
      path: "/",
      element: <AdminRoute />,
      children: [
        {
          path: "admin",
          element: <AdminDashboard />
        },
      ],
    },
  ];


  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ];


  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
    ...routesForAdmin,
  ]);

  
  return <RouterProvider router={router} />;
};

export default Routes;





/*
Return to Jan 9 if need be


import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";
import LoginPage from "../components/ProdSignup/pages/Login";
import SignupPage from "../components/ProdSignup/pages/Signup";
import Home from "../components/Home/Home";
import AdminDashboard from "../components/AdminDashboard/adminDashboard";
import ErrorPage from "../components/ErrorPage/errorPage";
import UserProfile from "../components/userProfile/profilePage";

const Routes = () => {
  const { token } = useAuth();


  const routesForPublic = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ];


  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "home",
          element: <Home />
        },
        {
          path: "profile",
          element: <UserProfile />
        },
        {
          path: "admin",
          element: (<AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>)
        },
        {
          path: "*",
          element: <ErrorPage />
        },
      ],
    },
  ];


  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ];


  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  
  return <RouterProvider router={router} />;
};

export default Routes;

*/