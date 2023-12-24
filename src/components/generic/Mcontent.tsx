import React, {Suspense} from "react";
import {IonPage,} from "@ionic/react";
import {useLocation} from "react-router-dom";
import routes from "../../routes";
import {Redirect, Route} from "react-router";
import {loading} from "../../App";

const Page404 = React.lazy(() => import('../../pages/error/Page404'))

const Mcontent: React.FC = () => {
    const location = useLocation()
    let check = 0
    let RouteElement = (
        <Route path={'/404'} component={Page404} exact={true}/>
    );
    // useEffect(() => {
    routes.map((route: any, idx) => {

        if (isRouteValid(location.pathname, route.path)) {
            console.log(route.path)
            check = 1
            RouteElement =
                <Route path={route.path} key={idx} component={route.component} exact={route.exact}/>

        }
    })
    // }, [])

    return (

        <IonPage>
            {/*<Menu/>*/}
            <Suspense fallback={loading}>
                {check === 1 ? RouteElement : <Redirect to={'/404'}/>}
            </Suspense>
        </IonPage>
    )
}

export default Mcontent

function isRouteValid(route: string, validRoutes: string) {
    const regex = new RegExp(`^${validRoutes.replace(/:[^/]+/g, '[^/]+')}$`)
    return regex.test(route);
}

export function getProfilStorage() {
    // eslint-disable-next-line no-undef
    const user = sessionStorage.getItem('profile')
    let profile = null
    if (user) profile = JSON.parse(user)
    else return <Redirect to="/login" exact={true}/>
    return profile
}