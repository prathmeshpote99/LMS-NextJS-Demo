import { Spinner } from 'reactstrap'
const ButtonLoader = ({ height = '2rem', width = '2rem' }) => {
  console.log('height1', height)
  return (
    <>
      <Spinner
        className="ms-2"
        style={{
          color: '#aeaeae',
          zIndex: '1000',
          width: width,
          height: height,
          marginRight: '10px',
        }}
      />
    </>
  )
}

export default ButtonLoader
