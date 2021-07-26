import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { App } from './App'
import { ArticlePage } from './pages/article'
import { LandingPage } from './pages/landing'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'

ReactDOM.render(
  <BrowserRouter>
    <Hero /> 
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/article/:id" children={<ArticlePage />} />
    </Switch>
    <Footer />
  </BrowserRouter>,
  document.getElementById('root'),
)
