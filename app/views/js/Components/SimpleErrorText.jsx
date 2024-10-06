const SimpleErrorText = ({dataError}) => {
    return (
        <>
        {dataError.map((dt,index) => (
            <p key={index} className="text-xs text-red-600"><span className="font-medium">Oops!</span> {dt}</p>
            ))}
        </>
        )
}

export default SimpleErrorText;
