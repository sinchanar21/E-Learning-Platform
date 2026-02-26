'use client';

import { engineeringBranches } from '@/lib/constants';
import {
    Code2,
    Server,
    Layers,
    Cloud,
    Database,
    Cpu,
    ChevronRight,
    CheckCircle2,
    Circle,
    ArrowRight,
    Sparkles,
    Map
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const iconMap = {
    Code2: <Code2 className="w-6 h-6" />,
    Server: <Server className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Cloud: <Cloud className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
};

const roadmapMilestones = [
    {
        level: "Phase 1: Foundations",
        items: [
            { title: "Introduction to the Ecosystem", duration: "1-2 weeks", status: "completed" },
            { title: "Core Concepts & Syntax", duration: "2-3 weeks", status: "current" },
            { title: "Development Environment Setup", duration: "1 week", status: "pending" }
        ]
    },
    {
        level: "Phase 2: Core Engineering",
        items: [
            { title: "Advanced Architecture Patterns", duration: "4 weeks", status: "pending" },
            { title: "State Management & Data Flow", duration: "3 weeks", status: "pending" },
            { title: "Testing & Documentation", duration: "2 weeks", status: "pending" }
        ]
    },
    {
        level: "Phase 3: Industry Readiness",
        items: [
            { title: "Performance Optimization", duration: "2 weeks", status: "pending" },
            { title: "System Design for Scalability", duration: "3 weeks", status: "pending" },
            { title: "Capstone Project & Portfolio", duration: "4 weeks", status: "pending" }
        ]
    }
];

export default function RoadmapsPage() {
    const [selectedBranch, setSelectedBranch] = useState(engineeringBranches[0]);

    return (
        <div className="min-h-screen bg-background">
            {/* Background Glows */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 md:px-8 border-b border-border transition-colors duration-300">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                        <Map className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-slate-200 uppercase tracking-wider">Career Navigation</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                        Personalized <span className="gradient-text">Learning Roadmaps</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose your specialization and follow a curated path from foundation to industry expert.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar - Branch Selection */}
                    <aside className="lg:col-span-4 space-y-4">
                        <h2 className="text-lg font-bold text-foreground px-2 mb-4">Engineering Branches</h2>
                        <div className="space-y-2">
                            {engineeringBranches.map((branch) => (
                                <button
                                    key={branch.id}
                                    onClick={() => setSelectedBranch(branch)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left group ${selectedBranch.id === branch.id
                                            ? 'bg-primary/10 border border-primary/30 shadow-lg shadow-primary/5'
                                            : 'hover:bg-muted/50 border border-transparent'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${selectedBranch.id === branch.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground group-hover:text-foreground'
                                        } transition-colors`}>
                                        {iconMap[branch.icon as keyof typeof iconMap]}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-foreground">{branch.title}</div>
                                        <div className="text-xs text-muted-foreground line-clamp-1">{branch.description}</div>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedBranch.id === branch.id ? 'translate-x-1 text-primary' : 'text-muted-foreground'
                                        }`} />
                                </button>
                            ))}
                        </div>

                        {/* AI Callout */}
                        <div className="mt-8 p-6 glass rounded-2xl border border-primary/20 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-violet-500/5 -z-10 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center gap-2 text-primary mb-3">
                                <Sparkles className="w-5 h-5" />
                                <span className="font-bold">Need a Custom Roadmap?</span>
                            </div>
                            <p className="text-sm text-slate-400 mb-4">
                                Let our AI Assistant analyze your skills and create a unique learning path just for you.
                            </p>
                            <Link href="/ai-assistant" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                                Try AI Assistant <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </aside>

                    {/* Main Roadmap View */}
                    <main className="lg:col-span-8">
                        <div className="glass-lg p-6 md:p-8 rounded-2xl border border-border space-y-8">
                            {/* Header Info */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border">
                                <div>
                                    <h2 className="text-3xl font-bold text-foreground mb-2">{selectedBranch.title}</h2>
                                    <p className="text-muted-foreground">{selectedBranch.description}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-center px-4 py-2 bg-muted/30 rounded-lg border border-border">
                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Duration</div>
                                        <div className="font-bold text-foreground">{selectedBranch.duration}</div>
                                    </div>
                                    <div className="text-center px-4 py-2 bg-muted/30 rounded-lg border border-border">
                                        <div className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Difficulty</div>
                                        <div className="font-bold text-foreground">{selectedBranch.difficulty}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-12">
                                {roadmapMilestones.map((phase, phaseIdx) => (
                                    <div key={phaseIdx} className="relative">
                                        {/* Vertical Line Connector */}
                                        {phaseIdx !== roadmapMilestones.length - 1 && (
                                            <div className="absolute left-[19px] top-[40px] bottom-[-40px] w-0.5 bg-gradient-to-b from-primary/50 to-transparent z-0" />
                                        )}

                                        <h3 className="flex items-center gap-4 text-xl font-bold text-foreground mb-6 z-10 relative">
                                            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary backdrop-blur-sm">
                                                {phaseIdx + 1}
                                            </div>
                                            {phase.level}
                                        </h3>

                                        <div className="ml-5 pl-10 space-y-4">
                                            {phase.items.map((item, itemIdx) => (
                                                <div
                                                    key={itemIdx}
                                                    className="group p-4 bg-muted/30 hover:bg-muted/50 border border-border rounded-xl transition-all duration-300 relative"
                                                >
                                                    <div className="absolute left-[-31px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" />

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            {item.status === 'completed' ? (
                                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                            ) : item.status === 'current' ? (
                                                                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                                            ) : (
                                                                <Circle className="w-5 h-5 text-muted-foreground/30" />
                                                            )}
                                                            <span className={`font-medium ${item.status === 'pending' ? 'text-muted-foreground' : 'text-foreground'}`}>
                                                                {item.title}
                                                            </span>
                                                        </div>
                                                        <span className="text-xs font-medium text-slate-500 bg-muted px-2 py-1 rounded">
                                                            {item.duration}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Actions */}
                            <div className="pt-8 border-t border-border flex flex-wrap gap-4 items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    <span className="font-bold text-primary">{selectedBranch.courses}</span> Expert courses available in this path
                                </div>
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold transition-all transform hover:scale-105"
                                >
                                    Start This Roadmap <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
