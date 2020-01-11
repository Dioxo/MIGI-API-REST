const store = require('./store');

function getTags(idUser) {
    return store.getTags(idUser);
}

module.exports = {
    getTags
};