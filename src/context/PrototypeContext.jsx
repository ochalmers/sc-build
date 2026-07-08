import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { behaviourModeMeta } from "../system/modes.js";
import { getStoryById } from "../config/stories.js";
import { resolvePalette } from "../utils/resolvePalette.js";

const PrototypeContext = createContext(null);

const initialMode = "regulation";
const initialDefaults = behaviourModeMeta[initialMode].defaultSliders;

export function PrototypeProvider({ children }) {
  const [behaviourMode, setBehaviourModeState] = useState(initialMode);
  const [personaId, setPersonaIdState] = useState("regulator");
  const [storyId, setStoryIdState] = useState("end-of-day-reset");
  const [sliders, setSliders] = useState(() => ({
    ...getStoryById("end-of-day-reset").sliderHint,
  }));

  const setBehaviourMode = useCallback((mode) => {
    setBehaviourModeState(mode);
    setSliders(behaviourModeMeta[mode].defaultSliders);
    setStoryIdState(null);
  }, []);

  const setPersonaId = useCallback((id) => {
    setPersonaIdState(id);
    setStoryIdState(null);
  }, []);

  const selectStory = useCallback((id) => {
    if (!id) {
      setStoryIdState(null);
      return;
    }
    const story = userStories.find((s) => s.id === id);
    if (!story) return;
    setStoryIdState(id);
    setPersonaIdState(story.personaId);
    setBehaviourModeState(story.behaviourMode);
    setSliders({ ...story.sliderHint });
  }, []);

  const updateSlider = useCallback((key, value) => {
    setSliders((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resolved = useMemo(
    () => resolvePalette(behaviourMode, sliders),
    [behaviourMode, sliders],
  );

  const value = useMemo(
    () => ({
      behaviourMode,
      setBehaviourMode,
      personaId,
      setPersonaId,
      storyId,
      selectStory,
      sliders,
      updateSlider,
      resolved,
    }),
    [
      behaviourMode,
      setBehaviourMode,
      personaId,
      storyId,
      selectStory,
      sliders,
      updateSlider,
      resolved,
    ],
  );

  return (
    <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>
  );
}

export function usePrototype() {
  const ctx = useContext(PrototypeContext);
  if (!ctx) {
    throw new Error("usePrototype must be used within PrototypeProvider");
  }
  return ctx;
}
