import './App.css';
import ListaDeTareas from "./components/actions";


function App() {
  return (
    <div className='aplicacion-tareas'> 
     <h1>Mis tareas</h1>
      <div className='tareas'>
      
       <ListaDeTareas /> 
      </div>
    </div>
  );
}

export default App;
