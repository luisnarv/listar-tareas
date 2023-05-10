import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { createSignal } from "solid-js"
import style from "./actions.module.css";
//import Tareas from "./tareas"
import Tareas from './Listartareas';
import Create from './Creartarea';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {agregartareas, editartarea, eliminartarea, completartarea, filtrarcategoria, filtrarestado} from "../actions/index"


export default function ListaDeTareas() {
    const dispatch = useDispatch()
    const [tareasFiltradas, setTareasFiltradas] = useState([]);
    const [tareas, setTareas] = useState(() => {


        const savedTasks = localStorage.getItem('tareas');
        return savedTasks !== null ? JSON.parse(savedTasks) : [""]
    });




    const [Treas, setTreas] = useState(() => {
        const savedTasks = localStorage.getItem('Treas');
        return savedTasks !== null ? JSON.parse(savedTasks) : [""]
    });

    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }, [tareas]);

    useEffect(() => {
        localStorage.setItem('Treas', JSON.stringify(Treas));
    }, [Treas]);

    useEffect(() => {
        setTreas(tareas)
    }, [setTreas])


    const [searchValue, setSearchValuetName] = useState("")
    const [comlple, setComple] = useState("")
    const [categor, setCategor] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
        setSearchValuetName(e.target.value);
    }

    function handleEstado(e) {
        e.preventDefault();
        //dispatch(filtrarestado(e.target.value))
        setComple(e.target.value)
    }


    function handleCategory(e) {
        e.preventDefault();
        //dispatch(filtrarcategoria(e.target.value))
        setCategor(e.target.value)
    }

    const agregarTarea = tarea => {
        if (tarea.texto) {
            tarea.texto = tarea.texto;
            const tareasActualizadas = [tarea, ...tareas];
            setTareas(tareasActualizadas);
            setTreas(tareasActualizadas)
            agregartareas(tareasActualizadas)
        }
    }
    const editarTarea = (editinput, id) => {
        for (let i = 0; i <= tareas.length - 1; i++) {
            if (tareas[i].id === id) {
                tareas[i].texto = editinput
            }
        } setTareas([...tareas]);
    }
    const eliminarTarea = id => {
      
        const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
        
        setTareas(tareasActualizadas);
        setTreas(tareasActualizadas);
    }

    const completarTarea = id => {
        const tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id) {
                tarea.estado = tarea.estado ? false : true;
            }
            return tarea;
        });
        setTareas(tareasActualizadas);
    }
    //filtor por nombre
    function Searc(name) {
        const filtro = tareas.filter(tarea => tarea.name === name);
       
        setTareasFiltradas(filtro)
    }

    function estado(id) {
        if (id === "false") {
            const Actualizadas = tareas.filter(tarea => tarea.estado === true);
            setTareasFiltradas(Actualizadas);
        } else {
            const tareasActualizadas = tareas.filter(tarea => tarea.estado === false);
            setTareasFiltradas(tareasActualizadas);
        }
    }

    function category(id) {
        const Actualizadas = tareas.filter(tarea => tarea.categoria === id);
        setTareasFiltradas(Actualizadas);
    }


    function handleSubmit(e) {
        e.preventDefault();
        Searc(searchValue);
        setSearchValuetName("")

    }

    function handleReset(e) {
        e.preventDefault();
        setTareasFiltradas(tareas)
    }


    function handle(e) {
        e.preventDefault();
        estado(comlple)
    }
    function handlecatego(e) {
        e.preventDefault();
        category(categor)
    }

    const categoria = ["Prioridad alta", "Prioridad media", "Prioridad baja"];

    return (
        <>
            <Create onSubmit={agregarTarea} />
            <div className={style.contenedor}>
                <div className={style.contenedorInterno}>
                 <h2 className={{color: "black"}}  >Filtros</h2>
                 <br />
                    <Button   onClick={(e) => handleReset(e)} variant="outlined" color="error">Borrar filtros</Button>
                    <br /><br />
                    <div>
                        <Box sx={{ maxWidth: 200 }}>
                            <FormControl fullWidth sx={{maxWidth: 200 }}   > 
                                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Estado"
                                    onClick={(e) => handle(e)}
                                    onChange={(e) => { handleEstado(e) }}
                                >
                                    <MenuItem value={"false"}>Pendiente</MenuItem>
                                    <MenuItem value={"true"}>Finalizado</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
        <br />            <div>
                    <Box sx={{ maxWidth: 200 }}>
                            <FormControl fullWidth sx={{maxWidth: 200 }} >
                                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    onClick={(e) => handlecatego(e)}
                                    onChange={(e) => { handleCategory(e) }}
                                >
                                    {categoria.map(e => (<MenuItem value={e} name="time">{e}</MenuItem>))}
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
                            {/* <input value={searchValue} onChange={(e) => handleInputChange(e)} type="text" /> */}
                            <Button onClick={(e) => handleSubmit(e)} >buscar</Button>
                        </Box>
                    </div>
                </div>
                <div className={style.container}>
                    {
                        tareasFiltradas.length <=0 ?
                            // tareasFiltradas.map((tarea) =>

                            tareas.map((tarea) =>
                            <Tareas
                                key={tarea.id}
                                id={tarea.id}
                                name={tarea.name}
                                texto={tarea.texto}
                                estado={tarea.estado}
                                completarTarea={completarTarea}
                                eliminarTarea={eliminarTarea}
                                editarTarea={editarTarea}
                            />
                            )
                            :
                            tareasFiltradas.map((tarea) =>
                            <Tareas
                            key={tarea.id}
                            id={tarea.id}
                            name={tarea.name}
                            texto={tarea.texto}
                            estado={tarea.estado}
                            completarTarea={completarTarea}
                            eliminarTarea={eliminarTarea}
                            editarTarea={editarTarea}
                        />
                          
                            )
                    }
                </div>
            </div>

        </>
    );
}