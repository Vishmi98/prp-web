import React from 'react'

import AboutHero from '@/modules/about/ui/AboutHero'
import OurStory from '@/modules/about/ui/OurStory'
import Mission from '@/modules/about/ui/Mission'
import Team from '@/modules/home/ui/Team'
import SuccessStories from '@/modules/home/ui/SuccessStories'


const AboutPage = () => {
    return (
        <main>
            <AboutHero />
            <OurStory />
            <Mission />
            <Team />
            <SuccessStories />
        </main>
    )
}

export default AboutPage