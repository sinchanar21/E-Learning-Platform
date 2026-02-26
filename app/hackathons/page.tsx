'use client';

import { hackathons } from '@/lib/constants';
import { Calendar, MapPin, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

export default function HackathonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hackathons & <span className="gradient-text">Competitions</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Showcase your skills and win exciting prizes
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-8">
        {/* Tabs */}
        <div className="flex gap-4 border-b border-white/10">
          <button className="px-4 py-2 font-medium text-blue-400 border-b-2 border-blue-400">
            Upcoming
          </button>
          <button className="px-4 py-2 font-medium text-slate-400 hover:text-white transition-colors">
            Past Events
          </button>
        </div>

        {/* Hackathons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="group glass-hover p-6 rounded-xl hover:glow-blue relative overflow-hidden h-full flex flex-col"
            >
              {/* Prize badge */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-full blur-2xl group-hover:from-yellow-500/30 transition-all duration-300" />

              <div className="relative z-10">
                {/* Title and prize */}
                <h3 className="text-xl font-bold text-white mb-2">{hackathon.title}</h3>

                <div className="flex items-center gap-2 mb-4 text-yellow-400 font-semibold">
                  <Trophy className="w-5 h-5" />
                  <span>{hackathon.prize}</span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6 text-slate-300 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>{hackathon.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-violet-400" />
                    <span>{hackathon.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span>{hackathon.participants}+ participants</span>
                  </div>
                </div>

                {/* Status badge and button */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300">
                    {hackathon.status === 'upcoming' ? 'Coming Soon' : 'Registering'}
                  </span>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 glow-blue transform hover:scale-105">
                    Register
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
