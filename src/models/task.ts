import { readDB } from "./models";

export interface Task {
  id: string;
  title: string;
  isChecked: boolean;
  projectId: string;
}

export const emptyTask:Task = {
    id: "",
    title: "",
    isChecked: false,
    projectId: "",
}

export const fetchTasks = async (): Promise<Task[]> => {
    const data = await readDB();
    return data.tasks;
}

export const fetchTasksByProjectId = async (projectId: string): Promise<Task[]> => {
    const data = await readDB();
    return data.tasks.filter((task: Task) => task.projectId === projectId);
}

export const createTask = async (val: Task) => {
    await readDB().then(async (data: { projects: unknown[]; tasks: Task[] }) => {
      const projects = data.projects;
      const tasks = data.tasks;
      await window.api.writeJSON("./src/db/db.json", { projects: [...projects], tasks: [...tasks, val] });
    });
};

export const removeTask = async (val:Task) => {
  await readDB().then(async (data: { projects: unknown[]; tasks: Task[] }) => {
    const projects = data.projects;
    const tasks = data.tasks.filter((task:Task) => task.id !== val.id);
    await window.api.writeJSON("./src/db/db.json", { projects: [...projects], tasks: [...tasks] });
  });
}

export const toggleTaskStatus = async (val:Task) => {
  await readDB().then(async (data: { projects: unknown[]; tasks: Task[] }) => {
    const projects = data.projects;
    const tasks = data.tasks.map((task:Task) => {
      if(task.id === val.id){
        return {...task, isChecked: !task.isChecked}
      }
      return task;
    });
    await window.api.writeJSON("./src/db/db.json", { projects: [...projects], tasks: [...tasks] });
  });
}