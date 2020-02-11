import { graphql, PageRendererProps } from "gatsby"
import React from "react"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { Query, SitePageContext } from "../graphql-types"

interface Props extends PageRendererProps {
  pageContext: SitePageContext
  data: Query
}

const BlogPostTemplate = (props: Props) => {
  const data = props.data!
  const post = data.markdownRemark!
  const excerpt = post.excerpt!
  const frontmatter = post.frontmatter!
  const html = post.html!

  return (
    <Layout location={props.location} title={"Home"}>
      <SEO
        title={frontmatter.title!}
        description={frontmatter.description || excerpt}
      />
      <h1>{post.frontmatter!.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
