import axios from 'axios'

export const getKabupatenService = async () => {
    try{
        const response = await axios.get(`/wilayah/kab`);
        if(response.status === 200){
            return response.data.data;
        }else{
            return [];
        }
    }catch(error){
        console.error('Error get data', error);
        throw error;
    }
}


export const getKecamatanService = async (kd_kota) => {
    const split = kd_kota.split(".");
    const params = split[0];
    try{
        const response = await axios.get(`/wilayah/kec/${params}`);
        if(response.status === 200){
            return response.data.data;
        }else{
            return [];
        }
    }catch(error){
        console.error('Error get data', error);
        throw error;
    }
}

export const getKelurahanService = async (kd_kec) => {
    const split = kd_kec.split(".");
    const kd_kota = split[0];
    const kd_kec2 = split[1];
    try{
        const response = await axios.get(`/wilayah/kel/${kd_kota}/${kd_kec2}`);
        if(response.status === 200){
            return response.data.data;
        }else{
            return [];
        }
    }catch(error){
        console.error('Error get data', error);
        throw error;
    }
}
