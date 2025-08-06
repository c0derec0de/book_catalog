import React from "react";
import "./MetaItem";
import { type MetaItemProps } from "../../../types/index";

export const MetaItem: React.FC<MetaItemProps> = ({ label, value }) => {
  return (
    <div className="meta__item">
      <span className="item__label">{label}</span>
      <span>{value}</span>
    </div>
  );
};
