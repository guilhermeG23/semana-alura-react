//Ele procura o windows por padrao
//Pessoal
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'
import QuizContainer from '../src/components/QuizContainer'
import db from '../db.json';
import dbExtra from '../dbExtras.json';
import Title from '../src/components/Title';
import BotaoConfirmar from '../src/components/BotaoConfirmar';
import FormRequisicao from '../src/components/FormRequisicao';


function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                <Title>Fou perseguindo a pergunta...</Title>
            </Widget.Header>
            <Widget.Content>
            <img alt="Descrição" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                background: 'center'
            }}
            src={dbExtra.loadingFou}/>
            </Widget.Content>
        </Widget>
    );
  }

/*
//Ver o JSON via browser
<pre>
    {JSON.stringify(question, null, 4)}
</pre>
*/

function QuestionWidget({question, questionIndex, totalQuestions, onSubmit}) {
    const questionId = `question__${questionIndex}`;
    const [respostaDada, setValorRadio] = React.useState('');

    return (
        <Widget>
            <Widget.Header>
                <Title>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`};</Title>
            </Widget.Header>
            <img alt="Descrição" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                background: 'center'
            }}
            src={question.image}/>
            <ImagemApresenta imagemSelecionada={question.image}/>
            <Widget.Content>
                <FormRequisicao onSubmit={(evento) => {
                    evento.preventDefault();
                    {question.answer === respostaDada && alert("Acertou");}
                    {question.answer !== respostaDada && alert("Errou");}
                    onSubmit();
                }}>
                    <h2>{question.title}</h2>
                    <p>{question.description}</p>
                    {question.alternatives.map((alternativa, alternativaIndex) => {
                        const alternativaId = `${alternativaIndex}`;
                        return <Widget.Topic as="label" htmlFor={alternativaIndex}>{alternativa}<input onChange={(evento) => {setValorRadio(evento.target.value);}} type="radio" id={alternativaId} value={alternativaId} name={questionId} required/></Widget.Topic>
                    })}
                    <BotaoConfirmar type="submit">Confirmar</BotaoConfirmar>
                </FormRequisicao>
              </Widget.Content>
        </Widget>
    );
}

function Terminou(props) {
    return (
        <Widget>
            <Widget.Header>
                <Title>Finalizada as questões</Title>
            </Widget.Header>
            <Widget.Content>
            <img alt="Descrição" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                background: 'center'
            }}
            src={dbExtra.angra}/>
                {props.children}
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ:"QUIZ",
    LOADING:"LOADING",
    RESULT:"RESULT"
}

/*
Estado de vida de um componente
-> Cria, utiliza(atualiza sues status) e demonsta da tela
*/


export default function Home() {
    const totalQuestions =  db.questions.length;
    const [questaoAtual, setQuestaoAtual] = React.useState(0);
    const questionIndex = questaoAtual;
    const question = db.questions[questionIndex];
    const [screenState, serScreenState] = React.useState(screenStates.LOADING); //Estado inicial
    
    //Evitar colocar isso sem um React effects -> Causa loop por montar demais a entidade e derruba a aplicacao
    React.useEffect(() => {
        setTimeout(() => {
            serScreenState(screenStates.QUIZ);
        }, 1 * 1000);
    }, []);
    
    //proxima questao
    function handleSubmit() {
        const proximQuestao = questionIndex + 1;
        if (proximQuestao < totalQuestions) {
            setQuestaoAtual(questionIndex + 1);
        } else {
            serScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo/>
                <GitHubCorner projectUrl="https://github.com/guilhermeG23"/>
                {screenState === screenStates.QUIZ && <QuestionWidget question={question} questionIndex={questionIndex} totalQuestions={totalQuestions} onSubmit={handleSubmit}/>}
                {screenState === screenStates.LOADING && <LoadingWidget/>}
                {screenState === screenStates.RESULT && <Terminou>Bye...</Terminou>}
                <Footer/>
            </QuizContainer>
        </QuizBackground>
    );   
}  