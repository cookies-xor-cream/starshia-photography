import React, { useEffect } from 'react';

import Image from '../Image';

import * as styles from './index.module.scss';

const FullscreenModal = ({ imageData, closeModal }) => {
    useEffect(() => {
        const dochtml = document.querySelector('html');        
        dochtml.classList.add('noscroll');
    }, []);

    return (
        <div className={styles.imageModal}>
            <div className={styles.imagewrapper}>
                <Image imagedata={imageData} />
            </div>

            <button
                className={styles.close}
                onClick={closeModal}
            >
                close
            </button>
        </div>
    );
};

export default FullscreenModal;