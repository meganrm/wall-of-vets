import React from 'react'

import Layout from '../../components/Layout'
import NewsGrid from '../../components/NewsGrid'

export default class NewsPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/blog-index.jpg')`,
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
          >
            News Stories
          </h1>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <NewsGrid />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}