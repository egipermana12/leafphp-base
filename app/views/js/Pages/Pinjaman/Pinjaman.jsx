import Layout from '@layout/Layout.jsx';
import { Head, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { LoadingSimple, SimpleAlert} from '@components/index.jsx';

const DaftarPinjaman = lazy(() => import('@parts/DaftarPinjaman.jsx'))

const Pinjaman = () => {
    return (
        <>
           <Head title="Simpanan" />
            <div className="m-2 border boder-gray-200 rounded p-4">
                <Suspense fallback={<LoadingSimple />}>
                  <DaftarPinjaman />
                </Suspense>
            </div>
        </>
    )
}

Pinjaman.layout = (page) => <Layout children={page} title="Pinjaman" />;

export default Pinjaman;
