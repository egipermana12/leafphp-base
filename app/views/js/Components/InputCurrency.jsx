import React, { useState, useEffect } from 'react';

// Fungsi formatRupiah dideklarasikan di luar komponen untuk menghindari kesalahan
const formatRupiah = (value) => {
    const numValue = value.toString().replace(/\D/g, '');
    return `Rp ${numValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const InputCurrency = ({ value, onChange, name, width = 'w-full', isError = false }) => {
    const [formattedValue, setFormattedValue] = useState(formatRupiah(value || ''));

    useEffect(() => {
        setFormattedValue(formatRupiah(value || ''));
    }, [value]);

    const handleChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setFormattedValue(formatRupiah(rawValue));
        onChange && onChange(rawValue);
    };

    return (
        <input
            className={`py-2 px-3 ${width} bg-gray-50 ${isError ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-slate-400 focus:border-black focus:ring-black'} rounded-lg text-sm disabled:opacity-50 disabled:bg-gray-200 disabled:pointer-events-none`}
            type="text"
            value={formattedValue}
            name={name}
            onChange={handleChange}
        />
    );
};

export default InputCurrency;
