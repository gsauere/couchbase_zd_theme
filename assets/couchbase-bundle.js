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

