const User = require('../models/user')
const Patient= require('../models/patient')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
// const Cookies =  require('universal-cookie');



module.exports = {
    createUser: async function(args, req, context ){
        const errors = [];
        if(!validator.isEmail(args.email)){
            errors.push({message:"email is invalid"})
        }
        if(validator.isEmpty(args.password) || !validator.isLength(args.password, {min: 5})){
            errors.push({message: "password too short"})
        }
        if(errors.length > 0){
            const error = new Error('Invalid Input')
            error.data = errors;
            error.code = 422;
            throw error
        }

        const existingUser = await User.findOne({email: args.email});

        if(existingUser){
            const error = new Error('User exists already!')
            throw error
        }
        const hashedPw = await bcrypt.hash(args.password, 12)
        const user = new User({
            email: args.email,
            name: args.name,
            password: hashedPw,
            phoneNumber: parseInt(args.phoneNumber),
            // DOB: args.userInput.DOB,
            // doctor: args.userInput.doctor,
            // date_of_diagnosis: args.userInput.date_of_diagnosis,
            // notes: args.userInput.notes

        })
        const createdUser = await user.save()
        const token = jwt.sign(
            {
            email: user.email,
            userId: user._id.toString()
        },
         'supersecretcode',
          {expiresIn: '2h'}
        );
        // res.cookie("id", token, {
        //     httpOnly: true,
        //     maxAge: 1000*60*60*7*2
        // })



        console.log("Called Here")
        return{...createdUser._doc, _id:createdUser._id.toString(), token: token}
    },
    login: async function({email, password}, context){
        const user = await User.findOne({email: email})
        if(!user){
            const error = new Error("Can't Find User")
            error.code = 401
            throw error
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual){
            const error = new Error('password is incorrect')
            error.code = 401
            throw error
        }
        const token = jwt.sign(
            {
            email: user.email,
            userId: user._id.toString()
        },
         'supersecretcode',
          {expiresIn: '2h'}
        );

        // context.res.cookie('id', token, {
        // httpOnly:true,
        // maxAge: 1000 *60*60*24*2});
        

        
        context.res.cookie('auth',token,{ maxAge: 900000, httpOnly: false, path: '/' })
        

        return{token: token, userId: user._id.toString()}
    },
    createPatient: async function(args, req){
        
        var str = req.headers.referer
        var res = str.split('/')
        const users = await User.findById(res[4])
        if(!users){
        const error = new Error('Cannot Find User')
        error.data = errors;
        error.code = 401;
        console.log(error)
        throw error
        }

        const patient = new Patient({
            firstName: args.PatientInput.firstName,
            lastName: args.PatientInput.lastName,
            email: args.PatientInput.email,
            phoneNumber: args.PatientInput.phoneNumber,
            DOB: args.PatientInput.DOB,
            doctor: args.PatientInput.doctor,
            date_of_diagnosis: args.PatientInput.date_of_diagnosis,
            notes: args.PatientInput.notes,
            creator: users
        })
        const createdPatient = await patient.save()
        console.log(createdPatient)

        users.patients.push(createdPatient)
        await users.save();


        console.log(createdPatient.firstName)



        return {...createdPatient._doc, _id: createdPatient._id.toString(), 
            DOB: createdPatient.DOB.toISOString(),
            date_of_diagnosis: createdPatient.date_of_diagnosis.toISOString(),
            createdAt: createdPatient.createdAt.toISOString()
        }
    },

    getPatients: async function({userId}, req){
        if (!req.isAuth) {
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }

        const user = await User.findById(req.userId)
        if (!user) {
          const error = new Error('No post found!');
          error.code = 404;
          throw error;
        }
        console.log(user)
        
        const patient = await Patient.find({creator: user._id})
        console.log(patient)
        return {
            patients: patient.map(p => {
              return {
                ...p._doc,
                _id: p._id.toString(),
                DOB: p.DOB.toISOString()
                // createdAt: p.createdAt.toISOString(),
                // updateAt :p.updateAt.toISOString()
              };
            })
          };
    

    },
    userAuth: async function(args, req){
        if (!req.isAuth) {
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }
        console.log(req.userId, "req")
        var cookie = req.cookies;
        console.log(cookie, "cookie")

        const authHeader = req.get('Authorization');
        const token = authHeader.split(' ')[1];
        console.log(req, "token")
        console.log(req.cookies, "cookies")

    //    const decode = await jwt.verify(token, 'supersecretcode')

        const user = await User.findById(req.userId)
        if(!user){
            const error = new Error('Cannot Find User')
            error.data = errors;
            error.code = 401;
            console.log(error)
            throw error
        }
        console.log(user)

        return{token: token, userId: user._id.toString(), auth:true}

    }



}

