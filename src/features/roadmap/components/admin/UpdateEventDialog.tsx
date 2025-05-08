import {
	Phase,
	RoadmapEventData,
	RoadmapEventItemData,
	Status,
} from "@team-falkor/shared-types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface UpdateEventDialogProps {
	open: boolean;
	onClose: () => void;
	event: RoadmapEventData;
	onUpdate: (event: RoadmapEventData) => void;
}

const UpdateEventDialog = ({
	open,
	onClose,
	event,
	onUpdate,
}: UpdateEventDialogProps) => {
	const [phase, setPhase] = useState<Phase>(event.phase);
	const [status, setStatus] = useState<Status>(event.status);
	const [items, setItems] = useState<RoadmapEventItemData[]>(event.items);

	const handleUpdateEvent = () => {
		const updatedEvent: RoadmapEventData = { ...event, phase, status, items };
		onUpdate(updatedEvent);
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogTrigger asChild>
				<Button variant="outline">Update Event</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Update Roadmap Event</DialogTitle>
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

					<div className="space-y-3">
						<label className="text-sm font-medium">Items</label>
						{items.map((item, index) => (
							<div key={index} className="flex items-center gap-4">
								<Input
									placeholder="Item Title"
									value={item.title}
									onChange={(e) => {
										const updatedItems = [...items];
										updatedItems[index].title = e.target.value;
										setItems(updatedItems);
									}}
									className="flex-1"
								/>
								<div className="flex items-center space-x-2">
									<Checkbox
										id={`item-${index}`}
										checked={item.completed}
										onCheckedChange={(checked) => {
											const updatedItems = [...items];
											updatedItems[index].completed = checked as boolean;
											setItems(updatedItems);
										}}
									/>
									<label htmlFor={`item-${index}`} className="text-sm">
										Completed
									</label>
								</div>
							</div>
						))}
					</div>

					<div className="flex justify-end pt-4">
						<Button onClick={handleUpdateEvent}>Update Event</Button>
						<Button
							onClick={(e) => {
								e.preventDefault();
								setItems([
									...items,
									{
										title: "",
										completed: false,
										id: items.length + 1,
										createdAt: new Date().toISOString(),
										updatedAt: new Date().toISOString(),
									},
								]);
							}}
						>
							Add Item
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateEventDialog;
