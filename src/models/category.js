module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    category_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isEditable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
    });
  };

  return Category;
};
