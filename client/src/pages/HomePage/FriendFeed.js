// Necessary Import
import styled from "styled-components";

const FriendFeed = ({friendArray}) => {

  return (
    <>
      {friendArray.map((friend, index) => {
        return (
          <DivContainer key={index}>
            <h3 className="name">{friend.firstName} {friend.lastName}</h3>
            <h3>New Recipe!</h3>
            <p>{friend.lastRecipe[0].name}</p>
            <div className="prepTime">
              <svg width="25" height="25" viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="0" r="90" fill="#f0f0f0" stroke="#333" stroke-width="2"/>
                  <g stroke="#333" stroke-width="4">
                    <line x1="0" y1="-80" x2="0" y2="-70"/>
                    <line x1="80" y1="0" x2="70" y2="0"/>
                    <line x1="0" y1="80" x2="0" y2="70"/>
                    <line x1="-80" y1="0" x2="-70" y2="0"/>
                  </g>
                  <line x1="0" y1="0" x2="0" y2="-50" stroke="#333" stroke-width="6"/>
                  <line x1="0" y1="0" x2="30" y2="0" stroke="#333" stroke-width="4"/>
                  <circle cx="0" cy="0" r="4" fill="#333"/>
              </svg>
              <p>{friend.lastRecipe[0].prepTime}</p>
            </div>
            <div className="tagDiv">
              {friend.lastRecipe[0].tags.map((tag, index) => {
                return (
                  <p key={index}>{tag}</p>
                )
              })}
            </div>
          </DivContainer>
        )
      })}
    </>
  )
}

export default FriendFeed

const DivContainer = styled.div`
  background-color: lightgray;
  width: 30vw;
  padding: 1em;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -6px 0px inset;
  & .name {
    border-bottom: solid black 1px;
  }
  & .prepTime {
    display: flex;
    align-items: center;
  }
  & .tagDiv {
    display: flex;
    & > p {
      margin: 0em 1em 0em 0em;
      padding: 0.5em;
      border: solid black 1px;
      border-radius: 30%;
    }
  }
`