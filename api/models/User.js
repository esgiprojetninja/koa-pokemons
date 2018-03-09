const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    pokemons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pokemon"
    }]
});

module.exports = mongoose.model("User", userSchema);