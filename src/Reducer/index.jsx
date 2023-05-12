
const initialState = {
  alltareas: [],
  allfiltro:[],
  
  tareas: [],
  filtroNombre: '',
  filtroEstado: [],
  filtroCategoria: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    //completado  
    case 'AGREGAR_NOTAS':
    
      const guardar = state.alltareas
      const notas = action.payload
         for (let i = 0; i <= notas - 1; i++) {
       guardar[i].texto = notas[i].itextod
       guardar[i].name = notas[i].name
       guardar[i].id = notas[i].id
       guardar[i].estado = notas[i].estado
       guardar[i].categoria = notas[i].categoria
       }
       return {
        ...state,
        alltareas: [...guardar]
      }

      // return {
      //   ...state,
      //   alltareas: action.payload,
      //   filtroNombre: action.payload,
      //   filtroEstado: action.payload,
      //   filtroCategoria: action.payload,
      //   tareas: action.payload,
      // // tareas: [...state.tareas, action.payload],
      // };
    

    case 'AGREGAR_TAREA':
   
      return {
        ...state,
        alltareas: action.payload,
        filtroNombre: action.payload,
        filtroEstado: action.payload,
        filtroCategoria: action.payload,
        tareas: action.payload,
      // tareas: [...state.tareas, action.payload],
      };

    //completo
    case 'EDITAR_TAREA':
      const ideditar = state.tareas
      const ediinput = action.payload
      for (let i = 0; i <= ideditar.length - 1; i++) {
        if (ideditar[i].id === ediinput.id) {
          ideditar[i].texto = ediinput.editinput
        }
      }
      // return {
      //   ...state,
      //   alltareas: ideditar
      // };
      return {
        ...state,
        alltareas: [...ideditar]
      }

    //completado
    case 'ELIMINAR_TAREA':
      const idtarea = action.payload
      const eliminartarea = state.alltareas.filter(tarea => tarea.id !== idtarea);
      return {
        ...state,
        alltareas: eliminartarea, allfiltro: [...eliminartarea]
      }
      // {
      //   ...state, allfiltro:[...eliminartarea]
      // }
    
      

    //completado    
    case 'COMPLETAR_TAREA':
      const id = action.payload
      const tareasActualizadas = state.alltareas.map(tarea => {
        if (tarea.id === id) {
          tarea.estado = !tarea.estado;
        }
        return tarea;
      })
      return {
        ...state,
        alltareas: tareasActualizadas,
      };


//completo
    case 'SET_FILTRO_NOMBRE':
      const nombre = action.payload.toUpperCase()   
    if(state.filtroNombre <= 0)  return { ...state, alltareas: [...state.tareas],}
        const buscar = state.filtroNombre.filter(tarea => tarea.name === nombre)
          return {
            ...state,
            allfiltro: buscar,
       // if (buscar) { return {...state,alltareas: buscar,
        }
       // break;

//complet
    case 'SET_FILTRO_ESTADO':
      const filtroestado = state.alltareas
      let payload = action.payload
      payload === "Finalizado"? payload = true: payload = false
     const filtro = filtroestado.filter(tarea => tarea.estado === payload)
    
    //  const filtro = action.payload === false ?
    //   filtroestado.filter(tarea => tarea.estado === false) :
    //    filtroestado.filter(tarea => tarea.estado === true)
      return {
        ...state,
        allfiltro: filtro,
      };

//completado
    case 'SET_FILTRO_CATEGORIA':
    //   const filtrcat = [...state.filtroCategoria]
      const filtrcat = state.alltareas
      const filtrC = filtrcat.filter(tarea => tarea.categoria === action.payload);
      return {
        ...state,
        allfiltro: filtrC,
      };

    default:
      return state;
  }
}


export default rootReducer;