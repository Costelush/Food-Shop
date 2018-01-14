const esService = require('../services/esService'),
    esConst = require('../utils/esConstants.json');

exports.logIn = function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let q = esConst.EMAIL_FIELD + esConst.ES_EQUALS + username +
        esConst.SPACE + esConst.AND_OPERRATOR + esConst.SPACE +
        esConst.PASSWORD_FIELD + esConst.ES_EQUALS + password;

    esService.searchUsers(q)
        .then((response, e) => {
            if (e) {
                console.error(e);
                res.status(500).json(error);
            } else if (response.hits.hits.length == 1) {
                req.session.user = response.hits.hits[0]._source;
                res.status(200).send("Log in successful");
            } else res.status(401).send("Log in failed. Username or password is incorrect.");
        });
};

exports.logOut = function (req, res) {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
    }

    res.status(200).send("Log out successful");
};

exports.profile = function (req, res) {
    res.status(200).json({
        uid: req.session.user.uid,
        name: req.session.user.name,
        email: req.session.user.email,
        created: req.session.user.created,
    });
};