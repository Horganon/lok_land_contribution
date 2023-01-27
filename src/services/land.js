import http from './http-common';

const getById = (id, date_start, date_end) => {
    return http.get(`stat/land/contribution?landId=${id}&from=${date_start}&to=${date_end}`)
}

export default {
    getById
}