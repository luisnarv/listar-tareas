
const initialState = {
  tareas: [],
  filtroNombre: '',
  filtroEstado: [],
  filtroCategoria: [],
};




function rootReducer(state = initialState, action) {
  switch (action.type) {


    case 'AGREGAR_TAREA':
      const estado = action.payload
      console.log(estado, "esto es......................................>")
      return {
        ...state,
        tareas: action.payload,
        // tareas: [...state.tareas, action.payload],
      };
    case 'EDITAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.map((tarea) => {
          if (tarea.id === action.payload.id) {
            return {
              ...tarea,
              texto: action.payload.texto,
            };
          }
          return tarea;
        }),
      };
    case 'ELIMINAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };
    case 'COMPLETAR_TAREA':
      return {
        ...state,
        tareas: state.tareas.map((tarea) => {
          if (tarea.id === action.payload) {
            return {
              ...tarea,
              estado: !tarea.estado,
            };
          }
          return tarea;
        }),
      };
    case 'SET_FILTRO_NOMBRE':
      return {
        ...state,
        filtroNombre: action.payload,
      };



    case 'SET_FILTRO_ESTADO':
      const filtroEstado = state
      console.log(action.payload, "esto es action.payload")
      const filtro = action.payload === "false" ? filtro = filtroEstado.filter(tarea => tarea.estado === true) : filtroEstado.filter(tarea => tarea.estado === false)
      return {
        ...state,
        filtroEstado: filtro,
      };
    case 'SET_FILTRO_CATEGORIA':
      return {
        ...state,
        filtroCategoria: action.payload,
      };
    default:
      return state;
  }
}


export default rootReducer;