import React, { useState } from 'react';

const ButtonSimple = ({type = 'button', text = 'button', classCustom = 'border-gray-400 bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none', handleClick, disabled = false}) => {
    return (
        <>
            <button
                className={`py-2 px-6 border inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${classCustom}`}
                type={type}
                onClick={handleClick}
                disabled={disabled}
            >
                {text}
            </button>
        </>
    )
}

export default ButtonSimple;
