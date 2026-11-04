import { LuCalendar, LuGraduationCap } from "react-icons/lu";
import { useLanguage } from "@/context/LanguageContext";
import { aboutCopy, education } from "@/data/about";
import { Reveal } from "@/components/motion/Reveal";

export function EducationList() {
  const { tr } = useLanguage();

  return (
    <section aria-labelledby="education-title" className="mt-20 pb-24">
      <h2 id="education-title" className="border-b-2 border-neutral-900 pb-2 text-xl dark:border-neutral-200">
        {tr(aboutCopy.educationTitle)}
      </h2>

      <ul className="mt-10 space-y-6 pl-5">
        {education.map((edu, i) => (
          <li key={`${edu.degree.en}-${edu.period}`}>
            <Reveal delay={i * 0.08}>
              <div className="relative rounded-lg border-2 border-neutral-300 bg-white p-5 pl-10 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-neutral-400 hover:shadow-lg sm:p-6 sm:pl-12 dark:border-neutral-700 dark:bg-[#1e1e1e] dark:hover:border-neutral-500">
                {/* graduation cap sticking out on the left */}
                <span
                  aria-hidden
                  className="absolute -left-5 top-6 grid h-10 w-10 place-items-center rounded-full border-2 border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <LuGraduationCap className="h-5 w-5" />
                </span>

                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                  <h3 className="font-heading text-lg font-bold leading-snug sm:text-xl">{tr(edu.institution)}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-300">
                    <LuCalendar aria-hidden className="h-3.5 w-3.5" />
                    {edu.period}
                  </span>
                </div>
                <p className="mt-1.5 font-heading text-base font-semibold">{tr(edu.degree)}</p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-200">{tr(edu.description)}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
