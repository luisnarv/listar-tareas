import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import style from "./actions.module.css";
import Tareas from './Listartareas';
import Create from './Creartarea';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { agregartareas, editarT, eliminar, complet, filtrarC, filtrarestado, filtranombre } from "../actions/index"

// const [tareas, setTareas] = useState([{
//     id: "c2026c24-63c7-4c4d-be97-3118ad628537",
//      name: "DSDSDSD", 
//      texto: "qqq",
//       estado: false
// }])


export default function ListaDeTareas() {
    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const [searchValue, setSearchValuetName] = useState("")
    const [comlple, setComple] = useState([])
   
    //----------------1------------------
    const agregarTarea = tarea => {
        dispatch(agregartareas(tarea));
    }
    const allnotas = useSelector((state) => state.alltareas)
    const allfiltro = useSelector((state) => state.allfiltro)
    const guardado = useSelector((state) =>  !state.lst ? "": state.lst )
    //----------------------2-------------------------------
    const eliminarTarea = id => {
        dispatch(eliminar(id));
      //  setshow(true);
    }
    ////**************************************************** */
    function handleSearchChange(e) {
        setSearchValuetName(e.target.value);
    }
    //--------------------------------------------------------------------   
    function handleEstado(e) {
        dispatch(filtrarestado(e.target.value))
        setshow(true)
    }
    //--------------------------------------------------------------------   
    function handleCategory(e) {
        e.preventDefault();
        dispatch(filtrarC(e.target.value))
        setshow(true)
    }
    //--------------------------------------------------------------------
    const editarTarea = (editinput, id) => {
        dispatch(editarT(editinput, id))
    }
    //--------------------------------------------------------------------   
    const completarTarea = id => {
        dispatch(complet(id))
    }
    //--------------------------------------------------------------------   
    function handleBuscar(e) {
        e.preventDefault();
        setSearchValuetName("")
        dispatch(filtranombre(searchValue))
        setshow(true)
    }
    //--------------------------------------------------------------------   
    function handleReset(e) {
        e.preventDefault();
        setshow(false)
    }

    const categoria = ["Prioridad alta", "Prioridad media", "Prioridad baja"];
    const estado = ["Finalizado", "Pendiente",];

    // const tareasList = undefined
  if (guardado){
    var tareasList = guardado.map((event) => (
        <Tareas
            key={event.id}
            id={event.id}
            name={event.name}
            texto={event.texto}
            estado={event.estado}
            completarTarea={completarTarea}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
        />
    ));
  }

    const Efiltro = allfiltro.map((e) => (
        //{  return (
        <Tareas
            key={e.id}
            id={e.id}
            name={e.name}
            texto={e.texto}
            estado={e.estado}
            completarTarea={completarTarea}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
        />
    )
        //}
    )

    const Notas = allnotas.map((e) => (
        <Tareas
            key={e.id}
            id={e.id}
            name={e.name}
            texto={e.texto}
            estado={e.estado}
            completarTarea={completarTarea}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
        />
    )
    )

   
    return (
        <>
            <Create onSubmit={agregarTarea} />
            <div className={style.contenedor}>
                <div className={style.contenedorInterno}>
                    <h2 className={{ color: "black" }}  >Filtros</h2>
                    <br />
                    <Button onClick={(e) => handleReset(e)} variant="outlined" color="error">Borrar filtros</Button>
                    <br /><br />
                    <div>
                        <FormControl variant="outlined" component="form" fullWidth sx={{ maxWidth: 200 }}   >
                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                value={comlple}
                                onChange={(e) => { handleEstado(e) }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {estado.map((e, index) => (
                                    <MenuItem key={index} value={e} name="time">{e}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <br />
                    <div>
                        <Box sx={{ maxWidth: 200 }}>
                            <FormControl fullWidth sx={{ maxWidth: 200 }} >
                                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    value={comlple}
                                    onChange={(e) => { handleCategory(e) }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {categoria.map((e, index) => (
                                        <MenuItem key={index} value={e} name="time">{e}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <br />
                    <div>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '20ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Buscar" variant="standard" value={searchValue} onChange={(e) => handleSearchChange(e)} type="text" />
                            <Button onClick={(e) => handleBuscar(e)} >buscar</Button>
                        </Box>
                    </div>
                </div>
                <div className={style.container}>
                    {allfiltro.length > 0 && show === true ?(
                        Efiltro)
                        : allfiltro.length === 0 && show === true ?(
                            <p style={{ fontSize: "10px", color: "red" }}>No se encontró nada</p>) 
                            : allfiltro.length === 0 && show === false ?(
                                tareasList)
                                : allnotas.length >= 1 ?(
                                    Notas)
                                    : (
                     
                                
            <p style={{ fontSize: "10px", color: "red" }}>No hay nada para mostrar</p>)
                                                           
                    }
                </div>
            </div>
        </>
    );
}


