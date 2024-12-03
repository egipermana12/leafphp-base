const BadgeSimple = ({status}) => {
    let BgColor = 'bg-gray-100 text-gray-800';

    if(status === 'disetujui')
    {
        BgColor = 'bg-indigo-100 text-indigo-800';
    }else if(status === 'ditolak'){
        BgColor = 'bg-red-100 text-red-800';
    }else if(status === 'lunas'){
        BgColor = 'bg-green-100 text-green-800';
    }else if(status === 'belum_lunas'){
        BgColor = 'bg-yellow-100 text-yellow-800';
    }

    return (
        <>
            <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded ${BgColor}`}>
                {status}
            </span>
        </>
    )

}

export default BadgeSimple
