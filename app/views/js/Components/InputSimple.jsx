import React, { useState } from 'react';

const InputSimple = ({width = 'w-72', type = 'text', value = '', placeholder='', onChange, name=''}) => {
    return (
        <>
            <input 
                className={`py-2 px-3 ${width} bg-gray-50 border-slate-400 rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none`}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}

export default InputSimple;
