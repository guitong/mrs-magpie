import React, { Component } from "react"
import { Link } from "gatsby"

import { rhythm } from "../utils/typography"

class Footer extends Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <a href="mailto:guitong.geng@gmail.com">email</a>
        <a href="https://twitter.com/gt_geng">twitter</a>
        <a href="https://github.com/guitong">github</a>
        <Link to={`/about`}>About Me</Link>
      </footer>
    )
  }
}

export default Footer
