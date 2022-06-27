const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`Mongoose Connected: ${conn.connection.host}`.green)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB