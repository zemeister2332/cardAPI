const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://admin:11223344@newapi.ldvvc.mongodb.net/NEWAPI?retryWrites=true&w=majority',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
        );

    mongoose.connection.on("open", () => {
        console.log("MongoDB Bog'landi");
    });
    mongoose.connection.on("error", (err) => {
        console.log("MongoDB XATO", err)
    });
    mongoose.set('useFindAndModify', false);
};