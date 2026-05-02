import { SectionHeading } from "@/components/custom/reusable/section-heading";
import { client } from "@/sanity/client";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Trophy } from "lucide-react";

export default async function EducationPage() {
  const education = await client.fetch(`*[_type == "education"] | order(order asc)`);

  return (
    <section className="w-full px-2 lg:px-4 py-4 space-y-10">
      <SectionHeading>Academic Path</SectionHeading>
      
      <div className="flex flex-col gap-8 mt-8">
        {education?.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-xs font-black uppercase tracking-[0.3em]">No academic transmissions found</p>
          </div>
        ) : (
          education?.map((edu, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
            >
              {/* Left Column: Icon & Timeline */}
              <div className="flex flex-col items-center shrink-0">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.2)]">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="hidden md:block w-px h-full bg-gradient-to-b from-primary/50 to-transparent mt-4" />
              </div>

              {/* Right Column: Content */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-2xl font-bold text-foreground tracking-tight">{edu.degree}</h3>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-accent uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-1 shrink-0 text-secondary" />
                  <span className="text-sm font-medium">{edu.institution}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Academic Standing</p>
                      <p className="text-xl font-black text-foreground">{edu.cgpa}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="p-2 rounded-lg bg-secondary/20">
                      <BookOpen className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Focus Area</p>
                      <p className="text-sm font-bold text-foreground leading-tight">{edu.focus}</p>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="pt-4 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${edu.status?.toLowerCase().includes('ongoing') ? 'bg-green-500 animate-pulse' : 'bg-primary'}`} />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/60">{edu.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-10">
        <SectionHeading>Technical Certificates</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3">
                <Trophy className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm font-medium text-foreground">Competitive Programming Certification</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3">
                <Trophy className="w-5 h-5 text-secondary shrink-0" />
                <p className="text-sm font-medium text-foreground">Advanced Data Structures</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3">
                <Trophy className="w-5 h-5 text-accent shrink-0" />
                <p className="text-sm font-medium text-foreground">Full Stack Systems</p>
            </div>
        </div>
      </div>
    </section>
  );
}
