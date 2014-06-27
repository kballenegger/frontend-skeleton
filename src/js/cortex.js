// Data layer
//
var Cortex = require('cortexjs');
var cortex = module.exports = new Cortex({
    comments: [
        {id: 1, author: "Brandon Goldman", text: "I am Brandon!"},
        {id: 2, author: "George Burke", text: "I am George!"},
        {id: 3, author: "George Burke", text: "I am George!"},
        {id: 4, author: "Kenneth Ballenegger", text: "I am **Kenneth**!"}
    ],
    prefs: {prefix: 'Author: '},
    session: {
        user: {},
        auth: null,
    }
});
