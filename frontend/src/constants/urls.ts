const baseURL = process.env.REACT_APP_API

const urls = {
    auth: '/auth',
    users: '/users',
    products: '/products'
}

const notFoundImage = 'https://lightwidget.com/wp-content/uploads/local-file-not-found.png'

export {baseURL, urls, notFoundImage}