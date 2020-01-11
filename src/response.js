exports.success = function(res,message, status) {
    res.status(status || 200)
        .send({
            error: '',
            body: message,
          });
  };

exports.error  = function(res,message, status) {
    res
        .status(status || 500)
        .send({
            error: message,
            body: '',
          });
  };
