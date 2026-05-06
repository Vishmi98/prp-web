import React from 'react'

import Hero from '@/modules/home/ui/Hero'
import OurServices from '@/modules/home/ui/OurServices'
import Results from '@/modules/home/ui/Results'
import Team from '@/modules/home/ui/Team'


const Home = () => {
  return (
    <div>
      <Hero />
      <OurServices />
      <Results />
      <Team />
    </div>
  )
}

export default Home