import PulseLoader from 'react-spinners/PulseLoader'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <PulseLoader
      color={'#ffffff'}
      cssOverride={{
        alignItems: 'center',
        color: '#ffffff',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
      }}
      margin={10}
      size={25}
    />
  )
}
