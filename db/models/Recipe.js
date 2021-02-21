const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define("Recipe", {
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
    description: { type: DataTypes.TEXT },
  });
  SequelizeSlugify.slugifyModel(Recipe, {
    source: ["name"],
  });

  return Recipe;
};
