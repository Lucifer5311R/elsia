import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FreshFromSketchpad from "@/components/home/FreshFromSketchpad";
import MeetTheMaker from "@/components/home/MeetTheMaker";

export const revalidate = 60; // Revalidate every minute

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FreshFromSketchpad />
      <MeetTheMaker />
    </>
  );
}
