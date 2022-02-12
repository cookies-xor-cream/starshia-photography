import React, { useEffect } from 'react';

import Image from '../Image';

import * as styles from './index.module.scss';

const FullscreenModal = ({ imageData, closeModal, next, prev }) => {
    useEffect(() => {
        const dochtml = document.querySelector('html');        
        dochtml.classList.add('noscroll');
    }, []);

    return (
        <div className={styles.imageModal}>
            <div className={styles.imagewrapper}>
                <Image imagedata={imageData} />
            </div>

            <div className={styles.buttonPanel}>
                <button onClick={closeModal}>close</button>
                <button onClick={next}>next</button>
                <button onClick={prev}>prev</button>
            </div>
        </div>
    );
};

export default FullscreenModal;