import img1 from '../src/images/1.jpg';
import img2 from '../src/images/2.jpg';
import img3 from '../src/images/3.jpg';

export function getImage (imageNumber) {
    switch(imageNumber) {
        case 1:
            return img1;
        case 2:
            return img2;
        case 3:
            return img3;
        default:
            return img1;
    }
};

export function formatPrice (price) {
    try {
        return `$${Number(price).toFixed(2)}`;
    } catch (error) {
        console.error('Error formatting price:', error);
        return `$${price}`;
    }
};