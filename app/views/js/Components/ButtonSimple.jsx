import React, { useState } from 'react';

const ButtonSimple = ({type = 'button', text = 'button'}) => {
    return (
        <>
            <button
                className={`py-2 px-6 border border-gray-400 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-50 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none`}
                type={type}
            >
                {text}
            </button>
        </>
    )
}

export default ButtonSimple;
