import { useForm } from "react-hook-form";

export const useProjectCreateDaialogPresenter = () => {
    const methods = useForm<{ name: string }>({ defaultValues: { name: "" } });
    return { methods };
}