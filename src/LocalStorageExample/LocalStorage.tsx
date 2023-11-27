import { useState, useEffect } from "react";
import { LocalStorageTypes } from "./LocalStorageTypes.types";
import { v4 as uuidV4 } from "uuid";

const dataLocalStorage = JSON.parse(localStorage.getItem("Tarefas") || "[]");

const LocalStorage = () => {
  const [tasks, setTasks] = useState<LocalStorageTypes[]>(dataLocalStorage);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [saveButton, setSaveButton] = useState(false);

  function handleAddTask() {
    if (newTask.trim() === "") {
      return;
    }
    setTasks((prevTasks) => [...prevTasks, { id: uuidV4(), title: newTask }]);
    setNewTask("");
  }

  function handleRemoveTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleEditTask(id: string) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setNewTask(task.title);
      setEditTask(task.id);
      setSaveButton(true);
    }
  }

  function handleSaveTask() {
    const task = tasks.find((task) => task.id === editTask);
    if (task) {
      task.title = newTask;
      setSaveButton(false);
    }
    setTasks([...tasks]);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  useEffect(() => {
    localStorage.setItem("Tarefas", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <h1 className="title-todo">To-do</h1>
      <form>
        <input
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          type="text"
          onKeyDown={handleKeyDown}
        />
        {saveButton ? (
          <button onClick={() => handleSaveTask()} className="save-task">Save</button>
        ) : (
          <button onClick={() => handleAddTask()} type="submit" className="save-task">
            Add Task
          </button>
        )}
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-title">{task.title}</span>
            <div className="task-actions">
              <button
                onClick={() => handleRemoveTask(task.id)}
                className="delete-btn"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditTask(task.id)}
                className="edit-btn"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default LocalStorage;
