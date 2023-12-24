import React from 'react'
import {IonCol, IonPage, IonRow} from "@ionic/react";
import {useHistory} from "react-router-dom";

const Page404 = () => {
    console.log('coucou erroe')
    const back = useHistory()
    return (
        <IonPage>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                <IonRow className="justify-content-center">
                    <IonCol>
                        <div className="clearfix">
                            <h1 className="float-start display-3 me-4">404</h1>
                            <h4 className="pt-3">Oups!</h4>
                            <p className="text-medium-emphasis float-start">
                                La page que vous recherchez est introuvable.
                            </p>
                            <a onClick={() => back.goBack()}>retour</a>
                        </div>
                    </IonCol>
                </IonRow>
            </div>
        </IonPage>
    )
}

export default Page404
