export {
  PRD_REVISED_META,
  PRD_RELATIONSHIP,
  PRD_REVISED_ROLES,
  PUBLIC_DESIGN_PRINCIPLES,
  PUBLIC_GOLDEN_ROUTE,
  PUBLIC_JOURNEY_LAYERS,
  PUBLIC_PERSISTENT_NAV,
  PUBLIC_SCREEN_CHECKLIST,
  MOBILE_SCREEN_MAP_REVISED,
  MOBILE_SUCCESS_CRITERIA,
  PUBLIC_SUCCESS_CRITERIA,
  PUBLIC_FUNCTIONAL_REQUIREMENTS,
  PUBLIC_ANALYTICS_EVENTS,
  PUBLIC_ERROR_STATES,
  REVISED_OUT_OF_SCOPE,
  PUBLIC_FUTURE_EXPLORATION,
  CLINICAL_USE_CASE_FAMILIES,
  REVISED_NAV,
} from "./meta.js";

export {
  PUBLIC_VISITOR_STORIES,
  MOBILE_APP_STORY_GROUPS,
  STORY_PRIORITY_LEVELS,
  PRIORITY_RANK,
  sortByPriority,
  mobileStoriesFlat,
  priorityCounts,
} from "./userStories.js";
export { PUBLIC_VISITOR_FLOW_GROUPS } from "./publicVisitorFlows.js";
export { REVISED_FUNCTIONAL_FLOW_GROUPS } from "./functionalFlows.js";
export { PRIMARY_SCREEN_INVENTORY } from "./screenInventory.js";

import { PUBLIC_VISITOR_FLOW_GROUPS } from "./publicVisitorFlows.js";

export function publicVisitorFlowCount() {
  return PUBLIC_VISITOR_FLOW_GROUPS.reduce((n, g) => n + g.flows.length, 0);
}

export function publicVisitorFlowsFlat() {
  return PUBLIC_VISITOR_FLOW_GROUPS.flatMap((g) => g.flows);
}
