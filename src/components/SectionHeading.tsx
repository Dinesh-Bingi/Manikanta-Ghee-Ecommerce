import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  className?: string;
  light?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  subtitle,
  align = 'center',
  className = '',
  light = false
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {kicker && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3 py-1 text-xs tracking-[0.2em] uppercase font-semibold mb-3 ${
            light ? 'text-[#C49A45] bg-[#FFFDF8]/10' : 'text-[#70431F] bg-[#C49A45]/15'
          } rounded-full`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
          {kicker}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight leading-tight ${
          light ? 'text-[#FFFDF8]' : 'text-[#432713]'
        }`}
      >
        {title}
      </motion.h2>

      {/* Elegant minimalist gold separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`flex items-center gap-3 my-4 ${isCenter ? 'justify-center' : 'justify-start'}`}
      >
        <span className="h-[1px] w-8 bg-[#C49A45]/40" />
        <span className="w-1.5 h-1.5 rotate-45 bg-[#C49A45]" />
        <span className="h-[1px] w-8 bg-[#C49A45]/40" />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={`text-base sm:text-lg leading-relaxed font-sans ${
            light ? 'text-[#F4EBDD]/80' : 'text-[#66594D]'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
