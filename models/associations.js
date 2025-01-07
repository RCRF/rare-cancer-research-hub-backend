import Institution from "./Institution";
import Organization from "./Organization";
import Provider from "./Provider";
import Author from "./Author";
import Article from "./Article";

Institution.belongsToMany(Organization, { through: "InstitutionOrganization" });
Organization.belongsToMany(Institution, { through: "InstitutionOrganization" });

Provider.belongsToMany(Organization, { through: "ProviderOrganization" });
Organization.belongsToMany(Provider, { through: "ProviderOrganization" });

Author.belongsToMany(Article, {
  through: "ArticleAuthor",
  foreignKey: "authorId",
  otherKey: "articleId",
});

Article.belongsToMany(Author, {
  through: "ArticleAuthor",
  foreignKey: "articleId",
  otherKey: "authorId",
});

Article.belongsTo(Organization, { foreignKey: "organization_id" });

export { Institution, Organization };
