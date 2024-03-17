import Button from '@mui/material/Button'
import { styled } from "@mui/material/styles"

const StyledButton = styled(Button)(({ theme }) => ({
    fontStyle: "normal",
    color: theme.palette.common.white,
    backgroundColor: "#ffc299",
    fontSize: 12,
    fontWeight: "bold",
    borderRadius: "10px",
    "&:hover": {
        boxShadow: "none"
    }
}));

export default StyledButton