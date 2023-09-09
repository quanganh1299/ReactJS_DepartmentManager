import ManagementLayout from "../Layout/ManagementLayout";
import HomePage from "../Components/HomePage/HomePage";
import Login from "../Components/Login/Login";
import ErrorPage from "../Components/Error/ErrorPage";
import Department from "../Components/Department/Department";
import NewDepartment from "../Components/Department/NewDepartment";
import EditDepartment from "../Components/Department/EditDepartment";
import Account from "../Components/Account/Account";
import EditAccount from "../Components/Account/EditAccount";
import NewAccount from "../Components/Account/NewAccount";
import ForgotPassword from "../Components/Login/ForgotPassword";

export const route = [
    {
      path: "/",
      element: <ManagementLayout />,
      errorElement: <ErrorPage />,
      children:[
        {
          path: "/",
          element: <HomePage />
        },
        {
          path:"/departments",
          element: <Department />,

        },
        {
          path:"/departments/create",
          element: <NewDepartment />
        },
        {
          path:"/departments/:id",
          element: <EditDepartment />
        },
        {
          path:"/accounts",
          element: <Account />
        },
        {
          path:"/accounts/create",
          element: <NewAccount />
        },
        {
          path:"/accounts/:id",
          element: <EditAccount />
        },
        {
          path:"/login",
          element: <Login />
        },
        {
          path:"/login/forgor-password",
          element: <ForgotPassword />
        }
      ]
    },
  ]