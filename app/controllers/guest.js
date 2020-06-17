const s3 = require('../util/aws-s3');

exports.getHome = async function (req, res, next) {

  res.render('./index', { section: 'shop' })

}

exports.getCV = async function (req, res, next) {



  try {

    const fileName = 'cv.docx';
    const file = await s3.getFile(`${fileName}`);
    const data = file.Body
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${fileName}`,
      'Content-Length': data.length
    });
    res.end(data);
  } catch (err) {
    next(err)
  }
}
