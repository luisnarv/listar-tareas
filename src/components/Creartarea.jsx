import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import style from "./Creartarea.module.css"
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Validate} from "./valida"
import Typography from '@mui/material/Typography';


export default function Create(props) {
  const [mostrarBoton, setMostrarBoton] = useState(false);
  const [input, setInput] = useState({
    name: "",
    text: "",
    categoria: ""
  })

  const [errors, setErrors] = useState({
    name: "",
    text: "",
    categoria: ""
  });

  useEffect(() => { 
     if (!errors.name && !errors.text && !errors.categoria) {
      setMostrarBoton(true)
    }
    if (input.name && input.text && input.categoria) {
      setMostrarBoton(true);
    } else if (errors) {
      setMostrarBoton(false);
    }
  
  }, [errors, input]);


  function handleInputChange(e) {
    setInput({
      ...input, [e.target.name]: e.target.value
    })
    setErrors(Validate({
      ...input, [e.target.name]: e.target.value
    }))
  }

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
    setInput({
      name: "",
      text: "",
      categoria: ""

    })
  }
  const categoria = ["Prioridad alta", "Prioridad media", "Prioridad baja"];

  return (
 
 <div className={style.container}>
      <Card item sx={{ backgroundColor:"#d2d3d7" }}>
       <Box 
        className={style.caja}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m:1, width: '20ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        <h2>Crear Tarea</h2>
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <TextField
          onChange={(e) => handleInputChange(e)}
          value={input.name}
          name="name"
          id="outlined-required"
          label="Nombre *"
        /> {errors.name && ( <p className={style.error}>{errors.name}</p>)} 
        <br /> 
        <TextField
          onChange={(e) => handleInputChange(e)}
          value={input.text}
          name="text"
          id="outlined-required"
          label="Nueva nota *"
        />{errors.text && ( <p className={style.error}>{errors.text}</p>)} 
         <br />
        <Autocomplete
          disablePortal
          name="categoria"
          id="combo-box-demo"
          options={categoria}
          sx={{ width:200 }}
          onChange={(event, value) => handleInputChange({ target: { name: "categoria", value } })}
          value={input.categoria}
          renderInput={(params) => <TextField   
          name="categoria"
          id="outlined-required"
           {...params}
          label="Categoria *" />}
        />{errors.categoria && ( <p className={style.error}>{errors.categoria}</p>)} 
        </Typography>
      </CardContent>
      <CardActions>
      {mostrarBoton ? (<Button className={style.buton} type='submit' color="success" > Crear </Button>) :<Button style={{width:"300px", display:"flex", flexDirection:"column", alignItems:"center" }} disabled>Crear</Button>}
      </CardActions>
      </Box> 
    </Card>
    
    </div>

  )
}