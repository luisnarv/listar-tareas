import React, {  useState, useEffect  } from 'react';
import {useDispatch} from "react-redux";
import style from "./actions.module.css";
//import Tareas from "./tareas"
import Tareas from './Listartareas';
import Create from './Creartarea';

export default function ListaDeTareas() {

    const [tareas, setTareas] = useState([])
 
    return (
        <>
            <Create  />
            <div className={style.container}>
                {
                    tareas.map((tarea) =>
                        <Tareas
                            key={tarea.id}
                            id={tarea.id}
                            texto={tarea.texto}
                            estado={tarea.estado}
                         />
                    )
                }
            </div>
            <div>
                <input  type="text" />
                <button  >buscar</button>
            </div>
            <div>
                <select >
                    <option value='false' key='P'>Pendiente</option>
                    <option value='true' key='F'>Finalizado</option>
                </select>
            </div>

        </>
    );
}