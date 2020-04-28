import React from "react"
import "./layout.css"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header
  header = (
    <header
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        justifyContent: `space-between`,
        marginBottom: rhythm(1.6),
        alignItems: `center`,
      }}
    >
      <div
        style={{
          ...scale(0.8),
          marginTop: 0,
          fontFamily: `monospace, Helvetica, sans-serif`,
        }}
      >
        <Link to={`/`}>{title}</Link>
      </div>
      <nav>
        <a href="http://picapica.space/rss.xml">rss</a>
      </nav>
    </header>
  )

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(26),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      {header}
      <main>{children}</main>
      {location.pathname === rootPath && (
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          <Link to={`/about`}>About Me</Link>
        </footer>
      )}
    </div>
  )
}

export default Layout
