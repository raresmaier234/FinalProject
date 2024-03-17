import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'


const StyledModal = ({
    isOpen,
    onClose,
    title,
    noTtile = false,
    children,
}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>
                <div>
                    {!noTtile && (
                        <div>
                            {title}
                        </div>
                    )}
                </div>
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>

    )
}

export default StyledModal