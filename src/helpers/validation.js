function isStartEndDate(val, meta) {
    const { req } = meta;
    if (Date.parse(req.body.startdate) > (Date.parse(val) - 120 * 60 * 1000))
      return false;
    return true;
}

module.exports = {
  isStartEndDate
}