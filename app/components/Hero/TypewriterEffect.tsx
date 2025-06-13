"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
  loop?: boolean;
}

export default function TypewriterEffect({
  words,
  className = "",
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
  loop = true,
}: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];

    const handleTyping = () => {
      if (isWaiting) {
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, delayBetweenWords);
        return;
      }

      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Finished typing current word
          if (loop || currentWordIndex < words.length - 1) {
            setIsWaiting(true);
          }
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    isWaiting,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords,
    loop,
  ]);

  return (
    <div className={`inline-block ${className}`}>
      <span className="text-foreground">{currentText}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="text-primary font-normal"
      >
        |
      </motion.span>
    </div>
  );
}

export function TypewriterWord({
  word,
  className = "",
  delay = 0,
  speed = 100,
}: {
  word: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStartTyping(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!startTyping) return;

    if (displayedText.length < word.length) {
      const timer = setTimeout(() => {
        setDisplayedText(word.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    }
  }, [displayedText, word, speed, startTyping]);

  return (
    <span className={className}>
      {displayedText.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: index * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function TypewriterParagraph({
  text,
  className = "",
  delay = 0,
  speed = 30,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          clearInterval(typeInterval);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [text, speed, delay, currentIndex]);

  return (
    <p className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-primary"
        >
          |
        </motion.span>
      )}
    </p>
  );
}

export function CodeTypewriter({
  code,
  className = "",
  delay = 0,
  speed = 50,
}: {
  code: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (currentIndex < code.length) {
          setDisplayedCode((prev) => prev + code[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          clearInterval(typeInterval);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [code, speed, delay, currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className={`font-mono text-sm bg-card border rounded-lg p-4 ${className}`}
    >
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
      <pre className="text-muted-foreground overflow-hidden">
        <code>
          {displayedCode}
          {currentIndex < code.length && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-primary bg-primary/20"
            >
              ▋
            </motion.span>
          )}
        </code>
      </pre>
    </motion.div>
  );
}
