import mongoose from 'mongoose';

const db = process.env.NODE_ENV === "testing" ? process.env.TEST_DB : process.env.NODE_ENV === "development" ? process.env.DEV_DB : process.env.PRODUCTION_DB;

mongoose
    .connect(`${db}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: process.env.NODE_ENV !== "testing"
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => console.log(err));