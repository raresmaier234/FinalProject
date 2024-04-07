import { Height, Margin } from "@mui/icons-material"

const homeComponentStyles = (theme) => ({
    wrapper: {
        background: "#FDF5E6",
        height: "100vh"
    },

    datePicker: {
        background: "white",
        display: "grid",
        gridTemplateColumns: "200px 200px 200px 70px 70px",
        gap: "20px",
        margin: "20px",
        width: "auto",
        borderRadius: "1px",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "1px solid black"
    }
})

export default homeComponentStyles