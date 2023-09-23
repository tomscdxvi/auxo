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
        start_date: Date,
        end_date: Date
    }],
    history: [{
        title: {
            type: String,
        },
        date: {
            type: String,
        },
        time: {
            type: String,
        },
        type: {
            type: String,
        },
        workout: [{
            name: {
                type: String,
                required: true,
            },
            sets: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            },
        }] 
    }],
    users: {
        type: Schema.Types.ObjectId,
        ref: 'SomeOtherModel'
    }
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
        throw Error("Incorrect Password");
    }
    throw Error("Incorrect Username");
};

module.exports = mongoose.model("Users", UserSchema);