import { remultNextApp } from "remult/remult-next";
import { Task } from "../../../models/task";
import { TasksController } from "../../../components/TasksController";

const api = remultNextApp({
  entities: [Task],
  controllers: [TasksController],
});
export const { GET, PUT, POST, DELETE } = api;
