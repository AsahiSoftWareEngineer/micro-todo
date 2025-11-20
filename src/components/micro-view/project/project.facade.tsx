import { createProject, fetchProjects, type Project } from "@/models/project";
import { fetchTasks, type Task } from "@/models/task";
import { useEffect, useState } from "react";

export const useProjectFacade = () => {
  const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
  const [isOpenSearchDialog, setIsOpenSearchDialog] = useState(false);

  const [projects, setProjects] = useState<(Project & { tasks: Task[] })[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const refetchProjects = async () => {
    const pjs = await fetchProjects();
    setProjects(pjs);
  };

  const handleCreateProject = async (val: { name: string }) => {
    createProject({ id: crypto.randomUUID(), name: val.name }).then(() => {
      refetchProjects();
      setIsOpenProjectModal(false);
    });
  };

  useEffect(() => {
    const loadProjects = async () => {
      const pjs = await fetchProjects();
      const tks = await fetchTasks();
      setTasks(tks);
      setProjects(pjs);
    };
    loadProjects();
  }, []);
  return {
    isOpenProjectModal,
    setIsOpenProjectModal,
    projects,
    tasks,
    handleCreateProject,
    isOpenSearchDialog,
    setIsOpenSearchDialog,
  };
};
