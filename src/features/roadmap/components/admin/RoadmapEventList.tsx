import { RoadmapEventData } from "@team-falkor/shared-types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface RoadmapEventListProps {
	events: RoadmapEventData[];
	onUpdate: (event: RoadmapEventData) => void;
	onDelete: (eventId: string) => void;
}

const RoadmapEventList: React.FC<RoadmapEventListProps> = ({
	events,
	onUpdate,
	onDelete,
}) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case "PLANNED":
				return "bg-blue-500/20 text-blue-500";
			case "IN_PROGRESS":
				return "bg-amber-500/20 text-amber-500";
			case "COMPLETED":
				return "bg-green-500/20 text-green-500";
			default:
				return "bg-gray-500/20 text-gray-500";
		}
	};

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{events.length === 0 ? (
				<Card className="col-span-full">
					<CardContent className="pt-6 text-center text-muted-foreground">
						No roadmap events found. Create your first event to get started.
					</CardContent>
				</Card>
			) : (
				events.map((event) => (
					<Card
						key={event.id}
						className="overflow-hidden transition-all hover:shadow-md"
					>
						<CardHeader className="pb-2">
							<div className="flex justify-between items-start">
								<CardTitle className="text-lg font-semibold">
									Event #{event.id}
								</CardTitle>
								<Badge className={getStatusColor(event.status)}>
									{event.status.replace("_", " ")}
								</Badge>
							</div>
							<CardDescription>
								Phase: {event.phase.replace("_", " ")}
							</CardDescription>
						</CardHeader>
						<CardContent className="pb-2">
							{event.items && event.items.length > 0 && (
								<div className="text-sm">
									<p className="font-medium mb-1">
										Items: {event.items.length}
									</p>
									<ul className="list-disc list-inside text-muted-foreground">
										{event.items.slice(0, 2).map((item, idx) => (
											<li
												key={idx}
												className={item.completed ? "line-through" : ""}
											>
												{item.title}
											</li>
										))}
										{event.items.length > 2 && (
											<li className="text-muted-foreground">
												+{event.items.length - 2} more items
											</li>
										)}
									</ul>
								</div>
							)}
						</CardContent>
						<CardFooter className="flex justify-end gap-2 pt-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => onUpdate(event)}
							>
								Edit
							</Button>
							<Button
								variant="destructive"
								size="sm"
								onClick={() => onDelete(event.id?.toString())}
							>
								Delete
							</Button>
						</CardFooter>
					</Card>
				))
			)}
		</div>
	);
};

export default RoadmapEventList;
