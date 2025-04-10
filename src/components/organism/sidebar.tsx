"use client";

import { GearIcon, HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../atom/button";
import Separator from "../atom/separator";
import Typography from "../atom/typography";
import { Sheet, SheetContent } from "../molecule/sheet";

const tabs = [
	{ id: "employees", label: "Employees", icon: PersonIcon, ref: "/" },
	{ id: "settings", label: "Settings", icon: GearIcon, ref: "/settings" },
] as const;

type ActiveTab = (typeof tabs)[number]["id"];

interface SidebarProps {
	activeTab: ActiveTab;
	setActiveTab: (tab: ActiveTab) => void;
	setIsMobileOpen: (isOpen: boolean) => void;
}

function SidebarContent({
	activeTab,
	setActiveTab,
	setIsMobileOpen,
}: SidebarProps) {
	const router = useRouter();
	return (
		<div className="flex h-full flex-col gap-2 p-4">
			<div className="mb-4 md:mb-8 px-2 pt-4 md:pt-8">
				<Typography level={1} center className="text-xl">
					Candor Employee
				</Typography>
				<Separator />
			</div>

			<nav className="flex flex-col gap-1">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<Button
							key={tab.id}
							color={activeTab === tab.id ? "default" : "ghost"}
							className={twMerge(
								"flex justify-start gap-3 py-2 text-base !translate-y-0",
								activeTab === tab.id ? "bg-accent font-medium" : "",
							)}
							onClick={() => {
								setActiveTab(tab.id);
								setIsMobileOpen(false);
								router.push(tab.ref);
							}}
						>
							<Icon className="h-5 w-5" />
							{tab.label}
						</Button>
					);
				})}
			</nav>
		</div>
	);
}

export default function Sidebar() {
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<ActiveTab>("employees");

	return (
		<>
			<Button
				color="outline"
				size="icon"
				className="fixed left-4 top-4 z-50 md:hidden flex justify-center items-center"
				onClick={() => setIsMobileOpen(true)}
			>
				<HamburgerMenuIcon className="h-5 w-5" />
				<span className="sr-only">Open menu</span>
			</Button>

			{/* Mobile sidebar */}
			<Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
				<SheetContent side="left" className="w-64 p-0">
					<SidebarContent
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						setIsMobileOpen={setIsMobileOpen}
					/>
				</SheetContent>
			</Sheet>

			<div className="hidden w-64 shrink-0 border-r border-border bg-card md:block">
				<SidebarContent
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					setIsMobileOpen={setIsMobileOpen}
				/>
			</div>
		</>
	);
}
