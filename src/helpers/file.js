function fileFilter (req, file, cb) {
  if (file.mimetype !== ('image/png' || 'image/jpg')) {
    req.fileValidationError = 'goes wrong on the mimetype';
    return cb(null, false, new Error('goes wrong on the mimetype'));
  }
  cb(null, true);
 }

module.exports = {
  fileFilter
}
