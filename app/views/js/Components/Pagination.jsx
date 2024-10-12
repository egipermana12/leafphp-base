import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = ({range, current_page, total_page, onPageChange}) => {

    const generatePageNumber = () => {
        const pageNumber = [];
        const startPage = Math.max(current_page - range, 1);
        const endPage = Math.min(current_page + range, total_page);

        for(let i = startPage; i <= endPage; i++) {
            pageNumber.push(
                <button 
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`min-h-[32px] min-w-8 flex justify-center items-center text-gray-800 py-1.5 px-2.5 text-sm rounded-lg focus:outline-none focus:bg-gray-300 ${i === current_page ? 'bg-black text-white hover:bg-black' : 'bg-gray-200 text-gray-900'} `}
                    disabled={i === current_page}
                    >
                    {i}        
                </button>
            );
        }

        return pageNumber;
    }

    return (
    <>
        <div>
            <nav className="flex items-center gap-x-1" aria-label="Pagination">
                <button 
                    onClick={() => onPageChange(current_page - 1)}
                    className="min-h-[32px] min-w-8 py-1.5 px-2 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={current_page === 1}
                    >
                    <BiChevronLeft size={24} />
                </button>
                
                {/* Tombol pertama jika halaman terlalu jauh */}
                {current_page - range > 1 && (
                    <>
                        <button 
                            onClick={() => onPageChange(1)}
                            className={`min-h-[32px] min-w-8 flex justify-center items-center bg-gray-200 text-gray-800 py-1.5 px-2.5 text-sm rounded-lg focus:outline-none focus:bg-gray-300`}>1</button>
                        {current_page - range > 2 && <span className="min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-blue-600 p-1 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 ">...</span>}
                    </>
                )}

                {generatePageNumber()}

                {/* Tombol terakhir jika halaman terlalu jauh */}

                {current_page + range < total_page && (
                    <>
                        {current_page + range < total_page - 1 && <span className="min-h-[32px] min-w-8 flex justify-center items-center text-gray-400 hover:text-blue-600 p-1 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 ">...</span>}
                        <button 
                            onClick={() => onPageChange(total_page)}
                            className={`min-h-[32px] min-w-8 flex justify-center items-center bg-gray-200 text-gray-800 py-1.5 px-2.5 text-sm rounded-lg focus:outline-none focus:bg-gray-300`}>{total_page}</button>
                    </>
                )}

                <button 
                    onClick={() => onPageChange(current_page + 1)}
                    className="min-h-[32px] min-w-8 py-1.5 px-2 inline-flex jusify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                    disabled={current_page === total_page}
                    >
                    <BiChevronRight size={24} />
                </button>
            </nav>
        </div>
    </>
    )
}

export default Pagination;
