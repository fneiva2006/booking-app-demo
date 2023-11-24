import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

export type ConfirmationDialogProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
};

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  onCancel,
  onConfirm,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            booking.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='justify-center flex flex-row gap-x-8 sm:gap-x-2'>
          <DialogClose asChild>
            <Button onClick={onCancel} type='button' variant='secondary'>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} type='button' variant='destructive'>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
