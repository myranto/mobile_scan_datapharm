import {IonIcon, IonItem, IonLabel, IonList, IonMenuToggle} from '@ionic/react';
import {chevronDown, chevronUp} from 'ionicons/icons';
import React, {useState} from 'react';
import {useLocation} from "react-router-dom";

interface DropdownMenuProps {
    items: any;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({items}) => {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    return (
        <>
            <IonItem button onClick={() => setShowMenu(!showMenu)} lines={'none'}>
                <IonIcon aria-hidden="true" slot="start" style={{fontSize: "35px"}}
                         ios={items.iosIcon} md={items.mdIcon}/>
                <IonLabel>{items?.title}</IonLabel>
                {!showMenu ?
                    <IonIcon style={{fontSize: "35px", height: '20px'}} icon={chevronDown} slot="end"
                    /> :
                    <IonIcon icon={chevronUp} size={'5px'} slot="end" style={{height: '20px', color: "#0040ff"}}/>}
            </IonItem>
            {showMenu && (
                <IonList className="dropdown-menu">
                    {items?.items.map((appPage: any, index: any) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem
                                    style={{paddingLeft: '25px'}}
                                    className={`dropdown-menu-item ${
                                        location.pathname === appPage.url ? 'selected' : ''
                                    }`}
                                    routerLink={appPage.url}
                                    routerDirection="none"
                                    lines="none"
                                    detail={false}
                                >
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        );
                    })}
                </IonList>
            )}
        </>
    );
};

export default DropdownMenu;
