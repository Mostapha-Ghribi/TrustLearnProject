const mongoose = require('mongoose');
const CONNECTION_URL = 'mongodb+srv://TrustLearn:TrustLearn123@auth.5qlfk.mongodb.net/TrustLearn';

 const Connection = () => mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> console.log("Connected Successfully"))
.catch(err => console.log("Connection Failed" , err));
module.exports = Connection;