import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phase,
  RoadmapEvent,
  RoadmapEventItem,
  Status,
} from "@team-falkor/shared-types";
import { useState } from "react";

interface CreateEventDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (newEvent: RoadmapEvent) => void;
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [phase, setPhase] = useState<Phase>("PRE_LAUNCH");
  const [status, setStatus] = useState<Status>("PLANNED");
  const [items, setItems] = useState<RoadmapEventItem[]>([
    { title: "", completed: false },
  ]);

  const handleCreateEvent = () => {
    const newEvent: RoadmapEvent = { phase, status, items };
    onCreate(newEvent);
    setPhase("PRE_LAUNCH");
    setStatus("PLANNED");
    setItems([{ title: "", completed: false }]);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Roadmap Event</DialogTitle>
          <DialogDescription>
            Please fill in the details of the new roadmap event.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phase</label>
            <Select
              value={phase}
              onValueChange={(value) => setPhase(value as Phase)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PRE_LAUNCH">Pre-Launch</SelectItem>
                <SelectItem value="LAUNCH">Launch</SelectItem>
                <SelectItem value="POST_LAUNCH">Post-Launch</SelectItem>
                <SelectItem value="FUTURE">Future</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as Status)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PLANNED">Planned</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Add items fields */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEventDialog;
