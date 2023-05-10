


// export function agregartarea() {
//     return async function (dispatch) {
//         try {
           
//             return dispatch({
//                 type: "AGREGAR_TAREA",
//                 payload: res.data 
                
//             })
//         } catch (error) {
//             return dispatch({
//                 type: "FAILURE",
//                 payload: error.response.data.msg 
            
//             }
//             )
//         }
//     }
// }


//continentFilter
    export function agregartareas(payload){
        console.log(payload,"------------------------------>")
        return {type: "AGREGAR_TAREA",
        payload
    }}
    export function editartarea(payload){
        return {type: "EDITAR_TAREA",
        payload
    }}

//PopulatioFilter
    export function eliminartarea(payload) {
        return {type: "ELIMINAR_TAREA",
            payload
        }}

//A-ZFilter
export function completartarea(payload){
    return {type: "COMPLETAR_TAREA", 
           payload
}}
export function filtrarestado(payload){
    return {type: "SET_FILTRO_ESTADO", 
           payload
}}
export function filtrarcategoria(payload){
    return {type: "SET_FILTRO_CATEGORIA", 
           payload
}}

    



