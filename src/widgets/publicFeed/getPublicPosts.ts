export const getUsersCount = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}public-user`, {
    cache: 'no-store',
  })

  return await res.json()
}

export const getUsersPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}public-posts/all?endCursorPostId=0&pageSize=4`,
    {
      cache: 'no-store',
    }
  )

  return await res.json()
}
