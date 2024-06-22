import { axiosGeneralInstance } from "./axios_config";


export async function uploadFile(data){
    console.log('data from api: ', data.upload_file)
    const formData = new FormData();
    formData.append('upload_file', data.upload_file);
    try{
        const response = await axiosGeneralInstance.post(
            'informations/upload_file/',
            data=formData
        );
        return response;
    }catch(e){
        throw e;
    }
}