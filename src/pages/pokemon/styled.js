import styled from "styled-components"

export const VideoContainer = styled.div`
  width: 100%;
  height: 25%;
  background: white;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  color: black;

  video {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`