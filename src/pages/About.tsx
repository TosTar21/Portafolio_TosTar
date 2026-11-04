import { AboutIntro } from "@/components/about/AboutIntro";
import { SkillsConstellation } from "@/components/skills/SkillsConstellation";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { EducationList } from "@/components/experience/EducationList";

/** Identity → Skills (OSCAR constellation) + Languages → Experience → Education */
export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <AboutIntro />
      <SkillsConstellation />
      <ExperienceTimeline />
      <EducationList />
    </div>
  );
}
