const Student = require("../models/User");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const Marksheet = require("../models/Marksheet");

// For student login
exports.login = (req, res) => {
  let { studentID } = req.body;
  Student.findOne({ studentID: studentID })
    .then((student) => {
      console.info(`Successfully logged in`);
      if (studentID === student.studentID) {
        const token = JWT.sign(
          {
            studentID: student.studentID,
          },
          "Celebal Technologies",
          {
            expiresIn: "1h",
          }
        );
        console.info("Logged in successfully");
        return res.status(200).send(token);
      }
      console.warn("No user found. Enter correct details.");
      return res.status(401).send("User not found. Enter a valid student ID");
    })
    .catch((error) => {
      console.error(" User not found. Please try again");
      return res.status(404).send("User not found. Please try again");
    });
};

//To show student details
exports.studentDetails = (req, res, next) => {
  const decodedToken = JWT.verify(req.headers.token, "Celebal Technologies");
  let studentID = decodedToken.studentID;

  Student.findOne({ studentID })
    .then((student) => {
      if (student) {
        console.info(`Student with id: ${studentID} was found`);

        //For transferring data to other function
        res.locals.student = student;

        return next(); // It is mandatory to return this.
      }

      console.log(`Student with id: ${studentID} was not found`);
      return res.status(404).send("Not found");
    })
    .catch(() => {
      console.error("Something went wrong");
      return res.status(500).send("Something went wrong");
    });
};
//To show student marksheet
exports.studentMarksheet = (req, res) => {
  const decodedToken = JWT.verify(req.headers.token, "Celebal Technologies");
  let studentID = decodedToken.studentID;

  Marksheet.findOne({ studentID: studentID })
    .then((marksheet) => {
      if (marksheet) {
        console.info("Marksheet found");
        let { student } = res.locals;
        return res.status(200).send([student, marksheet]);
      }

      console.log("Something went wrong");
      return res.status(404).send("Something went wrong");
    })
    .catch(() => {
      console.error("Something went wrong");
      return res.status(500).send("Something went wrong");
    });
};

//To get the result of student
exports.getStudentResult = (req, res) => {
  const decodedToken = JWT.verify(req.headers.token, "Celebal Technologies");
  let studentID = decodedToken.studentID;

  let q = Object.keys(req.query);
  q1 = q[0];
  var object = q.reduce((obj, item) => Object.assign(obj, { [item]: 1 }), {});
  let newObj = { _id: 0, ...object };
  projection = newObj;
  console.log(projection);
  Marksheet.findOne({ studentID: studentID }, projection)
    .then((student) => {
      {
        return res.status(200).send(student);
      }
    })
    .catch((error) => {
      return res.status(500).send(error);
    });
};

//To update the student details
exports.getUpdateStudentDetails = (req, res) => {
  const decodedToken = JWT.verify(req.headers.token, "Celebal Technologies");
  let studentID = decodedToken.studentID;
  let { firstName, lastName, address, contactNumber, specialization } =
    req.body;

  Student.updateOne(
    { studentID: studentID },
    { $set: { firstName, lastName, address, contactNumber, specialization } }
  )
    .then(() => {
      console.info("Updated successfully!");
      return res
        .status(200)
        .send({ firstName, lastName, address, contactNumber, specialization });
    })
    .catch(() => {
      console.info("Could not update successfully.");
      return res.status(500).send("Could not update successfully.");
    });
};
