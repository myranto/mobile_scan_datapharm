import React from "react";
import {IonCard, IonItem, IonLabel, IonNote} from "@ionic/react";
import {Product} from "../../base/Product";
import {navigate} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import {format} from "date-fns";
import {fr} from "date-fns/locale";

interface ProdName {
    data: Product
}

interface ProdListName {
    list: Product[]
}
const ComponentProd: React.FC<ProdName> = ({data}) => {
    return (
        // <IonItem routerLink={`/message/`} detail={false}>
        <IonItem detail={false}>
            <IonLabel className="ion-text-wrap">
                <h2>
                    {data.code_barre2}
                    <span className="date">
            {/*<IonNote>{new Date(data.modifier_le).toISOString()}</IonNote>*/}
          </span>
                </h2>
                <h3>{data.modifier_par}</h3>
                <h4>{data.famille_libelle}</h4>
                <p>
                    {data.libelle}
                </p>
            </IonLabel>
        </IonItem>
    )
}
export default ComponentProd

export const ListProd: React.FC<ProdListName> = ({list}) => {
    const navigate = useHistory()
    return (
        <>
            <div className="container mt-4">
                <div className="card" style={{boxShadow: '0px 2px 8px rgba(99, 99, 99, 0.2)', borderStyle: 'none'}}>
                    <div className="card-body">
                        <div className="table-responsive">
                            <IonCard>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Produit</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Code Barre</th>
                                        <th scope="col">Modifier par</th>
                                        <th scope="col">Modifier le</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {list?.map((data) => <>
                                        <a onClick={()=>navigate.push('/product/detail/'+data.id)} key={data.id} style={{color:'black', textDecoration:'none'}}>
                                        {/*<IonItem routerLink={`/message/`} lines={'none'}>*/}
                                        <tr className="d-sm-table-row" >
                                            <td data-label="Produit" scope="row">{data.famille_libelle}</td>
                                            <td data-label="Description">{data.libelle}</td>
                                            <td data-label="Code Barre">{data.code_barre2}</td>
                                            <td data-label="Modifier par">{data.modifier_par}</td>
                                            <td data-label="Modifier le">{format(new Date(data.modifier_le), 'dd MMMM yyyy HH:mm', { locale: fr })}</td>
                                        </tr>
                                        {/*</IonItem>*/}
                                        </a>
                                    </>)}
                                    </tbody>
                                </table>
                            </IonCard>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}