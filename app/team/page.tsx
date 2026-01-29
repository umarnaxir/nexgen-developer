import TeamHero from "./components/TeamHero";
import TeamGrid from "./components/TeamGrid";
import PrivacyNote from "./components/PrivacyNote";

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black">
      <TeamHero />
      <TeamGrid />
      <PrivacyNote />
    </div>
  );
}
