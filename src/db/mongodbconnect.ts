import mongoose from 'mongoose';

export async function mongodbConnect() {
	let mongoDBLink =
		'mongodb+srv://<userName>:<password>@cluster0.51mt5.mongodb.net/telegram?retryWrites=true&w=majority';
	mongoDBLink = mongoDBLink.replace('<userName>', String(process.env.DB_USERNAME));
	mongoDBLink = mongoDBLink.replace('<password>', String(process.env.DB_PASSWORD));

	// console.log(mongoDBLink);

	await mongoose
		.connect(mongoDBLink)
		.then(() => {
			console.log('MongoConnection successful...');
		})
		.catch(err => {
			console.log('MongoConnection error: ', err.message);
			process.exit(1);
		});
}
