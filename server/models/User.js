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
        required: true
    },
    level: {
        type: String,
        required: true
    },
    goals: [{
        title: String,
        description: String,
        completion: Boolean
    }],
    history: [{ 
        type: Schema.Types.ObjectId, ref: 'Workout' // ✅ Reference to Workout collection
    }],
    programs: [{
        type: Schema.Types.ObjectId, ref: 'Program'
    }]
});

// Encrypt password with BCrypt 
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // ✅ Only hash if changed
    const salt = await bcrypt.genSalt(12);
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
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Username");
};

module.exports = mongoose.model("Users", UserSchema);