import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import ExplodeImages from "../../components/ImageComponents/ExplodeImages";

import Layout from "../../components/layout";
import Seo from "../../components/seo";

const IndexPage = () => {
  const queryData = useStaticQuery(graphql`
  query AllImagesByCategory {
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
      distinct(field: relativeDirectory)
    }
  }`);

  const imageGroups = queryData.allFile.group
    .map((group) => group.nodes.map((a) =>
        a.childImageSharp.original
    ))
    .sort((group, i) => queryData.allFile.distinct[i]);

  return (
    <Layout>
      <Seo title="Home" />
      <ExplodeImages imageGroups={imageGroups} />
    </Layout>
  );
}

export default IndexPage
