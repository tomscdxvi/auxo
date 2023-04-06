const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
});

// Encrypt password with BCrypt 
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// User Login
UserSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });

    if(user) {
        const auth = await bcrypt.compare(password, user.password);

        if(auth) {
            return user;
        }
        throw error("Incorrect Password");
    }
    throw error("Incorrect Username");
};

module.exports = mongoose.model("Users", UserSchema);