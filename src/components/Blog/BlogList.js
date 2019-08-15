import React from 'react'
import BlogCard from "./BlogCard"
import Title from "../Title"
import { useStaticQuery,graphql } from "gatsby"
import styles from "../../css/blog-card.module.css"

const getPosts = graphql`
query{
    posts: allContentfulPostExample(sort: {fields: published, order: DESC}) {
      edges {
        node {
          published(formatString: "MMMM Do, YYYY")
          createdAt(formatString: "LLLL")
          title
          slug
          id: contentful_id
          images {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
const BlogList = () => {
const { posts } = useStaticQuery(getPosts)

    return (
        <section className={styles.blog}>
            <Title title="our" subtitle="blogs" />
            <div className={styles.center}>
                {posts.edges.map(({node})=>{
                return <BlogCard key={node.id} blog={node} />
                })}
            </div>
        </section>
    )
}

export default BlogList
