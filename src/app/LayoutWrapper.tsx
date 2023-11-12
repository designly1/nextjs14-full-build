'use client';
import React, { useState } from 'react';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface Props {
	children: React.ReactNode;
}

export default function LayoutWrapper(props: Props) {
	const [showSidebar, setShowSidebar] = useState(false);

	const { children } = props;
	return (
		<>
			<main className="flex flex-col min-h-screen bg-zinc-950 text-white">
				<Header setShowSidebar={setShowSidebar} />
				{children}
				<Footer />
			</main>
			<Sidebar
				showSidebar={showSidebar}
				setShowSidebar={setShowSidebar}
			/>
		</>
	);
}
