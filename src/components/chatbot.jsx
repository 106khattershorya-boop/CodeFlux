
import React, {
  useEffect,
  useState
} from "react";

import {
  Bot,
  X,
  Send,
  Mic,
  Volume2
} from "lucide-react";


function Chatbot() {

  const [open, setOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState([

      {
        role: "bot",
        text:
          "Hi! I'm PackSure AI Assistant. I can help explain inspection results and compliance workflow."
      }

    ]);


  useEffect(() => {

    const handler = () =>
      setOpen(true);

    window.addEventListener(
      "open-packsure-chat",
      handler
    );

    return () =>
      window.removeEventListener(
        "open-packsure-chat",
        handler
      );

  }, []);


  const sendMessage = () => {

    if (!input.trim()) return;


    const userMessage = input;

    setMessages(prev => [

      ...prev,

      {
        role: "user",
        text: userMessage
      }

    ]);

    setInput("");


    setTimeout(() => {

      let response =
        "I can help explain OCR results, detected declarations, compliance checks and inspection workflow.";


      const lower =
        userMessage.toLowerCase();


      if (
        lower.includes("score")
      ) {

        response =
          "The compliance score summarizes the preliminary rule checks. Items marked Review should be verified by an authorized officer.";

      }


      if (
        lower.includes("ocr")
      ) {

        response =
          "OCR extracts readable text from uploaded product or label images. The extracted information is then passed to the compliance rules engine.";

      }


      if (
        lower.includes("mrp")
      ) {

        response =
          "MRP information can be extracted from the label and checked against the applicable declaration requirements.";

      }


      setMessages(prev => [

        ...prev,

        {
          role: "bot",
          text: response
        }

      ]);

    }, 500);

  };


  const voiceInput = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      alert(
        "Voice recognition is not supported in this browser."
      );

      return;
    }


    const recognition =
      new SpeechRecognition();

    recognition.lang =
      "en-IN";

    recognition.start();


    recognition.onresult = event => {

      setInput(
        event.results[0][0].transcript
      );

    };

  };


  const speak = text => {

    if (
      "speechSynthesis" in window
    ) {

      const utterance =
        new SpeechSynthesisUtterance(
          text
        );

      utterance.lang =
        "en-IN";

      window.speechSynthesis.speak(
        utterance
      );

    }

  };


  return (

    <>

      {open && (

        <div
          className="
          fixed
          bottom-24
          right-4
          z-50
          flex
          h-[520px]
          w-[calc(100vw-32px)]
          max-w-sm
          flex-col
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          text-slate-900
          shadow-2xl
          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          "
        >

          <div
            className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            bg-slate-50
            p-4
            dark:border-slate-800
            dark:bg-slate-950
            "
          >

            <div
              className="
              flex
              items-center
              gap-3
              "
            >

              <div
                className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-500/10
                text-blue-600
                dark:text-blue-400
                "
              >

                <Bot size={18} />

              </div>


              <div>

                <p className="text-sm font-bold">
                  PackSure AI
                </p>

                <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                  Assistant online
                </p>

              </div>

            </div>


            <button
              onClick={() =>
                setOpen(false)
              }
              className="
              rounded-lg
              p-2
              text-slate-400
              hover:bg-slate-200
              hover:text-slate-900
              dark:text-slate-500
              dark:hover:bg-slate-800
              dark:hover:text-white
              "
            >

              <X size={17} />

            </button>

          </div>


          <div
            className="
            flex-1
            space-y-4
            overflow-y-auto
            p-4
            "
          >

            {messages.map(
              (message, index) => (

                <div
                  key={index}
                  className={`
                  flex
                  ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }
                  `}
                >

                  <div
                    className={`
                    max-w-[85%]
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    leading-6
                    ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    }
                    `}
                  >

                    {message.text}


                    {message.role === "bot" && (

                      <button
                        onClick={() =>
                          speak(
                            message.text
                          )
                        }
                        className="
                        ml-2
                        inline-flex
                        text-slate-400
                        hover:text-blue-600
                        dark:text-slate-500
                        dark:hover:text-blue-400
                        "
                      >

                        <Volume2 size={14} />

                      </button>

                    )}

                  </div>

                </div>

              )
            )}

          </div>


          <div
            className="
            border-t
            border-slate-200
            bg-white
            p-3
            dark:border-slate-800
            dark:bg-slate-900
            "
          >

            <div className="flex gap-2">

              <input
                value={input}
                onChange={e =>
                  setInput(
                    e.target.value
                  )
                }
                onKeyDown={e => {

                  if (
                    e.key === "Enter"
                  ) {
                    sendMessage();
                  }

                }}
                placeholder="Ask PackSure AI..."
                className="
                min-w-0
                flex-1
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                py-2.5
                text-sm
                text-slate-900
                outline-none
                placeholder:text-slate-400
                focus:border-blue-500
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-white
                dark:placeholder:text-slate-500
                "
              />


              <button
                onClick={voiceInput}
                className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-2.5
                text-slate-500
                hover:border-blue-500
                hover:text-blue-600
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-slate-400
                dark:hover:text-blue-400
                "
              >

                <Mic size={17} />

              </button>


              <button
                onClick={sendMessage}
                className="
                rounded-xl
                bg-blue-600
                p-2.5
                text-white
                hover:bg-blue-500
                "
              >

                <Send size={17} />

              </button>

            </div>


            <p
              className="
              mt-2
              text-center
              text-[9px]
              text-slate-400
              dark:text-slate-600
              "
            >
              AI assistance only • Not final legal authority
            </p>

          </div>

        </div>

      )}


      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
        fixed
        bottom-5
        right-5
        z-50
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-blue-600
        text-white
        shadow-xl
        shadow-blue-600/30
        transition
        hover:scale-105
        "
      >

        {open
          ? <X size={22} />
          : <Bot size={22} />
        }

      </button>

    </>

  );
}


export default Chatbot;

