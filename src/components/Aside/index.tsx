import React from 'react'
import './aside.css'

const articles = [
  {
    title: "Test"
  },
  {
    title: "West"
  }
]

const Aside = () => {
  return <aside className="lg:col-4">
    <div className="bg-f5f5f5 py-4 px-6 my-6 article-list">
      <h3 className="my-4">
        Articles in this section
      </h3>
      <ul className="list-unstyled">
        {
          articles.map(article => <li>
            <a>
              {article.title}
            </a>
          </li>)
        }
      </ul>
      <p className="w-full my-5">
        <a href="support.acorns.com">
          See more
          </a>
      </p>
    </div>
    <div className="bg-gray-200 py-4 px-6 my-6 support-box">
      <h3 className="my-4 support-box-header">
        Still need some help?
    </h3>
      <p>
        Our team of experts are just a click away
    </p>
    </div>
  </aside>
}

export { Aside }