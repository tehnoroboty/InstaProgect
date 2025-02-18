import React from 'react'

import Image from 'next/image'

type Props = {
  posts: Array<string>
}

export const Posts = ({ posts }: Props) => {
  return (
    <div>
      {posts.map((post, index) => {
        return <Image alt={''} src={''} />
      })}
    </div>
  )
}
