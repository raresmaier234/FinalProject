import { Height, Margin } from "@mui/icons-material"

const homeComponentStyles = (theme) => ({
    wrapper: {
    },

    filterBox: {
        background: "white",
        display: "flex", // Use flexbox instead of grid for a single column layout
        flexDirection: "row", // Align items vertically
        gap: "10px", // Space between items
        margin: "20px",
        padding: "20px", // Add padding for better spacing around items
        width: "auto",
        borderRadius: "5px", // Increase border radius for a softer look
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adjust box-shadow to make it more visually appealing
        border: "1px solid #e0e0e0" // Adjusted border style to blend better with the box shadow
    },
    datePicker: {
        padding: "20px",
        paddingTop: "0px", // Ensure top padding for the outer container is zero
        "& .MuiStack-root": {
            paddingTop: "0px !important" // Override the internal stack root padding
        },
        "& .MuiInputBase-root": {
            marginTop: "0px !important", // Reset margin or padding on the internal input field itself, if required
        }
    }
})

export default homeComponentStyles