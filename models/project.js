module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("project", {
        id: {

            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,

        },

        projectName: {

            type: DataTypes.STRING,
            allowNull: false,

        }
    });
    return Project;
};
