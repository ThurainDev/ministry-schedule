import LeaderDashboard from "../pages/LeaderDashboard";
import Login from "../pages/Login";
import MemberDashboard from "../pages/MemberDashboard";
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
                    element : <MemberDashboard/>
                },
                {
                    path : '/leader',
                    element : <LeaderDashboard/>
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