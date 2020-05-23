const s3 = require('../util/aws-s3');

exports.getHome = async function (req, res, next) {

  res.render('./guest/index', { section: 'shop' })

}

