import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import useClasses from "../../utils/useClasses";

import ImageSliderStyles from './ImageSliderStyles';

const ImageSlider = () => {
    const images = [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cluj_Biserica_Sf%C3%A2ntul_Mihail.jpg/1200px-Cluj_Biserica_Sf%C3%A2ntul_Mihail.jpg',
        'https://www.sapantamaramures.ro/wp-content/uploads/2017/02/baia-mare.jpg'
    ];

    const classes = useClasses(ImageSliderStyles, { name: "ImageSliderStyles" })

    return (
        <div className={classes.container}>
            <Carousel
                showThumbs={false}
                infiniteLoop
                className={classes.wrapper}>
                {images.map((image, index) => (
                    <div key={index} className={classes.item}>
                        <img src={image} alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </Carousel >
        </div>

    );
}

export default ImageSlider