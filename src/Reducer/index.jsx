
const initialState = {
  lst: JSON.parse(localStorage.getItem('tareas')),
  alltareas: [],
  allfiltro: [],
  tareas: [],
  filtroNombre: '',
  filtroEstado: [],
  filtroCategoria: [],
  contador: 1
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    /*------------------------Agreagar_tarea---------------------- */
    case 'AGREGAR_TAREA':
      if (state.contador === 1 && state.lst) {
        { state.alltareas = state.lst }
      }
      const Notas = [...state.alltareas, action.payload]
      state.contador = 3
      localStorage.setItem('tareas', JSON.stringify(Notas))
      return {
        ...state,
        alltareas: [...state.alltareas, action.payload],
        allfiltro: [...state.alltareas, action.payload],
        filtroNombre: [...state.alltareas, action.payload],
        filtroEstado: [...state.alltareas, action.payload],
        filtroCategoria: [...state.alltareas, action.payload],
        tareas: [...state.alltareas, action.payload],
      }

    /*-------------Editar_Tarea------------------------ */
    case 'EDITAR_TAREA':
      const ideditar = state.tareas
      const idlocal = state.lst
      const ediinput = action.payload

      if (state.alltareas.length > 0) {
        for (let i = 0; i <= ideditar.length - 1; i++) {
          if (ideditar[i].id === ediinput.id) {
            ideditar[i].texto = ediinput.editinput
          }
        }
        localStorage.setItem('tareas', JSON.stringify([...ideditar]));
        return {
          ...state,
          lst: [...ideditar],
          alltareas: [...ideditar],
          allfiltro: [...ideditar],
        }
      } else {
        for (let i = 0; i <= idlocal.length - 1; i++) {
          if (idlocal[i].id === ediinput.id) {
            idlocal[i].texto = ediinput.editinput
          }
        }
        localStorage.setItem('tareas', JSON.stringify([...idlocal]));
        return {
          ...state,
          lst: [...idlocal],
          alltareas: [...idlocal],
          allfiltro: [...idlocal],
        }
      }
    /*-------------------Eliminar_Tarea------------------------ */
    case 'ELIMINAR_TAREA':
      const idtarea = action.payload
      if (state.alltareas.length > 0) {
        const eliminartarea = state.alltareas.filter(tarea => tarea.id !== idtarea);
        localStorage.setItem('tareas', JSON.stringify(eliminartarea));
        return {
          ...state,
          lst: [...eliminartarea],
          alltareas: [...eliminartarea],
          allfiltro: [...eliminartarea]
        }
      } else {
        const eliminartarea = state.lst.filter(tarea => tarea.id !== idtarea)
        localStorage.setItem('tareas', JSON.stringify(eliminartarea));
        return {
          ...state,
          alltareas: eliminartarea,
          lst: eliminartarea
        }
      }
    /*----------------Tarea_Completada---------------- */
    case 'COMPLETAR_TAREA':
      const id = action.payload
      if (state.alltareas.length > 0) {
        const tareasActualizadas = state.alltareas.map(tarea => {
          if (tarea.id === id) {
            tarea.estado = !tarea.estado;
          }
          return tarea;
        })
        localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
        return {
          ...state,
          alltareas: tareasActualizadas,
        };
      } else {
        const tareasActualizadas = state.lst.map(tarea => {
          if (tarea.id === id) {
            tarea.estado = !tarea.estado;
          }
          return tarea;
        })
        localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
        return {
          ...state,
          alltareas: tareasActualizadas,
          lst: tareasActualizadas
        }
      }
    /*--------------Filtro_Nombre--------------------- */
    case 'SET_FILTRO_NOMBRE':
      const nombre = action.payload.toUpperCase()
      if (state.alltareas.length > 0) {
        const buscar = state.filtroNombre.filter(tarea => tarea.name === nombre)
        return {
          ...state,
          allfiltro: buscar,
        }
      } else {
        const buscar = state.lst.filter(tarea => tarea.name === nombre)
        return {
          ...state,
          allfiltro: buscar,
        }
      }

    /*-----------------Filtro_Estado--------------------------------- */
    case 'SET_FILTRO_ESTADO':
      const filtroestado = state.alltareas
      let payload = action.payload
      payload === "Finalizado" ? payload = true : payload = false
      const filtroLocal = state.lst
      if (state.alltareas.length > 0) {
        const filtro = filtroestado.filter(tarea => tarea.estado === payload)
        return {
          ...state,
          allfiltro: filtro,
        };
      } else {
        const filtro = filtroLocal.filter(tarea => tarea.estado === payload)
        return {
          ...state,
          allfiltro: filtro,
        };
      }
    /*---------------------Filtro_Categoria----------------------- */
    case 'SET_FILTRO_CATEGORIA':
      if (state.alltareas.length > 0) {
        const filtrcat = state.alltareas
        const filtrC = filtrcat.filter(tarea => tarea.categoria === action.payload);
        return {
          ...state,
          allfiltro: filtrC,
        };
      } else {
        const filtrcat = state.lst
        const filtrC = filtrcat.filter(tarea => tarea.categoria === action.payload);
        return {
          ...state,
          allfiltro: filtrC,
        };
      }

    default:
      return state;
  }
}


export default rootReducer;