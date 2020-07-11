import { ScreensContainer } from "./components";
import { 
  AuthContainer, 
  withLink as withLinkHOC
  // withAuthContainer as withAuthHOC, // @Deprecated
} from "./hocs";
import {
  useAuth as useAuthHook,
  useTheme as useThemeHook,
  ThemeProvider
} from "./hooks";

// export const withAuthContainer = withAuthHOC; // @Deprecated
export * from "./configs";
export const withLink = withLinkHOC;
export const useAuth = useAuthHook;
export const useTheme = useThemeHook;
export const Auth = {
  Screens : ScreensContainer,
  Provider: AuthContainer
};
export const Theme = {
  Provider: ThemeProvider
};
