const mongoose = require('mongoose');

const connectToServer = async()=>{

    await mongoose.connect(`mongodb+srv://chakresh1234:chakresh1234@cluster0.cqppmvp.mongodb.net/mock-6-backend?retryWrites=true&w=majority`)

}

module.exports = connectToServer