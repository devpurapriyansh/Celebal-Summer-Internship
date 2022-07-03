//For creating the admin
const adminCreation = {
  tags: ["Admin"],
  description: "Operation that are solely one by the admin",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            adminID: {
              type: "string",
              description: "Enter a valid student ID",
              example: "STD0025",
            },
            firstName: {
              type: "string",
              description: "type firstname",
              example: "John",
            },
            lastName: {
              type: "string",
              description: "type lastname",
              example: "Jacobs",
            },
            email: {
              type: "string",
              description: "type email",
              example: "john.jacob@gmail.com",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              type: "object",
            },
          },
        },
      },
    },

    404: {
      description: "Oops! User does not exist",
      schema: {
        type: "string",
      },
    },
  },
};

// For admin Login
const adminLogin = {
  tags: ["Admin"],
  description: "This is for the Admin only",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            adminID: {
              type: "string",
              example: "admin@007",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              token: "",
            },
          },
        },
      },
    },

    404: {
      description: "Oops! User does not exist",
      schema: {
        type: "string",
      },
    },
  },
};

const studentRegister = {
  tags: ["Admin"],
  description: "operations that can be done by admin as well as students",

  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiYWRtaW5AMDAxIiwiaWF0IjoxNjU2ODUwNDc0LCJleHAiOjE2NTY4NTQwNzR9.hRMAbIt7VSgrG1hJT30tOKceWqugVRp9NdkB98em9a4",
      required: "true",
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            studentID: {
              type: "string",
              description: "Enter studentID",
              example: "STD0025",
            },
            firstName: {
              type: "string",
              description: "Enter your first name",
              example: "John",
            },
            lastName: {
              type: "string",
              description: "Enter your last name",
              example: "Jacob",
            },
            address: {
              type: "string",
              description: "Enter your address",
              example: "xyz",
            },
            contactNumber: {
              type: "string",
              description: "Enter your mobile number",
              example: "0000111222",
            },
            specialization: {
              type: "string",
              description: "Enter your specialization",
              example: "B.Tech in CSE",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              studentID: "",
            },
          },
        },
      },
    },

    404: {
      description: "Oops! User does not exist",
      schema: {
        type: "string",
      },
    },
  },
};

const studentMarksUpload = {
  tags: ["Admin"],
  description: "Operation that are solely one by the admin",

  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiYWRtaW5AMDAxIiwiaWF0IjoxNjU2ODUwNDc0LCJleHAiOjE2NTY4NTQwNzR9.hRMAbIt7VSgrG1hJT30tOKceWqugVRp9NdkB98em9a4",
      required: "true",
    },
  ],

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",

          properties: {
            studentID: {
              type: "string",
              description: "Enter studentID",
              example: "STD0025",
            },
            mathsMarks: {
              type: "string",
              description: "Enter the marks you scored ",
              example: "90",
            },
            dsaMarks: {
              type: "string",
              description: "Enter the marks you scored",
              example: "90",
            },
            dbmsMarks: {
              type: "string",
              description: "Enter the marks you scored",
              example: "90",
            },
          },
        },
      },
    },
  },

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            type: "object",
          },
        },
      },
    },

    404: {
      description: "Oops! User does not exist",
      schema: {
        type: "string",
      },
    },
  },
};

const updateStudentsMarks = {
  tags: ["Admin"],
};

const deleteStudentRecord = {
  tags: ["Admin"],
  description: "Operation done solely by admin to delete student details",

  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiYWRtaW5AMDAxIiwiaWF0IjoxNjU2ODUwNDc0LCJleHAiOjE2NTY4NTQwNzR9.hRMAbIt7VSgrG1hJT30tOKceWqugVRp9NdkB98em9a4",
      required: "true",
    },
    {
      in: "path",
      name: "studentID",
      type: "string",
      required: "true",
    },
  ],

  responses: {
    200: {
      description: "User has been deleted successfully",
      content: {
        "application/json": {
          schema: {
            type: "STRING",
          },
        },
      },
    },

    404: {
      description: "Unable to delete the user",
      schema: {
        type: "string",
      },
    },
  },
};

const adminRouteDocs = {
  "/admin/addStudent": {
    post: studentRegister,
  },

  "/admin/login": {
    post: adminLogin,
  },

  "/admin/signup": {
    post: adminCreation,
  },

  "/admin/uploadMarks": {
    post: studentMarksUpload,
  },

  "/admin/students/{id}": {
    put: updateStudentsMarks,
    delete: deleteStudentRecord,
  },
};

module.exports = adminRouteDocs;
