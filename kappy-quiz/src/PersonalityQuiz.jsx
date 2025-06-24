// Paste your PersonalityQuiz component here
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const translations = {
  ar: {
    title: "KAPPY",
    questions: [
      "ما هو المكان المفضل لقضاء الوقت؟",
      "كيف يصفك أصدقاؤك؟",
      "ما نوع الأنشطة التي تفضلها؟",
      "أي نوع من الموسيقى تفضل؟",
      "ما الذي يجذبك في الآخرين؟",
      "أي لون يعبر عنك أكثر؟",
      "ما هو وقتك المفضل في اليوم؟",
    ],
    options: [
      ["مكان هادئ في الطبيعة", "كافيه عصري في المدينة", "مكان غريب أو جديد"],
      ["كيوت ومسالم", "أنِيق وبارز", "غامض وعميق"],
      ["الاسترخاء والمشي", "التسوق أو حضور الفعاليات", "التأمل أو التجارب غير المألوفة"],
      ["موسيقى هادئة", "بوب عصري", "روك أو مهرجانات "],
      ["الطيبة والهدوء", "الأناقة والثقة", "الغموض والعمق"],
      ["بني دافئ", "رمادي أنيق", "أسود غامض"],
      ["الصباح الباكر", "المساء الحيوي", "منتصف الليل"],
    ],
    resultTitles: {
      bear: "شخصية الدب",
      cat: "شخصية القطة",
      bat: "شخصية الخفاش",
    },
    resultDescriptions: {
      bear: "أنت شخص هادئ، تحب الراحة، كيوت ومسالم ولا تفضل الزحام.",
      cat: "أنت شخص متألق، ذو ذوق عالٍ، فضولي وتحب الظهور والتميز.",
      bat: "أنت شخص غامض، قوي، عميق ومختلف، تنجذب للأشياء غير التقليدية.",
    },
    retake: "إعادة الاختبار",
    share: "شارك النتيجة على إنستاجرام"
  },
  en: {
    title: "KAPPY",
    questions: [
      "What's your favorite place to spend time?",
      "How do your friends describe you?",
      "What kind of activities do you prefer?",
      "What type of music do you enjoy?",
      "What attracts you in others?",
      "Which color represents you most?",
      "What's your favorite time of day?",
    ],
    options: [
      ["Quiet place in nature", "Trendy café in the city", "Weird or new place"],
      ["Cute and peaceful", "Stylish and bold", "Mysterious and deep"],
      ["Relaxing and walking", "Shopping or events", "Meditation or unusual experiences"],
      ["Soft music", "Trendy pop", "Rock or alternative"],
      ["Kindness and calm", "Elegance and confidence", "Mystery and depth"],
      ["Warm brown", "Elegant gray", "Dark black"],
      ["Early morning", "Lively evening", "Midnight"],
    ],
    resultTitles: {
      bear: "Bear Personality",
      cat: "Cat Personality",
      bat: "Bat Personality",
    },
    resultDescriptions: {
      bear: "You are calm, love comfort, cute and peaceful, and dislike crowds.",
      cat: "You are stylish, have great taste, curious, and love to stand out.",
      bat: "You are mysterious, strong, deep, and drawn to the unconventional.",
    },
    retake: "Retake Quiz",
    share: "Share result on Instagram"
  },
};

const results = {
  bear: {
    color: "bg-[#A66A42] text-white",
    accent: "bg-[#DAB49D]",
    emoji: "🐻",
    image: "/caps/bear-cap.png",
  },
  cat: {
    color: "bg-[#6B6B6B] text-white",
    accent: "bg-[#B7B5B3]",
    emoji: "🐱",
    image: "/caps/cat-cap.png",
  },
  bat: {
    color: "bg-black text-white",
    accent: "bg-[#6B6B6B]",
    emoji: "🦇",
    image: "/caps/bat-cap.png",
  },
};

export default function PersonalityQuiz() {
  const [answers, setAnswers] = useState([]);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState("ar");

  const t = translations[lang];

  const handleAnswer = (personality) => {
    const newAnswers = [...answers, personality];
    if (step + 1 < t.questions.length) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const counts = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
      const dominant = Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];
      setResult(dominant);
    }
  };

  const restartQuiz = () => {
    setAnswers([]);
    setStep(0);
    setResult(null);
    setCopied(false);
  };

  const handleShare = () => {
    const link = `${window.location.origin}/result?type=${result}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleInstagramShare = () => {
    handleShare();
    alert(
      lang === "ar"
        ? "تم نسخ رابط النتيجة! يمكنك الآن نشره على إنستاجرام 🌟"
        : "Result link copied! You can now share it on Instagram 🌟"
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 font-sans">
      <div className="mb-6 flex justify-between items-center">
        <button
          className="text-sm underline"
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
        >
          {lang === "ar" ? "English" : "العربية"}
        </button>
        <div className="text-3xl font-extrabold text-[#262626] tracking-wider">
          {t.title}
        </div>
      </div>

      {!result ? (
        <Card className="shadow-xl border-0 animate-fade-in">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center text-[#262626] animate-pulse">
              {t.questions[step]}
            </h2>
            <div className="space-y-3">
              {t.options[step].map((optText, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleAnswer(["bear", "cat", "bat"][idx])}
                  className="w-full rounded-full py-6 text-base font-semibold hover:scale-105 transition-transform bg-gray-100 hover:bg-gray-200 text-[#262626] shadow-sm"
                >
                  {optText}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className={`${results[result].color} rounded-2xl shadow-2xl border-none animate-fade-in`}>
          <CardContent className="p-8 space-y-4 flex flex-col items-center">
            <div className="text-5xl animate-bounce">{results[result].emoji}</div>
            <h2 className="text-3xl font-bold tracking-wide">{t.resultTitles[result]}</h2>
            <p className="text-md opacity-90 max-w-md text-center leading-relaxed">
              {t.resultDescriptions[result]}
            </p>
            <img
              src={results[result].image}
              alt="cap preview"
              className="w-32 h-32 object-contain mt-4"
            />
            <div className={`mt-4 w-20 h-1 rounded-full ${results[result].accent}`}></div>
            <div className="flex gap-3 flex-wrap justify-center mt-6">
              <Button
                onClick={restartQuiz}
                className="bg-white text-[#262626] font-semibold py-2 px-6 rounded-full shadow-md hover:scale-105 transition"
              >
                {t.retake}
              </Button>
              <Button
                onClick={handleInstagramShare}
                className="bg-white text-[#262626] font-semibold py-2 px-6 rounded-full shadow-md hover:scale-105 transition"
              >
                {t.share}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
