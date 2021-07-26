import React from 'react'
import styled from 'styled-components'

const PageContainer = styled.div`
  padding: 0 5%;
  padding-right: 2rem;
  padding-left: 2rem;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 1180px;
`

const FeaturedArticles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`

const Categories = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px
`

const LandingPage = () => {
  return (
    <div>
      <PageContainer>
        <FeaturedArticles>
          <h1>
            Featured Articles
          </h1>
        </FeaturedArticles>

        <Categories>
          <h1>Categories</h1>
        </Categories>
      </PageContainer>
    </div>
  )
}

export { LandingPage }