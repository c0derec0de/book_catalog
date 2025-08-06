import React from "react";
import "./MetaItem.css";
import { MetaItemProps } from "../../../types/propsTypes.ts";

const MetaItem: React.FC<MetaItemProps> = ({ label, value }) => {
  // функциональный компонент React.FC
  return (
    <div className="meta__item">
      <span className="item__label">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default MetaItem;
