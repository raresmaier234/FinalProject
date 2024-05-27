import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import useClasses from "../../utils/useClasses";
import ImageSliderStyles from './ImageSliderStyles';

const ImageSlider = ({ images }) => {
    const classes = useClasses(ImageSliderStyles);

    return (
        <div className={classes.container}>
            <Carousel
                showThumbs={false}
                infiniteLoop
                className={classes.wrapper}
            >
                {images.map((image, index) => (
                    <div key={index} className={classes.item}>
                        <img src={image} alt={`Slide ${index + 1}`} className={classes.image} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default ImageSlider;
