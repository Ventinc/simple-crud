function asyncHandler(handler) {
  return (...args) => {
    const handlerReturn = handler(...args);
    const next = args[args.length - 1];
    return Promise.resolve(handlerReturn).catch(next);
  };
}

module.exports = asyncHandler;
