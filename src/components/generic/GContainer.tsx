import React from "react";
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonMenuButton,
    IonRefresher,
    IonRefresherContent,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {alert, arrowBack, arrowBackOutline, backspace, backspaceOutline, logOut, logOutOutline} from "ionicons/icons";
import {useHistory} from "react-router-dom";


interface content {
    title: string,
    component: any,
}

const refresh = (e: CustomEvent) => {
    setTimeout(() => {
        e.detail.complete();
    }, 3000);
};
const GContainer: React.FC<content> = ({title, component}) => {
    const navigate = useHistory()

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton/>
                    </IonButtons>
                    <IonItem lines={'none'}>
                        <IonIcon
                            onClick={() => navigate.goBack()}
                            aria-hidden="true"
                            style={{fontSize: "25px", color: '#4f5d73'}}
                            ios={arrowBack}
                            md={arrowBackOutline}
                        />
                        <IonTitle className={'ion-text-capitalize'}> {title}
                        </IonTitle>
                        <IonIcon
                            onClick={()=>window.alert('deconnexion')}
                            aria-hidden="true"
                            style={{fontSize: "35px", color: '#4f5d73'}}
                            ios={logOut}
                            md={logOutOutline}
                        />

                    </IonItem>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {component}
            </IonContent>
        </>
    )
}
export default GContainer
export const getStatus = (n: number, iscolor = true) => {
    const table = [
        iscolor ? <IonText color="success">client</IonText> : 'client',
        iscolor ? <IonText color="primary">utilisateur</IonText> : 'utilisateur',
        iscolor ? <IonText color="warning">admin</IonText> : 'admin',
    ]
    return table[n];
}