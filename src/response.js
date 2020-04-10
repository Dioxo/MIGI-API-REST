/**
 * Handles all response to user from given query
 * @module response
 */

/**
 * Function that handles success' response from query
 * @param {Object} res       The response object
 * @param {*} message   Message
 * @param {number} [status=200]    HTTP Status Code
 */
exports.success = function(res,message, status) {
    res.status(status || 200)
        .send({
            error: '',
            body: message,
          });
  };

/**
 * Function that handles error's response from query
 * @param {Object} res       The response object
 * @param {*} message   Message
 * @param {number} [status=500]    HTTP Status Code
 */
exports.error  = function(res,message, status) {
    res
        .status(status || 500)
        .send({
            error: message,
            body: '',
          });
  };
