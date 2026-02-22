import { FC } from "react";
import { Container, Grid, Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import heroPreview from "../../assets/hero-preview.png";

const TECH_STACK = [
    { name: "REACT", icon: "react", color: "text-blue-400" },
    { name: "NESTJS", icon: "server", color: "text-red-500" },
    { name: "MONGODB", icon: "database", color: "text-green-500" },
    { name: "TYPESCRIPT", icon: "code", color: "text-blue-600" },
    { name: "VITE", icon: "lightning", color: "text-yellow-400" },
] as const;

const LandingPage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen text-[var(--text-primary)] transition-colors duration-300">
            {/* Hero Section */}
            <section className="relative pt-12 pb-12 overflow-hidden">
                <Container>
                    <Grid stackable verticalAlign="middle">
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <div className="space-y-6">
                                    <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium">
                                        New: 1% Better Every Day Philosophy
                                    </div>
                                    <h1 className="text-6xl font-bold tracking-tight mb-4 neon-glow-teal">
                                        1% better <br />
                                        <span className="text-teal-400">every day.</span>
                                    </h1>
                                    <p className="text-xl text-slate-400 max-w-lg mb-8">
                                        habitry is a data-driven personal growth engine. Track your progress with precision and gamify your commitment.
                                    </p>
                                    <div className="flex gap-4">
                                        <Button
                                            primary
                                            size="huge"
                                            onClick={() => navigate("/signup")}
                                            className="!bg-teal-500 hover:!bg-teal-400 !px-10 !py-5 !rounded-lg !text-lg !font-bold shadow-[0_0_20px_rgba(20,184,166,0.3)]"
                                        >
                                            Start Your Evolution
                                        </Button>
                                        <Button
                                            basic
                                            inverted
                                            size="huge"
                                            onClick={() => navigate("/signin")}
                                            className="!rounded-lg !px-10 !text-lg !border-slate-700 hover:!bg-white/5"
                                        >
                                            Sign In
                                        </Button>
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <div className="relative mt-12 lg:mt-0">
                                    <div className="absolute -inset-4 bg-teal-500/10 dark:bg-teal-500/20 blur-3xl rounded-full" />
                                    <img
                                        src={heroPreview}
                                        alt="Habitry Dashboard"
                                        className="relative rounded-2xl border border-[var(--border-color)] dark:border-slate-800 shadow-2xl shadow-teal-500/5 dark:shadow-teal-500/10 animate-float transition-all duration-500 hover:!animation-none"
                                    />
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </section>

            {/* Social Proof Section (UPGRADED) */}
            <section className="py-8 border-y border-[var(--border-color)] relative overflow-hidden ">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/[0.02] dark:from-teal-500/5 via-transparent to-blue-500/[0.02] dark:to-blue-500/5 pointer-events-none" />
                <Container textAlign="center">
                    <div className="relative z-10 mb-12 mt-12">
                        <p className="text-teal-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                            The productivity standard
                        </p>
                        <h2 className="text-3xl font-bold mb-2">Join 1,200+ developers optimizing their life.</h2>
                        <p className="text-slate-500">Built with the stack that powers the modern web.</p>
                    </div>


                </Container>
            </section>

            {/* Three Ways to Track Section */}
            <section className="py-12 ">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold mb-4">Three Ways to Track</h2>
                        <p className="text-slate-400 text-lg">Choose the logic that fits your goal.</p>
                    </div>
                    <Grid columns={3} stackable doubling centered>
                        <Grid.Row>
                            <Grid.Column>
                                <div className="p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] hover:border-teal-500/50 transition-colors group shadow-sm hover:shadow-md flex flex-col items-center">
                                    <div className="w-12 h-12 mb-1 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                                        <Icon name="percent" size="large" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Consistency</h3>
                                    <p className="text-slate-400 text-center">
                                        The +/- system. Track your success rate over time and maintain your streak. Perfect for habits like "No Sugar" or "Morning Meditation".
                                    </p>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] hover:border-teal-500/50 transition-colors group shadow-sm hover:shadow-md flex flex-col items-center ">
                                    <div className="w-12 h-12 mb-1 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                        <Icon name="calculator" size="large" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Quantity</h3>
                                    <p className="text-[var(--text-secondary)] text-center">
                                        Set quantitative goals. Units, savings, or distance. Master your environment by measuring exactly what matters.
                                    </p>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="p-8 rounded-2xl bg-[var(--surface-color)] border border-[var(--border-color)] hover:border-teal-500/50 transition-colors group shadow-sm hover:shadow-md flex flex-col items-center">
                                    <div className="w-12 h-12 mb-1 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                        <Icon name="check square" size="large" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Commitment</h3>
                                    <p className="text-[var(--text-secondary)] text-center">
                                        Simple checklists. Pure "done or not done" tracking. Ideal for daily chores and repetitive tasks that need a simple check.
                                    </p>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </section>

            {/* Features Showcase - Bento Grid */}
            <section className="py-8 mb-12">
                <Container>
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold mb-4">Engineered for Results</h2>
                        <p className="text-[var(--text-secondary)] text-lg">Precision tools for the modern high-performer.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
                        {/* Bento Grid Item 1 */}
                        <div className="rounded-2xl bento-card-gradient p-6 flex flex-col items-center justify-center text-center hover:bg-slate-900 transition-all group overflow-hidden relative">
                            <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-110 transition-transform">
                                <Icon name="chart line" size="large" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">Progress Reviews</h3>
                            <p className="text-[var(--text-secondary)] text-sm">
                                Deep dive into your success rates with automated visualizers.
                            </p>
                        </div>

                        {/* Bento Grid Item 2 */}
                        <div className="rounded-2xl bento-card-gradient p-6 flex flex-col items-center justify-center text-center hover:bg-slate-900 transition-all border-b-teal-500/30">
                            <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-400 mb-3 animate-pulse">
                                <Icon name="trophy" size="large" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">Milestones</h3>
                            <p className="text-[var(--text-secondary)] text-sm">Stay motivated by celebrating every win, no matter how small.</p>
                        </div>

                        {/* Bento Grid Item 3 */}
                        <div className="rounded-2xl bento-card-gradient p-6 flex flex-col items-center justify-center text-center hover:bg-slate-900 transition-all border-r-blue-500/30 group">
                            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                                <Icon name="target" size="large" />
                            </div>
                            <h3 className="text-lg font-bold mb-1">Precision Tracking</h3>
                            <p className="text-[var(--text-secondary)] text-sm">Every data point counts. We optimize for the most accurate reflection of your growth.</p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Tech Stack section */}
            <section className="py-10 border-t border-[var(--border-color)]">
                <Container textAlign="center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-color)] dark:bg-white/5 border border-[var(--border-color)] text-xs text-[var(--text-secondary)] mb-4">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" /> Built for Performance
                    </div>
                    <h2 className="text-2xl font-bold !mb-12">Powered by Modern Tech</h2>
                    <div className="relative flex overflow-x-hidden border-y border-[var(--border-color)] py-10 bg-[var(--surface-color)] dark:bg-slate-900/20 backdrop-blur-sm w-screen left-1/2 -translate-x-1/2">
                        <div className="animate-marquee whitespace-nowrap flex items-center gap-20 px-10 ">
                            {[...Array(3)].map((_, setIndex) => (
                                <div key={`set-${setIndex}`} className="flex items-center gap-20">
                                    {TECH_STACK.map((tech) => (
                                        <div
                                            key={`${setIndex}-${tech.name}`}
                                            className="flex items-center gap-4 text-[var(--text-secondary)] hover:text-white transition-colors cursor-default grayscale hover:grayscale-0"
                                        >
                                            <Icon name={tech.icon as any} size="big" className={tech.color} />
                                            <span className="text-2xl font-black italic tracking-tighter">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Footer / CTA Final */}
            <section className="py-6 bg-gradient-to-b from-transparent to-teal-950/[0.05] dark:to-teal-950/20">
                <Container textAlign="center">
                    <h2 className="text-5xl font-bold mb-8">Ready to evolve?</h2>
                    <Button
                        primary
                        size="huge"
                        onClick={() => navigate("/signup")}
                        className="!bg-teal-500 hover:!bg-teal-400 !px-12 !py-6 !rounded-xl !text-xl !font-bold shadow-xl shadow-teal-500/20"
                    >
                        Create Your Account
                    </Button>
                    <p className="!mt-8 text-slate-500">Free forever for personal growth. Join the waitlist for Teams.</p>
                </Container>
            </section>
        </div>
    );
};

export default LandingPage;
