import React, { useState } from 'react';

const SelectSimple = ({width='w-full', id='id-default', onChange}) => {
    return (
        <>
            <select 
                id={id} 
                className={` ${width} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5`}
                onChange={onChange}
                >
                <option defaultValue="0">Choose a country</option>
                <option value="US">United States</option>
            </select>
        </>
    )
}

export default SelectSimple
