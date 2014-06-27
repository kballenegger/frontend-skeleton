var request =   require('superagent');
var crypo =     require('crypto');
var JSONbig =   require('json-bigint');
var cortex =    require('./cortex.js');

// HTTP base URL comes from the environment variable API_BASE.
var httpBase = process.env.API_BASE;
//var app = BigNumber(process.env.APP_ID);
var app;
var appSecret = process.env.APP_SECRET;

//tmp
httpBase = 'https://api.freshpay.com'
app = 'freshpay-web';
appSecret = '90a44685a06c31facdb1bb7ec610d89a7a37b0f1';

var apiRequest = (function() {
    var http = function (method, path) {
        var x = request[method](httpBase + path)
            .type('json').accept('json');
        token = cortex.session.auth.val();
        if (token) x = x.set('FreshPay-Authentication', token);
        return x;
    };
    return {
        get:        function(p) { return http('get',    p); },
        post:       function(p) { return http('post',   p); },
        patch:      function(p) { return http('patch',  p); },
        put:        function(p) { return http('put',    p); },
        'delete':   function(p) { return http('delete', p); },
    };
}());


// This is a wrapper function for the superagent `end` function, which will
// parse the body with JSONbig instead of JSON.
//
var end = function (callback) {
    return function(res) {
        if (res.type === 'application/json') {
            res.body = JSONbig.parse(res.text);
        }
        return callback(res);
    };
};


var API = {};

API.Auth = {
    login: function (email, password) {
        var hmac = crypo.createHmac('sha256', appSecret)
            .update(email)
            .digest('base64');
        var payload = JSONbig.stringify({
            email: email,
            password: password,
            app: app,
            mac: hmac,
        });
        apiRequest.post('/auth/login')
            .send(payload)
            .end(end(function (res) {
                console.log(res.body);
            }));
    },
};

module.exports = API;
