import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Map from '../components/Map'
import GroupCard from '../components/GroupCard'

export const IndexPageTemplate = ({
  title,
  selectedGroup,
  setGroup
}) => {
  console.log('set grou', setGroup)
  return (
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        // backgroundImage: `url(${
        //   !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        // })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '70px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: '#f7ed54',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1>

      </div>
    </div>
    <section className="section--gradient main-page-container full-width-section">
        <div className="columns">
          <div className="column is-8">
              <Map 
                setGroup={setGroup}
                />
          </div>
          <div className="column is-4 sidebar">
              {selectedGroup ? <GroupCard 
                                  title={selectedGroup.frontmatter.title} 
                                  city={selectedGroup.frontmatter.location.city}
                                  state={selectedGroup.frontmatter.location.state}
                                  url={selectedGroup.frontmatter.social.url}
                                  facebook={selectedGroup.frontmatter.social.facebook}
                                  twitter={selectedGroup.frontmatter.social.twitter}
                                  instagram={selectedGroup.frontmatter.social.instagram}

                                  /> : 
                                  <div className="is-parent card-container" >

                                    <article
                                      className="blog-list-item tile is-child box"
                                    >
                                    Click a group marker on the map to see more information
                                    </article>
                                  </div>
                                  }
              
          </div>
        </div>
    </section>
  </div>
)}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      group: null
    }
  }

  setGroup = (group) => {
    this.setState({group})
  }
  render ()  {
    const { data } = this.props;
    const { frontmatter } = data.markdownRemark
    return (
      <Layout>
        <IndexPageTemplate
          image={frontmatter.image}
          title={frontmatter.title}
          heading={frontmatter.heading}
          subheading={frontmatter.subheading}
          mainpitch={frontmatter.mainpitch}
          description={frontmatter.description}
          intro={frontmatter.intro}
          selectedGroup={this.state.group}
          setGroup={this.setGroup}
        />
      </Layout>
    )
  }
}


IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
      }
    }
  }
`
