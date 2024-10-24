import { Head, router, usePage } from '@inertiajs/react';
import { format } from 'date-fns';

export const submitAnggota = (values) => {
    // Mengonversi tanggal jika ada key 'tanggal' dalam values
    const formattedValues = {
        ...values,
            // Pastikan 'tanggal' adalah key untuk tanggal yang ingin dikonversi
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
