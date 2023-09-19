import {
    createBrowserRouter
} from "react-router-dom";
import Header from "../components/header";
import Dashboard from "../pages/dashboard";
import About from "../pages/about";
import GeneralLayout from "../layouts/generalLayout";

  export const router = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            {
                path: "/",
                element: <GeneralLayout><Dashboard /></GeneralLayout>
            },
            {
                path: "/about",
                element: <GeneralLayout><About /></GeneralLayout>
            }
        ]
    }
])