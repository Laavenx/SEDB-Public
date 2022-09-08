import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize(
	import.meta.env.VITE_DBNAME,
	import.meta.env.VITE_DBLOGIN,
	import.meta.env.VITE_DBPASS,
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