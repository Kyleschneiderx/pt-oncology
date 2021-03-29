const {buildSchema} = require('graphql')


module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageURL: String!
        creator: User!
        createdAt: String!
        updateAt: String!
    }

    type Question {}



    type Patient {
        _id: ID!
        firstName: String!
        lastName: String!
        phoneNumber: String
        doctor: String
        DOB:String
        date_of_diagnosis: String
        email: String!
        status: String
        posts: [Post!]!
        creator: User!
        createdAt: String!
        Questions:[]
    }

    type User {
        _id: ID!
        name: String!
        phoneNumber: String!
        email: String!
        password: String
        patients: [Patient!]!
        token: String!

    }


    type AuthData {
        token: String!
        userId: String!
        auth: Boolean!

    }

    type PatientData {
        patients: [Patient!]!
    }

    input UserInputData {
        email: String!
        firstName: String!
        lastName: String!
        phoneNumber: String!
        date_of_diagnosis:String!
        DOB: String!
        doctor: String!
        notes: String
        diagnosis: String!
    }


    type RootMutation {
        createPatient(PatientInput:UserInputData): Patient!
        createUser(email: String!, password: String!, name: String!, phoneNumber: String!):User!

    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        getPatients(userId: ID): PatientData!
        userAuth: AuthData!
    }


    schema {

        query: RootQuery
        mutation:RootMutation
    }
    
`)