import React from 'react'

import styled from 'styled-components'

import { ArticlePage } from './pages/article'

const Container = styled.div`
  margin-top: 140px;
`

const App = () => (
      <Container>
        <ArticlePage />
      </Container>
)

export { App }
