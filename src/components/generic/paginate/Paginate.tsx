import {IonButton} from '@ionic/react';
import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
function Paginate({totalraw = 6, page_number = 3, newPage}) {
    const paginationItems = Array.from({length: totalraw}, (_, index) => (
        <IonButton
            key={index}
            fill={index + 1 === page_number + 1 ? 'solid' : 'outline'}
            onClick={() => {
                newPage(index);
            }}
        >
            {index + 1}
        </IonButton>
    ));

    return (
        <>
        {totalraw >1 &&
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <IonButton
                onClick={() => {
                    if (page_number - 1 >= 0) newPage(page_number - 1);
                }}
            >
                «
            </IonButton>
            {paginationItems}
            <IonButton
                onClick={() => {
                    if (page_number + 1 < totalraw) newPage(page_number + 1);
                }}
            >
                »
            </IonButton>
        </div>}
        </>
    );
}

Paginate.propTypes = {
    totalraw: PropTypes.number,
    page_number: PropTypes.number,
    newPage: PropTypes.func,
};
export default Paginate