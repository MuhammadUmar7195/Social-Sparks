import mongoose from "mongoose";

const connectionDB = (url) => {
    return mongoose.connect(url).then(() =>
        console.log("Connection is successful with DB")
    ).catch((err) => {

        console.log("Full error in connection with DB", err);
        console.log("Error connecting to the database", err.message);
    }), {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    };
}

export default connectionDB;