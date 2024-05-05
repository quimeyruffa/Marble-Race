import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 10,
      blocksSeed: 0,
      // Time
      startTime: 0,
      endTime: 0,
      // Phases
      phase: "ready",
      start: () => {
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          } else {
            return {};
          }
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended") {
            return { phase: "ready", blocksSeed: Math.random() };
          } else {
            return {};
          }
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          } else {
            return {};
          }
        });
      },
    };
  })
);
