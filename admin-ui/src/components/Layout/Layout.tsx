import React from 'react'
import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

import Header from '../Header'
import Footer from '../Footer'
import LayoutContainer from '../LayoutContainer'

const Layout = () => (
  <motion.main
    initial={{ opacity: 0 }}
    exit={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.2 }}
  >
    <Header />
    <LayoutContainer>
      <Outlet />
      <Footer />
    </LayoutContainer>
  </motion.main>
)

export default Layout
