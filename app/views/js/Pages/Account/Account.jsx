import Layout from '@layout/Layout.jsx';
import { Pagination, InputSimple, ButtonSimple, SkeletonLoading, SimpleErrorText} from '@components/index.jsx';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';

const ModalSimple = lazy(() => import('@components/ModalSimple.jsx'));

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
  const { posts, searchQuery } = usePage().props;
  const totalPage = posts.pagination.last_page;
  const currentPage = posts.pagination.current_page;
  const perPage = posts.pagination.per_page;
  const range = 2;

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(posts.posts);
  }, [posts.posts]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [search, setSearch] = useState(posts.searchQuery || '');

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

  const refreshPage = () => {
    router.get('/account');
  }

  const [activeModal, setActiveModal] = useState(null);
  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }))
  }

  const resetForm = () => {
    setValues({})
    setErrors({})
  }

  const saveData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/account',  values );
      if(response.status === 200){
        alert(response.data.message);
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
        setMessage('Terjadi kesalahan pada server.');
      }
    }
  }

  const updateData = async (e) => {
    e.preventDefault();
    try {
      let id = parseInt(isCheck[0]);
      const response = await axios.put(`/account/${id}`,  values );
      if(response.status === 200){
        alert(response.data.message);
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
        setMessage('Terjadi kesalahan pada server.');
      }
    }
  }

  const getDataEdit = async (e) => {
    try{
      let id = parseInt(isCheck[0]);
      const res = await axios.get(`/account/${id}`);
      setValues(res.data.data);
    }catch(error){
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else {
        setMessage('Terjadi kesalahan pada server.');
      }
    }
  }

  const deleteData = async (e) => {
    try{
      let ids = {ids : isCheck};
      const res = await axios.delete('/account/', {params: ids});
      if(res.status === 200){
        alert(res.data.message);
        refreshPage();
      }else{
        alert(res.data.message);
        refreshPage();
      }
    }catch(error){
      if (error.res && error.res.status === 400) {
        setErrors(error.res.data.errors);
      } else {
        setMessage('Terjadi kesalahan pada server.');
      }
    }
  }

  const handleAccept = (e) => {
    if(values.id){
      updateData(e);
    }else{
      saveData(e);
    }
  };

  const handleDecline = () => {
    closeModal();
    resetForm();
  };

  const handleClickEdit = (e) => {
    openModal('edit');
    getDataEdit();
  }

  const handleDelete = (e) => {
    if(confirm("Yakin hapus data ?") === true){
      deleteData();
    }else{
      return false;
    }
  }

  return (
    <>
      <Head title="Account" />
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
            <InputSimple placeholder="nama user" value={values.user} onChange={handleInput} name="user" />
            {errors.user && <SimpleErrorText dataError={errors.user} />}
            <InputSimple type="hidden" placeholder="id user" value={values.id} onChange={handleInput} name="id" />
        </ModalSimple>
        )}
        </Suspense>

        <div className="flex items-center justify-between">

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

          <div className="flex items-center gap-x-1">
            <ButtonSimple 
              type="button" 
              text="Tambah" 
              classCustom="border-blue-500 bg-blue-500 text-white hover:bg-blue-700" 
              handleClick={() => openModal('add')} />
            <ButtonSimple 
              type="button" 
              text="Edit" 
              classCustom="border-blue-50 bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:bg-blue-50 disabled:cursor-not-allowed "
              handleClick={handleClickEdit}
              disabled={isCheck.length !== 1} />
            <ButtonSimple 
              type="button" 
              text="Delete"
              classCustom="border-gray-50 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed "
              handleClick={handleDelete}
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
  );
};

Account.layout = (page) => <Layout children={page} title="Account" />;

export default Account;
