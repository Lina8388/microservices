import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { ModeratorPage } from './pages/ModeratorPage'
import Layout from './components/Layout'
import Home from './pages/Home'
import { SignInPage, SignUpPage } from './pages/SignPage'
import PeoplePage from './pages/People/PeoplePage'
import EventsList from './pages/EventsList'
import PersonalArea from './pages/PersonalArea/PersonalArea'
import { UploadTest } from './pages/UploadTest'
import AboutUser from './pages/PersonalArea/AboutUser'

const App = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="events/:city" element={<EventsList />} />
          <Route path="personal-area" element={<PersonalArea />} />
          <Route path="/public/user/id/:id" element={<AboutUser />} />
        </Route>
        <Route path="moderator" element={<ModeratorPage />} />
        <Route path="/upload-test" element={<UploadTest />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
