import { useForm } from "react-hook-form";
import { type Values } from "./todo-form.constants";
export const useTodoFormPresenter = () => {
    const methods = useForm<Values>({defaultValues: {title: ""}})
    return { methods }
}