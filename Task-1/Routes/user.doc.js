const getDetails = {
  tags: ["Student"],
  description: "STudent details can be seen",
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
      description: "The user does not exist",
      schema: {
        type: "string",
      },
    },
  },
};

const studentLogin = {
  tags: ["Student"],
  description: "Student please enter your student id",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            studentID: {
              type: "string",
              description: "Student please enter your student id",
              example: "S001",
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
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklEIjoiYWRtaW5AMDAxIiwiaWF0IjoxNjU2ODUwNDc0LCJleHAiOjE2NTY4NTQwNzR9.hRMAbIt7VSgrG1hJT30tOKceWqugVRp9NdkB98em9a4",
            },
          },
        },
      },
    },

    404: {
      description: "User does not exist",
      schema: {
        type: "string",
      },
    },
  },
};

const studentUpdate = {
  tags: ["Student"],
  description:
    "Student details can be updated only by the student or the admin",
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
            firstName: {
              type: "string",
              description: "Enter first name",
              example: "Harsh",
            },
            lastName: {
              type: "string",
              description: "tEnter last name",
              example: "Jain",
            },
            address: {
              type: "string",
              description: "Enter your address",
              example: "middle class",
            },
            contactNumber: {
              type: "string",
              description: "Enter your contact number",
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
              firstName: {
                type: "string",
                description: "Enter first name",
                example: "John",
              },
              lastName: {
                type: "string",
                description: "Enter last name",
                example: "Jacob",
              },
              address: {
                type: "string",
                description: "Enter your address",
                example: "Burj Khalifa, Dubai",
              },
              contactNumber: {
                type: "string",
                description: "Enter your contact number",
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

    404: {
      description: "User does not exist",
      schema: {
        type: "string",
      },
    },
  },
};

const getFilteredResults = {
  tags: ["Student"],
  description: "Only student or admin can update the details",
  parameters: [
    {
      in: "header",
      name: "token",
      type: "string",
      example: "type the token here",
      required: "true",
    },
    {
      in: "query",
      name: "mathsMarks",
      description: "will display maths marks out of 100",
    },
    {
      in: "query",
      name: "dsaMarks",
      description: "will display DSA marks out of 100",
    },
    {
      in: "query",
      name: "dbmsMarks",
      description: "will display DBMS marks out of 100",
    },
    {
      in: "query",
      name: "totalMarks",
      description: "will display total marks",
    },
  ],

  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: {
            properties: {
              mathsMarks: {
                type: "string",
                description: "get maths marks out of 100",
                example: "",
              },
              dsaMarks: {
                type: "string",
                description: "get science marks out of 100",
                example: "",
              },
              dbmsMarks: {
                type: "string",
                description: "get geography marks out of 100",
                example: "",
              },
              totalMarks: {
                type: "string",
                description: "get total marks out of 300",
                example: "",
              },
            },
          },
        },
      },
    },

    404: {
      description: "USser does not exist",
      schema: {
        type: "string",
      },
    },
  },
};

const userRouteDocs = {
  "/me": {
    get: getDetails,
  },

  "/student/login": {
    post: studentLogin,
  },

  "/student/update": {
    put: studentUpdate,
  },

  "/student/results": {
    get: getFilteredResults,
  },
};

module.exports = userRouteDocs;
