import { createContext, useContext } from "react"
import AppointmentStore from "./appointmentStore"
import CommonStore from "./commonStore"

interface Store{
    appointmentStore: AppointmentStore
    commonStore: CommonStore
}

export const store : Store = {
    appointmentStore: new AppointmentStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

// create a simple react hook that allows us to use our stores inside our components
export function useStore() {
    return useContext(StoreContext)
}