function fileFilter (req, file, cb) {
  if (file.mimetype.match('image/png') || file.mimetype.match('image/jpeg'))
    return cb(null, true); 
  req.fileValidationError = 'goes wrong on the mimetype';
  cb(null, false, new Error('goes wrong on the mimetype'));
 }

module.exports = {
  fileFilter
}
