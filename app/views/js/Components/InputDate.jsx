import React, { useState, useEffect, useRef } from 'react';
import { BiCalendarAlt } from "react-icons/bi";
import { id } from 'date-fns/locale';
import { format } from 'date-fns';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const InputDate = (props) => {
    const {value, width, name} = props;
    const [date, setDate] = useState(value);
    const [isShowed, setIsShowed] = useState(false);
    const refDate = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    const handleClickOutside = (e) => {
        if(refDate && !refDate.current.contains(e.target)){
            setIsShowed(false);
        }
    }

    const check = focus => {
        focus.indexOf(1) < 0 && setIsShowed(false);
    };

    const handleDate = date => {
        setDate(date);
        setIsShowed(false);
    }

     const formattedDate = format(date, 'dd/MM/yyyy', { locale: id });

    return (
        <>
           <div
                ref={refDate}
                className = "relative"
           >
               <div 
                    className = {`relative ${width} `}
               >
                   <input 
                    readOnly
                    type="text"
                    value={formattedDate}
                    name={name}
                    className="py-2 px-3 w-full bg-gray-50 border-slate-400 rounded-lg text-sm focus:border-black focus:ring-black disabled:opacity-50 disabled:pointer-events-none"
                    onClick = {() => setIsShowed(!isShowed)}
                   />
                   <div className="absolute inset-y-0 end-0 flex items-center pe-3 text-xl">
                        <BiCalendarAlt />
                   </div>

               </div>
               {isShowed && (
                    <div className="absolute z-50">
                       <Calendar
                            value={formattedDate}
                            date={date}
                            onChange={handleDate}
                            locale={id} // Set Indonesian locale
                        />
                    </div>
                )}
           </div>
        </>
    )
}

export default InputDate
