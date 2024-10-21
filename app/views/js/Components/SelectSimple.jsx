import React, { useState } from 'react';

const SelectSimple = ({width='w-full', id='id-default', onChange, data = [], textAtas = 'Pilih', value='', setValue}) => {
    return (
        <>
            <select 
                id={id} 
                className={` ${width} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5`}
                onChange={(e) => {onChange, setValue(e.target.value)}}
                value={value}
                >
                <option value=''>{textAtas}</option>
                {data.map((item,index) => (
                    <option key={index} value={`${item.kd_kota}.${item.kd_kec}.${item.kd_kel}`}>{item.nm_wilayah}</option>
                ))}
            </select>
        </>
    )
}

export default SelectSimple
