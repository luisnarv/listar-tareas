import React, { useState, useEffect } from 'react';
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
import { Agregas, agregartareas, editarT, eliminar, complet, filtrarC, filtrarestado, filtranombre } from "../actions/index"




export default function ListaDeTareas() {


    const dispatch = useDispatch()
    const [show, setshow] = useState(false)
    const [tareas, setTareas] = useState([])
    const [searchValue, setSearchValuetName] = useState("")
    const [comlple, setComple] = useState([])
    const[ storedData, setstoreData] = useState()


//localstorage
// useEffect(() => {
//     const stodData = localStorage.getItem('tareas');
//      if (stodData) {
//        dispatch(Agregas(JSON.parse(stodData))) ;
//      }
//   }, [storedData]);


//   useEffect(() => {
//     localStorage.setItem('tareas', JSON.stringify(tareas));
//    // localStorage.setItem('tareas', JSON.stringify(comlple));
//   }, [tareas]);



  ////**************************************************** */



    const allnotas = useSelector((state) => state.alltareas)
    var allfiltro = useSelector((state) => state.allfiltro)

    function handleInputChange(e) {
        e.preventDefault();
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
    const agregarTarea = tarea => {
        if (tarea.texto.trim()) {
            tarea.texto = tarea.texto.trim();
            const tareasActualizadas = [tarea, ...tareas];
            setTareas(tareasActualizadas);
            dispatch(agregartareas(tareasActualizadas))
            setComple("")
        }
    }
    //--------------------------------------------------------------------
    const editarTarea = (editinput, id) => {
        dispatch(editarT(editinput, id))
    }
    //--------------------------------------------------------------------
    const eliminarTarea = id => {
        dispatch(eliminar(id))
        setshow(true)
    }
    //--------------------------------------------------------------------
    const completarTarea = id => {
        dispatch(complet(id))
        // const tareasActualizadas = tareas.map(tarea => {
        //     if (tarea.id === id) {
        //       tarea.completada = !tarea.completada;
        //     }
        //     return tarea;
        //   });
         // setComple(tareasActualizadas);//***********
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
        setTareas(allnotas)
        setshow(false)
    }

    const categoria = ["Prioridad alta", "Prioridad media", "Prioridad baja"];
    const estado = ["Finalizado", "Pendiente",];

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
                            <TextField id="standard-basic" label="Buscar" variant="standard" value={searchValue} onChange={(e) => handleInputChange(e)} type="text" />
                            <Button onClick={(e) => handleBuscar(e)} >buscar</Button>
                        </Box>
                    </div>
                </div>
                <div className={style.container}>

                    {allfiltro.length > 0 && show === true ?
                        allfiltro.map((country, index) => {
                            return (
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
                            )
                        }
                        ) : allfiltro.length === 0 && show === true ? (
                            <p style={{ fontSize: "10px", color: "red" }}>No se encontró nada</p>

                        ) : (
                            allnotas.map((country, index) => {
                                return (

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
                                )
                            }))
                    }
                </div>
            </div>
        </>
    );
}


