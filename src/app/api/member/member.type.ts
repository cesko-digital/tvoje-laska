/**
 * https://developer.buddypress.org/bp-rest-api/reference/members/#schema
 **/

export interface IMemberResponse {
  id: number; // Unique identifier for the member
  name?: string; // Display name for the member
  mention_name?: string; // The name used for that user in @-mentions.
  link?: string; // Profile URL of the member.
  user_login?: string; // An alphanumeric identifier for the member.
  member_types?: unknown[]; // Member types associated with the member. See this documentation page for more information.
  registered_date?: string | null; // Registration date for the member.
  registered_date_gmt?: string | null; // The date the member was registered, as GMT.
  roles?: unknown[]; // Roles assigned to the member.
  capabilities?: Record<string, unknown>; // All capabilities assigned to the member.
  extra_capabilities?: Record<string, unknown>; // All capabilities assigned to the member.
  xprofile?: unknown[]; // Member xProfile groups and its fields.
  friendship_status?: boolean; // Whether the logged in user has a friendship relationship with the fetched user.
  friendship_status_slug?: "is_friend" | "not_friends" | "pending" | "awaiting_response"; // Slug of the friendship relationship status the logged in user has with the fetched user.
  last_activity?: Record<string, unknown>; // Last date the member was active on the site (object properties: timediff, date and date_gmt).
  latest_update?: Record<string, unknown>; // The content of the latest activity posted by the member (object properties: id, raw and rendered).
  total_friend_count?: number; // Total number of friends for the member..
  avatar_urls?: {
    full: string;
    thumb: string;
  }; // Avatar URLs for the member (Full & Thumb sizes)
}

/**
 * GET /buddypress/v1/members
 * https://developer.buddypress.org/bp-rest-api/reference/members/#list-members
 **/

export interface IMembersRequestParams {
  context?: "view" | "embed" | "edit"; // Scope under which the request is made; determines fields present in response. Default: view
  page?: number; // Current page of the collection. Default: 1
  per_page?: number; // Maximum number of members to be returned in result set. Default: 10
  search?: string; // Limit results to those matching a string.
  exclude?: number[]; // Ensure result set excludes specific IDs. Default: []
  include?: number[]; // Ensure result set include specific IDs. Default: []
  type?: "active" | "newest" | "alphabetical" | "random" | "online" | "popular"; // Shorthand for certain orderby/order combinations. Default: newest
  user_id?: number; // Limit results to friends of a user. Default: 0
  user_ids?: number[]; // Pass IDs of users to limit result set. Default: []
  populate_extras?: boolean; // Whether to fetch extra BP data about the returned members. Default: false
  member_type?: unknown[]; // Limit results set to certain type(s). See this documentation page for more information. Default: []
  xprofile?: unknown[]; // Limit results set to a certain XProfile field. Default: []
}

/**
 * GET /buddypress/v1/members/<id>
 * https://developer.buddypress.org/bp-rest-api/reference/members/#retrieve-a-specific-member
 **/

export interface IGetMemberRequestParams {
  id: number; // Unique identifier for the member.
  context?: "view" | "embed" | "edit"; //Scope under which the request is made; determines fields present in response. Default: view
  populate_extras?: boolean; // Whether to fetch extra BP data about the returned member. Default: false
}

/**
 * PUT /buddypress/v1/members/<id>
 * https://developer.buddypress.org/bp-rest-api/reference/members/#update-a-specific-member
 **/

export interface IUpdateMemberRequestParams {
  name?: string; // Display name for the member.
  roles?: unknown[]; // Roles assigned to the member.
  member_type?: string; // A comma separated list of Member Types to set for the member.
}

/**
 * GET /buddypress/v1/members/me
 * https://developer.buddypress.org/bp-rest-api/reference/members/#retrieve-the-logged-in-member
 **/

export interface IGetCurrentMemberRequestParams {
  context?: "view" | "embed" | "edit"; // Scope under which the request is made; determines fields present in response. Default: view
}

/**
 * PUT /buddypress/v1/members/me
 * https://developer.buddypress.org/bp-rest-api/reference/members/#update-the-logged-in-member
 */

export interface IUpdateCurrentMemberRequestParams {
  name?: string; // Display name for the member.
  roles?: unknown[]; // Roles assigned to the member.
  member_type?: string; // A comma separated list of Member Types to set for the member. See this documentation page for more information.
}
