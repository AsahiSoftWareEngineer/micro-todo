import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjectFacade } from "./project.facade";
import { ProjectCreateDialog } from "./components/project-create-dialog/project-create-dialog.component";
import { ProjectSearchDialog } from "./components/project-search-dialog/project-search-dialog.component";
export const MicroProjectContainer = () => {
  const {
    isOpenProjectModal,
    setIsOpenProjectModal,
    projects,
    handleCreateProject,
    tasks,
    isOpenSearchDialog,
    setIsOpenSearchDialog,
  } = useProjectFacade();
  return (
    <div className="w-full">
      <header className="flex items-center justify-between p-1 gap-1 fixed w-full top-0 drag bg-white">
        <div>
          <Button variant={"ghost"} className="no-drag w-auto aspect-square" onClick={() => setIsOpenSearchDialog(true)}>
            <SearchIcon />
          </Button>
        </div>
        <div>
          <Button
            variant={"ghost"}
            className="w-auto no-drag aspect-square"
            onClick={() => setIsOpenProjectModal(true)}
          >
            <PlusIcon />
          </Button>
        </div>
      </header>
      <main className="mt-12 p-1 w-full flex flex-col gap-1">
        {projects.map((project) => (
          <Link
            to={`project/${project.id}`}
            className="w-full flex hover:bg-gray-100 no-drag cursor-pointer p-1 rounded-sm py-2"
          >
            <div className="flex flex-col items-start gap-2 w-full">
              <Label className=" text-gray-700 cursor-pointer font-medium">{`${project.name}`}</Label>
              <div className="w-full flex gap-1 items-center font-medium">
                <Progress
                  className="w-2/3"
                  value={(project.tasks.filter((task) => task.isChecked).length / project.tasks.length) * 100}
                  max={project.tasks.length}
                />
                <Label className="text-xs text-gray-700">
                  {project.tasks.filter((task) => task.isChecked).length}/{project.tasks.length}
                </Label>
              </div>
            </div>
          </Link>
        ))}
      </main>
      <ProjectCreateDialog
        isOpen={isOpenProjectModal}
        onClose={() => setIsOpenProjectModal(false)}
        onCommit={(val) => handleCreateProject(val)}
      />
      <ProjectSearchDialog tasks={tasks} isOpen={isOpenSearchDialog} onClose={() => setIsOpenSearchDialog(false)} />
    </div>
  );
};
