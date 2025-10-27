import config from "@config/config.json";
import { useGSAP } from "@gsap/react";
import Base from "@layouts/Baseof";
import ClassLevelSection from "@layouts/components/ClassLevelSection";
import CommitmentSection from "@layouts/components/CommitmentSection";
import GallerySection from "@layouts/components/GallerySection";
import LearningModesSection from "@layouts/components/LearningModesSection";
import MathCourseSection from "@layouts/components/MathCourseSection";
import ParentFeedback from "@layouts/components/ParentFeedback";
import ProblemSection from "@layouts/components/ProblemSection";
import ProfitSection from "@layouts/components/ProfitSection";
import ReasonSection from "@layouts/components/ReasonSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";

const Home = ({ frontmatter }) => {
  const { title } = config.site;
  const ref = useRef();
  const { contextSafe } = useGSAP(
    () => {
      const panels = gsap.utils.toArray(".sectionScroll");

      const totalHeight =
        panels.length * window.innerHeight - window.innerHeight;

      // Snap scroll theo từng panel
      ScrollTrigger.create({
        start: 0,
        // end: "bottom top",
        end: `+=${totalHeight}`,
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: 3,
          delay: 0.1,
          ease: "power1.inOut",
        },
        pin: false,
      });
    },
    { scope: ref }
  );

  return (
    <Base title={title}>
      <div ref={ref}>
        <MathCourseSection />

        <ProblemSection />

        <LearningModesSection />

        <ReasonSection />

        <ClassLevelSection />

        <ProfitSection />

        <CommitmentSection />

        <GallerySection />

        <ParentFeedback />
       
      </div>
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
