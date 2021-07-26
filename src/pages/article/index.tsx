import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from "axios"

import { Article } from "./Article"

import { Aside } from '../../components/Aside'
import { useParams } from 'react-router'

const PageContainer = styled.div`
  padding: 0 5%;
  padding-right: 2rem;
  padding-left: 2rem;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 1180px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
`

const ArticlePage = () => {
  const [article, setArticle] = useState({})
  let { id } = useParams()

  useEffect(() => {
    axios.get(`https://acorns.zendesk.com/api/v2/help_center/en-us/articles/${id}.json`).then(({data: { article }}) => {
      setArticle(article)
    })
  }, [])

  console.log("article: ", article)

  return (
    <div>
      <PageContainer>
        <Container>
          <Article article={article}/>
          <Aside />
        </Container>
      </PageContainer>
    </div>
  )
}

export { ArticlePage }