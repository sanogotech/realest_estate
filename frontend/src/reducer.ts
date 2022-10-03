type ActionInterface =
  | { type?: "SIGNUP_SUCCESS"; payload?: { access: string } }
  | { type?: "SIGNUP_FAIL"; payload?: any }
  | { type?: "LOGIN_SUCCESS"; payload?: any }
  | { type?: "LOGIN_FAIL"; payload?: any }
  | { type?: "LOGOUT"; payload?: any };

interface InitialStateInterface {
  token: string | null;
  is_authenticated: boolean;
  loading: boolean;
}

const initialState: InitialStateInterface = {
  token: null,
  is_authenticated: false,
  loading: true,
};

// Our reducer function that uses a switch statement to handle our actions
function reducer(state: InitialStateInterface, action: ActionInterface) {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.access);
      state.is_authenticated = true;
      state.loading = false;
      state.token = payload.access;
      return;

    case "SIGNUP_SUCCESS":
      state.is_authenticated = false;
      state.loading = true;
      return;

    case "SIGNUP_FAIL":
    case "LOGIN_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      state.token = null;
      state.is_authenticated = false;
      state.loading = false;
      return;

    default:
      return state;
  }
}

export { initialState, reducer };
export type { InitialStateInterface, ActionInterface };
