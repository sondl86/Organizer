import axios, { AxiosResponse } from 'axios';
import { Appointment } from '../models/Appointment';


const sleep = (delay: number) =>{
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
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
    details: (id: string) => requests.get<Appointment>(`appointments/${id}`),
    create: (appointment: Appointment) => requests.post<void>('appointments',appointment),
    update: (appointment: Appointment) => requests.put<void>(`appointments/${appointment.id}`,appointment),
    delete: (id: string) => requests.del<void>(`appointments/${id}`)
}

const agent ={
    Appointments
}

export default agent;