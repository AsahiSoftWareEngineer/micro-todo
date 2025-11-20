import { TodoFormComponents } from "./components/todo-form/todo-form.components";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { TodolistComponent } from "./components/todo-list/todo-list.component";
import { useTodoFacade } from "./todo.facade";

export const MicroTodoContainer = () => {
    const {tasks, handleCreateTask, handleToggleTask, handleRemoveTask} = useTodoFacade()
  return (
    <div className="flex flex-col items-center h-full">
      <header className="w-full flex items-center fixed top-0">
        <Link
          to={"/"}
          className="hover:bg-gray-50 cursor-pointer p-1 rounded-sm no-drag flex flex-col items-center justify-center w-8 h-8"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Link>
      </header>
      <main className="h-svh w-full pt-8 pb-12">
        <div className="h-5/6 w-full">
          <TodolistComponent items={tasks} onItemClick={handleToggleTask} onRemoveItem={handleRemoveTask} />
        </div>
      </main>
      <div className="h-16 w-full flex flex-col items-center fixed bottom-0 py-2">
        <TodoFormComponents onCommit={handleCreateTask} />
      </div>
    </div>
  );
};
