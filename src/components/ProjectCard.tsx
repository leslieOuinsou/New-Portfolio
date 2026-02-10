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
        <div className={`flex flex-col h-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group`}>
            {/* Media Section */}
            <div className={`relative overflow-hidden ${project.isMobile ? 'h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-800' : 'h-48 bg-gray-100 dark:bg-gray-800'}`}>
                {project.isMobile ? (
                    <div className="scale-[0.6] origin-center">
                        <MobileMockup src={project.image} videoSrc={project.video} alt={project.title} />
                    </div>
                ) : project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${project.fallbackGradient || 'from-gray-400 to-gray-600'} flex items-center justify-center`}>
                        {project.fallbackIcon}
                    </div>
                )}

                {/* Action Overlay */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                            title="View on GitHub"
                        >
                            <FaGithub className="w-5 h-5 text-gray-700" />
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                        <MdFavorite className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
                    {project.title}
                    {project.link && <MdOpenInNew className="w-4 h-4 text-[#0077FF]" />}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Mobile Demo Button for Mobile Projects */}
                {project.isMobile && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
                        {project.video && (
                            <button className="flex-1 text-xs font-bold py-2 px-4 rounded-lg bg-[#0077FF] text-white hover:bg-blue-600 transition-colors">
                                Voir la démo mobile
                            </button>
                        )}
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center text-xs font-bold py-2 px-4 rounded-lg border border-[#0077FF] text-[#0077FF] hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            >
                                Voir le site (Vercel)
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    if (project.link) {
        return (
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full cursor-pointer"
            >
                {content}
            </a>
        );
    }

    return <div className="h-full">{content}</div>;
};

export default ProjectCard;
