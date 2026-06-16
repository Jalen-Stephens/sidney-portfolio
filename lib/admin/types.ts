// Plain types shared with client components. Kept out of the "use server"
// module, which may only export async functions.
export interface LoginState {
  error?: string;
}

export interface ActionState {
  ok?: boolean;
  error?: string;
}
