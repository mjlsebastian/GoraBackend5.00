module.exports = (sequelize,DataTypes) => {

const Booked = sequelize.define("Booked",{

firstname: {
    type: DataTypes.STRING,
    allownull: false
},
middlename:{
    type: DataTypes.STRING,
    allownull: false
},
lastname:{
    type: DataTypes.STRING,
    allownull: false
},
address:{
    type: DataTypes.STRING,
    allownull: false
},
phonenumber:{
    type: DataTypes.STRING,
    allownull: false
},
email:{
    type: DataTypes.STRING,
    allownull: false
},
servicetype:{
    type: DataTypes.STRING,
    allownull: false
},
packageplan:{
    type: DataTypes.STRING,
    allownull: false
},
message:{
    type: DataTypes.STRING,
    allownull: false
}
})
return Booked;

};