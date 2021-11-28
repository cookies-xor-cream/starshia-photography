import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ImagesByCategory from "../components/ImageComponents/ImagesByCategory";

export default function BlogPost({ data }) {
  const title = data.allFile.distinct[0];
  const imageData = data.allFile.nodes;

  return (
    <Layout>
      {title}
      <ImagesByCategory imageData={imageData} />
    </Layout>
  )
}

export const query = graphql`
query AllImagesOfCategory($categoryName: String!) {
  allFile(
    filter: {extension: {regex: "/(jpg)|(jpeg)|(png)|(webp)/"}, sourceInstanceName: {eq: "photos"}, relativeDirectory: {eq: $categoryName}}
  ) {
    nodes {
      childImageSharp {
        original {
          height
          src
          width
        }
      }
    }

    distinct(field: relativeDirectory)
  }
}`
