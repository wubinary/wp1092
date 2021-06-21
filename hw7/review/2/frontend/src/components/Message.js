import styled, { css } from 'styled-components'

const MessageDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ samePerson }) => {
    if (samePerson) {
      return css`     
        flex-direction: row-reverse;
        `
    }
    else
      return css`
        flex-direction: row;
      `
  }}
`

const MessageText = styled.p`
  background-color: #e0e0e0;
  border-radius: 20%;
  padding: 3px;
`

export default function Message({ me, name, message }) {
  return (
    <MessageDiv samePerson={me === name}>
      <p>{name}</p>
      <p>&ensp;</p>
      <MessageText>{message}</MessageText>
    </MessageDiv>
  )
}