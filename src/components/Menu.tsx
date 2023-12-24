import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline, bookmarkSharp, calendar, calendarSharp,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp, personSharp,
  settings, settingsSharp, speedometer, speedometerSharp, ticket, ticketSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp
} from 'ionicons/icons';
import './Menu.css';
import DropdownMenu from "./generic/Dropdown";
import {getUser} from "./function/Utils";
import React from "react";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  items: any;
}

const appPages: AppPage[] = [

  {
    title: 'Product list',
    url: '/product/list',
    iosIcon: bookmarkOutline,
    mdIcon: bookmarkSharp,
    items: []
  },
]


const Menu: React.FC = () => {
  const location = useLocation();
  const user = getUser()
  return (
      <IonMenu contentId="main" type="overlay">
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>{user.email}</IonListHeader>
            <IonNote>{user.firstname}</IonNote>
            {appPages.map((appPage, index) => {
              return appPage.items.length > 0 ? <DropdownMenu key={index} items={appPage}/> : (
                  <IonMenuToggle key={index} autoHide={false}>
                    <IonItem className={location.pathname === appPage.url ? 'selected' : ''}
                             routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon aria-hidden="true" style={{fontSize: "35px"}}
                               slot="start" ios={appPage.iosIcon} md={appPage.mdIcon}/>
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu>
  );
};

export default Menu;
