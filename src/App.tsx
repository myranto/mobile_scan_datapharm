import {IonApp, IonRouterOutlet, IonSpinner, IonSplitPane, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, {Suspense} from "react";
import Page404 from "./pages/error/Page404";
import Login from "./pages/auth/Login";
import Mcontent from "./components/generic/Mcontent";

setupIonicReact();
export const loading = (
    <div
        className="p-3 d-flex justify-content-center align-items-center bg-transparent border-0"
        style={{width: 'fit-content', marginTop: '50%'}}
    >
      <IonSpinner className="ms-auto"/>
    </div>
)
const App: React.FC = () => {
  const routes = [
    {path: '/404', component: Page404, exact: true},
    {path: '/login', component: Login, exact: true},
    // {path: '/recovery', component: RecoveryPasswords, exact: true},
    // {path: '/check_code', component: CheckCode, exact: true},
    // {path: '/reset', component: ResetPassword, exact: true},
  ];
  return (
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Route
                path="*"
                render={({location}) => {
                  const currentPath = location.pathname;
                  const matchedRoute = routes.find((route) => {
                    return route.path === currentPath
                  });
                  if (matchedRoute) {
                    const Component = matchedRoute.component;
                    return (
                        <>
                          <IonRouterOutlet id="main">
                            <Suspense fallback={loading}>
                              <Route path={currentPath} exact={matchedRoute.exact}
                                     component={Component}/>
                            </Suspense>
                          </IonRouterOutlet>
                        </>
                    );
                  } else {
                    return (
                        // <LogContext.Provider value={{ log, setLog }}>
                        <>
                          <Menu/>
                          <IonRouterOutlet id="main">
                            <Suspense fallback={loading}>
                              <Route path="*" component={Mcontent}/>
                            </Suspense>
                          </IonRouterOutlet>
                        </>
                        // </LogContext.Provider>
                    );
                  }
                }}
            />
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
  );
};

export default App;
