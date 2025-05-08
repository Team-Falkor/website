import { Link } from "@tanstack/react-router";
import {
	BoxesIcon,
	ChartArea,
	LayoutDashboardIcon,
	RouteIcon,
} from "lucide-react";
import * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "/admin",
			icon: LayoutDashboardIcon,
			items: [
				{
					title: "Overview",
					url: "/admin",
				},
				// {
				//   title: "Analytics",
				// url: "/admin/analytics",
				// },
				// {
				// title: "Reports",
				// url: "/admin/reports",
				// },
			],
		},
		{
			title: "Analytics",
			url: "/admin/analytics",
			icon: ChartArea,
			items: [
				{
					title: "Overview",
					url: "/admin/analytics",
				},
			],
		},
		{
			title: "Roadmap",
			url: "/admin/roadmap",
			icon: RouteIcon,
			items: [
				{
					title: "All Roadmaps",
					url: "/admin/roadmap",
				},
			],
		},
		{
			title: "Providers",
			url: "/admin/providers",
			icon: BoxesIcon,
			items: [
				{
					title: "All Providers",
					url: "/plugins/providers",
				},
				{
					title: "Add Provider",
					url: "/plugins/providers/new",
				},
				// {
				//   title: "Categories",
				//   url: "/admin/providers/categories",
				// },
				// {
				//   title: "Settings",
				//   url: "/admin/providers/settings",
				// },
			],
		},
		// {
		//   title: "Users",
		//   url: "/admin/users",
		//   icon: UsersIcon,
		//   items: [
		//     {
		//       title: "All Users",
		//       url: "/admin/users",
		//     },
		//     {
		//       title: "Roles",
		//       url: "/admin/users/roles",
		//     },
		//     {
		//       title: "Permissions",
		//       url: "/admin/users/permissions",
		//     },
		//   ],
		// },
	],
};

export function AdminSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<Link to="/admin" className="flex items-center justify-start gap-2 p-2">
					<img
						src="/icon.png"
						alt="Logo"
						className="h-8 w-auto object-contain"
					/>
					<span className="ml-2 font-semibold text-lg">Admin</span>
				</Link>
			</SidebarHeader>
			<SidebarContent>
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>
							<div className="flex items-center gap-2">
								{!!item.icon &&
									React.createElement(item.icon, { className: "h-4 w-4" })}
								{item.title}
							</div>
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link
												to={item.url}
												className="flex items-center gap-2 pl-8"
											>
												{/* <ChevronRightIcon className="h-4 w-4" /> */}
												{item.title}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}
