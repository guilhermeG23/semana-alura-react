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
import AlternativesForm from '../src/components/AlternativesForm';


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

function QuestionWidget({question, questionIndex, totalQuestions, onSubmit, addResult}) {
    const questionId = `question__${questionIndex}`;
    const [respostaDada, setValorRadio] = React.useState(undefined); //Basicamente inicia como NULL
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
    const isCorrect = question.answer === respostaDada;
    const hasAlternativeSelected = respostaDada !== undefined;

    //<input onChange={(evento) => {setValorRadio(evento.target.value);}} type="radio" id={alternativaId} value={alternativaId} name={questionId} required/>

    return (
        <Widget>

            <Widget.Header>
                <Title>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`};</Title>
            </Widget.Header>
            <img alt="Descrição" style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                background: 'center'
            }}
            src={question.image}/>
            <Widget.Content>
                <AlternativesForm onSubmit={(evento) => {
                    evento.preventDefault();
                    //{question.answer == respostaDada && alert("Acertou");}
                    //{question.answer != respostaDada && alert("Errou");}
                    setIsQuestionSubmited(true);
                    setTimeout(() => {
                        addResult(isCorrect);
                        setIsQuestionSubmited(false);
                        setValorRadio(undefined);                        
                        onSubmit();
                    }, 3 * 1000);
                }}>
                    <h2>{question.title}</h2>
                    <p>{question.description}</p>
                    {question.alternatives.map((alternativa, alternativaIndex) => {
                        const alternativaId = `${alternativaIndex}`;
                        const SelecioneAlternativaStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const estaSelecionado = respostaDada === alternativaIndex;
                        console.log(respostaDada, isQuestionSubmited && SelecioneAlternativaStatus);
                        return (
                            <Widget.Topic as="label" key={alternativaId} htmlFor={alternativaIndex} data-selected={estaSelecionado} data-status={isQuestionSubmited && SelecioneAlternativaStatus}>
                                <input onChange={() => {setValorRadio(alternativaId);}} type="radio" id={alternativaId} value={alternativaId} name={questionId} required/>
                                {alternativa}
                            </Widget.Topic>
                        );
                    })}
                    <BotaoConfirmar type="submit" disabled={!hasAlternativeSelected}>Confirmar</BotaoConfirmar>                    
                    {isQuestionSubmited && isCorrect && <p>Você acertou! Espere a proxima pergunta...</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou! Espere a proxima pergunta...</p>}
                </AlternativesForm>
              </Widget.Content>
        </Widget>
    );
}

function Terminou({resultados}) {
    return (
        <Widget>
            <Widget.Header>
                <Title>Finalizada as questões</Title>
            </Widget.Header>
            <Widget.Content>
                <img alt="Descrição" style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    background: 'center'
                }}
                src={dbExtra.Icon}/>
                {/*Quantidade de acertos*/}
                <p>Acertou: {resultados.reduce((somaAcertos, resultadoAtaul) => {
                    //Uso de reduce
                    const acertosFinais = resultadoAtaul === true;
                    if(acertosFinais) {
                        return somaAcertos + 1;
                    }
                    return somaAcertos;
                }, 0)} de {resultados.length}</p>
                {/*Listando os resultados*/}
                {resultados.map((resultado, resultadoIndex) => {
                    return <p>{resultadoIndex + 1} - Pergunta: {resultado === true ? 'Acertou' : 'Errou'}</p>
                    }
                )}
                <p>Bye...</p>
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
    const [screenState, setScreenState] = React.useState(screenStates.LOADING); //Estado inicial
    const [resultados, setResultado] = React.useState([]); //Resultados de acertos

    //Comunicando entre modulos
    //É boa pratica evitar de fazer referencias diretas
    //Isso aqui é praticamente um push
    function addResult(resultado) {
        setResultado([
            ...resultados, 
            resultado,
        ]);
    }


    //Evitar colocar isso sem um React effects -> Causa loop por montar demais a entidade e derruba a aplicacao
    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1 * 1000);
    }, []);
    
    //proxima questao
    function handleSubmit() {
        const proximQuestao = questionIndex + 1;
        if (proximQuestao < totalQuestions) {
            setQuestaoAtual(questionIndex + 1);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo/>
                    {screenState === screenStates.QUIZ && <QuestionWidget question={question} questionIndex={questionIndex} totalQuestions={totalQuestions} onSubmit={handleSubmit} addResult={addResult}/>}
                    {screenState === screenStates.LOADING && <LoadingWidget/>}
                    {screenState === screenStates.RESULT && <Terminou resultados={resultados}/>}
                <Footer/>
            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/guilhermeG23"/>    
        </QuizBackground>
    );   
}  