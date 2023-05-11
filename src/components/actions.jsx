import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createSignal } from "solid-js"
import style from "./actions.module.css";
import Autocomplete from '@mui/material/Autocomplete';
//import Tareas from "./tareas"
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


export default function ListaDeTareas() {
    const dispatch = useDispatch()
    const allnotas = useSelector((state) => state.alltareas)
    var allfiltro = useSelector((state) => state.allfiltro)
   

    const [tareas, setTareas] = useState([])

    const [tareasFiltradas, setTareasFiltradas] = useState([]);


    useEffect(() => {
        dispatch(agregartareas(tareas));
    }, [dispatch, tareas])


    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }, [tareas]);


    const [searchValue, setSearchValuetName] = useState("")
    const [comlple, setComple] = useState([])
    const [cate, setcate] = useState([]);

    function handleInputChange(e) {
        e.preventDefault();
        setSearchValuetName(e.target.value);
    }

    //--------------------------------------------------------------------   
    function handleEstado(e) {
        
        setComple(e.target.value)
        dispatch(filtrarestado(e.target.value))
    }

    //--------------------------------------------------------------------   
    function handleCategory(e) {
        e.preventDefault();
        setcate(e.target.value)
        dispatch(filtrarC(e.target.value))
    }

    //--------------------------------------------------------------------   
    const agregarTarea = tarea => {
        if (tarea.texto.trim()) {
            tarea.texto = tarea.texto.trim();
            const tareasActualizadas = [tarea, ...tareas];
            setTareas(tareasActualizadas);
            dispatch(agregartareas(tareasActualizadas))
        }
    }

    const editarTarea = (editinput, id) => {
        dispatch(editarT(editinput, id))
    }

    const eliminarTarea = id => {
        dispatch(eliminar(id))
    }
    const completarTarea = id => {
        dispatch(complet(id))
    }

    //--------------------------------------------------------------------   
    function handleSubmit(e) {
        e.preventDefault();
        setSearchValuetName("")
        dispatch(filtranombre(searchValue))
    }

    //--------------------------------------------------------------------   
    function handleReset(e) {
        e.preventDefault();
        setTareasFiltradas(tareas)
        dispatch(agregartareas(tareas))
        dispatch(filtrarestado(e.target.value))
    }

    const categoria = ["Prioridad alta", "Prioridad media", "Prioridad baja"];
    const estado = ["Finalizado", "Pendiente"];

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
                                    value={cate}
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
                            <TextField id="standard-basic" label="Buscar" variant="standard" value={searchValue} onChange={(e) => handleInputChange(e)} type="text" />
                            <Button onClick={(e) => handleSubmit(e)} >buscar</Button>
                        </Box>
                    </div>
                </div>
                <div className={style.container}>
                    {allfiltro[0].id ? allfiltro.map((country) => {
                        return (
                            <div >
                                <div >
                                    <Tareas
                                        key={country.id}
                                        id={country.id}
                                        name={country.name}
                                        texto={country.texto}
                                        estado={country.estado}
                                        completarTarea={completarTarea}
                                        eliminarTarea={eliminarTarea}
                                        editarTarea={editarTarea}
                                    />
                                </div>
                            </div>
                        );
                    }) : allnotas.map((country, index) => {
                        return (
                            <div >
                                <div >
                                    <Tareas
                                        key={index}
                                        id={country.id}
                                        name={country.name}
                                        texto={country.texto}
                                        estado={country.estado}
                                        completarTarea={completarTarea}
                                        eliminarTarea={eliminarTarea}
                                        editarTarea={editarTarea}
                                    />
                                </div>
                            </div>
                        );
                    })
                    }
                </div>
            </div>

        </>
    );
}