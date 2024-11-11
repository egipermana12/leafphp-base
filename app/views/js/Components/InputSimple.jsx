import React, { useState } from 'react';

const InputSimple = ({width = 'w-72', type = 'text', value = '', placeholder='', onChange, name='', isError =  false, disabled = false}) => {
    return (
        <>
            <input 
                className={`py-2 px-3 ${width} bg-gray-50 ${isError ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-400 focus:border-black focus:ring-black' }  rounded-lg text-sm disabled:opacity-50 disabled:bg-gray-200 disabled:pointer-events-none`}
                type={type}
                name={name}
                disabled={disabled}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}

export default InputSimple;
