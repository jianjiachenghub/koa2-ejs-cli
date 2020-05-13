const {DEFAULT_PICTURE} = require('../utils/enum')

function _formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

exports.formatUser = function (list){
    if(!list)return list
    if(Array.isArray(list)){
        return list.map(_formatUserPicture)
    }else{
        return _formatUserPicture(list)
    }

}