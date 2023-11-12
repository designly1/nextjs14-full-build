import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Next13NProgress } from 'nextjs13-progress';

const inter = Inter({ subsets: ['latin'] });

import LayoutWrapper from './LayoutWrapper';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<LayoutWrapper>{children}</LayoutWrapper>
				<Next13NProgress
					color="blue"
					height={7}
				/>
			</body>
		</html>
	);
}
