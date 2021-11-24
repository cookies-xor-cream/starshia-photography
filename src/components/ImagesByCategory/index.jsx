import React from 'react';
import Image from './image';

import * as styles from './index.module.scss';

const ImagesByCategory = ({ imageData }) => {
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
    })

    console.log(imageGrid);

    return (
        <div className={styles.imageCategoriesWrapper}>
            {imageGrid.map((row, i) =>
                <div className={styles[`_${i%2}`]}>
                    {row.map((imageInfo) =>
                        <div className={styles.imageWrapper}>
                            <a href={`/categories/${imageInfo.relativeDirectory}`}>
                                <Image imagedata={imageInfo.childImageSharp.original} />
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ImagesByCategory;