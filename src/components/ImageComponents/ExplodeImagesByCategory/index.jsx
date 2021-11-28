import React from 'react';
import Image from '../image';

import * as styles from '../ImagesByCategory/index.module.scss';

const ImagesByCategory = ({ imageGroups }) => {
    const groupedImage = imageGroups.map((group, i) =>
        group.map((imagedata, j) =>
            <Image
                className={styles[`_${(i+j)%2}`]}
                imagedata={imagedata}
            />
        )
    );

    const images = imageGroups.reduce(
        (arr, group) =>
            [...arr, ...group],
        []
    );

    const row1 = 3;
    const row2 = 2;

    let imageGrid = [];
    images.forEach((image, i) => {
        const oddrow = Math.floor((i % (row1 + row2)) / row1);
        const baserow = Math.floor(i / (row1 + row2)) * 2;
        const rownumber = baserow + oddrow;

        if (imageGrid.length < rownumber + 1) {
            imageGrid = [...imageGrid, []]
        }

        imageGrid[imageGrid.length - 1] = [...imageGrid[imageGrid.length - 1], image]
    })

    return (
        <div className={styles.imageCategoriesWrapper}>
            {imageGrid.map((row, i) =>
                <div className={styles[`_${i%2}`]}>
                    {row.map((image) =>
                        <div className={styles.imageWrapper}>
                            <a>
                                <Image imagedata={image} />
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ImagesByCategory;