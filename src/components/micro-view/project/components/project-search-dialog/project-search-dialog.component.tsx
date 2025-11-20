import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import type { Task } from "@/models/task";
import { Link } from "react-router-dom";
import { useProjectSearchDialogPresenter } from "./project-search-dialo.presenter";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  tasks?: Task[];
};
export const ProjectSearchDialog = ({ tasks, isOpen, onClose }: Props) => {
  const { showTasks, setSearch } = useProjectSearchDialogPresenter({ tasks: tasks || [] });
  return (
    <CommandDialog open={isOpen} onOpenChange={(open) => onClose && !open && onClose()} className="max-h-2/3">
      <Command className="rounded-lg border shadow-md md:min-w-[450px] max-h-svh" shouldFilter={false} >
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={(value) => setSearch(value)}
          inputMode="search"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {showTasks?.map((task: Task) => (
              <CommandItem key={task.id} value={`${task.projectId}/#${task.id}`}>
                <Link to={`/project/${task.projectId}#${task.id}`}>{task.title}</Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};
