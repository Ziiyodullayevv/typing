"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Volume2, VolumeX, Sparkles, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useProgress } from "@/hooks/useProgress";
import { UserProfile } from "@/types/badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const avatars = ["🐱", "🐶", "🐰", "🦊", "🐼", "🦁", "🐸", "🐵", "🦄", "🐲"];

const defaultProfile: UserProfile = {
  nickname: "Typing Star",
  avatar: "🐱",
  age: 8,
  soundEnabled: true,
  animationEnabled: true,
};

export default function ProfilePage() {
  const [profile, setProfile] = useLocalStorage<UserProfile>("user-profile", defaultProfile);
  const { resetProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetProgress();
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FFFB] py-8 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#12372A] mb-4">
            Profile Settings
          </h1>
          <p className="text-lg text-[#6B7280]">
            Customize your typing experience!
          </p>
        </motion.div>

        {/* Avatar Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <h2 className="text-lg font-bold text-[#12372A] mb-4">Choose Your Avatar</h2>
            <div className="flex flex-wrap gap-3">
              {avatars.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setProfile((prev) => ({ ...prev, avatar }))}
                  className={`w-14 h-14 rounded-xl text-2xl flex items-center justify-center transition-all ${
                    profile.avatar === avatar
                      ? "bg-[#00A76F] text-white scale-110 shadow-lg"
                      : "bg-[#F8FFFB] hover:bg-gray-100"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Nickname */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <h2 className="text-lg font-bold text-[#12372A] mb-4">Nickname</h2>
            <input
              type="text"
              value={profile.nickname}
              onChange={(e) => setProfile((prev) => ({ ...prev, nickname: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#00A76F] focus:outline-none focus:ring-2 focus:ring-[#00A76F]/20 text-[#12372A]"
              placeholder="Enter your nickname"
            />
          </Card>
        </motion.div>

        {/* Age */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <h2 className="text-lg font-bold text-[#12372A] mb-4">Age</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 10 }, (_, i) => i + 5).map((age) => (
                <button
                  key={age}
                  onClick={() => setProfile((prev) => ({ ...prev, age }))}
                  className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                    profile.age === age
                      ? "bg-[#00A76F] text-white"
                      : "bg-[#F8FFFB] text-[#6B7280] hover:bg-gray-100"
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card>
            <h2 className="text-lg font-bold text-[#12372A] mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {profile.soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-[#00A76F]" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-[#6B7280]" />
                  )}
                  <div>
                    <p className="font-medium text-[#12372A]">Sound Effects</p>
                    <p className="text-sm text-[#6B7280]">Play sounds when typing</p>
                  </div>
                </div>
                <button
                  onClick={() => setProfile((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    profile.soundEnabled ? "bg-[#00A76F]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      profile.soundEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles className={`w-5 h-5 ${profile.animationEnabled ? "text-[#00A76F]" : "text-[#6B7280]"}`} />
                  <div>
                    <p className="font-medium text-[#12372A]">Animations</p>
                    <p className="text-sm text-[#6B7280]">Enable smooth animations</p>
                  </div>
                </div>
                <button
                  onClick={() => setProfile((prev) => ({ ...prev, animationEnabled: !prev.animationEnabled }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    profile.animationEnabled ? "bg-[#00A76F]" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      profile.animationEnabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Reset Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-[#FF4D4F]" />
              <h2 className="text-lg font-bold text-[#FF4D4F]">Danger Zone</h2>
            </div>
            <p className="text-[#6B7280] mb-4">
              Reset all your progress, stars, and badges. This cannot be undone!
            </p>
            {showResetConfirm ? (
              <div className="flex gap-3">
                <Button variant="danger" onClick={handleReset} className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Yes, Reset Everything
                </Button>
                <Button variant="ghost" onClick={() => setShowResetConfirm(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="danger" onClick={() => setShowResetConfirm(true)} className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Reset Progress
              </Button>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
