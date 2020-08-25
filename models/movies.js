const Realm = require('realm');
const Movies = {
    name: 'Movies',
    primaryKey: 'vod_id',
    properties: {
        vod_id: 'int',
        vod_name: 'string',
        vod_en: 'string', // 英文缩写
        vod_actor: 'string', // 演员
        vod_time: 'string', // 播放时间
        vod_remarks: 'string', // 备注
        vod_play_from: 'string', // 来源
        vod_blurb: 'string', // 简介
        vod_content: 'string', // 内容简介
        vod_area: 'string', // 国家
        vod_year: 'string', // 年份
        vod_lang: 'string', // 语言
        vod_play_url: 'string', // 播放地址
        vod_pic: 'string',// 封面地址
        type_id: 'int',// 分类id
        type_name: 'string'// 分类名称
    }
}

// let cars = realm.objects('Movies')
// cars.forEach(c => {
//     console.log(c.vod_name);
// })

export default new Realm({ schema: [Movies] })