import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import routes from './config/routes';

function App() {
    const user = useSelector((state) => state.user);

    return (
        <Router>
            <Routes>
                {user.isLoggedIn &&
                    privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                {!user.isLoggedIn &&
                    publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                {user.isLoggedIn ? (
                    <Route path="*" element={<Navigate to={routes.home} />}></Route>
                ) : (
                    <Route path="*" element={<Navigate to={routes.login} />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;
