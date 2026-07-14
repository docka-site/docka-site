const TOKEN_KEY = "amparo_client_token";

export const getClientToken = () => localStorage.getItem(TOKEN_KEY);
export const setClientToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearClientToken = () => localStorage.removeItem(TOKEN_KEY);

export const portalFetch = async <T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getClientToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`/api${path}`, { ...options, headers });
  if (res.status === 401) {
    clearClientToken();
    window.location.href = "/portal";
    throw new Error("Sessão expirada");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro desconhecido" }));
    throw new Error(err.message || "Erro na requisição");
  }
  if (res.status === 204) return null as T;
  return res.json() as Promise<T>;
};
