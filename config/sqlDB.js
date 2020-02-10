const mysql = require('mysql');

const InitiateMysqlServer = async () => {
	try {
		await mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_MYSQL_NAME
		});
		console.log('Connected to MYSQL database...');
	} catch(e) {
		console.log(e);
		throw e;
	}

	global.mysqlDB = InitiateMysqlServer;
} 

module.exports = InitiateMysqlServer;