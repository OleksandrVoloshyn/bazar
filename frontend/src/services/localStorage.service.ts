const localStorageService = {
    getAccess: () => localStorage.getItem('access',),
    getRefresh: () => localStorage.getItem('refresh',),
    setAccess: (access: string) => localStorage.setItem('access', access),
    setRefresh: (refresh: string) => localStorage.setItem('refresh', refresh),
    logout: () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    }
}

export {localStorageService}