const express = require('express');
const router = express.Router();

module.exports = (passport) => {
  /**
   * @api {post} / Authenticate user
   * @apiName authenticate-user
   * @apiGroup Users
   *
   * @apiDescription Endpoint for user authentication.
   *
   *
   * @apiHeader {String} Content-type  application/x-www-form-urlencoded
   *
   * @apiParamExample Request-Example
   *
   * username=user&password=password
   *
   * @apiSuccessExample Success-Response:
   *    302 Redirect to index
   *
   * @apiErrorExample Error-Response:
   *    302 Redirect back to login
   */
  return router.post(
    '/',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  );
};
