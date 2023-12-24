import React, {useEffect, useState} from "react";
import {Product} from "../../base/Product";
import GContainer from "../../components/generic/GContainer";
import {IonCard, IonList, IonSearchbar, IonToolbar, useIonViewWillEnter} from "@ionic/react";
import ComponentProd, {ListProd} from "../../components/prod/ComponentProd";
import './responsivetable.css'
import {getAllProduct, SearchProduct} from "../../components/function/Api";
import {maxSize} from "../../components/function/Utils";
import Paginate from "../../components/generic/paginate/Paginate";
import {useHistory} from "react-router-dom";
interface ProdInterface {
    content:Product[],
    totalrow:number
}

const ListProduct:React.FC = () => {
    const [prod,setProd] = useState<ProdInterface|null>()
    const [page,setPage] = useState(0)
    const [pageSearch,setPageSearch] = useState(0)
    //barre de recherche
    const [search,setSearch] = useState<string|null>(null)
    const navigate = useHistory()
    useEffect(()=>{
        getAllProduct(page,maxSize)
            .then((data)=>{
                const p:ProdInterface = {
                    content:data.content,
                    totalrow:data.totalPages
                }
                setProd(p)
            })
            .catch((error)=> {
                if (error.response && error.response.status === 403){
                    setProd(null)
                    window.alert('vous devez vous reconnecter')
                    navigate.push("/")
                }else
                    window.alert(error.message)
            })
    },[page,maxSize])
    useEffect(()=>{
        const filter = {
            text:search
        }
        if (search!==null) {
            SearchProduct(filter, pageSearch, maxSize)
                .then((data) => {
                    const p: ProdInterface = {
                        content: data.content,
                        totalrow: data.totalPages
                    }
                    setProd(p)
                })
                .catch((error) => {
                    window.alert(error.message)
                    if (error.response && error.response.status === 403){
                        setProd(null)
                        navigate.push("/")
                    }
                })
        }
    },[search,pageSearch,maxSize])
    const change = (e:Event) =>{
        setPageSearch(0)
        let query = '';
        const target = e.target as HTMLIonSearchbarElement;
        if (target) {
            query = target.value!.toLowerCase();
            setSearch(query)
        }
    }
    const component = (
        <>
            {/*onIonInput*/}
            <IonToolbar>
                <IonSearchbar value={search} onIonChange={change}/>
            </IonToolbar>
            <h1>
                Tous les produits
            </h1>
            {/*<IonList lines={'full'}>*/}
            {/*    {prod?.content?.map(m => <ComponentProd data={m} key={m.id} /> )}*/}
            {/*</IonList>*/}
                {prod?.content && <ListProd list={prod.content} />}
            {(!prod || prod?.content?.length === 0) && <h1>produits non trouvé</h1>}
            {prod && search === null &&  <Paginate page_number={page} totalraw={prod.totalrow} newPage={setPage}/>}
            {prod && search !== null &&  <Paginate page_number={pageSearch} totalraw={prod.totalrow} newPage={setPageSearch}/>}
        </>
    )
    return <GContainer title={'Liste produit'} component={component} />
}
export default ListProduct