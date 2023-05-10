import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from "./Creartarea.module.css"
import { v4 as uuidv4 } from 'uuid';
import Icon from '@mui/material/Icon';


export default function Create(props) {
  const [input, setInput] = useState({
    name: "",
    text: "",
    categoria: ""
  })
  console.log(input)

  function handleInputChange(e) {
    setInput( { ...input,[e.target.name]: e.target.value
  })
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const tareaNueva = {
      id: uuidv4(),
      name:input.name,
      texto: input.text,
      estado:false,/*/*/
      categoria: input.categoria
    }
 setInput("")
  }


  return (
    <div className={style.container}>
      <Box
      className={style.caja}
        component="form"
        onSubmit={handleSubmit}
        sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' }, 
        }}
        noValidate
        autoComplete="off"
      >
             <TextField
            onChange={(e) => handleInputChange(e)}
            value={input.name}
            name="name"
            id="outlined-required"
            label="Nombre"
    /> 
          <TextField
            onChange={(e) => handleInputChange(e)}
            value={input.text}
            name="text"
            id="outlined-required"
            label="Nueva nota"
    /> 
     <TextField
            onChange={(e) => handleInputChange(e)}
            value={input.categoria}
            name="categoria"
            id="outlined-required"
            label="Elegir categoria"
    /> 
   <Icon baseClassName="fas" className="fa-plus-circle" />
         <button className={style.buton} type='submit'> crear </button> 
      </Box>
    </div>
  )
}