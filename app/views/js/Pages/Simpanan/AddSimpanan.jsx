import Layout from '@layout/Layout.jsx';
import { InputSimple, ButtonSimple, LabelSimple, TextareaSimple, SelectSimple, SimpleErrorText, RadioSimple, InputDate, InputCurrency} from '@components/index.jsx';
import { BiTrashAlt } from "react-icons/bi";
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
const ModalSimple = lazy(() => import('@components/ModalSimple.jsx'))

import DaftarAnggotaPart from '@parts/DaftarAnggotaPart.jsx'
import {apiGetAnggota} from '@services/AnggotaServices'
import currency from '@utils/formatCurrency.js'

const AddSimpanan = () => {
    const { errors } = usePage().props;
    const [values, setValues] = useState({
        tanggal_transaksi: new Date(),
        harga: 0,
        harga_formateed: 0
    });

    const [activeModal, setActiveModal] = useState(false);
    const openModal = () => setActiveModal(true);
    const closeModal = () => setActiveModal(false);

    const handleInput = (e) => {
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

    const handleAccept = (e) => {
        closeModal();
    };

    const handleDecline = () => {
        closeModal();
    };


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

    const [pinjamanType, setPinjamanType] = useState([]);
    const [selectPinjamanType, setSelectPinjamanType] = useState('');

    const selectPinjamanData = [
      {id: 'wajib', nama: 'Wajib'},
      {id: 'pokok', nama: 'Pokok'},
    ];

    useEffect(() => {
      setPinjamanType(selectPinjamanData)
    }, [])

    const handleSelectPinjamanType = (e) => {
      setSelectPinjamanType(e.target.value)
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
            <div className="m-2 border boder-gray-200 rounded py-4 px-6">
                <form>
                    <div className="flex flex-row gap-4">
                        <div className="w-1/2">
                            <div className="flex flex-row gap-x-1 mb-4">
                                <div className="flex flex-col w-2/4">
                                    <LabelSimple  
                                    htmlFor="nik" label ="NIK Anggota" />
                                    <InputSimple width="w-full" placeholder="NIK Anggota" value={values.nik} onChange={handleInput} name="nik" isError={errors.nik} disabled />    
                                </div>
                                <div className="flex flex-col w-2/4">
                                    <LabelSimple  
                                    htmlFor="nik" label ="Nama Anggota" />
                                    <InputSimple width="w-full" placeholder="Nama Anggota" value={values.nama} onChange={handleInput} name="nik" isError={errors.nik} disabled />    
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
                                htmlFor="tgl_lahir" label ="Jenis Simpanan" />
                                <SelectSimple 
                                    jenisSelect="simple"
                                    value={selectPinjamanType}
                                    setValue={setSelectPinjamanType}
                                    onChange={handleSelectPinjamanType}
                                    data={pinjamanType}
                                    textAtas="Pilih Tipe"
                                  />
                                {errors.jenis_simpanan && <SimpleErrorText dataError={errors.jenis_simpanan} />}
                            </div>
                            <div className="flex flex-col w-5/6 mb-4">
                                <LabelSimple  
                                htmlFor="tgl_lahir" label ="Tanggal Transaksi" />
                                <InputDate value={values.tanggal_transaksi} name="tanggal_transaksi" onChange={handleInput} width="w-full" />
                                {errors.tanggal_transaksi && <SimpleErrorText dataError={errors.tanggal_transaksi} />}
                            </div>
                            <div className="flex flex-col w-5/6 mb-4">
                                <LabelSimple  
                                htmlFor="tgl_lahir" label ="Jumlah Simpanan" />
                                <InputSimple 
                                    value={values.harga_formateed}   
                                    name="harga_formateed" 
                                    onChange={handleInput} 
                                    width="w-full" />
                                {errors.harga && <SimpleErrorText dataError={errors.harga} />}
                            </div>
                            <div className="flex flex-col w-5/6">
                                <LabelSimple  
                                htmlFor="tgl_lahir" label ="Keterangan" />
                                <TextareaSimple 
                                value={values.ket} 
                                placeholder="keterangan"
                                onChange={handleInput}
                                name="ket" width="w-full" />
                                {errors.harga && <SimpleErrorText dataError={errors.harga} />}
                            </div>
                        </div>
                    </div>
                    <InputSimple width="w-full" type="hidden" placeholder="NIK Anggota" value={values.refid_anggota} onChange={handleInput} name="nik" isError={errors.id} disabled /> 
                     <InputSimple width="w-full" type="hidden" placeholder="NIK Anggota" value={values.harga} onChange={handleInput} name="nik" isError={errors.id} disabled /> 
                </form>
            </div>
        </>
    )
}

AddSimpanan.layout = (page) => <Layout children={page} title="AddSimpanan" />;

export default AddSimpanan;


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
