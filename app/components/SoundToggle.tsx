"use client";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useSoundEnabled } from "@/app/hooks/useSoundEnabled";
import { useMessages } from "@/app/i18n/LocaleProvider";
import { playSound } from "@/app/utils/soundPlayer";
import HeaderButton from "./HeaderButton";

/** Turns the game sound effects on or off, remembered in this browser. */
export default function SoundToggle() {
  const { header } = useMessages();
  const [enabled, setEnabled] = useSoundEnabled();
  const Icon = enabled ? HiSpeakerWave : HiSpeakerXMark;

  const toggle = () => {
    setEnabled(!enabled);
    // A blip so you can hear it is back on.
    if (!enabled) playSound("tap");
  };

  return (
    <HeaderButton tone="bg-white" onClick={toggle} pressed={enabled}>
      <span className="flex items-center gap-1.5">
        <Icon aria-hidden className="size-5" />
        {header.sound}
      </span>
    </HeaderButton>
  );
}
