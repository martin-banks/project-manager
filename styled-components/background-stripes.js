import styled from 'styled-components'

const BackgroundStripe = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(45deg, rgba(0,0,0, 0) 49%, rgba(0,0,0,0.25) 50%, rgba(0,0,0, 0) 51%);
  background-size: 1rem 1rem;
  background-repeat: repeat;
  z-index: -1;
`

export default BackgroundStripe
