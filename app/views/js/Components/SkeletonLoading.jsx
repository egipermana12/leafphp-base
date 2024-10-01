const SkeletonLoading = ({col = "1", row = "5"}) => {

    const Rows = () => {
        const rowsArray = [];
        for (let i = 1; i <= row; i++) {
            rowsArray.push(
                <tr key={i}>
                    <td colSpan={col} className="animate-pulse py-2">
                        <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </td>
                </tr>
            );
        }
        return rowsArray;
    }

    return (
        <tbody>
            <Rows />
        </tbody>
    )
}

export default SkeletonLoading;
