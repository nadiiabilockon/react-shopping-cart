const mongoose = require("mongoose");
import config from "./config";

const mongodbUrl = config.MONGODB_URL;

const InitiateMongoServer = async () => {
    try {
        await mongoose
            .connect(mongodbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
    } catch (e) {
        console.log(e.reason);
        throw e;
    }
};

module.exports = InitiateMongoServer;