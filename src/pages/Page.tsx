import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import React from "react";
import { useTable } from 'react-table';
import GContainer from "../components/generic/GContainer";

const Page: React.FC = () => {

    const data = React.useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'React',
                col2: 'Table',
            },
            {
                col1: 'Material',
                col2: 'UI',
            },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Column 2',
                accessor: 'col2',
            },
        ],
        []
    );

  const { name } = useParams<{ name: string; }>();

    const component = (
        <h1>coucou</h1>
    )
    return <GContainer title={name} component={component} />
};

export default Page;
