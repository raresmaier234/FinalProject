const rentComponentStyles = (theme) => ({
    wrapper: {
        display: "grid",
        gridTemplateRows: "minmax(100px, 1fr) minmax(100px, 1fr)",
        width: "100%",
        gap: "40px",
        justifyItems: "center",
        padding: "100px 20px"
    },

    filters: {
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        paddingTop: "100px",
        marginBottom: "10px",
    }
})

export default rentComponentStyles