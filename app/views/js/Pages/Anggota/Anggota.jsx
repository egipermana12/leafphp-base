import Layout from '@layout/Layout.jsx';
import { Pagination, InputSimple, ButtonSimple, SkeletonLoading, SimpleAlert} from '@components/index.jsx';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Head, router, usePage } from '@inertiajs/react';

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
          <th className="px-4 py-3">NIK</th>
          <th className="px-4 py-3">Nama Anggota</th>
          <th className="px-4 py-3">Alamat</th>
          <th className="px-4 py-3">Tanggal Anggota</th>
          <th className="px-4 py-3">Status</th>
        </tr>
      </thead>
    </>
  );
};

const TableBody = ({ data, current_page, per_page, onChange, isCheckedChild }) => {
  return (
    <>
      <Suspense fallback={<SkeletonLoading col="3" row="5" />}>
        <tbody>
          {data.map((dt, index) => (
            <tr key={dt.id} className="border-b">
              <td className="text-center">
                {((current_page - 1) * per_page) + index + 1}
              </td>
              <td className="text-center">
                <input
                  id={dt.id.toString()}
                  type="checkbox"
                  value={dt.id}
                  onChange={(e) => onChange(e)}
                  checked={isCheckedChild.includes(dt.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </td>
              <td className="px-4 py-3">{dt.nik}</td>
              <td className="px-4 py-3">{dt.nama}</td>
              <td className="px-4 py-3">{dt.alamat}</td>
              <td className="px-4 py-3">{dt.tgl_gabung}</td>
              <td className="px-4 py-3">{dt.status_anggota}</td>
            </tr>
          ))}
        </tbody>
      </Suspense>
    </>
  );
};

const Anggota = () => {
    
    const { anggota, flash } = usePage().props;
    const totalPage = anggota.pagination.last_page;
    const currentPage = anggota.pagination.current_page;
    const perPage = anggota.pagination.per_page;
    const range = 2;
    const [showAlert, setShowAlert] = useState(false)

    const [list, setList] = useState([]);

    useEffect(() => {
        setList(anggota.anggota);
    }, [anggota.anggota]);

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [search, setSearch] = useState(anggota.searchQuery || '');

    const handleCheckAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(list.map(li => li.id));
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

    const handlePageChange = (page) => {
        router.get('/anggota', { page, search });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/anggota', { search });
    };

    const handleTambah = (e) => {
      router.visit('/anggota/create');
    }

    const handleEdit = (e) => {
      let id = parseInt(isCheck[0]);
      router.visit(`/anggota/edit/${id}`);
    }

    return (
        <>
           <Head title="Anggota" />
            <div className="m-2 border boder-gray-200 rounded p-4">
                <SimpleAlert />
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
                      handleClick={handleEdit}
                      />
                    <ButtonSimple 
                      type="button" 
                      text="Delete"
                      classCustom="border-slate-200 bg-gray-800 text-white hover:bg-gray-800 disabled:text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed "
                      disabled={isCheck.length <= 0 }
                      />
                  </div>
                </div>

                <table className="text-sm text-left text-gray-500 w-full">
                    <Tableheader 
                        checkAll={isCheckAll}
                        isOnChange={handleCheckAll}
                    />
                    <TableBody 
                        data={list}
                        current_page={currentPage}
                        per_page={perPage}
                        onChange={handleChecked}
                        isCheckedChild={isCheck}
                    />
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

            </div>
        </>
    )
}

Anggota.layout = (page) => <Layout children={page} title="Anggota" />;

export default Anggota;
