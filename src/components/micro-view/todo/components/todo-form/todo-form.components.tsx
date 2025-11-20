import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "../../../../ui/form";
import { useTodoFormPresenter } from "./todo-form.presenter";
import { ArrowUpIcon } from "lucide-react";

type Props = {
  onCommit?: (val: { title?: string }) => void;
};

export const TodoFormComponents = ({ onCommit }: Props) => {
  const { methods } = useTodoFormPresenter();
  const { control, handleSubmit, reset } = methods;
  return (
    <form className="w-11/12 justify-center bg-gray-200 rounded-full py-2 flex px-4">
      <Form {...methods}>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-11/12 flex items-center">
              <FormControl>
                <input
                  {...field}
                  className="w-full no-drag border-none shadow-none outline-none focus-visible:border-none"
                  placeholder="Input Todo..."
                />
              </FormControl>
            </FormItem>
          )}
        ></FormField>
        <Button
        disabled={!methods.watch("title")?.length}
          className="rounded-full w-8 h-8 no-drag cursor-pointer"
          onClick={handleSubmit((val: { title?: string }) => {
            onCommit?.(val);
            reset();
          })}
        >
          <ArrowUpIcon />
        </Button>
      </Form>
    </form>
  );
};
