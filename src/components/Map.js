import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

import L from 'leaflet';

import './map.scss';

class VetMap extends React.Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  componentDidMount() {
    // initialize the map on the "map" div with a given center and zoom
    const map = L.map('map', {
      bounds: [
        [23.6, -128.8],
        [50.2, -65.4],
      ],
      center: [39.8097343, -98.5556199],
      zoom: 4
    });
    map.scrollWheelZoom.disable();

    this.map = map;
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png', {
      foo: 'bar',
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    const {
      data
    } = this.props
    const {
      edges: groups
    } = data.allMarkdownRemark
    this.addMarkers(groups);
    this.map.on('click', function () {
    
        map.scrollWheelZoom.enable();
      
    });
  }


  addMarkers = (groups) => {
    console.log(this.props)
    const { setGroup } = this.props;
    console.log(setGroup)
    const { map: thisMap } = this;
    const me = this;
    if (!thisMap) {
      return;
    }
    const icon = L.icon({
      iconUrl: require('../img/marker.png'),
      iconSize: [20, 30],
      iconAnchor: [10, 30],
      popupAnchor: [10, -30],

    });
    groups.map(({node: group}) => {
      const location = JSON.parse(group.frontmatter.location.location)
      const latlng = [location.coordinates[1], location.coordinates[0]]
      const popupContent = `<div>${group.frontmatter.title} <br/>
        ${group.frontmatter.location.city} <br />
        ${group.frontmatter.location.state}
      </div>`
      let marker = L.marker(latlng, {
        icon
      }).addTo(thisMap);
      marker.on('mouseover', function (e) {
        //open popup;
        me.popup = L.popup()
          .setLatLng(e.latlng)
          .setContent(popupContent)
          .openOn(thisMap);
      });
      marker.on('mouseout', function (e) {
        me.popup.remove();
      });
      marker.on('click', (e) => {
        setGroup(group)
      })
    })
  }

  render() {
    return (<div className="leaflet-container" id="map"></div>
    )
  }
}

VetMap.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query vetMapQuery {
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
                social {
                  url
                  twitter
                  facebook
                  instagram
                }
                location {
                  city
                  state
                  location
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (<VetMap data={data} count={count} setGroup={props.setGroup} />)}
  
  />
)
