


//continentFilter
export function Agregas(payload){
     const result = payload.map((e)=> ({texto: e.texto, name:e.name, id:e.id, estado:e.estado, categoria: e.categoria, }))  
  console.log(result, " 4.0agregando tareas------------------------------>")

    return {type: "AGREGAR_NOTAS", 
    payload:result}
    }


    export function agregartareas(payload){
       // console.log(payload,"------------------------------>")
        return {type: "AGREGAR_TAREA",
        payload
    }}
    export function editarT( editinput, id){
        return {type: "EDITAR_TAREA",
        payload: { editinput, id }
    }}

//PopulatioFilter
    export function eliminar(payload) {
        return {type: "ELIMINAR_TAREA",
            payload
        }}

//A-ZFilter
export function complet(payload){
    return {type: "COMPLETAR_TAREA", 
           payload
}}
export function filtrarestado(payload){
    return {type: "SET_FILTRO_ESTADO", 
           payload
}}
export function filtrarC(payload){
    return {type: "SET_FILTRO_CATEGORIA", 
           payload
}}
export function filtranombre(payload){
    return {type: "SET_FILTRO_NOMBRE", 
           payload
}}

    



