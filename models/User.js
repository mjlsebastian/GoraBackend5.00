
module.exports = (sequelize,DataTypes)=>{

let User = sequelize.define("User",{
    username:{
        type: DataTypes.STRING,
        allownull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allownull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allownull: false
    },
isAdmin:{
    type: DataTypes.BOOLEAN,
    allownull: false,
    defaultValue: false
}
});

User.associate = (models)=>{
    User.hasMany(models.Booked, {
        onDelete: "cascade"
    });
};

return User;

};