const axios = require('axios');

export const search = (wd) => {
    return axios.get(`https://api.okzy.tv/api.php/provide/vod/at/json/?wd=${wd}`)
}

export const getList = (pg) => {
    return axios.get(`https://api.okzy.tv/api.php/provide/vod/at/json/?ac=list&pg=${pg}`)
}

export const getDetail = (ids) => {
    return axios.get(`https://api.okzy.tv/api.php/provide/vod/at/json/?ac=detail&ids=${ids}`)
} 