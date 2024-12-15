import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { set } from "date-fns";
  
  export function AlertDialogComponent({ setOpen, open, setValue, title, description }) {
    function handleCancel() {
      setOpen(false);
      setValue(false);
    }
    function handleContinue() {
        setOpen(false);
        setValue(true);
    }
    return (
      <AlertDialog open= {open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick = {handleCancel}>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick= {handleContinue}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  