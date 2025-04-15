import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useSolanaWallets } from "@privy-io/react-auth/solana";

export function LoginButton() {
  const { ready, authenticated, logout } = usePrivy();
  const { login } = useLogin();
  const { wallets } = useSolanaWallets();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  // Disable logout when Privy is not ready or the user is not authenticated
  const showLogout = ready && authenticated;

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (showLogout) {
    return <button onClick={logout}>Log out </button>;
  }

  return (
    <button disabled={disableLogin} onClick={login}>
      Log in
    </button>
  );
}
