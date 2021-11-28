import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import ExplodeImagesByCategory from "../components/ImageComponents/ExplodeImagesByCategory";

import Layout from "../components/layout";
import Seo from "../components/seo";

const IndexPage = () => {
  const queryData = useStaticQuery(graphql`query AllImagesByCategory {
    allFile(
        filter: {extension: {regex: "/(jpg)|(jpeg)|(png)|(webp)/"}, sourceInstanceName: {eq: "photos"}}
    ) {
      group(field: relativeDirectory) {
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

  const imageGroups = queryData.allFile.group
  .map((group) => group.nodes.map((a) =>
      a.childImageSharp.original
  ));

  return (
    <Layout>
      <Seo title="Home" />
      <ExplodeImagesByCategory imageGroups={imageGroups} />
    </Layout>
  );
}

export default IndexPage
