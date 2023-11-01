import { useState } from 'react'
import Button from '@mui/material/Button'

function ButtonWithHover({ label, handleClick, st }) {
    const [bgColor, setBgColour] = useState('rgb(72, 205, 249)')

    const Styles = {
        btnMargin: {
            color: 'white',
            backgroundColor: `${bgColor}`,
            borderRadius: '40px',
            fontSize: '12px',
            fontWeight: 'bold',
            width: '80px',
            height: '50px',
            margin: '10px'
        },

        btnNoMargin: {
            color: 'white',
            backgroundColor: `${bgColor}`,
            borderRadius: '40px',
            fontSize: '12px',
            fontWeight: 'bold',
            width: '80px',
            height: '50px',
            position: 'relative',
            border: 0
        }
    }

    const selectedStyle = st === 'btnMargin' ? Styles.btnMargin : Styles.btnNoMargin;

    return (
        <Button color="inherit"
            style={
                selectedStyle
            }
            onMouseEnter={() => setBgColour("#cce6ff")}
            onMouseLeave={() => setBgColour('rgb(72, 205, 249)')}
            onClick={handleClick}>
            {label}
        </Button>
    )
}

export default ButtonWithHover