import React, { useState, useEffect, useMemo, useCallback } from 'react';
import cc from 'classcat';

import Image from '../Image';
import FullscreenModal from '../FullscreenModal';

import * as styles from './index.module.scss';


const ImageGrid = ({
    imageData,
    includeDirectory=false,
    categoryLinks=false
}) => {
    const [modalIndex, setModalIndex] = useState(-1);

    const mobileWidth = 768;
	const isMobile = () => window.innerWidth < mobileWidth;

	const [mobile, setMobile] = useState(isMobile());

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

    const nextImage = useCallback(() => {
        setModalIndex((modalIndex + 1) % imageData.length);
    }, [modalIndex])

    const prevImage = useCallback(() => {
        setModalIndex((modalIndex - 1 + imageData.length) % imageData.length);
    }, [modalIndex])

    return (
        <div>
            {modalIndex !== -1 &&
                <FullscreenModal
                    imageData={imageData[modalIndex].childImageSharp.original}
                    next={nextImage}
                    prev={prevImage}
                    closeModal={() => closeModal(modalIndex)}
                />
            }

            <div className={cc({
            [styles.mobile]: !!mobile,
            [styles.desktop]: !mobile,
            [styles.imageCategoriesWrapper]: true
        })}>
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
