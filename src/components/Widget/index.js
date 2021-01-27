//Tem que ter a lib para ele saber de onde é
import styled from 'styled-components'

//Todo mundo esta herdado pelo widget
const Widget = styled.div`
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid #4CAF50;
    background-color: #1C1814;
    border-radius: 4px;
    overflow: hidden;
`
//Isso faz referencia que esse é um filho de um ja declarado
Widget.Content = styled.div`
    padding: 24px 32px 32px 32px;
    & > *:first-child {
    margin-top: 0;
    }
    & > *:last-child {
    margin-bottom: 0;
    }
    ul {
    list-style: none;
    padding: 0;
}
`
Widget.Header = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 18px 32px;
    background-color: ${({theme}) => theme.colors.primary};
    * {
    margin: 0%;
}
`
export default Widget;