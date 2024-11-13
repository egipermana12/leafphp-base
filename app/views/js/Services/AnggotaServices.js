import { Head, router, usePage } from '@inertiajs/react';
import { format, parse } from 'date-fns';
import axios from 'axios'


export const submitAnggota = (values) => {
    // Mengonversi tanggal jika ada key 'tanggal' dalam values
    const formattedValues = {
        ...values,
        tgl_gabung: format(new Date(values.tgl_gabung), 'yyyy-MM-dd'),
        tgl_lahir: format(new Date(values.tgl_lahir), 'yyyy-MM-dd')
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
    router.post('/anggota', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}


export const editAnggota = (id, values) => {
    const isValidDateFormat = (dateString, formatPattern) => {
        const pattern = formatPattern === 'yyyy-MM-dd' ? /^\d{4}-\d{2}-\d{2}$/ : /^\d{2}\/\d{2}\/\d{4}$/;
        return pattern.test(dateString);
    };

    const formattedValues = {
        ...values,
        tgl_gabung: isValidDateFormat(values.tgl_gabung, 'yyyy-MM-dd')
            ? values.tgl_gabung
            : format(parse(values.tgl_gabung, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd'),

        tgl_lahir: isValidDateFormat(values.tgl_lahir, 'yyyy-MM-dd')
            ? values.tgl_lahir
            : format(parse(values.tgl_lahir, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd')
    };

    router.patch(`/anggota`, formattedValues);
}

export const apiAnggota = async (page, search) => {
    try{
        const response = await axios.get(`/anggota/apiAnggota`, {
            params: { page, search }
    });
        if(response.status === 200){
            const {data} = response.data;
            return data;
        }
    }catch(error){
        console.error('Error get data', error);
        throw error;
    }
}

export const apiGetAnggota = async (id) => {
    try{
        const response = await axios.get(`/anggota/apiGetAnggota/${id}`);
        if(response.status === 200){
            const {data} = response.data;
            return data;
        }
    }catch(error){
        console.error('Error get data', error);
        throw error;
    }
}
