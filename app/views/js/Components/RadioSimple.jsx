import React, { useState } from 'react';

const RadioSimple = ({label, id, value, name, width='w-full', checked = false, onChange}) => {
    return (
        <>
            <div 
                className={`flex ${width} items-center ps-4 border border-slate-400 rounded`}>
                    <input 
                        id={id} 
                        type="radio" 
                        value={value} 
                        name={name} 
                        checked={checked}
                        onChange={onChange}
                        className="w-4 h-4 text-blue-600 bg-gray-50 border-slate-400" 
                        />
                    <label 
                        htmlFor={id} 
                        className={` ${width} ms-2 py-2 text-sm font-medium text-slate-600`}>
                        {label}</label>
            </div>
        </>
    )
}

export default RadioSimple;
