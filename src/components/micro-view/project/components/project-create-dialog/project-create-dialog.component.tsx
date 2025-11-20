import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { useProjectCreateDaialogPresenter } from "./project-create-dialog.presenter";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onCommit?: (val: { name: string }) => void;
};

export const ProjectCreateDialog = ({ isOpen, onClose, onCommit }: Props) => {
  const { methods } = useProjectCreateDaialogPresenter();
  const { control, handleSubmit } = methods;
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent showCloseButton={false}>
        <form className="flex gap-2 justify-between">
          <Form {...methods}>
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter new project name..."
                  className="no-drag focus-visible:border-none focus-visible:ring-none focus-visible:ring-none outline-none"
                />
              )}
            />
          </Form>
          <Button onClick={handleSubmit((val) => onCommit?.(val))} className="no-drag cursor-pointer">
            <PlusIcon />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
