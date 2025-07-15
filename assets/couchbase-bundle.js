export const ANONYMOUS_MESSAGE = "Please sign in using the registered company email address associated with the organization for which you intend to submit tickets. If you are not yet registered, kindly complete the self-registration process.";
export const ON_HOLD_MESSAGE  = "Your organization's support entitlement is currently on hold. Please contact your account manager for any questions.";
export const CAPELLA_ONLY_MESSAGE = "Your organization is currently entitled to Capella support only. To submit support tickets, please use <a style='color: darkblue; text-decoration: underline;' href='https://cloud.couchbase.com/'>Couchbase Cloud Support Portal</a>.";
export const NO_ENTITLEMENT_MESSAGE = "Your organization does not currently have an active support entitlement. If you have any questions, please contact your account manager.";
export const NO_ORGANIZATION_MESSAGE = "The email domain you registered with is not associated with any valid organization. If you believe this is correct, please contact your account manager to have your email domain added to an organization. Otherwise, please self-register using an appropriate email domain for the organization you will be submitting tickets for.";

export const CC_FIELD_LABEL = "Additional contacts you would like to include:";
export const ATTACHMENTS_FIELD_LABEL = "Attachments (maximum attachment size 50MB)";
export const IMPACT_LABEL = "Please select your Environment followed by Current Impact";
export const IMPACT_DESCRIPTION = "Briefly describe your business impact (max 2 lines)";

export const SDK_OR_CONNECTOR_LABEL = "Is this SDK or Connector related?";
export const LITE_LABEL = "Is this Couchbase Lite related?";
export const SYNC_GATEWAY_LABEL = "Are you replicating with Sync Gateway?";

export const MARKET_PLACE_LABEL = "Is this ticket for a Private Marketplace account?";
export const MARKET_PLACE_DESCRIPTION = "Please select this field if you are a private marketplace customer";
export const LOGS_AGREEMENT_LABEL = "I understand and will collect and share the logs with Support shortly after ticket is created.";
export const LOGS_AGREEMENT_DESCRIPTION = "Logs provide valuable information to help troubleshoot your problem, leading to faster turnaround times and better customer support experience.";


//export const currentURL = window.location.href;
//export const isSandbox = /couchbasesupport\d{10}\.zendesk\.com/.test(currentURL);
export function isSandbox() {
  const currentURL = window.location.href;
  return /couchbasesupport\d{10}\.zendesk\.com/.test(currentURL);
}
// Check if the user is anonymous
export const isAnonymous = () => {
  return Object.freeze(HelpCenter.user?.role === "anonymous");
}
// Attach to window for global access
//window.isAnonymous = isAnonymous;

// Check if the user has an organization
export const hasOrganization = (orgs) => {
  if (!Array.isArray(orgs) || orgs.length === 0) return false;
  return orgs && orgs.length > 0;
}

// Check if the user's organization is entitled
export const isOrganizationEntitled = (orgs) => {
  if (!Array.isArray(orgs) || orgs.length === 0) return false;
  return orgs.some(org => org.tags.includes('entitled_customer'));
}

// Check if the user's organization is on hold
export const areOrganizationsOnHold = (orgs) => {
  if (!Array.isArray(orgs) || orgs.length === 0) return false;
  return orgs.length > 0 && orgs.every(org => org.tags.includes('entitlement__on_hold'));
}

// Check if the user's organization is entitled to Capella support only
export const isCapellaEntitlementOnly = (orgs) => {
  if (!Array.isArray(orgs) || orgs.length === 0) return false;
  return orgs.every(org => {
    const tags = org.tags || [];
    if (!tags.includes("entitlement__capella")) return false;
    return !tags.some(tag =>
      tag.startsWith("entitlement_override") ||
      tag.startsWith("entitlement__server") ||
      tag.startsWith("entitlement__mobile") ||
      tag.startsWith("entitlement__edge")
    );
  });
};

export const removeUnentitledOrganizations = (orgs) => {
  if (!Array.isArray(orgs) || orgs.length === 0) return false;
  return orgs.filter(org =>
    org.tags.includes('entitled_customer') ||
    org.tags.includes('entitlement__on_hold')
  );
}

export const orgsToKeep = (orgs, orgsToKeep) => {
  if (!Array.isArray(orgs) || orgs.length === 0) return [];
  if (!Array.isArray(orgsToKeep) || orgsToKeep.length === 0) return [];

  const allowedNamesSet = new Set(orgsToKeep.map(o => o.name));
  return orgs.filter(org => allowedNamesSet.has(org.name));
};

/*
  * Returns the intersection of ES6 Set objects. i.e., returns a new set with only elements contained in all the given sets.
  * 
  * @param {Set|Array} set1 First set
  * @param {Array<Array|Set>} sets Other sets
  * @returns {Set|Array} Intersection
  */
export function intersection(set1, ...sets) {
  if (!sets.length) {
    return set1;
  }
  const tmp = [...set1].filter(x => sets.every(y => Array.isArray(y) ? y.includes(x) : y.has(x)));
  return Array.isArray(set1) ? tmp : new Set(tmp);
}

export function getFormId(condition = isSandbox()) {
  if (condition) {
    return {
      SERVER: 360001771732,
      MOBILE: 360001799691,
      EDGE: 34622105022875,
      OPERATOR: 360001771952,
      QUESTION: 360001799831,
      SUGGESTION: 360001771972
    };
  } else {
    return {
      SERVER: 360000545232,
      MOBILE: 1900000174384,
      EDGE: 34692946527003,
      OPERATOR: 1260811054329,
      QUESTION: 1260811052249,
      SUGGESTION: 1900000171804
    };
  }
}

