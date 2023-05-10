import React, { useState } from 'react';
import style from "./Listartareas.module.css"
import IconButton from '@mui/material/IconButton'
import Fingerprint from '@mui/icons-material/Fingerprint';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



export default function Tareas ({ id, texto, completarTarea, eliminarTarea, editarTarea, estado }) {

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
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h1> Editar texto</h1>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <input type="text" value={editinput.textos} onChange={handleInputChange} />
                        <button onClick={() => editarTarea(editinput, id)} >Guardar</button>
                        </Typography>
                    </Box> 
                </Modal>
            </div>
            <div
                    className={style.tarea}
                    onClick={() => completarTarea(id)} >
                    <IconButton aria-label="fingerprint" color="success">
                        <Fingerprint />
                    </IconButton> {texto}
            </div>
            <div   >
                <Button type="" onClick={() => eliminarTarea(id)} className={style.boton} >Eliminar</Button>
           <Button onClick={handleOpen}>Editar</Button>
            </div>
        </div>
    );
}
