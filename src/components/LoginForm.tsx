import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function LoginForm({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-6">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input id="password" type="password" />

          <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
              <Button onClick={toggleDialog}>Submit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-center">🚧</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  Still in Development
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogAction asChild>
                <Button className="sm" onClick={toggleDialog}>
                  Ok
                </Button>
              </AlertDialogAction>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
