import React from 'react';

export default function Footer() {
	return <div className="mt-auto flex justify-around items-center text-sm py-2">
    <span>&copy; {new Date().getFullYear()} Designly</span>
  </div>;
}
