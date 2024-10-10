import Layout from '@layout/Layout.jsx'
import { Pagination, InputSimple, ButtonSimple, SkeletonLoading, SimpleErrorText} from '@components/index.jsx'
import { Head, usePage, router } from '@inertiajs/react'
import React, { useState, useEffect, Suspense, lazy } from 'react'
import axios from 'axios';

const ModalSimple = lazy(() => import('@components/ModalSimple.jsx'))

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
          <th className="px-4 py-3">fullname</th>
          <th className="px-4 py-3">email</th>
        </tr>
      </thead>
    </>
  );
};

const TableBody = ({ data, current_page, per_page, onChange, isCheckedChild }) => {
  return (
    <>
      <Suspense fallback={<SkeletonLoading col="5" row="5" />}>
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
              <td className="px-4 py-3">{dt.username}</td>
              <td className="px-4 py-3">{dt.fullname}</td>
              <td className="px-4 py-3">{dt.email}</td>
            </tr>
          ))}
        </tbody>
      </Suspense>
    </>
  );
};

const User = () => {
  const { users } = usePage().props;
  const totalPage = users.pagination.last_page;
  const currentPage = users.pagination.current_page;
  const perPage = users.pagination.per_page;
  const range = 2;

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(users.users);
  }, [users.users]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [search, setSearch] = useState('');

  // modal state
  const [activeModal, setActiveModal] = useState(null);
  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  //state form
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }

  const handleCheckAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  }

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
    router.get('/user', { page, search });
  };

  const handleSearch = () => {}

   const refreshPage = () => {
    router.get('/user');
  }

  const resetForm = () => {
    setValues({})
    setErrors({})
  }

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user',  values );
      if(response.status === 200){
        alert("Data berhasil ditambah");
        resetForm();
        closeModal();
        refreshPage();
      }else{
        alert(response.data.message);
        resetForm();
        closeModal();
        refreshPage();
      }
    }catch(error){
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.log('Terjadi kesalahan pada server.');
      }
    }
  }

  const handleClickEdit = (e) => {
    openModal('edit');
  }

  const handleAccept = (e) => {
    if(values.id){
      closeModal();
    }else{
      saveData(e);
    }
  };

  const handleDecline = () => {
    closeModal();
    resetForm();
  };

  return (
    <>
      <Head title="User" />
      <div className="m-2 border boder-gray-200 rounded p-4">

      <Suspense fallback={<div>Loading...</div>}>
        {activeModal && (
          <ModalSimple
            isOpen={!!activeModal}
            onClose={closeModal}
            title={activeModal === 'edit' ? "Edit Form User" : "Form User"}
            acceptLabel="Save"
            declineLabel="Cancel"
            onAccept={handleAccept}
            onDecline={handleDecline}
          >
            <div className="flex flex-col w-full gap-y-4">
              <div>
                <label 
                  className="text-zinc-950 text-sm dark:text-white" 
                  htmlFor="username">Username</label>
                <InputSimple width="w-full" placeholder="username" value={values.username} onChange={handleInput} name="username" />
                {errors.username && <SimpleErrorText dataError={errors.username} />}
              </div>
              <div>
                <label 
                  className="text-zinc-950 text-sm dark:text-white" 
                  htmlFor="fullname">Fullname</label>
                  <InputSimple width="w-full" placeholder="fullname" value={values.fullname} onChange={handleInput} name="fullname" />
                  {errors.fullname && <SimpleErrorText dataError={errors.fullname} />}
              </div>
              <div>
                <label 
                  className="text-zinc-950 text-sm dark:text-white" 
                  htmlFor="email">Email</label>
                  <InputSimple type="email" width="w-full" placeholder="user@email.com" value={values.email} onChange={handleInput} name="email" />
                  {errors.email && <SimpleErrorText dataError={errors.email} />}
              </div>
              <div>
                <label 
                  className="text-zinc-950 text-sm dark:text-white" 
                  htmlFor="email">Password</label>
                  <InputSimple type="password" width="w-full" placeholder="********" value={values.password} onChange={handleInput} name="password" />
                  {errors.password && <SimpleErrorText dataError={errors.password} />}
              </div>
              <InputSimple width="w-full" type="hidden" placeholder="id user" value={values.id} onChange={handleInput} name="id" />
            </div>
        </ModalSimple>
        )}
        </Suspense>

        <div className="flex items-center justify-between">
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
              handleClick={() => openModal('add')} />
            <ButtonSimple 
              type="button" 
              text="Edit" 
              classCustom="border-slate-200 bg-gray-800 text-white hover:bg-gray-800 disabled:text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed "
              handleClick={handleClickEdit}
              disabled={isCheck.length !== 1} />
            <ButtonSimple 
              type="button" 
              text="Delete"
              classCustom="border-slate-200 bg-gray-800 text-white hover:bg-gray-800 disabled:text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed "
              handleClick={handleClickEdit}
              disabled={isCheck.length <= 0 } />
          </div>
        </div>
        
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
  )
}

User.layout = page => <Layout children={page} title="User" />

export default User;
