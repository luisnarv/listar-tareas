
const initialState = {
  alltareas: [],
  allfiltro:[""],
  tareas: [],
  filtroNombre: '',
  filtroEstado: [],
  filtroCategoria: [],
};




function rootReducer(state = initialState, action) {
  switch (action.type) {

    //completado  
    case 'AGREGAR_TAREA':
   
      return {
        ...state,
        alltareas: action.payload,
        filtroNombre: action.payload,
        filtroEstado: action.payload,
        filtroCategoria: action.payload,
       tareas: [...state.tareas, action.payload],
      };


    //completo
    case 'EDITAR_TAREA':
      const ideditar = state.alltareas
      const ediinput = action.payload
      for (let i = 0; i <= ideditar.length - 1; i++) {
        if (ideditar[i].id === ediinput.id) {
          ideditar[i].texto = ediinput.editinput
        }
      }
      return {
        ...state,
        alltareas: [...ideditar],
      };
    

    //completado
    case 'ELIMINAR_TAREA':
      const idtarea = action.payload
      const eliminartarea = state.alltareas.filter(tarea => tarea.id !== idtarea);
      return {
        ...state,
        alltareas: eliminartarea,
      };
      

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
        if (buscar) { return {...state,alltareas: buscar,
        }}
        break;

//complet
    case 'SET_FILTRO_ESTADO':
      const filtroestado = state.filtroEstado
     const filtro = action.payload === false ?
      filtroestado.filter(tarea => tarea.estado === false) :
       filtroestado.filter(tarea => tarea.estado === true)
      return {
        ...state,
        allfiltro: filtro,
      };

//completado
    case 'SET_FILTRO_CATEGORIA':
      const filtrcat = [...state.filtroCategoria]
      const filtrC = filtrcat.filter(tarea => tarea.categoria === action.payload);
      return {
        ...state,
        alltareas: filtrC,
      };

    default:
      return state;
  }
}


export default rootReducer;