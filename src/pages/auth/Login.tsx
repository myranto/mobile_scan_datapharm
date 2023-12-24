import React, {useState} from "react";
import {
    IonAlert, IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTitle, IonToast,
    IonToolbar
} from "@ionic/react";
import {personCircle} from "ionicons/icons";
import {Link, useHistory} from "react-router-dom";
import {login} from "../../components/function/Api";
import {Log, LogToken, User} from "../../base/User";
import {logUser, TokenUser} from "../../components/function/Utils";
import {close} from "ionicons/icons";

export interface ProfileInter {
    id: number,
    name: string,
    mail: string,
    role: number,
    date_expiration?: Date
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('')
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [messageToast, setMessageToast] = useState('')
    const [toast, setToast] = useState(false)
    const navigate = useHistory()
    const handleLogin = (e: any) => {
        e.preventDefault()
        const user:Log = {
            email:email,
            password:password
        }
        console.log(JSON.stringify(user))
        login(user)
            .then((data:LogToken)=>{
               localStorage.setItem(TokenUser,data.token)
                localStorage.setItem(logUser,JSON.stringify(data.log))
                console.log(JSON.stringify(data))
                setMessageToast('connexion reussi')
                setToast(true)
                navigate.push('/product/list')
            })
            .catch((error:any)=>{
                setError(error.message)
                setShowAlert(true)
            })
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Connexion sunsoft </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
                    <div style={{alignItems: 'center', marginBottom: '20px'}}>
                        <center><IonIcon
                            style={{fontSize: "200px", color: "#0040ff"}}
                            icon={personCircle}
                        />
                        </center>
                    </div>
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => setShowAlert(false)}
                        header={'Erreur !'}
                        message={error}
                        buttons={['OK']}
                    />
                    <IonRow>
                        <IonCol>
                            <IonItem>
                                <IonLabel position="floating"> Email</IonLabel>
                                <IonInput
                                    type="email"
                                    value={email}
                                    onIonChange={(e) => setEmail(e.detail.value!)}
                                    onBlur={(e) => setEmail(e.currentTarget.value as string)}
                                >
                                </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating"> password</IonLabel>
                                <IonInput
                                    type="password"
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value!)}
                                    onBlur={(e) => setPassword(e.currentTarget.value as string)}
                                >
                                </IonInput>
                            </IonItem>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <br/>
                            <IonButton onClick={handleLogin} >se connecter</IonButton>
                            {/*<p style={{fontSize: "medium"}}>*/}
                            {/*    mot de passe oublier? <Link to="/recovery?action=mail">cliquer ici</Link>*/}
                            {/*</p>*/}
                        </IonCol>
                        <IonToast isOpen={toast}
                                  onDidDismiss={() => {
                                      setToast && setToast(false)
                                  }
                                  }
                                  message={messageToast}
                                  duration={1000}
                                  position={'top'}
                                  buttons={[
                                      {
                                          icon:close,
                                          role: 'cancel',
                                          handler: () => {
                                              setToast(false);
                                          }
                                      }
                                  ]}
                        />
                    </IonRow>
                </div>
            </IonContent>

        </IonPage>

    )
}
export default Login
interface logged {
    log:any,
    setLog:any
}

type LogContextType = {
    log: ProfileInter | null;
    setLog: React.Dispatch<React.SetStateAction<ProfileInter | null>>;
};

export const LogContext = React.createContext<LogContextType | null>(null);
{/*<form>*/
}
{/*    <Form data={formValues} properties={properties} labelButton={'se connecter'} submit={handleSubmit}/>*/
}
{/*</form>*/
}
