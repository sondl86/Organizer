import { createContext, useContext } from "react"
import AppointmentStore from "./appointmentStore"

interface Store{
    appointmentStore: AppointmentStore
}

export const store : Store = {
    appointmentStore: new AppointmentStore()
}

export const StoreContext = createContext(store);

// create a simple react hook that allows us to use our stores inside our components
export function useStore() {
    return useContext(StoreContext)
}