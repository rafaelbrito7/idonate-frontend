import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 35rem;
  background-color: #f8f8f8; //
`

export const FormContainer = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid #e0e0e0;
  gap: 2rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
`

export const ButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1rem;

  Button {
    padding: 0.5rem 1rem;
    transition: transform 0.2s;
    width: 100%;

    &:hover {
      transform: translateY(-2px);
    }
  }
`
