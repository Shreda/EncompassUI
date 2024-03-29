import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar({saveSuccess, callback}) {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        callback()
    };

    React.useEffect(() => {
        setOpen(saveSuccess)
    }, [saveSuccess])
    
    
  return (
    <div>
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            message="Saved"
            action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={handleClose}>
                        UNDO
                    </Button>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            }
      />
    </div>
  );
}