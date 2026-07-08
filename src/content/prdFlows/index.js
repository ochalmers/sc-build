export {
  PRD_FLOWS_META,
  PRD_ROLES,
  PROVISIONING_CHAIN,
  FLOW_CATEGORIES,
  LISTENER_SCREEN_SEQUENCE,
  V1_OUT_OF_SCOPE,
  FLOWS_NAV,
} from "./meta.js";

import { listenerFlows, listenerEdgeFlows } from "./listenerFlows.js";
import { publicFlows } from "./publicFlows.js";
import { partnerFlows } from "./partnerFlows.js";
import { adminFlows } from "./adminFlows.js";
import { billingFlows } from "./billingFlows.js";
import { platformFlows } from "./platformFlows.js";
import { clinicalFlows } from "./clinicalFlows.js";

export const PRD_FLOWS = {
  listener: listenerFlows,
  listenerEdge: listenerEdgeFlows,
  public: publicFlows,
  partner: partnerFlows,
  admin: adminFlows,
  billing: billingFlows,
  platform: platformFlows,
  clinical: clinicalFlows,
};
