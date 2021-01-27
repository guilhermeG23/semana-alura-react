//import styled from 'styled-components'
//Libs do React
import { useRouter } from 'next/router';

//Ele procura o windows por padrao
//Pessoal
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'
import QuizContainer from '../src/components/QuizContainer'
import db from '../db.json';
import Title from '../src/components/Title';
import InputNome from '../src/components/InputNome';
import BotaoNome from '../src/components/BotaoNome';
import FormNome from '../src/components/FormNome';

//Styled
/*
const Teste = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
*/

//React da a opção de criar as proprias 

//function Title() { -> Gera erro por passar por cima
//props -> propicidade -> propriedade
/*
function Saida() {
  return <h1>teste</h1>
}
*/

//Os consts declarados não são react, são JS puro

//tag function -> ``
/*
const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;
`
*/

//, {disabled: ${props.children.length === 0}}
//{type: 'submit'}

//Funcao vai representar uma saida
//    <div style={{ backgroundImage: `url(${db.bg})`}}>
export default function Home() {
  //Tem que ficar para fora do render, ele pode ser chamado mas não instanciado lá
  const router = useRouter();
  const [nome, setNome] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo></QuizLogo>
        <GitHubCorner projectUrl="https://github.com/guilhermeG23"/>
        <Widget>
          <Widget.Header>
            <Title>Titulo</Title>
          </Widget.Header>
          <Widget.Content>
            <FormNome onSubmit={function (evento) {evento.preventDefault(); props.router.push(`./quiz?name=${nome}`);}}>
              <InputNome onChange={function (evento){ setNome(evento.target.value);}}/>
              <BotaoNome>Jogador {nome}</BotaoNome>
            </FormNome>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <p>Teste</p>
          </Widget.Content>
        </Widget>
        <Footer></Footer>
      </QuizContainer>
    </QuizBackground>
  )
}

