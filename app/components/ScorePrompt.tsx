export default function ScorePrompt({
  prompt,
  score,
}: {
  prompt: string;
  score: number;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
      <p className="text-lg sm:text-xl md:text-2xl font-bold">{prompt}</p>
      <div className="text-xl sm:text-2xl font-bold flex items-center gap-4">
        Score:{" "}
        <span
          data-testid="score"
          className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-pink-400 -rotate-2"
        >
          {score}
        </span>
      </div>
    </div>
  );
}
