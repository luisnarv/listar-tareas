import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from "./Creartarea.module.css"
import { v4 as uuidv4 } from 'uuid';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';





function valida(input) {

  let errors = {}
  if (!input.name) {
    errors.name = "El comentario no puede estar vacío";
  } else if (input.name.length <= 16 || input.name.length === 1) {
    errors.name = "El comentario debe ser de más de 16 caracteres";
  }
  if (!input.text) {
    errors.text = "El comentario no puede estar vacío";
  } else if (input.text.length <= 16 || input.text.length === 1) {
    errors.text = "El comentario debe ser de más de 16 caracteres";
  }
  if (!input.categoria) {
    errors.categoria = "El comentario no puede estar vacío";
  } else if (input.categoria.length <= 16 || input.categoria.length === 1) {
    errors.categoria = "El comentario debe ser de más de 16 caracteres";
  }
  return errors
}


export default function Create(props) {
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [input, setInput] = useState({
    name: "",
    text: "",
    categoria: ""
  })

  console.log(mostrarBoton)
  const [errors, setErrors] = useState({
    name: "",
    text: "",
    categoria: ""
  });

  useEffect(() => {
    if (input.name && input.text && input.categoria) {
      setMostrarBoton(true);
    } else if (errors) {
      setMostrarBoton(false);
    }
    if (!errors.name && !errors.text && !errors.categoria) {
      setMostrarBoton(false)
    }
  }, [errors, input]);


  function handleInputChange(e) {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    setErrors(valida({
      ...input, [e.target.name]: e.target.value
    }))
  }
console.log(input.categoria)
  function handleSubmit(e) {
    e.preventDefault();

    const tareaNueva = {
      id: uuidv4(),
      name: input.name,
      texto: input.text,
      estado: false,/*/*/
      categoria: input.categoria
    }
    props.onSubmit(tareaNueva)
    setInput("")
  }
  const categoria = ["Prioridad alta", "Prioridad media", "Prioridad baja"];

  return (
    <div className={style.container}>
      <Box
        className={style.caja}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
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
        <Autocomplete
          disablePortal
          name="categoria"
          id="combo-box-demo"
          options={categoria}
          sx={{ width: 300 }}
          onChange={(event, value) => handleInputChange({ target: { name: "categoria", value } })}
          value={input.categoria}
          renderInput={(params) => <TextField   
          name="categoria"
          id="outlined-required"
           {...params}
          label="Categoria" />}
        />

        <Icon baseClassName="fas" className="fa-plus-circle" />
        <button className={style.buton} type='submit'> crear </button>

        {mostrarBoton ? (<Button style={{ margin: "10px", width: "100px", }} type='submit' class="btn btn-outline-success">  Publicar  </Button>) : <Button disabled>Disabled</Button>}
      </Box>
    </div>
  )
}