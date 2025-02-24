import { CroppingPhoto } from '@/src/features/croppingPhoto/CroppingPhoto'

export default function HomePage() {
  return (
    <div>
      <CroppingPhoto
        photo={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS9npT5LfZBpv3qxPUtvJ2u0yKtQ0wajRHLw&s'
        }
      />
    </div>
  )
}
