import { useMutation } from "@tanstack/react-query";
import type { GamePlan, GameIdeaInput } from "./types";

export async function generateGamePlan(input: GameIdeaInput): Promise<GamePlan> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to generate game plan");
  }

  return response.json();
}

export function useGenerateGamePlan() {
  return useMutation({
    mutationFn: (input: GameIdeaInput) => generateGamePlan(input),
  });
}
