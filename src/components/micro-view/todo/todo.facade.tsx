import { createTask, fetchTasksByProjectId, removeTask, toggleTaskStatus, type Task } from "@/models/task";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useTodoFacade = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { id } = useParams<{ id: string }>();

  const refetchTasks = async () => {
    if (!id) return;
    const data = await fetchTasksByProjectId(id);
    setTasks(data);
  };

  useEffect(() => {
    const loadTasks = async () => {
      if (!id) return;
      const data = await fetchTasksByProjectId(id);
      setTasks(data);
    };
    loadTasks();
  }, [id]);

  const handleCreateTask = async ({ title }: { title?: string }) => {
    if (!id || !title) return;
    await createTask({
      isChecked: false,
      projectId: id || "",
      id: crypto.randomUUID(),
      title,
    }).then(() => refetchTasks());
  };

  const handleRemoveTask = async (task: Task) => {
    if (!id) return;
    await removeTask(task).then(() => refetchTasks());
  };

  const handleToggleTask = async (task: Task) => {
    if (!id) return;
    await toggleTaskStatus(task).then(() => refetchTasks());
  };

  return { tasks, refetchTasks, handleCreateTask, handleRemoveTask, handleToggleTask };
};
