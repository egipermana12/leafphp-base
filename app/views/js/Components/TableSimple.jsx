import React, { useState } from 'react';

const TableSimple = ({columns}) => {
    return (
        <>
            <table className="text-sm text-left text-gray-500 w-full">
                <thead className="border-b text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    {columns.map((col) => (
                        <th key={col.field} className={col.className}>{col.label}</th>
                    ))}
                </tr>
                </thead>
            </table>
        </>
    )
}

export default TableSimple;
