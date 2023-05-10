import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import style from "./actions.module.css";
//import Tareas from "./tareas"
import Tareas from './Listartareas';
import Create from './Creartarea';

export default function ListaDeTareas() {
    const [tareasFiltradas, setTareasFiltradas] = useState([]);
    const [tareas, setTareas] = useState(() => {


        const savedTasks = localStorage.getItem('tareas');
        return savedTasks !== null ? JSON.parse(savedTasks) : [""]
    });

    console.log(tareas)


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
        setComple(e.target.value)
    }
    function handleCategory(e) {
        e.preventDefault();
        setCategor(e.target.value)
    }

    const agregarTarea = tarea => {
        if (tarea.texto) {
            tarea.texto = tarea.texto;
            const tareasActualizadas = [tarea, ...tareas];
            setTareas(tareasActualizadas);
            setTreas(tareasActualizadas)
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
        console.log(filtro, "sto es name")
        setTareasFiltradas(filtro)
    }

    function estado(id) {
        if (id === "false") {
            const Actualizadas = tareas.filter(tarea => tarea.estado === false);
            setTareasFiltradas(Actualizadas);
        } else {
            const tareasActualizadas = tareas.filter(tarea => tarea.estado === true);
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
    }
    function handleReset(e) {
        e.preventDefault();
        setTareasFiltradas("")

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
            <div className={style.container}>
                {
                    // tareas.map((tarea) =>
                    //     <Tareas
                    //         key={tarea.id}
                    //         id={tarea.id}
                    //         texto={tarea.texto}
                    //         estado={tarea.estado}
                    //         completarTarea={completarTarea}
                    //         eliminarTarea={eliminarTarea}
                    //         editarTarea={editarTarea}
                    //      />
                    // )
                    tareasFiltradas.length > 0 ?
                        tareasFiltradas.map((tarea) =>
                            <Tareas
                                key={tarea.id}
                                id={tarea.id}
                                texto={tarea.texto}
                                estado={tarea.estado}
                                completarTarea={completarTarea}
                                eliminarTarea={eliminarTarea}
                                editarTarea={editarTarea}
                            />
                        )
                        :
                        tareas.map((tarea) =>
                            <Tareas
                                key={tarea.id}
                                id={tarea.id}
                                texto={tarea.texto}
                                estado={tarea.estado}
                                completarTarea={completarTarea}
                                eliminarTarea={eliminarTarea}
                                editarTarea={editarTarea}
                            />
                        )

                }
            </div>
            <button onClick={(e) => handleReset(e)}>Reset</button>
            <div>
                <input value={searchValue} onChange={(e) => handleInputChange(e)} type="text" />
                <button onClick={(e) => handleSubmit(e)} >buscar</button>
            </div>
            <div>
                <select onClick={(e) => handle(e)} onChange={e => handleEstado(e)}>
                    <option value='false' key='P'>Pendiente</option>
                    <option value='true' key='F'>Finalizado</option>
                </select>
            </div>
            <div>
                <select onClick={(e) => handlecatego(e)} onChange={e => handleCategory(e)} >
                    <option className={style.select} value="" hidden>Filtrar categoria</option>
                    {categoria.map(e => (<option value={e} name="time">{e}</option>))}
                </select>
            </div>

        </>
    );
}