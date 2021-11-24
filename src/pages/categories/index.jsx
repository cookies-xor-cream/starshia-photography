import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import ImagesByCategory from "../../components/ImagesByCategory";

import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Categories = () => {
  const queryData = useStaticQuery(graphql`query AllCanonicalImages {
    allFile(
      filter: {extension: {regex: "/(jpg)|(jpeg)|(png)|(webp)/"}, sourceInstanceName: {eq: "photos"}}
    ) {
      group(field: relativeDirectory, limit: 1) {
        nodes {
          childImageSharp {
            original {
              src
              height
              width
            }
          }
        }
      }
    }
  }`);

  const cononicalImages = queryData.allFile.group
    .map((group) => group.nodes[0].childImageSharp.original)

  return (
    <Layout>
      <Seo title="Home" />
      <ImagesByCategory images={cononicalImages} />
    </Layout>
  );
}

export default Categories;
