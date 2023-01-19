module.exports = (sequelize,DataTypes)=>{

const Contacts = sequelize.define("Contacts",{
    
name: {
    type: DataTypes.STRING,
    allownull: false
},
email: {
    type: DataTypes.STRING,
    allownull: false
},
message: {
    type: DataTypes.STRING,
    allownull: false
},
});

return Contacts;

};