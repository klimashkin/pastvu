var auth = require('./auth.js'),
    Settings,
    User,
    step = require('step'),
    log4js = require('log4js'),
    appEnv = {};

module.exports.loadController = function (app, db, io) {
    var logger = log4js.getLogger("index.js");
    appEnv = app.get('appEnv');

    Settings = db.model('Settings');
    User = db.model('User');

    io.sockets.on('connection', function (socket) {
        var hs = socket.handshake;

        //hs.session.message = 'Thank you! Your registration is confirmed. Now you can enter using your username and password';
        if (hs.session.message) {
            socket.emit('initMessage', {init_message: hs.session.message});
            hs.session.message = null;
        }

        socket.on('giveGlobeParams', function (data) {
            var params = {
                ip: hs.address
            };
            step(
                function () {
                    Settings.find({}, this);
                },
                function (err, settings, user) {
                    var x = settings.length - 1;
                    do {
                        params[settings[x]['key']] = settings[x]['val'];
                    } while (x--);
                    params.user = hs.session.user;
                    this();
                },
                function () {
                    socket.emit('takeGlobeParams', params.extend({appHash: app.hash, domain: appEnv.domain, port: appEnv.port, uport: appEnv.uport}));
                }
            );
        });
    });


};