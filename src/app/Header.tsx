'use client';

import React, { useState } from 'react';
import { Link } from 'nextjs13-progress';

import Sidebar from './Sidebar';

import { FaBars } from 'react-icons/fa';

export default function Header() {
	const [showSidebar, setShowSidebar] = useState(false);

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
			<Sidebar
				showSidebar={showSidebar}
				setShowSidebar={setShowSidebar}
			/>
		</>
	);
}
