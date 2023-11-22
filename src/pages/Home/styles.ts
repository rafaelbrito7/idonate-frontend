import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh; // Viewport Height
  padding: 1rem 10rem;
`

export const ContentContainer = styled.div`
  overflow: auto; // If content is too large, it will scroll internally
  margin-top: 1rem;
  flex: 1;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 2rem;
  margin-top: 1rem;
`

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center; // Center the pagination horizontally
  align-items: center; // Center the pagination vertically
  padding: 20px 0; // Add some vertical padding if necessary
`
