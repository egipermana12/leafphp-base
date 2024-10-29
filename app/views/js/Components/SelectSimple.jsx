import React, { useState } from 'react';

const SelectSimple = ({width='w-full', id='id-default', onChange, data = [], textAtas = 'Pilih', value='', setValue, jenisSelect, name}) => {

    const renderOption = () => {
        return data.map((item, index) => {
            if(jenisSelect === 'simple'){
                return (
                    <option key={index} value={`${item.id}`}>{item.nama}</option>
                )
            }else{
                return(
                    <option key={index} value={`${item.kd_kota}.${item.kd_kec}.${item.kd_kel}`}>{item.nm_wilayah}</option>
                )
            }
        })
    }

    return (
        <>
            <select 
                id={id} 
                className={` ${width} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block p-2.5`}
                onChange={(e) => {onChange, setValue(e.target.value)}}
                value={value}
                name={name}
                >
                <option value=''>{textAtas}</option>
                {renderOption()}
            </select>
        </>
    )
}

export default SelectSimple
