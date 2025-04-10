export default function Card({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-white flex flex-col gap-4 border border-zinc-300 p-10 rounded-xl">
			{children}
		</div>
	);
}
