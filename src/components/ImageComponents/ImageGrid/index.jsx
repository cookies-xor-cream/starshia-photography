import React from 'react';
import Image from '../image';

import * as styles from './index.module.scss';

const ImageGrid = ({
    imageData,
    includeDirectory=false,
    categoryLinks=false
}) => {
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

    return (
        <div className={styles.imageCategoriesWrapper}>
            {imageGrid.map((row, i) =>
                <div className={styles[`_${i%2}`]}>
                    {row.map((imageInfo) =>
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
                                    <div className={styles.imagewrapper}>
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
    );
}

export default ImageGrid;