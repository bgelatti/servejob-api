function getall(req, res) {
    var all = [
        {
            "name": "Felipe"
        },
        {
            "name": "Gellati"
        }
    ];

    res.send(all);
}

exports.getall = getall;