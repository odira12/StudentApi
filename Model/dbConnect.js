const dbConfig = require("../config/dbConfig");
const {Sequelize, DataTypes} = require("sequelize")

// const sequelize = new sequelize();

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

          operatorAliases: false,    //   will overwrite code if error occures
    });

        sequelize
        .authenticate()
            // promise
        .then(() =>{
            console.log("Database Connection established");
        })

        .catch((err) =>{
            console.log("Error" + err);
        });

        const db ={};

        db.Sequelize = Sequelize;
        db.sequelize = sequelize;

        db.student = require ("./studentModel")(sequelize,DataTypes);

        db.sequelize.sync({force: false})
        .then(()=>{
            console.log('re-sync done')
        })

        
        module.exports = db;
        