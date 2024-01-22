"use client";

import { FormEvent, useEffect, useState } from "react";
import { Task } from "../models/task";
import { remult } from "remult";

const taskRepo = remult.repo(Task);

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    return taskRepo
      .liveQuery({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          completed: undefined,
        },
      })
      .subscribe((info) => setTasks(info.applyChanges));
  }, []);
  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const newTask = await taskRepo.insert({ title: newTaskTitle });
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } catch (err: any) {
      alert(err.message);
    }
  }
  async function setCompleted(task: Task, completed: boolean) {
    const updatedTask = await taskRepo.save({ ...task, completed });
    setTasks(tasks.map((t) => (t == task ? updatedTask : t)));
  }

  async function deleteTask(task: Task) {
    try {
      await taskRepo.delete(task);
      setTasks(tasks.filter((t) => t !== task));
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function setAllCompleted(completed: boolean) {
    for (const task of await taskRepo.find()) {
      await taskRepo.save({...task, completed})
  }

  return (
    <div>
      <h1>Todos {tasks.length}</h1>
      <main>
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button>Add</button>
        </form>
        {tasks.map((task) => {
          return (
            <div className={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(task, e.target.checked)}
              />
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task)}>Delete</button>
            </div>
          );
        })}
         <div>
          <button onClick={() => setAllCompleted(true)}>
            Set all Completed
          </button>
          <button onClick={() => setAllCompleted(false)}>
            Set all UnCompleted
          </button>
        </div>
      </main>
    </div>
  );
}
