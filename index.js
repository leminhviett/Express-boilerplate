import app from "./server.js";
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsModel from "./data_model/restaurants.model.js"
import ReviewsModel from "./data_model/reviews.model.js"

dotenv.config()

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 5000

MongoClient.connect(
    process.env.DB_URL,
    {
        poolSize: 50,
        wtimeout: 2500,
        useNewUrlParser: true
    }
).catch(err => {
    console.error(err.stack),
    process.exit(1)
}).then(async function (conn) {
    // inject db to get back the collection (table)
    await RestaurantsModel.injectDB(conn)
    await ReviewsModel.injectDB(conn)


    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
