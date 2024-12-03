import Layout from '@layout/Layout.jsx';
import { InputSimple, ButtonSimple, LabelSimple, TextareaSimple, SelectSimple, SimpleErrorText, RadioSimple, InputDate, InputCurrency} from '@components/index.jsx';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect, lazy, Suspense } from 'react';
const ModalSimple = lazy(() => import('@components/ModalSimple.jsx'))

import currency from '@utils/formatCurrency.js'

import DaftarAnggotaPart from '@parts/DaftarAnggotaPart.jsx'
import {apiGetAnggota} from '@services/AnggotaServices'

const AddPinjaman = () => {
    
    const [activeModal, setActiveModal] = useState(false);
    const openModal = () => setActiveModal(true);
    const closeModal = () => setActiveModal(false);
    const handleAccept = (e) => {
        closeModal();
    };

    const handleDecline = () => {
        closeModal();
    };

    const { errors } = usePage().props;
    const [values, setValues] = useState({
        tanggal_transaksi: new Date(),
        harga: '',
        harga_formateed: ''
    });

    const handleInput  = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        if(key === 'harga_formateed'){
            const {numericValue, formattedValue} = currency(value);
            setValues((prevValues) => ({
            ...prevValues,
            harga: numericValue,
            harga_formateed: formattedValue,
        }));
        }else{
            setValues(values => ({
                ...values,
            [key]: value
            }))    
        }
    }

    const handleSelectAnggota = async (id) => {
        try{
            const response = await apiGetAnggota(id);
            setValues(prevValues => ({ ...prevValues, 
                nik: response.nik,
                nama: response.nama,
                refid_anggota:response.id
            }));
        }catch(error){
            console.error("Failed to fetch data:", error);
        }
        closeModal();
    }

     return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {activeModal && (
                    <ModalAnggota 
                        activeModal={activeModal} 
                        onClose={closeModal} 
                        onAccept={handleAccept} 
                        onDecline={handleDecline}
                        onSelect={handleSelectAnggota} //untuk menangani select id dari modal anggota
                        />
                )}
            </Suspense>
           <Head title="Tambah Simpanan" />
            <div className="m-2 border boder-gray-200 rounded p-4">
                <form>
                    <div className="flex flex-row gap-4">
                        <div className="w-1/2">
                            <div className="flex flex-row gap-x-1 mb-4">
                                <div className="flex flex-col w-2/4">
                                    <LabelSimple  
                                    htmlFor="nik" label ="NIK Anggota" />
                                    <InputSimple width="w-full" placeholder="NIK Anggota" value={values.nik} onChange={handleInput} name="nik" isError={errors.refid_anggota} disabled />    
                                </div>
                                <div className="flex flex-col w-2/4">
                                    <LabelSimple  
                                    htmlFor="nik" label ="Nama Anggota" />
                                    <InputSimple width="w-full" placeholder="Nama Anggota" value={values.nama} onChange={handleInput} name="nik" isError={errors.refid_anggota} disabled />    
                                </div>
                                <div className="flex flex-col">
                                    <span>&nbsp;</span>
                                    <ButtonSimple 
                                        type="button" 
                                        text="Cari" 
                                        handleClick={() => openModal()}
                                        classCustom="bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-green-700"
                                        />    
                                </div>
                            </div>
                            <div className="flex flex-col w-5/6 mb-4">
                                <LabelSimple  
                                htmlFor="tgl_lahir" label ="Tanggal Transaksi" />
                                <InputDate value={values.tanggal_transaksi} name="tanggal_transaksi" onChange={handleInput} width="w-full" />
                                {errors.tanggal_transaksi && <SimpleErrorText dataError={errors.tanggal_transaksi} />}
                            </div>
                            <div className="flex flex-col w-5/6 mb-4">
                                <LabelSimple  
                                htmlFor="tgl_lahir" label ="Jumlah Pinjaman" />
                                <InputSimple 
                                    value={values.harga_formateed}   
                                    name="harga_formateed" 
                                    onChange={handleInput} 
                                    width="w-full" />
                                {errors.harga && <SimpleErrorText dataError={errors.harga} />}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

AddPinjaman.layout = (page) => <Layout children={page} title="AddPinjaman" />;

export default AddPinjaman;

const ModalAnggota = (props) => {
    return (
        <>
            <ModalSimple
                        isOpen={!!props.activeModal}
                        onClose={props.onClose}
                        title="Cari Anggota"
                        acceptLabel="Save"
                        declineLabel="Cancel"
                        onAccept={props.onAccept}
                        onDecline={props.onDecline}
                        width="max-w-full"
                    >
                        <DaftarAnggotaPart onSelect={props.onSelect} />
                    </ModalSimple>
        </>
    )
}
