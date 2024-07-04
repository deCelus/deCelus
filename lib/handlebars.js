// src/lib/handlebars.js

const timeago = require('timeago.js').format;

const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeago(savedTimestamp);
};

helpers.getFirstImage = (imageLinks) => {
    return imageLinks && imageLinks.length > 0 ? imageLinks[0] : '';
};

module.exports = helpers;
