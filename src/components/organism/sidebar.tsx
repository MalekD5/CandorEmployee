"use client";

import { GearIcon, HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../atom/button";
import Separator from "../atom/separator";
import Typography from "../atom/typography";
import { Sheet, SheetContent } from "../molecule/sheet";
import { signOut } from "@/lib/auth-client";

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

			<nav className="flex flex-col gap-1 h-full">
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

				<div className="mt-auto">
					<Button
						color="destructive"
						onClick={() => {
							signOut({
								fetchOptions: {
									onSuccess: () => {
										router.replace("/sign-in");
									},
								},
							});
						}}
					>
						Logout
					</Button>
				</div>
			</nav>
		</div>
	);
}

export default function Sidebar() {
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<ActiveTab>("employees");

	return (
		<>
			<div className="fixed my-2 z-50 justify-center md:hidden flex flex-col w-full">
				<Button
					color="ghost"
					size="icon"
					className="ml-4 flex items-center justify-center w-fit gap-4"
					onClick={() => setIsMobileOpen(true)}
				>
					<HamburgerMenuIcon className="h-5 w-5" />
					<span className="sr-only">Open menu</span>
					<Typography level={4}>Candor Employee</Typography>
				</Button>
				<div className="w-full">
					<Separator />
				</div>
			</div>

			<Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
				<SheetContent side="left" className="w-64 p-0">
					<SidebarContent
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						setIsMobileOpen={setIsMobileOpen}
					/>
				</SheetContent>
			</Sheet>

			<div className="hidden fixed top-0 left-0 h-full w-64 shrink-0 border-r border-border bg-card md:block z-30 overflow-y-auto">
				<SidebarContent
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					setIsMobileOpen={setIsMobileOpen}
				/>
			</div>

			<div className="hidden md:block w-64 shrink-0" />
		</>
	);
}
