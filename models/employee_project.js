module.exports = (sequelize, DataTypes, Employee, Project) => {
  const Employee_Project = sequelize.define("employee_project", {
    EmployeeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Employee,
        key: 'id'
      }
    },
    ProjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id'
      }
    }
  },
  {
    tableName: "employee_project",
    timestamps: true,
  });
  return Employee_Project;
}
