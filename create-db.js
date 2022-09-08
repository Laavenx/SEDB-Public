import { Sequelize, DataTypes } from "sequelize";
export const sequelize = new Sequelize(
	"admin",
	"root",
	"12345",
	{
		host: "localhost",
		port: "3306",
		dialect: "mariadb"
	}
);

export const User = sequelize.define("User", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},

}, {
	freezeTableName: true,
	timestamps: false
});

export const ListOfIdeas = sequelize.define("ListOf_Ideas", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
	},

}, {
	freezeTableName: true,
	timestamps: false
});

export const Session_Storage = sequelize.define("Session_Storage", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	uID: {
		type: DataTypes.STRING,
		allowNull: false
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},

}, {
	freezeTableName: true,
	timestamps: false
});

await User.sync({ alter: true });
await ListOfIdeas.sync({ alter: true });
await Session_Storage.sync({ alter: true });

import bcrypt from "bcrypt";

const username = "12345";
const plaintextPassword = "12345";

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(plaintextPassword, salt, function (err, hash) {
		if (hash) {
			User.create({ username: username, password: hash });
		}
	});
});