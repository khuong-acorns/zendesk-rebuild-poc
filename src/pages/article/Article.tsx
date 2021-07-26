import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 0 5%;
  padding-right: 2rem;
  padding-left: 2rem;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
`

const H1 = styled.h1`
  font-size: 2.25rem;
  font-weight: 600;
`

const Article = (props: any) => {
  const { article } = props
  return article ? (
    
    <Container>
        <div className="row row-lg pt-4 pb-6">
          <article className="col">
            <header className="mb-5 mt-130p">
              <H1>
                {article ? article.title : ""}
              </H1>
            </header>

            <section className="content">
              <div dangerouslySetInnerHTML={{ __html: article ? article.body : "" }} />
            </section>
          </article>
        </div>
    </Container>
  ) : null
}

export { Article }