import React, { useState, useEffect, useMemo } from 'react';
import Image from '../Image';
import cc from 'classcat';

import * as styles from './index.module.scss';

const ExplodeImages = ({ imageGroups }) => {
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

    const mobileWidth = 768;
	const isMobile = () => window.innerWidth < mobileWidth;

	const [mobile, setMobile] = useState(useState(isMobile()));

	const onWindowResize = () => {
		setMobile(isMobile());
	}

	useEffect(() => {
		setMobile(isMobile);
		window.addEventListener('resize', onWindowResize);
	});

    const row1 = useMemo(() => {
        return mobile ? 1 : 3;
    });

    const row2 = useMemo(() => {
        return mobile ? 1 : 2;
    });

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
        <div className={cc({
            [styles.mobile]: !!mobile,
            [styles.desktop]: !mobile,
            [styles.imageCategoriesWrapper]: true
        })}>
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

export default ExplodeImages;
