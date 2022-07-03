const express = require("express");
const Student = require("../models/User");
const Marksheet = require("../models/Marksheet");
const router = express();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const JWT = require("jsonwebtoken");


//For sign up of Admin
exports.signup = (req,res)=>{
    let{adminID, firstName, lastName, email} = req.body;
    let admin = new Admin({
        adminID,
        firstName,
        lastName,
        email,
    });
    admin.save().then(() => {
        console.log("Admin added successfully")
        res.status(200).send(admin);
    
    })
        .catch((error)=>{
        console.error(error);
        return res.status(500).send("Something is not right")
    });
}

// For Admin Login
exports.login = (req,res)=>{
    let{adminID} = req.body;
    Admin.findOne({adminID})
        .then((admin)=>{
            console.info(`AdminId: ${adminID} has been found`);
            if(adminID === admin.adminID){
                const token = JWT.sign({
                    adminID: admin.adminID,
                },
                "Celebal Technologies",
                {
                    expiresIn: "1h",
                }
            );  
                console.info("You are in!");
                return res.status(200).send(token);
            }
            console.warn("Admin does not exist.");
            return res.status(404).send("No admin exist");

        }).catch((error)=>{
            console.error(`This email ${adminID} was not found`);
            return res.status(404).send(`User with email: ${email} doesn't exist`);

        });
}

//To add student and the basic details of the student
exports.addStudent = (req,res)=>{
    let{studentID, firstName, lastName, address, contactNumber, specialization} = req.body;
    let student = new Student({
        studentID,
        firstName,
        lastName,
        address,
        contactNumber,
        specialization
    });
    student.save().then(() => {
        console.log("User added successfully!")
        res.status(200).send(student.studentID);
    
    })
        .catch((error)=>{
        console.error(error);
        return res.status(500).send("Could not add user")
    });
}

//To get the 
exports.fillMarksOfStudent = (req,res)=>{
    let{studentID, mathsMarks, dsaMarks, dbmsMarks} = req.body;
    let totalMarks = Number(mathsMarks) + Number(dsaMarks) + Number(dbmsMarks);
    let marksheet = new Marksheet({
        studentID,
        mathsMarks,
        dsaMarks,
        dbmsMarks,
        totalMarks
    });
    marksheet.save().then(() => {
        console.log(`${studentID} has entered marks successfully`);
        res.status(200).send(marksheet);
    
    })
        .catch((error)=>{
        console.error(error);
        return res.status(500).send("Could not add the marks")
    });
}

//To update the details of the student
exports.updateStudent = (req,res) => {
    let{studentID} = req.params.studentID;
    let{mathsMarks, dsaMarks, dbmsMarks} = req.body;
    let totalMarks = Number(mathsMarks) + Number(dsaMarks) + Number(dbmsMarks);
    Marksheet.updateOne({studentID:studentID }, {$set:{mathsMarks, dsaMarks, dbmsMarks,totalMarks}})
    .then((updateDetails)=>{
        if(updateDetails.modifiedCount >= 1 &&
            updateDetails.matchedCount >= 1 &&
            updateDetails.upsertedCount >=0)
            {
                console.info("Details were updated successfully");
                return res.status(200).send("Details were updated successfully");
            }
            console.error(`Could not find student with student id : ${studentID}`);
            return res.status(404).send("Student doesn't exist");
    }).catch((error)=>{
        console.error(`Error updating detaails of student with studentID ${studentID}`);
        return res.status(500).send("Error");
    });

};

//To delete the details of the student
exports.deleteStudentDetails = (req,res,next) => {
    let{studentID} = req.params.studentID;
    Student.deleteOne({studentID})
    .then(()=>{
        console.log(`Student data deleted successfully`);
        return next();
    

    }).catch(()=>{
        console.error("Could not delete the data");
        return res.status(500).send("error")
    })

}
// To delete the marks details of student
exports.deleteStudentMarksheet = (req,res) => {
    let{studentID} = req.params.studentID;
    Marksheet.deleteOne({studentID:studentID})
    .then(()=>{
        console.log(`Marksheet was successfully deleted`);
        return res.status(200).send("Student record deleted");


    }).catch(()=>{
        console.error(error);
        return res.status(500).send("error")
    })

}