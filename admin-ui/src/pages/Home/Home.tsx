import React, { FC, useEffect } from 'react'

import LayoutContainer from '../../components/LayoutContainer'

import StartScreen from './sections/StartScreen'
import WhatDoWant from './sections/WhatDoWant'
import HowWorks from './sections/HowWorks'
import UpcomingEvents from './sections/UpcomingEvents'
import Stats from './sections/Stats'
import Organizators from './sections/Organizators'

let wasViewed = false

const Home: FC = () => {
  useEffect(() => {
    wasViewed = !wasViewed
  }, [wasViewed])

  return (
    <>
      <LayoutContainer>
        <StartScreen />
        <WhatDoWant />
        <HowWorks />
      </LayoutContainer>
      <UpcomingEvents />
      <LayoutContainer>
        <Stats />
        <Organizators />
      </LayoutContainer>
    </>
  )
}

export default Home
