exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })

  const { data: categoriesData } = await graphql(`
  query AllCategories {
    allFile(
      filter: {extension: {regex: "/(jpg)|(jpeg)|(png)|(webp)/"}, sourceInstanceName: {eq: "photos"}}
    ) {
      distinct(field: relativeDirectory)
    }
  }`);

  // add pages for each image category
  const categories = categoriesData.allFile.distinct
  categories.forEach((category) => {
    const slug = `/categories/${category}`
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/category.js'),
      context: { categoryName: category },
    })
  })
}
