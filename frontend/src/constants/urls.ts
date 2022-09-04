const baseURL = process.env.REACT_APP_API

const urls = {
    auth: '/auth',
    users: '/users',
    products: '/products'
}

const notFoundImage = 'https://cdn2.iconfinder.com/data/icons/documents-and-files-v-2/100/doc-03-512.png'

export {baseURL, urls, notFoundImage}