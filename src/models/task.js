module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    task_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Category, {
      foreignKey: {
        name: "category_id",
        allowNull: false,
      },
    });
    Task.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };

  return Task;
};
