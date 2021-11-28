import React, { useState, useEffect } from 'react';

import Image from '../Image';
import FullscreenModal from '../FullscreenModal';

import * as styles from './index.module.scss';

const ImageGrid = ({
    imageData,
    includeDirectory=false,
    categoryLinks=false
}) => {
    const [modalIndex, setModalIndex] = useState(-1);

    const row1 = 3;
    const row2 = 2;

    let imageGrid = [];
    imageData.forEach((image, i) => {
        const oddrow = Math.floor((i % (row1 + row2)) / row1);
        const baserow = Math.floor(i / (row1 + row2)) * 2;
        const rownumber = baserow + oddrow;

        if (imageGrid.length < rownumber + 1) {
            imageGrid = [...imageGrid, []]
        }

        imageGrid[imageGrid.length - 1] = [...imageGrid[imageGrid.length - 1], image]
    });

    const closeModal = (i) => {
        const dochtml = document.querySelector('html');        
        dochtml.classList.remove('noscroll');

        setModalIndex(-1);
    }

    const indexMap = (i, j) => Math.floor(i/2) * (row1 + row2) + (i%2) * row1 + j;

    return (
        <div>
            {modalIndex !== -1 &&
                <FullscreenModal
                    imageData={imageData[modalIndex].childImageSharp.original}
                    closeModal={() => closeModal(modalIndex)}
                />
            }

            <div className={styles.imageCategoriesWrapper}>
                {imageGrid.map((row, i) =>
                    <div className={styles[`_${i%2}`]}>
                        {row.map((imageInfo, j) =>
                            <div className={styles.imageWrapper}>
                                {
                                    categoryLinks ? (
                                        <a
                                            className={styles.imagewrapper}
                                            href={`/categories/${imageInfo.relativeDirectory}`}
                                        >
                                            <Image imagedata={imageInfo.childImageSharp.original} />
                                        </a>

                                    ) : (
                                        <div
                                            className={styles.imagewrapper}
                                            onClick={() => setModalIndex(indexMap(i, j))}
                                        >
                                            <Image imagedata={imageInfo.childImageSharp.original} />
                                        </div>
                                    )
                                }

                                {
                                    includeDirectory &&
                                    imageInfo.relativeDirectory &&
                                    imageInfo.relativeDirectory
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageGrid;