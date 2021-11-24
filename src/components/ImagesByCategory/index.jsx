import React from 'react';
import ImageRow from './imagerow';

const ImagesByCategory = ({ imageGroups }) => (
    <div>
        <ImageRow imageGroups={imageGroups} />
    </div>
);

export default ImagesByCategory;