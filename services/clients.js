var validator = require('validator');

function getall(req, res) {
    var all = [
        {
            "name": "Felipe"
        },
        {
            "name": "Gellati",
            "mail": "bozo@cor"
        }
    ];

    if (validator.isEmail(all[1].mail)) {
        console.log('email valido');
    }

    DB.collection('nomes').insert(all, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('OK');
        }
    });
}

exports.getall = getall;