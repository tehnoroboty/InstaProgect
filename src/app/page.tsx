// "lint": "next lint",

import { Button } from '@/src/components/button/Button'
import { CheckBox } from '@/src/components/checkbox/CheckBox'

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <Button>Send</Button>
      <hr />
      <CheckBox checked />
    </div>
  )
}
export default Home
