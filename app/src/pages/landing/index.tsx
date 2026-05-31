import { FC } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Target, CheckCircle2, BarChart3, Trophy, Crosshair, ArrowRight } from "lucide-react";
import heroPreview from "../../assets/hero-preview.png";

const TECH_STACK = [
  "React",
  "NestJS",
  "MongoDB",
  "TypeScript",
  "Vite",
] as const;

const TRACKING_MODES = [
  {
    icon: TrendingUp,
    title: "Consistency",
    accent: "percentage",
    description: "The +/- system. Track your success rate over time and maintain your streak. Perfect for habits like morning meditation or no sugar.",
  },
  {
    icon: Target,
    title: "Quantity",
    accent: "numeric",
    description: "Set quantitative goals — pages read, kilometers run, cups of water. Measure exactly what matters to you.",
  },
  {
    icon: CheckCircle2,
    title: "Commitment",
    accent: "boolean",
    description: "Simple done-or-not-done tracking. Ideal for daily chores and repetitive tasks that need a clean check.",
  },
] as const;

const FEATURES = [
  {
    icon: BarChart3,
    title: "Progress Reviews",
    description: "Deep dive into your success rates with clear visual progress.",
  },
  {
    icon: Trophy,
    title: "Milestones",
    description: "Stay motivated by celebrating every win, no matter how small.",
  },
  {
    icon: Crosshair,
    title: "Precision Tracking",
    description: "Every data point counts toward an accurate reflection of your growth.",
  },
] as const;

const LandingPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-mesh min-h-screen text-[var(--text-primary)]">
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="app-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 animate-fade-up">
              <div className="badge animate-fade-up animate-fade-up-delay-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" style={{ animation: "pulse-soft 2s ease infinite" }} />
                1% Better Every Day
              </div>

              <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight animate-fade-up animate-fade-up-delay-2">
                Small steps,<br />
                <span className="text-[var(--primary)] not-italic">lasting change.</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-md leading-relaxed animate-fade-up animate-fade-up-delay-3">
                Habitry is your personal growth journal. Track habits with intention, review your progress, and compound your wins over time.
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-up animate-fade-up-delay-4">
                <Button
                  primary
                  size="large"
                  onClick={() => navigate("/signup")}
                  className="btn-primary !px-8 !py-4 !text-base"
                >
                  Begin Your Journey
                  <ArrowRight size={18} style={{ marginLeft: 8, display: "inline", verticalAlign: "middle" }} />
                </Button>
                <Button
                  basic
                  size="large"
                  onClick={() => navigate("/signin")}
                  className="btn-ghost !px-8 !py-4 !text-base"
                >
                  Sign In
                </Button>
              </div>
            </div>

            <div className="relative animate-fade-up animate-fade-up-delay-3">
              <div
                className="absolute -inset-8 rounded-[var(--radius-xl)] opacity-40"
                style={{ background: "radial-gradient(ellipse at center, var(--primary-soft), transparent 70%)" }}
              />
              <div
                className="absolute top-6 -right-4 w-24 h-24 rounded-full opacity-60"
                style={{ background: "var(--accent-soft)", filter: "blur(40px)" }}
              />
              <img
                src={heroPreview}
                alt="Habitry Dashboard"
                className="relative rounded-[var(--radius-xl)] border border-[var(--border-color)] shadow-[var(--shadow-lg)] animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-[var(--border-color)]">
        <div className="app-shell" style={{ textAlign: "center" }}>
          <p className="text-[var(--accent)] uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Built for intentional living
          </p>
          <h2 className="font-display text-2xl md:text-4xl mb-3">
            Join others cultivating better habits
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-lg !mx-auto">
            A thoughtful tool for people who believe progress is made one day at a time.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="app-shell">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl mb-4">Three Ways to Track</h2>
            <p className="text-[var(--text-secondary)] text-lg">Choose the logic that fits your goal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TRACKING_MODES.map(({ icon: Icon, title, accent, description }, i) => (
              <div
                key={title}
                className="feature-card p-8 flex flex-col items-start"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-12 h-12 mb-5 rounded-[var(--radius-md)] flex items-center justify-center"
                  style={{
                    background: accent === "percentage" ? "var(--primary-soft)" : accent === "numeric" ? "var(--accent-soft)" : "var(--success-soft)",
                    color: accent === "percentage" ? "var(--primary)" : accent === "numeric" ? "var(--accent)" : "var(--success)",
                  }}
                >
                  <Icon size={22} strokeWidth={2} />
                </div>
                <h3 className="font-display text-2xl mb-3">{title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--bg-accent)]">
        <div className="app-shell">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl mb-4">Crafted for Results</h2>
            <p className="text-[var(--text-secondary)] text-lg">Tools that respect your time and your goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bento-card p-8 flex flex-col items-center text-center min-h-[180px] justify-center">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "var(--primary-soft)", color: "var(--primary)" }}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg mb-2">{title}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 border-t border-[var(--border-color)] overflow-hidden">
        <div className="app-shell" style={{ textAlign: "center" }}>
          <div className="badge mb-6 mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            Modern Stack
          </div>
          <div className="relative flex overflow-x-hidden py-8 w-screen left-1/2 -translate-x-1/2">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-10">
              {[...Array(3)].map((_, setIndex) => (
                <div key={`set-${setIndex}`} className="flex items-center gap-16">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={`${setIndex}-${tech}`}
                      className="font-display text-2xl md:text-3xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-default italic"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="app-shell" style={{ textAlign: "center" }}>
          <h2 className="font-display text-3xl md:text-5xl mb-4">Ready to begin?</h2>
          <p className="text-[var(--text-secondary)] text-lg !mx-auto max-w-md mb-10">
            Free forever for personal growth. Start tracking today.
          </p>
          <Button
            primary
            size="huge"
            onClick={() => navigate("/signup")}
            className="btn-primary !px-14 !py-5 !text-lg !rounded-[var(--radius-md)]"
          >
            Create Your Account
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
