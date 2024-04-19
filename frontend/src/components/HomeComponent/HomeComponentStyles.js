import { Height, Margin } from "@mui/icons-material"

const homeComponentStyles = (theme) => ({
    wrapper: {
        background: "#FDF5E6",
        height: "100vh"
    },

    filterBox: {
        background: "white",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 70px 70px",
        gap: "20px",
        margin: "20px",
        width: "auto",
        borderRadius: "1px",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "1px solid black"
    },
    datePicker: {
        padding: "20px",

        "& .MuiStack-root": {
            paddingTop: "0px"
        }
    }
})

export default homeComponentStyles