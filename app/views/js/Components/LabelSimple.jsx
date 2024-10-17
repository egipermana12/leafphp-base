import React, { useState } from 'react';

const LabelSimple = ({htmlFor, label}) => {
    return (
        <>
            <label 
                className="text-slate-800 text-sm font-medium leading-relaxed"  
                htmlFor={htmlFor}>
                {label}
            </label>
        </>
    )
}

export default LabelSimple;
