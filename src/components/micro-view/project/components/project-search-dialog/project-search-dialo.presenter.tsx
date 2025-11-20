import type { Task } from "@/models/task";
import { useMemo, useState } from "react";

export const useProjectSearchDialogPresenter = ({ tasks }: { tasks: Task[] }) => {
  const [search, setSearch] = useState("");
  const showTasks = useMemo(() => {
    if (search) {
      return tasks.filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));
    }
    return tasks;
  }, [tasks, search]);
  return {
    showTasks,
    setSearch,
  };
};
