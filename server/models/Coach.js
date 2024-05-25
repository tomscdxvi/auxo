const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const CoachSchema = new Schema({
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
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
});

// Encrypt password with BCrypt 
CoachSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Coach Login
CoachSchema.statics.login = async function(username, password) {
    const coach = await this.findOne({ username });

    if(coach) {
        const auth = await bcrypt.compare(password, coach.password);

        if(auth) {
            return coach;
        }
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Username");
};

module.exports = mongoose.model("Coaches", CoachSchema);