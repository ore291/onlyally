export { default } from "next-auth/middleware";

export const config = {
  matcher: [ "/explore", "/live", "/groups", "/channels", "/profile", "/dashboard" ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  secret: "QYcUQwS/N4ia+L75lDYDQdMzyzKAdHM2ruYoUatc5Ig=",
};
