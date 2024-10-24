import Layout from '@layout/Layout.jsx';
import { InputSimple, ButtonSimple, LabelSimple, TextareaSimple, SelectSimple, SimpleErrorText, RadioSimple, InputDate} from '@components/index.jsx';
import { BiTrashAlt } from "react-icons/bi";
import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios'

//service
import {getKabupatenService, getKecamatanService, getKelurahanService} from '@services/WilayahServices'
import {submitAnggota} from '@services/AnggotaServices'
import {getPekerjaanServices} from '@services/PekerjaanServices'

const AddAnggota = () => {
    //state form
    const { errors } = usePage().props;
    const [valueDate, setValueDate] = useState(new Date());
    const [filePrev, setFilePrev] = useState(null);

    const [values, setValues] = useState({
        tgl_gabung: new Date(),
        tgl_lahir: new Date(),
        jns_kelamin: 'L', 
        status_anggota: 'aktif'
    });

    const handleInput = (e) => {
        const key = e.target.name;
        let value;
        if(e.target.type === 'file'){
            value = e.target.files[0];
            setFilePrev(URL.createObjectURL(e.target.files[0]));
            setValues(values => ({
                ...values,
                [key]: value
            }));
        }else{
            value = e.target.value;
            if(key === 'nik'){
                if (/^\d*$/.test(value) && value.length <= 16){
                    setValues(values => ({
                        ...values,
                        [key]: value
                    }));
                }
                return;
            }
        }
        setValues(values => ({
          ...values,
          [key]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitAnggota(values);
    }

    //handle kab
    const [kabupaten, setKabupaten] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState("");
    //handle kec
    const [kecamatan, setKecamatan] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState("");

    //handle kel
    const [kelurahan, setKelurahan] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState("");

    const getKabupaten = async () => {
        try{
            const response = await getKabupatenService();
            setKabupaten(response);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getKabupaten();  // Call the function when the component mounts
    }, []);


    const getKecamatan = async (kd_kota) => {
        try{
            const response = await getKecamatanService(kd_kota);
            setKecamatan(response);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(selectedKabupaten != ""){
            getKecamatan(selectedKabupaten);
            setSelectedKecamatan("");
        }else{
            setKecamatan([]);
            setSelectedKecamatan("");
        }
    }, [selectedKabupaten]); // Only run when kd_kota changes

    const getKelurahan = async (kd_kec) => {
        try{
            const response = await getKelurahanService(kd_kec);
            setKelurahan(response);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        if(selectedKecamatan != ""){
            getKelurahan(selectedKecamatan);
            setSelectedKelurahan("");
        }else{
            setKelurahan([]);
            setSelectedKelurahan("");
        }
    }, [selectedKecamatan]); // Only run when kd_kota changes

    const handleKabupatenChange = (e) => {
        setSelectedKabupaten(e.target.value);
    }

    const handleKecamatanChange = (e) => {
        setSelectedKecamatan(e.target.value);
    }

    const handleKelurahanChange = (e) => {
        setSelectedKelurahan(e.target.value)
    }

    //handle kab
    const [pekerjaan, setPekerjaan] = useState([]);
    const [selectedPekerjaan, setSelectedPekerjaan] = useState("");

    const getPekerjaan = async () => {
        try{
            const response = await getPekerjaanServices();
            setPekerjaan(response);
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => {
        getPekerjaan();
    }, [])

    const handlePekerjaanChange = (e) => {
        setSelectedPekerjaan(e.target.value)
    }

    const handleRemovePreview = (e) => {
        e.preventDefault()
        setFilePrev(null)
        setValues(values => {
            const updatedValues = { ...values };
            delete updatedValues.file_ktp;
            return updatedValues;
        });
    }

    return(
        <>
            <Head title="Tambah Anggota" />
            <div className="m-2 border boder-gray-200 rounded py-4 px-6">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">
                        <div className="flex flex-col gap-y-1 mb-4">
                            <LabelSimple  
                            htmlFor="nik" label ="NIK Anggota" />
                            <InputSimple width="w-full" placeholder="Masukan NIK Anggota" value={values.nik} onChange={handleInput} name="nik" isError={errors.nik} />
                            {errors.nik && <SimpleErrorText dataError={errors.nik} />}
                        </div>
                        <div className="flex flex-col gap-y-1 mb-4">
                            <LabelSimple  
                            htmlFor="nama" label ="Nama Anggota" />
                            <InputSimple width="w-full" placeholder="Masukan Nama Anggota" value={values.nama} onChange={handleInput} isError={errors.nama} name="nama" />
                            {errors.nama && <SimpleErrorText dataError={errors.nama} />}
                        </div>
                        <div className="flex flex-row gap-x-2 mb-4 w-full">
                            <div className="flex flex-col gap-y-1 w-full">
                                <LabelSimple  
                                htmlFor="tempat_lahir" label ="Tempat Lahir" />
                                <InputSimple width="w-full" placeholder="Masukan Tempat" value={values.tempat_lahir} onChange={handleInput} isError={errors.tempat_lahir} name="tempat_lahir" />
                                {errors.tempat_lahir && <SimpleErrorText dataError={errors.tempat_lahir} />}
                            </div>
                            <div className="flex flex-col gap-y-1 w-full">
                                <LabelSimple  
                                htmlFor="tgl_lahir" label ="Tanggal Lahir" />
                                <InputDate value={values.tgl_lahir} name="tgl_gabung" onChange={handleInput} width="w-full" />
                                {errors.tgl_lahir && <SimpleErrorText dataError={errors.tgl_lahir} />}
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-1 mb-4 w-full">
                            <LabelSimple  
                            htmlFor="jns_kelamin" label ="Jenis Kelamin" />
                            <div className="flex flex-row gap-x-2">
                                <RadioSimple id="jns_kelamin_L" value="L" onChange={handleInput} name="jns_kelamin" label="Pria" checked={values.jns_kelamin === 'L'} />
                                <RadioSimple id="jns_kelamin_P" value="P" onChange={handleInput} name="jns_kelamin" label="Wanita" checked={values.jns_kelamin === 'P'} />
                            </div>
                            {errors.jns_kelamin && <SimpleErrorText dataError={errors.jns_kelamin} />}
                        </div>
                        <div className="flex flex-row gap-x-2 mb-4 w-full">
                            <div className="flex flex-col gap-y-1 w-full">
                                <LabelSimple  
                                htmlFor="tgl_gabung" label ="Tanggal Gabung" />
                                <InputDate value={values.tgl_gabung} name="tgl_gabung" onChange={handleInput} width="w-full" />
                                {errors.tgl_gabung && <SimpleErrorText dataError={errors.tgl_gabung} />}
                            </div>
                            <div className="flex flex-col gap-y-1 w-full">
                                <LabelSimple  
                                htmlFor="Pilih Status" label ="Status Anggota" />
                                <div className="flex flex-row gap-x-2">
                                    <RadioSimple id="status_anggota_A" value="aktif" onChange={handleInput} name="status_anggota" label="Aktif" checked={values.status_anggota === 'aktif'} />
                                    <RadioSimple id="status_anggota_Non" value="nonaktif" onChange={handleInput} name="status_anggota" checked={values.status_anggota === 'nonaktif'} label="Non Aktif" />
                                </div>
                                {errors.status_anggota && <SimpleErrorText dataError={errors.status_anggota} />}
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-1 mb-4">
                            <LabelSimple  
                            htmlFor="alamat" label ="Alamat" />
                            <TextareaSimple value={values.alamat} name="alamat" width="w-full" />
                        </div>
                        <div className="flex flex-col gap-y-1 mb-4">
                            <LabelSimple  
                            htmlFor="kd_kota" label ="Pilih Kabupaten" />
                            <SelectSimple 
                                width="w-full" 
                                value={selectedKabupaten || ''}
                                setValue={setSelectedKabupaten}
                                onChange={handleKabupatenChange} 
                                data={kabupaten} 
                                textAtas="Pilih Kabupaten" />
                        </div>
                        <div className="flex flex-col gap-y-1 mb-4">
                            <LabelSimple  
                            htmlFor="kd_kec" label ="Pilih Kecamatan" />
                            <SelectSimple 
                                width="w-full" 
                                value={selectedKecamatan || ''}
                                setValue={setSelectedKecamatan}
                                data={kecamatan} 
                                onChange={handleKecamatanChange}
                                textAtas="Pilih Kecamatan" />
                        </div>
                        <div className="flex flex-col gap-y-1 mb-4">
                            <LabelSimple  
                            htmlFor="kd_desa" label ="Pilih Kelurahan" />
                            <SelectSimple 
                                width="w-full" 
                                value={selectedKelurahan || ''}
                                setValue={setSelectedKelurahan}
                                onChange={handleKelurahanChange}
                                data={kelurahan} 
                                textAtas="Pilih Kelurahan" />
                        </div>
                        <div className="flex flex-col gap-y-1 mb-4">
                            <LabelSimple  
                            htmlFor="kd_pekerjaan" label ="Pilih Pekerjaan" />
                            <SelectSimple 
                                width="w-full"
                                textAtas="Pilih Pekerjaan"
                                value={selectedPekerjaan || ''}
                                setValue={setSelectedPekerjaan}
                                onChange={handlePekerjaanChange}
                                jenisSelect="simple"
                                data={pekerjaan}
                                />
                        </div>
                    </div>
                    <div className="w-1/3">
                        <div className="w-full mt-8 ml-12">
                            <div className="flex items-center justify-center relative">
                                <button type="button" className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-full absolute -top-4 -right-4" onClick={handleRemovePreview}>
                                    <BiTrashAlt />
                                </button>
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                                    {filePrev == null ? 
                                    (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6 relative">
                                            <img className="object-cover h-auto max-w-full rounded-lg" src={filePrev} alt="image description"/>
                                        </div>
                                    )}

                                    <input id="dropzone-file" accept="image/*" type="file" onChange={handleInput} className="hidden" name="file_ktp" />
                                </label>
                            </div>
                            {errors.file_ktp && <SimpleErrorText dataError={errors.file_ktp} />}
                        </div>
                    </div>
                </div>
                <ButtonSimple 
                      type="button" 
                      text="Batal" 
                      classCustom="px-12 bg-gradient-to-r from-red-600 to-red-800 text-white" 
                        />
                <ButtonSimple 
                      type="submit" 
                      text="Simpan" 
                      classCustom="px-12 ml-4 bg-gradient-to-r from-gray-900 to-black text-white" 
                        />
                </form>
            </div>
        </>
    )
}

AddAnggota.layout = (page) => <Layout children={page} title="AddAnggota" />;

export default AddAnggota;
