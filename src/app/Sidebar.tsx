import React from 'react';
import { Link } from 'nextjs13-progress';

interface Props {
	showSidebar: boolean;
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar(props: Props) {
	const { showSidebar, setShowSidebar } = props;

	const handleClick = () => {
		setShowSidebar(false);
	};

	return (
		<>
			<div
				className="fixed top-0 right-0 bottom-0 w-64 bg-zinc-800 flex flex-col gap-6 px-6 py-20 z-20 text-white text-2xl transition-[margin-right] duration-300"
				style={{ marginRight: showSidebar ? 0 : '-100%' }}
			>
				<Link
					href="/dashboard"
					onClick={handleClick}
				>
					Dashboard
				</Link>
				<Link
					href="/"
					onClick={handleClick}
				>
					Settings
				</Link>
				<Link
					href="/"
					onClick={handleClick}
				>
					Logout
				</Link>
			</div>
			{showSidebar ? (
				<div
					className="fixed inset-0 z-10"
					onClick={() => setShowSidebar(false)}
				></div>
			) : null}
		</>
	);
}
