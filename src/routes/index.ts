export const authRoutes = Object.freeze({
  signIn: "/login",
});

export const appRoutes = Object.freeze({
  home: "/",
  inventory: "/objects",
  assignments: "/assignments",
  users: "/users",
});

export const adminRoutes = Object.freeze({
  create_objects: appRoutes.inventory + "/create",
});
