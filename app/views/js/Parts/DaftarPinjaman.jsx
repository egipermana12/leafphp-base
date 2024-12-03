import { Pagination, InputSimple, ButtonSimple, LoadingSimple, BadgeSimple} from '@components/index.jsx';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import {apiPinjaman} from '@services/PinjamanServices'


const DaftarPinjaman = ({type = 'daftar'}) => {
    const [pinjaman, setPinjaman] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchSimpanan = async (page = 1, searchQuery = '') => {
        setIsLoading(true);
        try{
            const response = await apiPinjaman(page, searchQuery);
            setPinjaman(response.pinjaman);
            setPagination(response.pagination);
            setSearch(response.searchQuery);
        }catch(error){
            console.log(error);
        }finally {
            setIsLoading(false); // Set loading to false after fetching data
        }
    }

    useEffect(() => {
        fetchSimpanan(1, search)
    }, [])

    const totalPage = pagination.last_page;
    const currentPage = pagination.current_page;
    const perPage = pagination.per_page;
    const range = 2;

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const handleCheckAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(pinjaman.map(li => li.id));
        if (isCheckAll) {
          setIsCheck([]);
        }
    };

    const handleChecked = (e) => {
        const { id, checked } = e.target;
        const parsedId = parseInt(id);  // Ensure consistent data type
        if (checked) {
          setIsCheck([...isCheck, parsedId]);
        } else {
          setIsCheck(isCheck.filter(item => item !== parsedId));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchSimpanan(1, search);
    }

    const handlePageChange = (page) => {
        fetchSimpanan(page, search);
    }

    const handleTambah = (e) => {
        router.visit('/pinjaman/create');
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <form onSubmit={handleSearch}>
                    <div className="flex items-center gap-x-2">
                      <InputSimple
                        placeholder="cari user"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <ButtonSimple type="submit" text="Cari" />
                    </div>
                </form> 
                <div className="flex items-center gap-x-1">
                    {type === 'daftar' ? 
                        (
                            <>
                            <ButtonSimple 
                              type="button" 
                              text="Tambah" 
                              classCustom="border-gray-800 bg-gray-800 text-white hover:bg-gray-800" 
                              handleClick={handleTambah}
                            />
                            <ButtonSimple 
                              type="button" 
                              text="Edit" 
                              classCustom="border-slate-200 bg-gray-800 text-white hover:bg-gray-800 disabled:text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed "
                              disabled={isCheck.length !== 1}
                              handleClick={handleTambah}
                              />
                            <ButtonSimple 
                              type="button" 
                              text="Delete"
                              classCustom="border-slate-200 bg-gray-800 text-white hover:bg-gray-800 disabled:text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed "
                              disabled={isCheck.length <= 0 }
                              />
                            </>
                        ) : (
                            <ButtonSimple 
                              type="button" 
                              text="Pilih" 
                              classCustom="border-gray-800 bg-gray-800 text-white hover:bg-gray-800" 
                              handleClick={handleTambah}
                              disabled={isCheck.length !== 1}
                                />
                        )
                    }
                </div>
            </div>
            <table className="text-sm text-left text-gray-500 w-full">
                <Tableheader 
                    checkAll={isCheckAll}
                    isOnChange={handleCheckAll}
                    />
                <tbody>
                {   isLoading ? (
                    <tr>
                        <td colSpan="3" className="text-center">Loading...</td>
                    </tr>
                ) : (
                    pinjaman.map((dt, index) => (
                        <tr key={dt.id} className="border-b">
                            <td className="text-center">
                                {((currentPage - 1) * perPage) + index + 1}
                            </td>
                            <td className="text-center">
                            <input
                                id={dt.id.toString()}
                                type="checkbox"
                                value={dt.id}
                                onChange={handleChecked}
                                checked={isCheck.includes(dt.id)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            </td>
                            <td className="px-4 py-3">{dt.nik} / {dt.nama}</td>
                            <td className="px-4 py-3">{dt.harga_pinjaman}</td>
                            <td className="px-4 py-3">0</td>
                            <td className="px-4 py-3">{dt.tenor}</td>
                            <td className="px-4 py-3"><BadgeSimple status = {dt.status} /></td>
                            <td className="px-4 py-3">{dt.ket}</td>
                        </tr>
                    ))
                    )
                }
                </tbody>
            </table>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-slate-500">Page {currentPage} From {totalPage}</span>
                <Pagination
                    range={range}
                    current_page={currentPage}
                    total_page={totalPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    )
}

export default DaftarPinjaman;


const Tableheader = ({ checkAll, isOnChange }) => {
  return (
    <>
      <thead className="border-b text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="w-10 text-center">No</th>
          <th className="w-8 text-center">
            <input
              checked={checkAll}
              onChange={isOnChange}
              id="checkbox-all"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
          </th>
          <th className="px-4 py-3">NIK/Nama Anggota</th>
          <th className="px-4 py-3">Jumlah Pinjaman</th>
          <th className="px-4 py-3">Sudah Bayar</th>
          <th className="px-4 py-3">Tenor (Bulan)</th>
          <th className="px-4 py-3">Status</th>
          <th className="px-4 py-3">Keterangan</th>
        </tr>
      </thead>
    </>
  );
};
