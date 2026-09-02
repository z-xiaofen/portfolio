<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import AiSection from './components/AiSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import HobbiesSection from './components/HobbiesSection.vue'
import Footer from './components/Footer.vue'
import { useReveal } from './composables/useReveal'
import { useParallax } from './composables/useParallax'

useReveal()
useParallax()
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <AiSection />
    <ExperienceSection />
    <HobbiesSection />
  </main>
  <Footer />
</template>