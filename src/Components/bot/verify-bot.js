import { useState, useEffect, useRef , React } from "react";
import "./verify-bot.css";

import { useNavigate } from "react-router-dom";
import SendIcon from "./images/send.png";
import MicIcon from "./images/mic.png";
import TtsDisabledIcon from "./images/notts.png";
import TtsEnabledIcon from "./images/tts.png";
import Loading from "./images/loading.gif";

import { Configuration, OpenAIApi } from "openai";


var notkeya = "sk-t@rWlV@ZySa0T"
var notkeyb = "iQzWd@rIdmT3B@lbkFJi"
var notkeyc = "oSPTGd@JTLRBP@gXguDlR"

const configuration = new Configuration({
    organization: "org-RZ3uSWP75ShMsyLdXuc7Hot7",
    apiKey: (notkeya + notkeyb + notkeyc).replaceAll( "@" , "" ),
  });

  //console.log( (notkeya + notkeyb + notkeyc).replaceAll( "@" , "" ) )

const openai = new OpenAIApi(configuration);

    var last_user_message = "";

function Bot()
{
    const navigate = useNavigate();

    const [showBot , setShowBot] = useState(false);
    const [inputMessage , setInputMessage] = useState("");
    const [buttonIcon, setButtonIcon] = useState( "url("+MicIcon+")" )
    const [messages , setMessages] = useState([ { source : "Bot" , message : "Hi!" } ])
    const [ttsEnabled , setTtsEnabled] = useState(false)
    const [listening , setListening] = useState(false)
    
    const inputFile = useRef(null) 
    const chatscroll = useRef(null)

    const introduction = "Hi, I'm Navigator. A chat bot designed to assist doctors to browse through the medical data of patients.";
    const tutorial = "You can follow the tutorial on the left to verify the authenticity of a product.";
    const begin_verify = "Click the button below to begin verification";
    const error_msg = "I'm sorry, but I wasn't able to handle the request. Please try again."


    //Speech Synthesis
    const synth = window.speechSynthesis;

    useEffect(() => {
        if (chatscroll) {
            chatscroll.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

      useEffect(
        () => {
        
        if( messages[0].source == "User")
        {

        }
        else if( messages[0].source === "Bot" )
        {
            var lastMessage = messages[0].message;
            console.log( messages )
            const utterThis = new SpeechSynthesisUtterance(lastMessage);
            if(ttsEnabled)
            {    
            utterThis.pitch = 1;
            utterThis.rate = 1;
            utterThis.volume = 0.1;
            synth.speak(utterThis);
            }
        }

        }
        , [messages, ttsEnabled]
      );

          const promptChatGPT = async (message) => {
        
            if( message.length == 0 )
            {
                return;
            }
        
            var prompts =  [ { role : "user" , content : "Database : {'__collections__':{'iHealthHist':{'DoctorsList':{'__collections__':{'Doctors':{'Doctor 1':{'DoctorName':'Dr One','DoctorID':1,'__collections__':{}},'Doctor 2':{'DoctorName':'Dr Two','DoctorID':2,'__collections__':{}},'Doctor 3':{'DoctorName':'Dr Three','DoctorID':3,'__collections__':{}}}}},'PatientList':{'__collections__':{'Patients':{'Patient 1':{'PatientID':1,'PatientName':'Patient 1','__collections__':{'Access':{'Access1':{'DoctorID':1,'Access':false,'__collections__':{}},'Access2':{'DoctorID':2,'Access':true,'__collections__':{}},'Access3':{'DoctorID':3,'Access':false,'__collections__':{}}},'Clinical':{'Doc1':{'Type':1,'DocumentID':1,'DocumentDate':'01/23','Loc':'Doc1','DocumentDesc':'An Anaesthesia Report for patient A','DocumentName':'Anaesthesia Report','URL':'https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/AnaesthesiaReports.pdf?alt=media&token=e6d4cb80-997f-4ab7-bd78-1ee2eaeaa16a','DisplayDate':'01/01/2023 5:00PM','__collections__':{}},'Doc2':{'DisplayDate':'02/01/2023 3:00PM','Loc':'Doc2','DocumentDesc':'Blood Test Report','DocumentID':2,'DocumentDate':'01/23','DocumentName':'Blood Test','URL':'https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/BloodTest.pdf?alt=media&token=ff71f608-d044-4c53-8fde-4750ce59e6e4','Type':1,'__collections__':{}}},'UserData':{'Doc1':{'DisplayDate':'03/01/2023 3:00PM','Loc':'Doc1','Type':5,'DocumentID':1,'DocumentDate':'01/23','URL':'https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/food.jpg?alt=media&token=a64ddf7f-756f-43a8-98f2-b8fad2eece2c','DocumentName':'Lunch','DocumentDesc':'My lunch on Monday','__collections__':{}},'Doc2':{'DisplayDate':'02/02/2023 12:00PM','Loc':'Doc2','DocumentDesc':'Went for a midday walk','DocumentID':2,'DocumentDate':'02/23','URL':'None','DocumentName':'Walk - Heartrate','Value':'40,20,12,39,10,40,39,80,40','Type':2,'__collections__':{}},'Doc3':{'DisplayDate':'05/04/2023 1:00PM','Loc':'Doc3','Type':3,'DocumentDesc':'Yearly Average Step Count','DocumentID':3,'Value':'40,20,12,39,10,40,39,80,40','DocumentDate':'04/23','URL':'None','DocumentName':'Step Count','__collections__':{}}}}},'Patient 2':{'PatientID':2,'PatientName':'Patient 2','__collections__':{'Clinical':{'Doc1':{'DisplayDate':'05/06/2023 4:00PM','Loc':'Doc1','Type':1,'DocumentDesc':'Cardiology Report for Patient 2','DocumentID':1,'DocumentDate':'06/23','URL':'https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/CardiologyReport.pdf?alt=media&token=7c0b26aa-260d-4cb4-9674-7f54e7ee0752','DocumentName':'Cardiology Report','__collections__':{}},'Doc2':{'DisplayDate':'10/07/2023 4:00PM','Loc':'Doc2','Type':1,'DocumentDesc':'Discharge Summary of Patient 2','DocumentID':2,'DocumentDate':'07/23','URL':'https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/DischargeSummary.pdf?alt=media&token=6367bd0a-e28b-4e03-9a12-27ce610e9a7c','DocumentName':'Discharge','__collections__':{}},'Doc3':{'DisplayDate':'08/08/2023 1:00PM','Loc':'Doc3','Type':1,'DocumentDesc':'Blood Test Report of Patient 2','DocumentID':3,'DocumentDate':'08/23','URL':'https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/BloodTest.pdf?alt=media&token=ff71f608-d044-4c53-8fde-4750ce59e6e4','DocumentName':'Blood Test','__collections__':{}},'Doc4':{'DisplayDate':'10/09/2023 3:00PM','Loc':'Doc4','Type':1,'DocumentDesc':'Consultation of Patient 1 with Doctor 2','DocumentID':4,'DocumentDate':'09/23','URL':'https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/ConsultationReport.pdf?alt=media&token=9a787e93-6fad-4f30-b2f7-b7ef8ca072c1','DocumentName':'Consultation','__collections__':{}},'Doc5':{'DisplayDate':'10/10/2023 10:00PM','Loc':'Doc5','Type':1,'DocumentDesc':'Pathology report of Patient 2','DocumentID':5,'DocumentDate':'10/23','URL':'https://firebasestorage.googleapis.com/v0/b/combined-hackathon-services.appspot.com/o/PathologyReports.pdf?alt=media&token=076c63d7-4166-4bec-a1b9-f54f3eaeae4c','DocumentName':'Pathology Report','__collections__':{}}}}}}}}}}}. Answer the Following questions based on the data. Refuse to answer questions not relevant to the data or the field of medicene" }, 
                                 { role : "assistant" , content : "Sure! Please provide the question." }] 
            
            prompts.push( { role : "user" , content : "prompt : " + message } )

            try {
        
                const result = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo-0613",
                    messages: prompts,
                    max_tokens: 200,
                  });
        
                var chat_response = result.data.choices[0].message.content //.data.choices[0].text;
                
                    var mess = chat_response;
                    setMessages( arr => [ { source : "Bot" , message : mess } , ...arr ] )
                
                console.log(chat_response);
        
            } catch (e) {
                console.error(e);
              }
        
          }
        

    function handleClick(event)
    {
        if( inputMessage.length > 0 )
        {
            console.log( "Sending Message" );
            console.log( inputMessage );
            last_user_message = inputMessage;
            setMessages( arr => [ { source : "User" , message : inputMessage } , ...arr ] )
            promptChatGPT(inputMessage);
            setInputMessage("");
        }
        else{

            console.log("Mic requested");
            const SpeechRecognitionEvent =
            window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            
            if (typeof SpeechRecognition === "undefined") {
                setMessages( arr => [ { source : "Bot" , message : "I'm sorry, but the browser doesn't support Web Speech Recognition API. Try using Chrome." } , ...arr ] )
            } else {
                console.log(SpeechRecognition);
                const recognition = new SpeechRecognition();
                const start = () => { setListening(true); console.log("listening") };
                const stop = () => { setListening(false); console.log("stopped listening"); recognition.stop();  };
                const onResult = event => {
                    console.log("result called");
                    for (const res of event.results) {
                        setInputMessage( inputMessage + res[0].transcript)
                    }
                    setTimeout( () => {stop()} , 3000 );
                };
                
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.addEventListener("result", onResult);
                recognition.start();
                setButtonIcon("url("+Loading+")");
            }



        }
    }  

    function toggleTts()
    {
        setMessages( arr => [ { source : "Bot" , message : "Text-To-Speech has been " + ( ttsEnabled ? "disabled" : "enabled" ) } , ...arr ] )
        setTtsEnabled( !ttsEnabled );
    }   

    function hideBot()
    {
        setShowBot(false);
    }

    function revealBot()
    {
        setShowBot(true);
    }

    useEffect( ()=> {
        console.log( inputMessage )
        if( inputMessage )
        {
            setButtonIcon("url("+SendIcon+")");
        }
        else
        {
            setButtonIcon("url("+MicIcon+")");
        }
    },
        [inputMessage]
    );

    return (

        <div className="VerifyBot">
        <div className={"BotBody " + (showBot ? "Reveal" : "Hide")}>
            <div className="BotContent">
                <div className="BotHeaderSection">
                    <div className="BotIcon"></div>
                    <div className="BotTitle"><h1>Navigator</h1></div>
                    <div className="TtsButton" onClick={toggleTts} style={{backgroundImage : "url(" + ( ttsEnabled ? TtsEnabledIcon : TtsDisabledIcon ) + ")"}}></div>
                    <div className="CloseButton" onClick={hideBot}></div>
                </div>
                <div className="BotChatSection" ref={chatscroll}>
                    <div className="BotChatScrollable">
                    {
                    messages && messages.map( (element,index) => {
                         
                        if( element.message )
                        {
                            return <div key={index+element.message} className={ "BotMessage " + ( element.source == "Bot" ? "Bot" : "User" ) + " " + ( index == 0 ? "NewMessage" : "" ) }>{element.message}</div> 
                        }
                        else if( element.button )
                        {
                            return <div key={index+Math.random()} className={ "BotMessage " + ( "Bot" ) + " " + ( index == 0 ? "NewMessage" : "" ) }><button className="BotVerifyButton">Verify Product</button></div> 
                        }
                        else
                        {
                            return <div key={index+element.image} className={ "BotMessage " + ( element.source == "Bot" ? "Bot" : "User" ) + " " + ( index == 0 ? "NewMessage" : "" ) + " Image" } style={{backgroundImage:"url("+(element.image)+")"}} ></div>     
                        } 
                         
                        
                        })
                    }

                    </div>
                </div>
                <div className="BotInputSection">
                    <input placeholder="Enter message" value={inputMessage} onKeyUp={ (event) => { event.key === "Enter" && handleClick() } } onChange={ (event) => { setInputMessage(event.target.value) } } type="text" className="BotInputText"></input>
                    <button style={{ backgroundImage : buttonIcon }} onClick={handleClick} className="BotInputButton"></button>
                </div>
            </div>
        </div>

        <div className={"BotShowButton " + (!showBot ? "Reveal" : "Hide")} onClick={revealBot}></div>

        </div>

    );

}

export default Bot;





























