import React from "react";

const RoleBadge: React.FC<{ role: string }> = ({ role }) => {
    const color = role === "admin" ? "bg-red-500" : role === "merchant" ? "bg-green-500" : "bg-yellow-500";
    return <span className={`px-2 py-1 text-xs text-white rounded ${color}`}>{role}</span>;
};

export default RoleBadge;
