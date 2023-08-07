import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerError";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this)

        //runs only if token changes, not initial 
        reaction(
            () => this.token, 
            token => {
                if(token){
                    localStorage.setItem('jwt', token)
                }else {
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError(error: ServerError){
        this.error = error
    }

    setToken = (token: string | null) => {
        this.token = token
    }

    setAppLoaded = () => {
        this.appLoaded = true
    }
}