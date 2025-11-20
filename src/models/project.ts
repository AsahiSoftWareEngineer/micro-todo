import { readDB, DB_PATH } from "./models";
import type { Task } from "./task";

export interface Project {
  id: string;
  name: string;
}

export const createProject = async (val: Project) => {
  await readDB().then(async (data: { projects: Project[]; tasks: Task[] }) => {
    const projects = data.projects;
    const tasks = data.tasks;
    await window.api.writeJSON(DB_PATH, { projects: [...projects, val], tasks: [...tasks] });
  });
};

export const fetchProjects = async (): Promise<(Project & { tasks: Task[] })[]> => {
  const data = await readDB();
  return data.projects.map((project: Project) => ({
    ...project,
    tasks: data.tasks.filter((task: Task) => task.projectId === project.id) || [],
  }));
};
