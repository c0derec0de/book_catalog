import React from "react";
import "./MetaItem.css";
import { type MetaItemProps } from "./types";

export const MetaItem: React.FC<MetaItemProps> = ({ label, value }) => {
  return (
    <div className="meta__item">
      <span className="item__label">{label}</span>
      <span>{value}</span>
    </div>
  );
};
