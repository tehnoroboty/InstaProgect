export const fetchPublicUserProfile = async (userId: number) => {
  //TODO .env.development
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public-user/profile/${userId}`, {
    cache: 'no-store', // SSR - отключаем кеш
  })

  if (!res.ok) {
    throw new Error('Failed to fetch public user profile')
  }

  return res.json()
}

export const fetchPublicUserPosts = async (userId: number) => {
  const queryParams = new URLSearchParams({
    pageSize: '8',
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public-posts/user/${userId}?${queryParams}`,
    {
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch public user posts')
  }

  return res.json()
}
