"use client";

import { useEffect, useState } from "react";
import { Task } from "../models/task";
import { remult } from "remult";

const taskRepo = remult.repo(Task);

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    taskRepo
      .find({
        orderBy: {
          createdAt: "asc",
        },
        where: {
          completed: undefined,
        },
      })
      .then(setTasks);
  }, []);
  return (
    <div>
      <h1>Todos {tasks.length}</h1>
      <main>
        {tasks.map((task) => {
          return (
            <div className={task.id}>
              <input type="checkbox" checked={task.completed} />
              <span>{task.title}</span>
            </div>
          );
        })}
      </main>
    </div>
  );
}
