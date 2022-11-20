import React, { Fragment } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { publicRouter, AdminRoute, AuthRoute } from './Router/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DefaultLayout } from '../src/containers/Admin';

export default function App() {
    const Check_Login = localStorage.getItem('Save_Login');
    const Home = JSON.parse(Check_Login);
    let a;
    { Home != null && Home.phanquyen == "true" ? a = AdminRoute : Home != null && Home.phanquyen == "false" ? a = publicRouter : a = AuthRoute }
    return (
        <>
            {a[0].admins === true ?
                <Router>
                    <Routes>
                        {a.map((route, index) => {
                            let Layout ;
                            {route.layout === null ? Layout = Fragment : route.layout ? Layout = route.layout : Layout = DefaultLayout }
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }>
                                </Route>
                            )
                        })}
                    </Routes>
                </Router>
                :
                <Router>
                    <Routes>
                        {a.map((route, index) => {
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Page />
                                    }>
                                </Route>
                            )
                        })}
                    </Routes>
                </Router>
            }
        </>
    );
}
