'use client';

import React from 'react';

import Header from './Header';
import Footer from './Footer';

import { AppProvider } from '@/contexts/AppContext';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface Props {
	token: RequestCookie | undefined;
	children: React.ReactNode;
}

export default function LayoutWrapper(props: Props) {
	const { token, children } = props;

	return (
		<AppProvider>
			<Header />
			{children}
			<Footer />
		</AppProvider>
	);
}
