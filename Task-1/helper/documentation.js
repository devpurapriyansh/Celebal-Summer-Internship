const userRouteDocs = require("../Routes/user.doc");
const adminRouteDocs = require("../Routes/admin.doc");

const swaggerDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Task 1 - Basic CRUD Application",
    version: "0.0.1",
    description:
      "This is the task 1 of Summer Internship program by Celebal Technologies. This is created by Priyansh Devpura(CSI-215)",
  },
// Update this after hosting on a server
  servers: [
    {
      url: "",
      description:
        "If This was published on any server. The project can be accessed by the above link",
    },
  ],

  tags: [
    {
      name: "Admin",
      description: "Operation that are solely one by the admin ",
    },

    {
      name: "Student",
      description: "operations that can be done by admin as well as students",
    },
  ],

  paths: {
    ...userRouteDocs,
    ...adminRouteDocs,
  },
};

module.exports = swaggerDocumentation;
