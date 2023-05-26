import React, { useState } from 'react';
import style from "./Listartareas.module.css"
import IconButton from '@mui/material/IconButton'
import Fingerprint from '@mui/icons-material/Fingerprint';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function Tareas({ id, name, texto, completarTarea, eliminarTarea, editarTarea, estado }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editinput, editsetInput] = useState("")

    function handleInputChange(e) {
        editsetInput(e.target.value
        )
    }


    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className={estado === true ? style.container : style.sinc}>
            <div>
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styles}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                <h1> Editar Tarea</h1>
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 1, width: '30ch' }}>
                                <TextField id="outlined-basic" label="Editar" type="text" value={editinput.textos} onChange={handleInputChange} variant="outlined" />
                                <Button onClick={(e) => { editarTarea(editinput, id); handleClose(e) }} > Guardar</Button>
                            </Typography>
                        </Box>
                    </Modal>
                </div>
                <div
                    className={style.tarea}
                    onClick={() => completarTarea(id)} >
                    <p>Nombre: {name}</p> <p>Nota: {texto}</p>
                </div>
                <div>
                    <IconButton onClick={() => eliminarTarea(id)} aria-label="fingerprint" color="secondary">
                        <DeleteForeverIcon />  <p>Eliminar</p>
                    </IconButton>
                    <IconButton onClick={handleOpen} aria-label="fingerprint" color="primary" fontSize="small" >
                        <ModeEditIcon />  <p  >Editar</p>
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
