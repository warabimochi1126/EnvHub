import { Dispatch, SetStateAction, useEffect } from "react";
import { Progress } from "react-sweet-progress";

import "react-sweet-progress/lib/style.css";

interface ProgressBarProps {
  progressPercent: number;
  setProgressPercent: Dispatch<SetStateAction<number>>;
}

export function ProgressBar({
  progressPercent,
  setProgressPercent,
}: ProgressBarProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      if (progressPercent >= 100) {
        clearInterval(timer);
        return;
      }

      // TODO:アップロードされたファイル数に比例してprogressPercentの値を増やす
      setProgressPercent((prev) => prev + 20);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [progressPercent]);

  return <Progress percent={progressPercent} />;
}
