import React from "react";
import './MetaItem.css';

const MetaItem = ({ label, value }) => {
    return (
        <div className="meta__item">
            <span className="item__label">{label}</span>
            <span>{value}</span>
        </div>
    );
}

export default MetaItem;