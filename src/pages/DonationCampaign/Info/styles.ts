import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh; // Viewport Height
  padding: 1rem 10rem;
`

export const HeaderContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

export const DonationCampaignInfoContainer = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  gap: 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);

  background-color: #fff;
`
