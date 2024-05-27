const ImageSliderStyles = (theme) => ({
    item: {
        width: "100%",
        height: "500px",
        overflow: 'hidden',
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    wrapper: {
        height: "500px",
        marginLeft: "0px"
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "500px",
    }
});

export default ImageSliderStyles;
