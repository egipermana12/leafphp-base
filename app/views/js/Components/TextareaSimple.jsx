import React, { useState } from 'react';

const TextareaSimple = ({row = '4', width='w-full', name, value, onChange}) => {
    return (
        <>
            <textarea 
                name={name}
                value={value}
                rows={row} 
                onChange={onChange}
                className={`block ${width} p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-black focus:border-black`} placeholder="Alamat anggota ...">
            </textarea>
        </>
    )
}

export default TextareaSimple;
