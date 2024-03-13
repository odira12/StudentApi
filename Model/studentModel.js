const { READCOMMITTED } = require("sequelize/types/table-hints")

module.exports=(sequelize, DataTypes)=>{
const student = sequelize.define('student',{
    student_id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    firstname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    gender:{
        type:DataTypes.STRING,
        allowNull: false,
    },
})
 return student
}