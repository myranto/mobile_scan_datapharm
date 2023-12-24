// ComponentProd
import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonLabel,
    IonAlert,
    IonItem, IonIcon, IonNote, IonToast
} from '@ionic/react';
import { format } from 'date-fns'
import {
    BarcodeScanner, Barcode,
} from '@capacitor-mlkit/barcode-scanning';
import GContainer from "../../components/generic/GContainer";
import {close, personCircle} from "ionicons/icons";
import {fr} from "date-fns/locale";
import {useParams} from "react-router";
import {getoneProduct, UpdateCodeBar} from "../../components/function/Api";
import {Product} from "../../base/Product";
import {logUser} from "../../components/function/Utils";
import {User} from "../../base/User";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const ComponentProd: React.FC = () => {
    const params = useParams<{ id: string }>();
    const [prod,setProd] = useState<Product>()
    const [isSupported, setIsSupported] = useState(false);
    // const [barcodes, setBarcodes] = useState<Barcode[]>([]);
    const v = localStorage.getItem(logUser)
    const user:User = v ? JSON.parse(v) : null
    const [res, setRes] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [refresh,setRefresh] = useState(0)
    useEffect(()=>{
        getoneProduct(Number(params.id))
            .then((data:Product)=>{
                setProd(data)
            })
            .catch((error:any)=>{
                window.alert(error.message)
            })
    },[params.id,refresh])
    const isGoogleBarcodeScannerModuleAvailable = async () => {
        const {available} =
            await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
        return available;
    };
    const installGoogleBarcodeScannerModule = async () => {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
    };
    useEffect(() => {
        const checkAndInstallModule = async () => {
            const isAvailable = await isGoogleBarcodeScannerModuleAvailable();
            if (!isAvailable) {
                await installGoogleBarcodeScannerModule();
            }
        };
        checkAndInstallModule();
        BarcodeScanner.isSupported().then((result) => {
            setIsSupported(result.supported);
        });
    }, []);

    const scan = async () => {
        const {camera} = await BarcodeScanner.requestPermissions();
        const granted = camera === 'granted' || camera === 'limited';

        if (!granted) {
            setShowAlert(true);
            return;
        }
        const result = await BarcodeScanner.scan();
        let s = ''
        result.barcodes.map((barcode, index) => {
            s += barcode.rawValue
        })
        setRes(s)
        console.log('ito le barcode ' + s)
        // setBarcodes([...barcodes, ...result.barcodes]);
    };
    const updateCodeBar = () => {
        if (prod && res){
            if (user && user.email){
                prod.code_barre2 = res
                prod.modifier_par=user.email
                prod.code_modif = 1
                if (prod.modifier_par === '')
                    window.alert('erreur de nom')
                else {
                    UpdateCodeBar(prod)
                        .then((data:any)=>{
                            setMessageToast(data)
                            setToast(true)
                            setRefresh((prevState)=>prevState+1)
                        })
                        .catch((error:any)=>{
                            setError(error.message)
                            setShowAlert(true)
                        })
                }

            }
        }
    }
    const [error, setError] = useState<string>('Please grant camera permission to use the barcode scanner.')
    const [messageToast, setMessageToast] = useState('')
    const [toast, setToast] = useState(false)
    const component = (
        <IonContent fullscreen>
            <br/>
                <IonButton expand="full" onClick={scan} disabled={!isSupported}>Start Scan</IonButton>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Error!'}
                    message={error}
                    buttons={['OK']}
                />
            <br/>
            <hr/>
            {prod && <>
            <IonItem>
                <IonIcon aria-hidden="true" icon={personCircle} color="primary"></IonIcon>
                <IonLabel className="ion-text-wrap">
                    <h2>
                        Produit:{prod.famille_libelle}
                    </h2>
                </IonLabel>
            </IonItem>
            <div className="ion-padding">
                <h3>
                    Modifier le:  <IonNote>{format(new Date(prod.modifier_le), 'dd MMMM yyyy HH:mm', { locale: fr })}</IonNote>
                    Modifier par: <IonNote>{prod.modifier_par}</IonNote>
                </h3>
                <h1>Description:{prod.libelle}</h1>
                <h2>code bar actuel: {prod.code_barre2}</h2>
                {res !== '' &&
                    <>
                        <br/>
                        <IonLabel>resultat du scan: {res}</IonLabel>
                        <IonButton onClick={updateCodeBar}>modifier code bar</IonButton>
                    </>
                }
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
            </div>
            </>
            }
        </IonContent>
    )
    return <GContainer title={'Barcode Scanner'} component={component}/>
};

export default ComponentProd;


// npm install @ionic-native/core --legacy-peer-deps
// npm install @ionic-native/barcode-scanner --legacy-peer-deps
// npm install phonegap-plugin-barcodescanner --legacy-peer-deps
// npm i terser --legacy-peer-deps

// zavatra mila ampina
// <uses-permission android:name="android.permission.CAMERA" />
//     <uses-permission android:name="android.permission.FLASHLIGHT"/>
//     <meta-data android:name="com.google.mlkit.vision.DEPENDENCIES" android:value="barcode_ui"/>
