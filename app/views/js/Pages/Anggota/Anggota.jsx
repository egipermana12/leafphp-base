import Layout from '@layout/Layout.jsx';
import { Pagination, InputSimple, ButtonSimple, SkeletonLoading, SimpleAlert} from '@components/index.jsx';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import DaftarAnggota from './DaftarAnggota.jsx'


const Anggota = () => {
    const {anggota} = usePage().props
    const [showAlert, setShowAlert] = useState(false)
    return (
        <>
           <Head title="Anggota" />
            <div className="m-2 border boder-gray-200 rounded p-4">
                <SimpleAlert />
              
                <Suspense fallback={<SkeletonLoading col="3" row="5" />}>
                  <DaftarAnggota anggota = {anggota} />
                </Suspense>

            </div>
        </>
    )
}

Anggota.layout = (page) => <Layout children={page} title="Anggota" />;

export default Anggota;
