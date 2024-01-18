const mongoose = require('mongoose');
require('dotenv').config();

exports.connect=()=>{
	mongoose
		.connect(process.env.MONGO_URL)
		.then(() => console.log('db connected successfully'))
		.catch((error) => {
			console.log('DB Connection failed');
			console.log('error is', error);
			process.exit(1);
		});
} 