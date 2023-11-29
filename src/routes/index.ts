
const APP_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const authRoutes = Object.freeze({
  signIn: `${APP_URL}/login`,
});

export const appRoutes = Object.freeze({
  home: `${APP_URL}/`,
  inventory: `${APP_URL}/objects`,
  assignments: `${APP_URL}/assignments`,
  users: `${APP_URL}/users`,
});

export const adminRoutes = Object.freeze({
  create_objects: appRoutes.inventory + "/create",
  create_assignments: appRoutes.assignments + "/create",
  create_users: appRoutes.users + "/create",
});

export const api_routes = Object.freeze({
  objects: `${APP_URL}/api/objects`,  
  assignments: `${APP_URL}/api/assignments`,
  assignments_dashboard: `${APP_URL}/api/assignments/dashboard`,
  users: `${APP_URL}/api/users`,
  auth_signup: `${APP_URL}/api/auth/signup`,  
});
