"use client"

import React, {useCallback, useEffect, useState} from 'react';
import 'regenerator-runtime/runtime';
import SearchButton from "@/app/components/SearchButton";
import {usePathname, useRouter} from "next/navigation";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"

interface Props {
    query: string
}



const CommentInput = ({query}:Props) => {
    const router = useRouter();

    const [value, setValue] = useState(query);

    const pathName = usePathname();

    const clear = () => {
        setValue("");

    }

    const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(query.toString())
      params.set(name, value)

      return params.toString()
    },
    [query]
  )

    const submit = (comment: string) => {
        router.push(pathName + "?" + createQueryString("c", comment))
    }

    const handleCopy = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        navigator.clipboard.writeText(value);
        alert('Copied to clipboard!');

    };

    // Function to paste from clipboard into the input field
    const handlePaste = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const text = await navigator.clipboard.readText();
        setValue(text);
    };

    const [speechRecognitionSupported, setSpeechRecognitionSupported] =
        useState(false)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        // sets to true or false after component has been mounted
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
    }, [browserSupportsSpeechRecognition])

    useEffect(() => {
        setValue(transcript)
    }, [transcript]);

    if (speechRecognitionSupported === null) return null // return null on first render, can be a loading indicator

    let speech_enabled: boolean;
    if (!speechRecognitionSupported) {
        speech_enabled = false;
    } else {
        speech_enabled = true;
    }

    return (
        <div>
            <div className={"w-[300px] sm:w-[600px] md:w-[800px] h-[270px] border-2 border-black rounded-2xl"}>
                <form className={"h-[180px] focus:outline-none w-full rounded-2xl"}>
                    <div className={"flex justify-between w-full h-full"}>
                    <textarea value={value} onChange={(e) => setValue(e.target.value)}
                              placeholder={"Masukkan komentar yang ingin dicek"}
                              className={"resize-none focus:outline-none font-sans pt-8 pl-8 text-black h-full w-4/5 rounded-2xl"}/>

                        <div className={"mt-4 mr-4 flex flex-col"}>
                            {value !== "" ? <button onClick={handleCopy}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                                         width="48px"
                                         fill="#000000">
                                        <path
                                            d="M300-200q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560ZM180-80q-24 0-42-18t-18-42v-620h60v620h500v60H180Zm120-180v-560 560Z"/>
                                    </svg>
                                </button> :
                                <button onClick={handlePaste}>
                                    <svg width="48" height="48" viewBox="0 0 40 40" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
                                        <rect width="40" height="40" fill="url(#pattern0_153_110)"/>
                                        <defs>
                                            <pattern id="pattern0_153_110" patternContentUnits="objectBoundingBox"
                                                     width="1"
                                                     height="1">
                                                <use xlinkHref="#image0_153_110" transform="scale(0.00195312)"/>
                                            </pattern>
                                            <image id="image0_153_110" width="512" height="512"
                                                   xlinkHref="data:image/png;base64,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"/>
                                        </defs>
                                    </svg>
                                </button>}

                            <button
                                className={`mt-4 ${listening && "animate-bounce animate-infinite animate-ease-out"} ${!speech_enabled && "hidden"}`}
                                onClick={e => {
                                    e.preventDefault();
                                    if (!listening) {
                                        resetTranscript()
                                        SpeechRecognition.startListening({language: "id"})
                                    } else {
                                        SpeechRecognition.stopListening()
                                    }
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                                     width="48px" fill={!listening ? "#000000" : "#80FF00"}>
                                    <path
                                        d="M480-423q-43 0-72-30.92-29-30.91-29-75.08v-251q0-41.67 29.44-70.83Q437.88-880 479.94-880t71.56 29.17Q581-821.67 581-780v251q0 44.17-29 75.08Q523-423 480-423Zm-30 303v-136q-106-11-178-89t-72-184h60q0 91 64.29 153t155.5 62q91.21 0 155.71-62Q700-438 700-529h60q0 106-72 184t-178 89v136h-60Z"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className={"w-full flex items-center justify-end pr-8"}>
                        <button type={"button"} onClick={clear}
                                className="px-8 scale-75 py-4 bg-rose-400 rounded-2xl text-white relative font-semibold after:-z-20 after:absolute after:h-1 after:w-1 after:bg-rose-800 after:left-5 overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 [text-shadow:3px_5px_2px_#be123c;] hover:[text-shadow:2px_2px_2px_#fda4af] text-2xl"
                        >
                            Clear
                        </button>

                        <SearchButton onClick={submit} comment={value}/>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default CommentInput;