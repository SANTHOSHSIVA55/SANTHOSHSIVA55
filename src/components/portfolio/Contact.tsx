import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon, GfgIcon } from "./icons";
import { profile } from "./data";
import { SectionHeader } from "./Sections";

export function Contact() {
  return (
    <section id="contact" className="relative section-padding">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          kicker="Contact"
          title="Let's Build Something Impactful"
          lead="Open to internships, Software Engineer roles, Full Stack Developer opportunities, and exciting engineering collaborations."
        />

        {/* Large CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(232,232,232,0.04)_0%,transparent_70%)]" />
          </div>

          <div className="relative z-10">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8FAFC] leading-tight">
              Ready to collaborate?
            </h3>
            <p className="mt-4 text-base sm:text-lg text-[#94A3B8] max-w-lg mx-auto">
              I'm always open to discussing new projects, creative ideas, and opportunities to be part of your vision.
            </p>
            <a
              href={`mailto:${profile.email}?subject=Hello%20Santhosh&body=Hi%20Santhosh%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.`}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#E8E8E8] to-[#C0C0C0] px-8 py-4 text-base font-semibold text-[#020202] transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,232,232,0.15)] hover:scale-[1.03] overflow-hidden group"
            >
              <Mail className="size-5" />
              <span>Get In Touch</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Contact cards grid */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ContactRow
            href={`mailto:${profile.email}?subject=Hello%20Santhosh&body=Hi%20Santhosh%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.`}
            icon={<Mail className="size-5" />}
            label="Email"
            value={profile.email}
            color="#00E5FF"
          />
          <ContactRow
            href={profile.linkedin}
            icon={<LinkedinIcon className="size-5" />}
            label="LinkedIn"
            value="santhosh-t-s"
            color="#3B82F6"
          />
          <ContactRow
            href={profile.github}
            icon={<GithubIcon className="size-5" />}
            label="GitHub"
            value="GitHub Profile"
            color="#F8FAFC"
          />
          <ContactRow
            href={profile.leetcode}
            icon={<LeetcodeIcon className="size-5" />}
            label="LeetCode"
            value="santhoshts"
            color="#F59E0B"
          />
          <ContactRow
            href={profile.gfg}
            icon={<GfgIcon className="size-5" />}
            label="GeeksforGeeks"
            value="santhoshts"
            color="#22C55E"
          />
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  color = "#00E5FF",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  color?: string;
}) {
  const isMailto = href?.startsWith("mailto:");
  return (
    <motion.a
      href={href}
      {...(isMailto ? {} : { target: "_blank", rel: "noreferrer" })}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      className="glass group flex items-center justify-between gap-4 rounded-2xl p-5 transition-all duration-300 hover:bg-white/[0.06] hover-glow border border-white/[0.04] hover:border-white/[0.10] chrome-border"
    >
      <div className="flex items-center gap-4 min-w-0">
        <span
          className="flex size-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}08)`,
            border: `1px solid ${color}15`,
            color: color,
          }}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">{label}</div>
          <div className="font-medium text-sm text-[#FFFFFF] truncate">{value}</div>
        </div>
      </div>
      {href && (
        <ArrowUpRight className="size-4 text-[#A8A8A8] transition-all duration-300 group-hover:text-[#E8E8E8] group-hover:translate-x-0.5 shrink-0" />
      )}
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:px-6 text-sm text-[#A8A8A8] sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-gradient-to-br from-[#E8E8E8] to-[#A8A8A8]" />
          <span>
            &copy; {new Date().getFullYear()} {profile.name}. Designed &amp; Developed by{" "}
            <span className="text-[#FFFFFF] font-medium">Santhosh T S</span>.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-[#E8E8E8] transition-colors">
            <GithubIcon className="size-4" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#E8E8E8] transition-colors">
            <LinkedinIcon className="size-4" />
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-[#E8E8E8] transition-colors">
            <Mail className="size-4" />
          </a>
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
    <motion.button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      animate={{
        y: show ? 0 : 20,
        opacity: show ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-6 right-6 z-40 glass-strong flex size-12 items-center justify-center rounded-xl border border-white/[0.06] transition-all duration-300 hover:bg-white/[0.08] hover-glow ${
        show ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </motion.button>
  );
}
