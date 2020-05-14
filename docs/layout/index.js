/* eslint-disable react/prop-types */
import React from 'react'
import { Box } from '@welcome-ui/box'

import { Header } from '../components/Header'

export const Layout = ({ children }) => {
  return (
    <Box backgroundColor="light.700" display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
      <Header />
      <Box paddingLeft={{ md: 300 }}>
        <Box
          as="main"
          margin="0 auto"
          marginTop={{ xs: 80, md: 0 }}
          maxWidth={1000}
          p={{ xs: 'md', md: 'xxl' }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
