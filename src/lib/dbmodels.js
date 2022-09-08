import { Sequelize, DataTypes } from "sequelize";
export const DB = new Sequelize({
	dialect: "sqlite",
	storage: "database.db",
	logging: false
});

const CubeBlock = DB.define("CubeBlock", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false
	},
	subType: {
		type: DataTypes.STRING
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	cubeSize: {
		type: DataTypes.STRING
	},
	textureName: {
		type: DataTypes.STRING
	},
	description: {
		type: DataTypes.TEXT("medium")
	},
	dlc: {
		type: DataTypes.STRING
	},
	pcu: {
		type: DataTypes.INTEGER
	},
	isAirtight: {
		type: DataTypes.STRING
	},
	additionalData: {
		type: DataTypes.STRING
	}
	
}, {
	freezeTableName: true,
	timestamps: false
});

const Component = DB.define("Component", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	subType: {
		type: DataTypes.STRING,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	textureName: {
		type: DataTypes.STRING,
	},
	mass: {
		type: DataTypes.REAL
	},
	volume: {
		type: DataTypes.REAL
	},
	maxIntegrity: {
		type: DataTypes.INTEGER
	},
	dropProbability: {
		type: DataTypes.REAL
	},
	health: {
		type: DataTypes.INTEGER
	}
}, {
	freezeTableName: true,
	timestamps: false
});

export const CubeBlock_Components = DB.define("CubeBlock_Components", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	id_block: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	id_component: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	amount: {
		type: DataTypes.INTEGER
	},
	hack: {
		type: DataTypes.INTEGER
	},
	functional: {
		type: DataTypes.INTEGER
	}
}, {
	freezeTableName: true,
	timestamps: false
});

export const CubeBlock_Calculated = DB.define("CubeBlock_Calculated", {
	cubeblock_id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	mass: {
		type: DataTypes.REAL,
		allowNull: false
	},
	maxIntegrity: {
		type: DataTypes.INTEGER
	},
	volume: {
		type: DataTypes.INTEGER
	}
}, {
	freezeTableName: true,
	timestamps: false
});

const Blueprint = DB.define("Blueprint", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	subType: {
		type: DataTypes.STRING
	},
	name: {
		type: DataTypes.STRING,
	},
	textureName: {
		type: DataTypes.TEXT
	},
	prodTime: {
		type: DataTypes.REAL
	}
}, {
	freezeTableName: true,
	timestamps: false
});

const Blueprint_Prerequisites = DB.define("Blueprint_Prerequisites", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	blueprint_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	amount: {
		type: DataTypes.REAL,
	},
	physicalItem_id: {
		type: DataTypes.INTEGER,
	},
}, {
	freezeTableName: true,
	timestamps: false
});

export const Blueprint_Results = DB.define("Blueprint_Results", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	blueprint_id: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	amount: {
		type: DataTypes.REAL,
	},
	component_id: {
		type: DataTypes.INTEGER,
	},
	ammoMagazine_id: {
		type: DataTypes.INTEGER,
	},
	physicalITem_id: {
		type: DataTypes.INTEGER,
	},
}, {
	freezeTableName: true,
	timestamps: false
});

export const Size = DB.define("Size", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	cubeblock_id: {
		type: DataTypes.INTEGER
	},
	component_id: {
		type: DataTypes.INTEGER
	},
	physicalitem_id: {
		type: DataTypes.INTEGER
	},
	X: {
		type: DataTypes.REAL
	},
	Y: {
		type: DataTypes.REAL
	},
	Z: {
		type: DataTypes.REAL
	}
}, {
	freezeTableName: true,
	timestamps: false
});

export const PhysicalItem = DB.define("PhysicalItem", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	type: {
		type: DataTypes.STRING
	},
	subType: {
		type: DataTypes.STRING
	},
	name: {
		type: DataTypes.STRING
	},
	textureName: {
		type: DataTypes.TEXT
	},
	volume: {
		type: DataTypes.REAL
	},
	mass: {
		type: DataTypes.REAL
	}
}, {
	freezeTableName: true,
	timestamps: false
});

export const AmmoMagazine = DB.define("AmmoMagazine", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false
	},
	subType: {
		type: DataTypes.STRING
	},
	name: {
		type: DataTypes.STRING
	},
	textureName: {
		type: DataTypes.TEXT
	},
	volume: {
		type: DataTypes.REAL
	},
	mass: {
		type: DataTypes.REAL
	},
	capacity: {
		type: DataTypes.REAL
	}
}, {
	freezeTableName: true,
	timestamps: false
});

Blueprint.hasMany(Blueprint_Results, { foreignKey: "blueprint_id", as: "Results" });
Blueprint.hasMany(Blueprint_Prerequisites, { foreignKey: "blueprint_id", as: "Prerequisites" });
CubeBlock.hasOne(Size, { foreignKey: "cubeblock_id" });
Component.hasOne(Size, { foreignKey: "component_id" });
CubeBlock.hasOne(CubeBlock_Calculated, { foreignKey: "cubeblock_id", as: "Calculated" });
CubeBlock.hasMany(CubeBlock_Components, { foreignKey: "cubeblock_id", as: "BlockComponent" });
CubeBlock_Components.belongsTo(Component, { foreignKey: "component_id", as: "C" });
Blueprint_Prerequisites.belongsTo(PhysicalItem, { foreignKey: "physicalItem_id", as: "physicalItem" });
export { CubeBlock, Blueprint, Blueprint_Prerequisites, Component, };