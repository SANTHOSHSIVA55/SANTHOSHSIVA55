import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon } from "./icons";
import { profile } from "./data";
import { SectionHeader } from "./Sections";

export function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader kicker="Contact" title="Let's build something" lead="Open to internships, full-time Software Engineer / Full Stack / Data Analyst roles and interesting collaborations." />
        <div className="mt-10 sm:mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <ContactRow href={`mailto:${profile.email}?subject=Hello%20Santhosh&body=Hi%20Santhosh%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.`} icon={<Mail className="size-5" />} label="Email" value={profile.email} />
          <ContactRow href={profile.linkedin} icon={<LinkedinIcon className="size-5" />} label="LinkedIn" value="santhosh-t-s" />
          <ContactRow href={profile.github} icon={<GithubIcon className="size-5" />} label="GitHub" value="GitHub Profile" />
          <ContactRow href={profile.leetcode} icon={<LeetcodeIcon className="size-5" />} label="LeetCode" value="santhoshts" />
          <ContactRow href={profile.gfg} icon={<GfgIcon className="size-5" />} label="GeeksforGeeks" value="santhoshts" />
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const isMailto = href?.startsWith("mailto:");
  const cls = "glass group flex items-center justify-between gap-3 sm:gap-4 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-colors hover:bg-white/[0.06]";
  const content = (
    <>
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <span className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[var(--primary)]/30 to-[var(--primary-glow)]/20">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
          <div className="font-medium text-sm sm:text-base truncate">{value}</div>
        </div>
      </div>
      {href && <span className="text-muted-foreground transition-transform group-hover:translate-x-0.5 shrink-0">→</span>}
    </>
  );
  return href ? (
    <a href={href} {...(isMailto ? {} : { target: "_blank", rel: "noreferrer" })} className={cls}>{content}</a>
  ) : (
    <div className={cls}>{content}</div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:px-6 text-xs sm:text-sm text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} {profile.name}. Crafted with care.</div>
        <div className="flex items-center gap-3 sm:gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-foreground"><GithubIcon className="size-3.5 sm:size-4" /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground"><LinkedinIcon className="size-3.5 sm:size-4" /></a>
          <a href={`mailto:${profile.email}`} className="hover:text-foreground"><Mail className="size-3.5 sm:size-4" /></a>
        </div>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 glass-strong flex size-11 items-center justify-center rounded-full transition-all ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  );
}