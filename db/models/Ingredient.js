const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    description: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Ingredient, {
    source: ["name"],
  });

  return Ingredient;
};
