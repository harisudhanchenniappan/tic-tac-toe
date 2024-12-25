const mongoose = require('mongoose');


const MONGODB_URI = 'mongodb+srv://HARISUDHAN1611:hari2611@cluster0.iqfirm0.mongodb.net/tic-tac-toe';


const connectDB=async()=>{
   await mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
}

module.exports={
    connectDB,
}
