import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ImagesByCategory from "../components/ImagesByCategory";

export default function BlogPost({ data }) {
  const imageData = data.allFile.nodes
  // const post = data.markdownRemark
  return (
    <Layout>
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
  }
}`
