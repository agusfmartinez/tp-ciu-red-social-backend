const transform = (_doc, ret) => {
  const { _id, __v, ...rest } = ret;
  return _id != null ? { id: _id, ...rest } : rest;
};

module.exports = transform;