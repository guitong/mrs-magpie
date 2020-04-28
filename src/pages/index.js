import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { formatReadingTime } from "../utils/helpers"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h1
                style={{
                  marginBottom: rhythm(1 / 4),
                  display: `flex`,
                  alignItems: `center`,
                }}
              >
                <Link
                  style={{ boxShadow: `none`, margin: `0 10px` }}
                  to={node.fields.slug}
                >
                  {title}
                </Link>
                {!!node.frontmatter.translation && (
                  <svg
                    t="1588056010842"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="772"
                    width="1rem"
                    height="1rem"
                  >
                    <path
                      d="M128 64c-35.345655 0-64 28.654345-64 64v768c0 35.345655 28.654345 64 64 64h768c35.345655 0 64-28.654345 64-64v-768c0-35.345655-28.654345-64-64-64h-768z m0-64h768C966.692487 0 1024 57.307513 1024 128v768C1024 966.692487 966.692487 1024 896 1024h-768C57.307513 1024 0 966.692487 0 896v-768C0 57.307513 57.307513 0 128 0z m329.143025 251.428487h301.715127v68.571513c-18.020046 27.895172-58.368 67.967706-96.000589 96.000589 24.064 8.704 69.777949 13.274336 137.143026 13.71336l-13.714538 68.57269c-63.360883-7.297471-123.483807-31.818152-164.572102-54.858152-43.775411 21.120294-101.211218 41.41668-164.570924 54.856975l-27.429076-68.571513c56.378851-8.492138 100.279025-12.452782 137.143026-27.427898-28.031706-24.960883-54.747513-45.038345-68.571513-82.286051h-41.142437v-68.571513z m114.85749 68.571513c12.288 25.728294 22.271411 41.183632 47.998529 60.000515 31.873471-19.969177 45.072478-35.424515 60.048772-60.000515h-108.047301zM512 512h68.571513v-41.142437h68.556211V512h68.586814v68.571513h-68.586814v41.142436h109.729251v68.57269h-109.729251v109.712772H580.57269v-109.713949h-109.71395v-68.571513h109.71395V580.57269H512V512zM306.285462 223.999411c34.286345 22.113692 81.117278 54.858152 109.713949 82.286051l-54.856974 68.57269c-21.504-26.113177-54.527411-65.665471-95.999412-96.000589l41.142437-54.856974z m137.157149 397.714538v54.856975c-56.437701 53.431614-97.586023 90.002538-123.442611 109.715127l-36.000074-58.28561c10.752-9.600883 22.285536-25.042097 22.285536-37.714979V470.857563h-82.284873v-68.572689h150.857563V662.857563c28.631982-9.103007 51.494253-22.817545 68.584459-41.143614z"
                      fill="#232333"
                      p-id="773"
                    ></path>
                  </svg>
                )}
              </h1>
              <small>
                {node.frontmatter.date}{" "}
                {` • ${formatReadingTime(node.timeToRead)}`}
              </small>
            </header>
            <section>
              <p
                style={{ marginBottom: 0 }}
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
            <section>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                read more ⟶
              </Link>
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            translation
          }
        }
      }
    }
  }
`
