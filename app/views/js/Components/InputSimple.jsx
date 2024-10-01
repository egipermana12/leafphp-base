import React, { useState } from 'react';

const InputSimple = ({width = 'w-72', type = 'text', value = '', placeholder='', onChange}) => {
    return (
        <>
            <input 
                className={`py-2 px-3 ${width} bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
        </>
    )
}

export default InputSimple;
