/**
 */

import mongoose from 'mongoose';


const s3 = require('../util/aws-s3');
const { check, validationResult } = require('express-validator');

exports.getDashboard = function (req, res, next) {
  res.render('./admin/dashboard');
};
