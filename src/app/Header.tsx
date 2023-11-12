import React from 'react';
import { Link } from 'nextjs13-progress';

import { FaBars } from 'react-icons/fa';

interface Props {
	setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header(props: Props) {
	const { setShowSidebar } = props;
	return (
		<>
			<div className="bg-zinc-900 flex justify-between items-center fixed top-0 right-0 left-0 h-20 px-6">
				<Link href="/">Company Logo</Link>
				<button
					className="text-4xl text-white"
					onClick={() => setShowSidebar(true)}
				>
					<FaBars />
				</button>
			</div>
			<div className="h-24"></div>
		</>
	);
}
