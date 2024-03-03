const mongoose = require("mongoose");
const mongoURI ='mongodb+srv://hrithikjaiswal:S90LZHQ1of819be1@cluster0.6c4pmzy.mongodb.net/';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        // mongoose.set('useUnifiedTopology',true);
        // mongoose.set('useFindAndModify',false);
        // mongoose.set('useCreateIndex',true);

        await mongoose.connect(mongoURI) 
        console.log('Mongo connected')
        const fetchData = mongoose.connection.db.collection("food_items");
        let data = await fetchData.find({}).toArray();
        console.log("data",data);
        global.food_items=data;
           
        
    } catch(error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDB;