function getall(req, res) {
    var all = [
        {
            "name": "Felipe"
        },
        {
            "name": "Gellati"
        }
    ];

    DB.collection('nomes').insert(all, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('OK');
        }
    });
}

exports.getall = getall;