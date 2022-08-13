import {bool} from "joi";

const localStorageService = {
    getAccess: () => localStorage.getItem('access',),
    getRefresh: () => localStorage.getItem('refresh',),
    setAccess: (access: string) => localStorage.setItem('access', access),
    setRefresh: (refresh: string) => localStorage.setItem('refresh', refresh),
    setCandidateForRecovery: () => localStorage.setItem('doRecovery', 'true'),
    getDoRecovery: () => !!localStorage.getItem('doRecovery'),
    logout: () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    }
}

export {localStorageService}