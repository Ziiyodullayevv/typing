"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Keyboard,
  Gamepad2,
  Trophy,
  BarChart3,
  BookOpen,
  Star,
  Unlock,
  Play,
  Rocket,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: BookOpen,
    title: "Fun Lessons",
    description: "Interactive lessons that make learning typing enjoyable",
    color: "text-[#00A76F]",
    bg: "bg-[#F8FFFB]",
  },
  {
    icon: Gamepad2,
    title: "Typing Games",
    description: "Play exciting games while improving your skills",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "See how much you've improved over time",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Trophy,
    title: "Rewards & Badges",
    description: "Earn stars and badges for your achievements",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
];

const steps = [
  { step: "1", title: "Choose Lesson", icon: BookOpen },
  { step: "2", title: "Type Letters", icon: Keyboard },
  { step: "3", title: "Earn Stars", icon: Star },
  { step: "4", title: "Unlock Next", icon: Unlock },
];

const games = [
  { name: "Balloon Typing", icon: "🎈", color: "from-pink-400 to-pink-500" },
  { name: "Rocket Typing", icon: "🚀", color: "from-blue-400 to-blue-500" },
  { name: "Animal Race", icon: "🐰", color: "from-green-400 to-green-500" },
  { name: "Word Garden", icon: "🌻", color: "from-yellow-400 to-yellow-500" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F8FFFB] to-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#12372A] mb-6 leading-tight">
                Learn Typing Through{" "}
                <span className="bg-gradient-to-r from-[#5BE49B] to-[#00A76F] bg-clip-text text-transparent">
                  Fun Games
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-[#6B7280] mb-8 max-w-xl mx-auto lg:mx-0">
                Practice keyboard skills with colorful lessons, mini games, badges and progress tracking made for kids.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/lessons/1">
                  <Button size="lg" className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Free Lesson
                  </Button>
                </Link>
                <Link href="/test">
                  <Button variant="secondary" size="lg" className="flex items-center gap-2">
                    <Keyboard className="w-5 h-5" />
                    Try Typing Test
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 flex justify-center"
            >
              <div className="w-full max-w-md">
                <img
                  src="/images/illustrations/typing.png"
                  alt="Kids typing on keyboard"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
              Why Kids Love Typing Master
            </h2>
            <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
              Everything you need to become a typing superstar!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F8FFFB] rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-[#12372A] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#6B7280]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-[#F8FFFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-[#6B7280]">Four simple steps to become a typing hero!</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-[#00A76F]" />
                </div>
                <div className="text-sm font-bold text-[#00A76F] mb-2">Step {step.step}</div>
                <h3 className="font-bold text-[#12372A]">{step.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Preview */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
              Fun Typing Games
            </h2>
            <p className="text-lg text-[#6B7280]">Learn while playing exciting games!</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl mb-4`}
                >
                  {game.icon}
                </div>
                <h3 className="font-bold text-[#12372A]">{game.name}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/games">
              <Button variant="secondary" className="flex items-center gap-2 mx-auto">
                <Gamepad2 className="w-5 h-5" />
                View All Games
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-[#5BE49B] to-[#00A76F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Become a Keyboard Hero?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Start your typing adventure today and discover how fun learning can be!
            </p>
            <Link href="/lessons/1">
              <Button className="bg-white text-[#00A76F] hover:bg-gray-100 flex items-center gap-2 mx-auto">
                <Rocket className="w-5 h-5" />
                Start Learning Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#12372A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5BE49B] to-[#00A76F] rounded-xl flex items-center justify-center">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Typing Master Kids</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/lessons" className="hover:text-white transition-colors">
                Lessons
              </Link>
              <Link href="/games" className="hover:text-white transition-colors">
                Games
              </Link>
              <Link href="/test" className="hover:text-white transition-colors">
                Test
              </Link>
              <Link href="/dashboard" className="hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 Typing Master Kids. Made with ❤️ for young learners.
          </div>
        </div>
      </footer>
    </div>
  );
}
