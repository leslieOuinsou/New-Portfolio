'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MdOpenInNew, MdFavorite } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import MobileMockup from './MobileMockup';

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        image?: string;
        video?: string;
        fallbackIcon?: React.ReactNode;
        fallbackGradient?: string;
        tech: string[];
        link?: string;
        github?: string;
        isMobile?: boolean;
    };
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const content = (
        <div className="flex flex-col h-full bg-white/80 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 dark:border-gray-800/50 shadow-lg hover:shadow-[0_20px_50px_rgba(0,119,255,0.15)] dark:hover:shadow-[0_20px_50px_rgba(0,119,255,0.08)] transition-all duration-500 group relative">
            {/* Hover Lift Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0077FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Media Section */}
            <div className={`relative overflow-hidden transition-all duration-500 ${project.isMobile ? 'h-[245px] flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/30' : 'h-28 bg-gray-100 dark:bg-gray-800/50'}`}>
                {project.isMobile ? (
                    <div className="scale-[0.42] origin-center transform transition-transform duration-700 group-hover:scale-[0.44]">
                        <MobileMockup src={project.image} alt={project.title} />
                    </div>
                ) : project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 blur-[0.5px] group-hover:blur-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.fallbackGradient || 'from-gray-400 to-gray-600'} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity`}>
                        {project.fallbackIcon}
                    </div>
                )}

                {/* Status Badge (Mobile specific) */}
                {project.isMobile && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 text-blue-500 text-[9px] font-bold uppercase tracking-wider">
                        Mobile App
                    </div>
                )}

                {/* Action Overlay */}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20 dark:border-gray-800/50 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 text-gray-700 dark:text-gray-300 transition-all"
                            title="View on GitHub"
                        >
                            <FaGithub className="w-4 h-4" />
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="w-8 h-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/20 dark:border-gray-800/50 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 text-red-500 transition-all"
                    >
                        <MdFavorite className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 flex flex-col flex-grow relative z-10">
                <div className="mb-1">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5 group-hover:text-[#0077FF] transition-colors truncate">
                        {project.title}
                        {project.link && <MdOpenInNew className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
                    </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-[10px] leading-tight mb-2 line-clamp-2">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="px-1.5 py-0 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 text-gray-500 dark:text-gray-500 text-[8px] font-semibold rounded transition-colors hover:border-blue-500/30 hover:text-blue-500"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Mobile Demo Button for Mobile Projects */}
                {project.isMobile && (
                    <div className="mt-2 pt-2 border-t border-gray-100/50 dark:border-gray-800/50 flex gap-1.5">
                        {project.video && (
                            <a
                                href={project.video}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 text-center text-[9px] font-bold py-1 rounded-md bg-[#0077FF] text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
                            >
                                Demo Vidéo
                            </a>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 text-center text-[9px] font-bold py-1 rounded-md border border-blue-500/30 text-[#0077FF] hover:bg-blue-500/10 transition-all hover:-translate-y-0.5"
                            >
                                Live Vercel
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    if (project.link && !project.isMobile) {
        return (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full px-2 py-0.5 cursor-pointer"
            >
                {content}
            </a>
        );
    }

    return <div className="h-full px-2 py-0.5">{content}</div>;
};

export default ProjectCard;
