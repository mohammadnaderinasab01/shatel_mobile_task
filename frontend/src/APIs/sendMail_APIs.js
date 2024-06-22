import { axiosGeneralInstance } from "./axios_config";


export async function getUserRelatedInformations(){
    try{
        const response = await axiosGeneralInstance.get('informations/get_user_related_informations/');
        return response;
    }catch(e){
        throw e;
    }
}

export async function sendMail(signal){
    try{
        if (!signal.aborted) {
            const response = await axiosGeneralInstance.get('informations/send_mail/', {signal: signal});
            return response;
        }else{
            return 'Stopped';
        }
    }catch(e){
        throw e;
    }
}