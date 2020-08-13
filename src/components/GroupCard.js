import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import facebookLogo from '../img/social/facebook.svg'
import instagramLogo from '../img/social/instagram.svg'
import twitterLogo from '../img/social/twitter.svg'


class GroupCard extends React.Component {

  render() {

    const {
      title,
      city,
      state,
      url,
      twitter,
      facebook,
      instagram
    } = this.props;
    return (
            <div className="is-parent card-container" >

              <article
                className="blog-list-item tile is-child box"
              >
                <header>
                  <div className="post-meta">
                    <div className="header">
                  
                        <h4>{title}</h4>
                    </div>
                    <div>{city}, {state}</div>
 
                    <ul className="taglist unstyled-list">
                        {facebook && <a title="facebook" href={`https://facebook.com/${facebook}`}>
                            <img
                                src={facebookLogo}
                                alt="Facebook"
                                style={{ width: '1em', height: '1em' }}
                            />
                        </a>}
                        {twitter && <a title="twitter" href={`https://twitter.com/${twitter}`}>
                            <img
                                className="fas fa-lg"
                                src={twitterLogo}
                                alt="Twitter"
                                style={{ width: '1em', height: '1em' }}
                            />
                        </a>}
                        {instagram && <a title="instagram" href={`https://instagram.com/${instagram}`}>
                            <img
                                src={instagramLogo}
                                alt="Instagram"
                                style={{ width: '1em', height: '1em' }}
                            />
                        </a>}
                    </ul>
                  </div>
                </header>
              </article>
            </div>
        
    )
  }
}

GroupCard.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default GroupCard
