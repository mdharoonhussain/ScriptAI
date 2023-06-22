const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const cookie = require("cookie");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require:[true,"Username is required"]
    },
    email: {
        type: String,
        require: [true, "Email id is required"]
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        minlength: [6, "Password length should be more than 6 characters"]
    },
    customerID: {
        type: String,
        default: ""
    },
    subscription: {
        type: String,
        default: ""
    }
});

// For Hashing Password

userSchema.pre("save",async function(next){
    //update password
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(5)
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

//Match the password

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password,this.password)

}

// sign token

userSchema.methods.getSignToken = function(res) {
    const accessToken = JWT.sign({id:this._id}, process.env.JWT_ACCESS_SECRET, {expiresIn: JWT_ACCESS_EXPIREIN});
    const refreshToken = JWT.sign({id:this._id}, process.env.JWT_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_EXPIREIN});
    res.cookie("refreshTOken",`${refreshToken}`,{maxAge: 86400 * 7000, httpOnly: true});

};

const User = mongoose.model("User",userSchema);

module.exports = User;