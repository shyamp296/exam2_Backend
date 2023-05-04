require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user.js");

// POST LOGIN
exports.postLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    User.findOne({ email: email })
      .then((ress) => {
        if (ress.email == email && ress.password == password) {
          const token = jwt.sign({ id: ress._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.JWT_EXPIRE,
          });

          res.status(200).json({
            statusCode: 200,
            statusMessage: "OK",
            result: {
              success: "Login successful!",
            },
            data: {
              token: token,
            },
          });
        }
      })
      .catch((err) => {
        res.status(401).json({
          statusCode: 401,
          statusMessage: "Unauthorized",
          result: {
            error: "Login not successful!",
          },
        });
      });
  } catch (error) {
    return res.status(404).json({
      statusCode: 404,
      statusMessage: "Not Found",
      result: {
        error: error.message,
      },
    });
  }
};

// POST REGISTER
exports.postRegister = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      phone_no,
      role,
      email,
      password,
      dob,
      gender,
      country,
      confirm_password,
      state,
      city,
      address,
      qualification,
      skills,
    } = req.body;
      console.log(req.body);

    if (password == confirm_password) {
      const user = await User.findOne({ email: email });
      if (user) {
        const error = new Error(`${user.email} already exists!`);
        error.statusCode = 403;
        error.statusMessage = "Forbidden";
        throw error;
      } else {
        const userData = new User({
          firstName,
          lastName,
          userName,
          phone_no,
          role,
          email,
          password,
          dob,
          gender,
          country,
          state,
          city,
          address,
          qualification,
          skills,
        });

        await userData
          .save()
          .then((result) => {
            console.log(result);
            res.status(200).json({
              statusCode: 200,
              statusMessage: "OK",
              result: {
                success: "Registration successful",
              },
            });
          })
          .catch((error) => {
            return res.status(400).json({
              statusCode: 400,
              statusMessage: "Bad Request",
              result: {
                error: "Missing Parameter!",
              },
            });
          });
      }
    } else {
      const error = new Error(`Password does not match!`);
      error.statusCode = 401;
      error.statusMessage = "Unauthorized";
      throw error;
    }
  } catch (e) {
    if (e) {
      return res.status(e.statusCode).json({
        statusCode: e.statusCode,
        statusMessage: e.statusMessage,
        result: {
          error: e.message,
        },
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "Not Found",
        result: {
          error: e.message,
        },
      });
    }
  }
};

// dashbord Fecthing data 

exports.dashboard = async (req, res, next) => {
    User.find().then((result) => {
        res.status(200).json({
            statusCode: 200,
            statusMessage: "data fetch sucessfully",
            result: {
                       data : result 
            },
        })  
    })
}
