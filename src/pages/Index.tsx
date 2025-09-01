import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Milestones from "@/components/Milestones";
import Map from "@/components/Map";
import Rewards from "@/components/Rewards";
import SuccessStories from "@/components/SuccessStories";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <div id="milestones">
          <Milestones />
        </div>
        <Map />
        <Rewards />
        <div id="leaderboard">
          <SuccessStories />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
