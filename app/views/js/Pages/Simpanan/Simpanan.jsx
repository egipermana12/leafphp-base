import Layout from '@layout/Layout.jsx';
import { Pagination, InputSimple, ButtonSimple, SkeletonLoading, SimpleAlert} from '@components/index.jsx';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import DaftarSimpanan from './DaftarSimpanan.jsx'


const Simpanan = () => {
    const {simpanan} = usePage().props
    const [showAlert, setShowAlert] = useState(false)
    return (
        <>
           <Head title="Simpanan" />
            <div className="m-2 border boder-gray-200 rounded p-4">
                <SimpleAlert />
                <Suspense fallback={<SkeletonLoading col="3" row="5" />}>
                  <DaftarSimpanan simpanan= {simpanan} />
                </Suspense>
            </div>
        </>
    )
}

Simpanan.layout = (page) => <Layout children={page} title="Simpanan" />;

export default Simpanan;
