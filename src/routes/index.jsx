import LeaderDashboard from "../pages/LeaderDashboard";
import Login from "../pages/Login";
import MemberDashboard from "../pages/MemberDashboard";
import AllSchedule from "../pages/AllSchedule";
import App from "../App";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
  } from "react-router-dom";

  export default function Index (){

    const router = createBrowserRouter([
        {
            path :'/',
            element : <App/>,
            children :[
                {
                    path : '/',
                    element : <Navigate to="/member" replace />
                },
                {
                    path : '/member',
                    element : <MemberDashboard/>
                },
                {
                    path : '/leader',
                    element : <LeaderDashboard/>
                },
                {
                    path : '/all-schedule',
                    element : <AllSchedule/>
                },
                {
                    path : '/login',
                    element : <Login/>
                }
            ]
        }
    ])
  return <div> <RouterProvider router={router} /></div>;

  }