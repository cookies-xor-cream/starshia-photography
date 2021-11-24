import React from 'react';
import Image from './image';

const ImageRow = ({ imageGroup }) => (
    <div>
        {imageGroup.map((imagedata) =>
            <Image imagedata={imagedata.src} />
        )}
    </div>
);

export default ImageRow;