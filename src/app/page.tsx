import Link from "next/link";
import Navbar from "@/app/components/Navbar";

export default function Home() {

    return (
        <>
            <Navbar/>
            <div
                className={"backgg fixed animate-ping animate-infinite animate-duration-[10000ms] animate-ease-in mt-24 left-3 w-screen h-[calc(100vh-160px)]"}/>
            <div className='flex lg:px-10 md:px-5 sm:px-5 px-5'>
                <div className='w-fit mt-20 sm:mt-40 max-w-screen-sm bg-white'>
                    <h1 className='animate-fade-down animate-duration-700 font-bold text-[#3F0F34] text-4xl'>SafeSpeak</h1>
                    <p className='animate-fade-right animate-delay-200 mt-3 text-black text-justify'>
                        Safe Speak adalah aplikasi yang dirancang untuk mendeteksi ujaran kebencian dalam teks, baik di
                        media sosial, forum online, maupun platform komunikasi lainnya. Aplikasi ini menggunakan
                        teknologi pemrosesan bahasa alami (Natural Language Processing, NLP) untuk menganalisis konten
                        dan mengenali pola ujaran kebencian yang mungkin tersembunyi dalam bahasa Indonesia.
                        <br/><br/>
                        Safe Speak bertujuan untuk menciptakan lingkungan digital yang lebih aman dengan membantu
                        pengguna, moderator, dan platform mengurangi penyebaran ujaran kebencian secara efektif.
                    </p>
                    <Link href='/safespeak'>
                        <button
                            className={"animate-fade-up animate-delay-[400ms] text-[#FFD4CB] bg-[#3F0F34] mt-20 animate-once h-14 w-40 font-bold mx-3 rounded-2xl"}>Mulai Prediksi
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
