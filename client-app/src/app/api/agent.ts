import axios, { AxiosError, AxiosResponse } from 'axios';
import { Appointment, AppointmentFormValues } from '../models/Appointment';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/User';
import { Photo, Profile } from '../models/Profile';


const sleep = (delay: number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(config => {
    const token = store.commonStore.token
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse
    switch (status) {
        case 400:
            
            if(data.errors){
                const modalStateErrors = []
                for (const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat()
            }else{
                toast.error(data)
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found')
            }
            break;
        case 401:
            toast.error('unauthorized')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('not-found')
            break;
        case 500:
            store.commonStore.setServerError(data)
            router.navigate('/server-error')
            break;
        default:
            break;
    }
    return Promise.reject(error)
})

//generic Type
const responseBody = <T> (response : AxiosResponse<T> ) => response.data

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body : {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Appointments = {
    list: () => requests.get<Appointment[]>('/appointments'),
    details: (id: string) => requests.get<Appointment>(`/appointments/${id}`),
    create: (appointment: AppointmentFormValues) => requests.post<void>('/appointments',appointment),
    update: (appointment: AppointmentFormValues) => requests.put<void>(`/appointments/${appointment.id}`,appointment),
    delete: (id: string) => requests.del<void>(`/appointments/${id}`),
    attend: (id: string) => requests.post<void>(`/appointments/${id}/attend`, {})
}

const Account = {
    currentUser: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('account/register', user)
}

const Profiles = {
    get: (username:string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData()
        formData.append('File', file)
            return axios.post<Photo>('photos', formData, {
                headers: {'Content-Type': 'Content-Type'}
            })
    }
}

const agent ={
    Appointments,
    Account,
    Profiles
}

export default agent;