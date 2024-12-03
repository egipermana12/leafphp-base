import axios from 'axios'


export const apiPinjaman = async (page, search) => {
    try{
        const response = await axios.get(`/pinjaman/apiPinjaman`, {
            params: { page, search }
    });
        if(response.status === 200){
            const {data} = response.data;
            return data;
        }
    }catch(error){
        console.error('Error get data', error);
        throw error;
    }
}
