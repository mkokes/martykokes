import Hero from "../components/Hero";
import NowFeature from "../components/NowFeature";
import PastProjects from "../components/PastProjects";

export default function Home() {
  return (
    <>
      <div className="home">
        <Hero />
      </div>
      <NowFeature />
      <PastProjects />
    </>
  );
}
