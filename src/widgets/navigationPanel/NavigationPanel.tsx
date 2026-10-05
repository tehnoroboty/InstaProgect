'use client'
import { useDispatch, useSelector } from 'react-redux'

import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeLine,
  LogOutOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  SearchOutline,
  TrendingUpOutline,
} from '@/src/shared/assets/componentsIcons'
import { AppRoutes } from '@/src/shared/lib/constants/routing'
import { useMeQuery } from '@/src/shared/model/api/authApi'
import { selectIsLoggedIn } from '@/src/shared/model/slices/appSlice'
import { selectIsPostModalOpen, setIsPostModalOpen } from '@/src/shared/model/slices/modalSlice'
import { useAppSelector } from '@/src/shared/model/store/store'
import { AddPost } from '@/src/widgets/addPost/AddPost'
import { MenuMobile } from '@/src/widgets/navigationPanel/menuMobile/MenuMobile'
import Sidebar from '@/src/widgets/navigationPanel/sidebar/Sidebar'
import { MenuItemsType } from '@/src/widgets/navigationPanel/types'

export const NavigationPanel = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data, isSuccess } = useMeQuery(undefined, { skip: !isLoggedIn })
  const isPostModalOpen = useSelector(selectIsPostModalOpen)
  const dispatch = useDispatch()

  if (!isSuccess || !data || !isLoggedIn) {
    return null
  }
  const userId = data.userId

  const createNewPost = () => {
    dispatch(setIsPostModalOpen({ isOpen: true }))
  }

  const menuItems: MenuItemsType = {
    additional: [
      { href: AppRoutes.STATISTICS, icon: TrendingUpOutline, title: 'Statistics' },
      {
        href: AppRoutes.FAVOURITES,
        icon: BookmarkOutline,
        iconActive: Bookmark,
        title: 'Favorites',
      },
    ],
    mainActions: [
      { href: AppRoutes.FEED, icon: HomeLine, iconActive: Home, title: 'Feed' },
      {
        icon: PlusSquareOutline,
        iconActive: PlusSquare,
        onClick: createNewPost,
        title: 'Create',
      },
      {
        href: `${AppRoutes.PROFILE}/${userId}`,
        icon: PersonOutline,
        iconActive: Person,
        title: 'My Profile',
      },
      {
        href: AppRoutes.MESSENGER,
        icon: MessageCircleOutline,
        iconActive: MessageCircle,
        title: 'Messenger',
      },
      { href: AppRoutes.SEARCH, icon: SearchOutline, title: 'Search' },
    ],
    usersActions: [{ icon: LogOutOutline, title: 'Log Out' }],
  }

  return (
    <>
      <MenuMobile items={menuItems.mainActions} />
      <Sidebar items={menuItems} />
      {isPostModalOpen && <AddPost />}
    </>
  )
}
