import { createContext, useContext } from "react"
import AppointmentStore from "./appointmentStore"
import CommonStore from "./commonStore"
import UserStore from "./userStore"
import ModalStore from "./modalStore"
import ProfileStore from "./profileStore"

interface Store{
    appointmentStore: AppointmentStore
    commonStore: CommonStore
    userStore: UserStore
    modalStore: ModalStore
    profileStore: ProfileStore
}

export const store : Store = {
    appointmentStore: new AppointmentStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

// create a simple react hook that allows us to use our stores inside our components
export function useStore() {
    return useContext(StoreContext)
} 