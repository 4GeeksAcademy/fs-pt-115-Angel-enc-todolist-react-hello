import React, {useState} from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState (""); //Estado para lo que escribe el usuario.
	const [tareas, setTareas] = useState ([]); //Estado para lista de tareas.

	//Función para añadir tarea cuando se presiona "ENTER".
	const pulsarTecla = (e) => {
		if(e.key ==="Enter" && inputValue !== ""){
			//Agrega tarea y limpia el input.
			setTareas([...tareas, inputValue]);
			setInputValue("");
		}
	};
	//Función para eliminar tarea.
	const eliminarTarea = (index) => {
		const nuevasTareas = tareas.filter((_,i) => i !== index);
		setTareas(nuevasTareas);
	}
	return (
		<div className="container">
			<h1>Lista de Tareas</h1>
			<ul>
				<li>
					<input 
					type="text" 
					onChange={(e) => setInputValue(e.target.value)}
					value ={inputValue}
					onKeyUp={pulsarTecla}
					placeholder="No hay tareas. Añadir tarea."></input>
				</li>
			
			{tareas.map((tarea, index) => (
				<li key={index}>
					{tarea}
					<i className="fa-solid fa-trash"
					onClick={() => eliminarTarea(index)}></i>
				</li>
			
			))}
			</ul>
			<div className="task-counter">{tareas.length}Item{tareas.length !== 1 ? "s" : ""} left

			</div>
		</div>
	);
};

export default Home;