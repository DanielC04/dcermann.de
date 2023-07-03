import React from "react";
import { OverlayTrigger, Tooltip as TooltipBs } from "react-bootstrap";

interface Props {
	text: string,
	children: React.ReactElement,
	placement?: 'left' | 'right' | 'top' | 'bottom',
	cssClass?: string
}

export const Tooltip = (props: Props) => {
	return (
		<OverlayTrigger overlay={<TooltipBs>{props.text}</TooltipBs>} bsClass={props.cssClass ?? ''} placement={props.placement ?? 'top'}>
			{props.children}
		</OverlayTrigger>
	);
};
