import Layout from '@layout/Layout.jsx';
import { Pagination, InputSimple, ButtonSimple, SkeletonLoading } from '@components/index.jsx';
import React, { useState, useEffect, Suspense } from 'react';
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
          <th className="px-4 py-3">Username</th>
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
              <td className="px-4 py-3">{dt.user}</td>
            </tr>
          ))}
        </tbody>
      </Suspense>
    </>
  );
};

const Account = () => {
  const { data, searchQuery } = usePage().props;
  const totalPage = data.pagination.last_page;
  const currentPage = data.pagination.current_page;
  const perPage = data.pagination.per_page;
  const range = 2;

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(data.data);
  }, [data.data]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [search, setSearch] = useState(data.searchQuery || '');

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

  // console.log(isCheck);

  const handlePageChange = (page) => {
    router.get('/account', { page, search });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.get('/account', { search });
  };

  return (
    <>
      <Head title="Account" />
      <div className="m-2 border boder-gray-200 rounded p-4">
        {/*form cari*/}
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
        <table className="text-sm text-left text-gray-500 w-full">
          <Tableheader 
            checkAll={isCheckAll} 
            isOnChange={handleCheckAll} />
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
  );
};

Account.layout = (page) => <Layout children={page} title="Account" />;

export default Account;