export const END_OF_LIFE_TAG = "__end_of_life";

export const ZD_CUSTOM_FIELD_IDS = {
  sandbox: {
    IMPACT: 360041809432,
    CRITICAL: 360044104892,
    SERVER: 360041809492,
    SYNC_GATEWAY: 360041809512,
    HAS_SDK: 31131035055771,
    CLIENT: 360041784231,
    LITE: 360041784251,
    EDGE: 34621365112091,
    OPERATOR: 360041809732,
    MARKET_PLACE: 8050543819035,
    LOGS_AGREEMENT: 1260822948929
  },
  production: {
    IMPACT: 21227650,
    CRITICAL: 360045140512,
    SERVER: 20518787,
    SYNC_GATEWAY: 21076534,
    HAS_SDK: 31156791679259,
    CLIENT: 21076524,
    LITE: 21115995,
    EDGE: 34620727056155,
    OPERATOR: 360030664772,
    MARKET_PLACE: 12734656072219,
    LOGS_AGREEMENT: 1900002551744
  }
};

// Version lifecycle constants organized by product type
export const VERSION_LIFECYCLE = {
  SERVER: {
    END_OF_FULL_MAINTENANCE: ["(7_1_\\d+)", "(7_0_\\d+)"],
    END_OF_LIFE: ["(5_5_\\d+)", "(5_1_\\d+)", "(5_0_\\d+)"]
  },
  CLIENT: {
    END_OF_FULL_MAINTENANCE: [
      "(clientver__java__3_5_x)", "(clientver__net__3_4_x)", "(clientver__go__2_7_x)",
      "(clientver__node_js__4_2_x)", "(clientver__ruby__3_4_x)", "(clientver__c__3_2_x)",
      "(clientver__python__4_1_x)", "(clientver__php__4_1_x)", "(clientver__scala__1_5_x)",
      "(clientver__kotlin__1_2_x)",
      "(connectorver__kafka__4_1_x)", "(connectorver__elastic__4_3_x)", "(connectorver__spark__3_3_x)",
      "(connectorver__tableau__1_0_x)"
    ],
    END_OF_LIFE: [
      "(clientver__java__2_\\d+)", "(clientver__net__2_\\d+)", "(clientver__ruby__1_3_\\d+)",
      "(clientver__go__2_0_\\d+)", "(clientver__node_js__2_6_\\d+)", "(clientver__c__2_\\d+)",
      "(clientver__python__2_5_\\d+)", "(clientver__php__2_6_\\d+)", "(clientver__scala__1_5_\\d+)",
      "(X 0_0_\\d+)"
    ]
  },
  SYNC_GATEWAY: {
    END_OF_FULL_MAINTENANCE: ["(3_0_\\d+)", "(3_1_\\d+)"],
    END_OF_LIFE: ["(1_5_\\d+)", "(2_0_\\d+)", "(2_1_\\d+)", "(2_5_\\d+)", "(2_6_\\d+)", "(2_7_\\d+)"]
  },
  LITE: {
    END_OF_FULL_MAINTENANCE: ["(3_0_x)", "(3_1_x)"],
    END_OF_LIFE: ["(1_5_\\d+)", "(2_0_\\d+)", "(2_1_\\d+)", "(2_5_\\d+)", "(2_6_\\d+)", "(2_7_\\d+)"]
  },
  EDGE: {
    END_OF_FULL_MAINTENANCE: ["(0_0_x)"],
    END_OF_LIFE: ["(0_0_x)"]
  },
  OPERATOR: {
    END_OF_FULL_MAINTENANCE: ["(2_4_\\d+)", "(2_5_\\d+)", "(2_6_\\d+)"],
    END_OF_LIFE: ["(1_2_\\d+)"]
  }
};

// This list contain all the tags that are NOT applicable
export const IMPACT_TO_HIDE = ["current_impact__none", "current_impact__production__urgent_blocker", "current_impact__standby_dr__urgent_blocker",
  "current_impact__testing__urgent_blocker", "current_impact__development__urgent_blocker"
]

export function checkSupportPolicyVersion(id, endOfLifeValues, endOfFullMaintenanceValues, value) {
  const $element = $(id).empty();

  // Precompile regexes for efficiency
  const endOfLifeRegex = new RegExp(END_OF_LIFE_TAG);

  if (endOfLifeRegex.test(value)) {
    $element.html(
      `<div class='end_of_life'>
        You have selected an <b>End of Life</b> version. We strongly advise you to migrate to a supported version at your earliest convenience. 
        You will receive Support if you have purchased Extended Support for this version. Please contact your Account Manager if you have an inquire about this offering.
      </div>`
    );
    return false;
  }

  // Use Array.prototype.some for early exit and avoid unnecessary regex creation
  if (endOfFullMaintenanceValues.some(pattern => new RegExp(pattern).test(value))) {
    $element.html(
      `<div class='end_of_full_maintanence'>
        You have selected an <b>End of Full Maintenance</b> version. We strongly advise you to migrate to a maintained version to benefit from fixes. 
        Please contact your Account Manager if you have an inquire about Extended Maintenance which is available for Couchbase Server.
      </div>`
    );
    return false;
  }

  return true;
}


export function getZdCustomFieldId(condition = isSandbox()) {
  return condition ? ZD_CUSTOM_FIELD_IDS.sandbox : ZD_CUSTOM_FIELD_IDS.production;
}