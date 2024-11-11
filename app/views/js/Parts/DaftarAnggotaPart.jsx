import { Pagination, InputSimple, ButtonSimple, SkeletonLoading} from '@components/index.jsx';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import {apiAnggota, apiGetAnggota} from '@services/AnggotaServices'

const DaftarAnggotaPart = ({onSelect}) => {
    
    const [anggota, setAnggota] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [search, setSearch] = useState('');

    const fetchAnggota = async (page = 1, searchQuery = '') => {
        try{
            const response = await apiAnggota(page, searchQuery);
            setAnggota(response.anggota);
            setPagination(response.pagination);
            setSearch(response.searchQuery);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAnggota(1, search)
    }, [])

    const totalPage = pagination.last_page;
    const currentPage = pagination.current_page;
    const perPage = pagination.per_page;
    const range = 2;

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const handleCheckAll = (e) => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(anggota.map(li => li.id));
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
        fetchAnggota(1, search);
    }

    const handlePageChange = (page) => {
        fetchAnggota(page, search);
    }


    const handlePilih = () => {
      const id = isCheck[0];
      onSelect(id);
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
                    <ButtonSimple 
                      type="button" 
                      text="Pilih" 
                      classCustom="border-gray-800 bg-gray-800 text-white hover:bg-gray-800 disabled:text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed" 
                      handleClick={handlePilih}
                      disabled={isCheck.length !== 1}
                        />
                </div>
            </div>
            <table className="text-sm text-left text-gray-500 w-full">
                <Tableheader 
                    checkAll={isCheckAll}
                    isOnChange={handleCheckAll}
                />
                <TableBody 
                    data={anggota}
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

export default DaftarAnggotaPart;


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
