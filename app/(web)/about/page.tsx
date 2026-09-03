import React from 'react'

import AboutHero from '@/modules/about/ui/AboutHero'
import OurStory from '@/modules/about/ui/OurStory'
import Mission from '@/modules/about/ui/Mission'
import Team from '@/modules/home/ui/Team'
import SuccessStories from '@/modules/home/ui/SuccessStories'
import FrequentlyAskedQuestions from '@/modules/home/ui/FrequentlyAskedQuestions'


const AboutPage = () => {
    return (
        <main>
            <AboutHero />
            <OurStory />
            <Mission />
            <Team />
            <SuccessStories />
            <FrequentlyAskedQuestions />
        </main>
    )
}

export default AboutPage