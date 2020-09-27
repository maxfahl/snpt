import React, { FunctionComponent, MouseEvent, ReactNode } from 'react'

type SimpleButtonProps = {
	children: ReactNode,
	onClick: (e: MouseEvent) => void,
	className?: string
}

const SimpleButton: FunctionComponent<SimpleButtonProps> = ({ children, onClick, className = '' }) => {
	return (
		<div onClick={ onClick }
			 className={"flex-1 h-full flex items-center justify-center bg-blue-700 cursor-pointer border-r border-gray-900 " + className}>
			{ children }
		</div>
	);
};

export default SimpleButton;
