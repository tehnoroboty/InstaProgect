import s from '@/src/components/postLikesBox/postLikesBox.module.scss'

export const PostLikesBox = () => {
  return (
    <div className={s.postLikes}>
      <div className={s.postLikesAvatars}></div>
      <div className={s.likeCount}></div>
    </div>
  )
}
