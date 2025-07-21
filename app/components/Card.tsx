import React from "react";
import { classNames } from "../utils/appearance";

type CardProps = {
  children: React.ReactNode;
  classes?: { card?: string };
  onClick?: () => void;
  tabIndex?: number;
};

function Card({ children, classes, onClick, tabIndex }: CardProps) {
  return (
    <div
      className={classNames(
        "bg-white p-4 shadow-lg hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1",
        classes?.card
      )}
      onClick={onClick}
      tabIndex={tabIndex}
      role={onClick ? "button" : undefined}
      style={{ cursor: onClick ? "pointer" : undefined }}
    >
      {children}
    </div>
  );
}

export default Card;
