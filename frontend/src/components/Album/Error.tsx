import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  content: { title: string; description: string } | null;
  onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ content, onClose }) => {
  return (
    <Dialog open={!!content} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{content?.title}</DialogTitle>
          <DialogDescription>{content?.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
