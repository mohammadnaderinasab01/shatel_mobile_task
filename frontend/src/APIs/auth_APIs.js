import { axiosAuthInstance } from "./axios_config";


export async function login(data){
    try{
        const response = await axiosAuthInstance.post(
            'api/auth/login/',
            {email: data.email, password: data.password}
        );
        return response;
    }catch(e){
        throw e;
    }
}

export async function signup(data){
    try{
        const response = await axiosAuthInstance.post(
            'api/auth/register/',
            data
        );
        return response;
    }catch(e){
        throw e;
    }
}
