import { Pagination, InputSimple, ButtonSimple, SkeletonLoading, SimpleAlert, SelectSimple} from '@components/index.jsx';
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
          <th className="px-4 py-3">NIK / Nama Anggota</th>
          <th className="px-4 py-3">Jumlah Simpanan</th>
          <th className="px-4 py-3">Jenis Simpanan</th>
          <th className="px-4 py-3">Keterangan</th>
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
              <td className="px-4 py-3">{dt.nik} <br /> {dt.nama}</td>
              <td className="px-4 py-3">{dt.harga}</td>
              <td className="px-4 py-3">{dt.jenis_simpanan == 'wajib' ? <span className="text-blue-600 font-semibold">{dt.jenis_simpanan}</span> : <span className="text-green-600 font-semibold">{dt.jenis_simpanan}</span>}</td>
              <td className="px-4 py-3">{dt.ket}</td>
            </tr>
          ))}
        </tbody>
      </Suspense>
    </>
  );
};


const DaftarSimpanan = ({simpanan}) => {
    const totalPage = simpanan.pagination.last_page;
    const totalData = simpanan.pagination.total;
    const currentPage = simpanan.pagination.current_page;
    const perPage = simpanan.pagination.per_page;
    const range = 2;

    const [list, setList] = useState([]);

    useEffect(() => {
        setList(simpanan.simpanan);
    }, [simpanan.simpanan]);

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [search, setSearch] = useState(simpanan.searchQuery || '');

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
        router.get('/simpanan', { page, search, selectPinjamanType });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/simpanan', { search,  selectPinjamanType});
    };

    const handleTambah = (e) => {
      router.visit('/simpanan/create');
    }

    const handleEdit = (e) => {
      let id = isCheck[0];
      router.visit(`/simpanan/edit/${id}`);
    }

    const [pinjamanType, setPinjamanType] = useState([]);
    const [selectPinjamanType, setSelectPinjamanType] = useState(simpanan.searchType || '');

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
            <div className="flex items-center justify-between mb-4">
                <form onSubmit={handleSearch}>
                    <div className="flex items-center gap-x-2">
                      <InputSimple
                        placeholder="cari user"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <SelectSimple 
                        jenisSelect="simple"
                        value={selectPinjamanType}
                        setValue={setSelectPinjamanType}
                        onChange={handleSelectPinjamanType}
                        data={pinjamanType}
                        textAtas="Pilih Tipe"
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
        </>
    )
}

export default DaftarSimpanan
