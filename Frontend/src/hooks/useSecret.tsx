import { useState, useEffect } from "react";

export default function useSecret(secretAnswer: string | undefined) {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [activeSecret, setActiveSecret] = useState(false);

  const secretCode = {
    answer: secretAnswer,
    length: secretAnswer?.length || 0,
    checkAnswer: function (text: string) {
      if (this.answer) {
        return this.answer === text;
      }
    },
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const newArray = keysPressed.slice(1);
    if (keysPressed.length >= secretCode.length) {
      setKeysPressed([...newArray, event.key]);
    } else {
      setKeysPressed([...keysPressed, event.key]);
    }
  };

  useEffect(() => {
    const currentText = keysPressed.join("");
    if (secretCode.checkAnswer(currentText)) setActiveSecret(true);
  }, [keysPressed]);

  return {
    activeSecret,
    handleKeyPress,
  };
}
