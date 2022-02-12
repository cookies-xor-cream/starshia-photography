import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

import * as styles from './index.module.scss';

const IndexPage = () => {
  const queryData = useStaticQuery(graphql`
  query AllImages {
    allFile(
      filter: {extension: {regex: "/(jpg)|(jpeg)|(png)|(webp)/"}, sourceInstanceName: {eq: "photos"}}
    ) {
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
  }`);

  const images = queryData.allFile.nodes.map((image) => {
    return (
      <SwiperSlide className={styles.swiperSlide}>
        <img src={image.childImageSharp.original.src} />
      </SwiperSlide>
    );
  });

  SwiperCore.use(Autoplay);

  return (
    <Layout>
      <Seo title="Home" />
      <Swiper
        className={styles.carousel}
        modules={[EffectFade]} effect="fade"
        loop
        autoplay={{delay: 1200}}
      >
        {images}
      </Swiper>
    </Layout>
  );
}

export default IndexPage
