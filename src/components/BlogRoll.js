import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
// import {
//   Map,
//   TileLayer,
//   Marker,
//   Popup
// } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import './map.scss';

class BlogRoll extends React.Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  render() {
    const { data } = this.props
    const { edges: groups } = data.allMarkdownRemark

    const position = [this.state.lat, this.state.lng]
    // console.log(groups)
    return (<di></di>
      // <Map 
      //   bounds = {
      //     [
      //       [23.6 , - 128.8 ],
      //       [50.2 , - 65.4 ],
      //     ]
      //   }
      //   zoom={4}
      //   >
      //   <TileLayer
      //     attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      //     url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png"
      //   />
        /* {groups.map(({node: group}) => (
            <Marker position={position}>
              <Popup>{group.frontmatter}</Popup>
            </Marker>
        ))} */
      // </Map>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "group" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                twitter
                location
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
