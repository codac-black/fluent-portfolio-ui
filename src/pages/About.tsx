
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/about/HeroSection';
import MissionSection from '@/components/about/MissionSection';
import SkillsSection from '@/components/about/SkillsSection';
import EducationSection from '@/components/about/EducationSection';
import InterestsSection from '@/components/about/InterestsSection';

const About = () => {
  return (
    <Layout>
      <HeroSection />
      <MissionSection />
      <SkillsSection />
      <EducationSection />
      <InterestsSection />
    </Layout>
  );
};

export default About;
