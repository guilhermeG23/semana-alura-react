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
import InputNomeChange from '../src/components/InputNomeChange';
import BotaoConfirmar from '../src/components/BotaoConfirmar';
import FormNome from '../src/components/FormRequisicao';

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

//Boas praticas, usar => em vez de function
/*
Ex:
De: <FormNome onSubmit={function(evento) {evento.preventDefault(); props.router.push(`./quiz?name=${nome}`);}}>
Para: <FormNome onSubmit={(evento) => {evento.preventDefault(); props.router.push(`./quiz?name=${nome}`);}}>
*/
export default function Home() {
  //Tem que ficar para fora do render, ele pode ser chamado mas não instanciado lá
  const router = useRouter();
  const [nome, setNome] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo/>
        <GitHubCorner projectUrl="https://github.com/guilhermeG23"/>
        <Widget>
          <Widget.Header>
            <Title>Começar Quiz sobre FGO e ver o quão pouca vida social você tem!</Title>
          </Widget.Header>
          <Widget.Content>
            <FormNome onSubmit={(evento) => {evento.preventDefault(); router.push(`/quiz?nome=${nome}`);}}>
              <InputNomeChange placeholder="Entre com o nome" onChange={(evento) => {setNome(evento.target.value);}} value={nome}/>
              <BotaoConfirmar>Jogador {nome}</BotaoConfirmar>
            </FormNome>
          </Widget.Content>
        </Widget>
        <Footer/>
      </QuizContainer>
    </QuizBackground>
  )
}

