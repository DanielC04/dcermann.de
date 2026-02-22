import React from "react";
import "./Tooltip.scss";

interface Props {
    text: string;
    children: React.ReactElement;
    placement?: 'left' | 'right' | 'top' | 'bottom';
    cssClass?: string;
}

export const Tooltip = ({ text, children, placement = 'top', cssClass }: Props) => {
    return (
        <div className={`tooltip-wrapper tooltip-wrapper--${placement}`}>
            {children}
            <span className={`tooltip-bubble${cssClass ? ` ${cssClass}` : ''}`} role="tooltip">
                {text}
            </span>
        </div>
    );
};
