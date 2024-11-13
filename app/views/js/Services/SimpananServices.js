import { Head, router, usePage } from '@inertiajs/react';
import { format, parse } from 'date-fns';
// import {isValidDateFormat} from '@utils/formatDate.js'
import axios from 'axios'

export const submitSimpanan = (values) => {
    // Mengonversi tanggal jika ada key 'tanggal' dalam values

    const formattedValues = {
        ...values,
        tanggal_transaksi: format(new Date(values.tanggal_transaksi), 'yyyy-MM-dd'),
    };

    const formData = new FormData();

    Object.keys(formattedValues).forEach((key) => {
        if(formattedValues[key] instanceof File){
            formData.append(key, formattedValues[key]);
        }else{
            formData.append(key, formattedValues[key]);
        }
    });

        // Mengirim data yang sudah dikonversi
    router.post('/simpanan', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const updateSimpanan = (values) => {
    // Mengonversi tanggal jika ada key 'tanggal' dalam values
    const isValidDateFormat = (dateString, formatPattern) => {
        const pattern = formatPattern === 'yyyy-MM-dd' ? /^\d{4}-\d{2}-\d{2}$/ : /^\d{2}\/\d{2}\/\d{4}$/;
        return pattern.test(dateString);
    };

    const formattedValues = {
        ...values,
        tanggal_transaksi: isValidDateFormat(values.tanggal_transaksi, 'yyyy-MM-dd')
            ? values.tanggal_transaksi
            : format(parse(values.tanggal_transaksi, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),
    };

    const formData = new FormData();

    Object.keys(formattedValues).forEach((key) => {
        if(formattedValues[key] instanceof File){
            formData.append(key, formattedValues[key]);
        }else{
            formData.append(key, formattedValues[key]);
        }
    });

    console.log(formData)

        // Mengirim data yang sudah dikonversi
    router.patch(`/simpanan`, formattedValues);
}
