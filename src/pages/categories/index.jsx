import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import ImageGrid from "../../components/ImageComponents/ImageGrid";

import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Categories = () => {
  const queryData = useStaticQuery(graphql`
  query AllCanonicalImages {
    allFile(
      filter: {extension: {regex: "/(jpg)|(jpeg)|(png)|(webp)/"}, sourceInstanceName: {eq: "photos"}}
    ) {
      group(field: relativeDirectory, limit: 1) {
        nodes {
          relativeDirectory
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

  const canonicalImageData = queryData.allFile.group
    .map((group) => group.nodes[0])

  return (
    <Layout>
      <Seo title="Home" />
      <ImageGrid
        includeDirectory
        categoryLinks
        imageData={canonicalImageData}
      />
    </Layout>
  );
}

export default Categories;
