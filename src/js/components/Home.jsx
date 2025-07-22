import React, { useEffect, useState } from "react";

import '@fortawesome/fontawesome-free/css/all.min.css';
//componente principal
const Home = () => {
	const [inputValue, setInputValue] = useState(""); //Estado para lo que escribe el usuario.
	const [tareas, setTareas] = useState([]); //Estado para lista de tareas.
	const [cargando, setCargando] = useState(false);//Estado para mostrar el cargando.
	const username = "Angel";

// función para obtener las tareas del usuario.
	// Si no existe el usuario, se crea uno nuevo.
	const getTareas = async () => {
		setCargando(true);
		const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`)
		console.log(response);
		if (!response.ok) {
			console.log("Hay que crear un usuario");
			crearUsuario()
			return
		}
		const data = await response.json()
		console.log(data);
		setTareas(data.todos || []);
		setCargando(false);
	};


	//Función para crear un usuario si no existe.
	const crearUsuario = async () => {
		const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
			method: "POST"
		});
		console.log(response);
		await response.json()


	};


	//Función para añadir tarea cuando se presiona una tecla
	const pulsarTecla = async (e) => {
		if (e.key === "Enter" && inputValue.replace(/\s/g, "") !== "") {  // Verifica si la tecla presionada es Enter y si el input no está vacío.
			setCargando(true);
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
				method: "POST",
				body: JSON.stringify({ label: inputValue, is_done: false }),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (response.ok) {
				setInputValue("");
				await getTareas();
			}
			setCargando(false);
		}
	};

	//Función para eliminar tarea, por el id.
	const eliminarTarea = async (id) => {
		setCargando(true);
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE"
		});

		if (response.ok) {
			await getTareas();
		}
		setCargando(false);
	};
	// Para eliminar las tareas una por una.
	const limpiarTareas = async () => {
		if (tareas.length === 0) return;
		tareas.forEach(tareas => {
			eliminarTarea(tareas.id)
		});
		setCargando(true);

	};
	useEffect(() => {
		getTareas()

	}, [])
	return (
		<div className="container">
			<h1>Lista de Tareas</h1>
			<ul>
				<li>
					<input
						type="text"
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyUp={pulsarTecla}
						placeholder="Añadir tarea aquí."></input>
				</li>
				{tareas.length === 0 && (
					<li className="no-task">No hay tareas, añadir tareas</li>
				)}
				{tareas.map((tarea) => (
					<li key={tarea.id}>
						<span>{tarea.label}</span>
						<i className="fa-solid fa-trash"
							onClick={() => eliminarTarea(tarea.id)}></i>
					</li>

				))}
			</ul>
			<button onClick={limpiarTareas}
				disabled={cargando || tareas.length === 0} className="Limpiar">Limpiar tareas</button>
			<div className="task-counter">{tareas.length}Item{tareas.length !== 1 ? "s" : ""} left

			</div>
		</div>
	);
};

export default Home;