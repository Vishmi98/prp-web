import React from 'react'

import Blogs from '@/modules/blogs/ui/Blogs'
import BlogsHero from '@/modules/blogs/ui/BlogsHero'


const BlogsPage = () => {
    return (
        <main>
            <BlogsHero />
            <Blogs />
        </main>
    )
}

export default BlogsPage