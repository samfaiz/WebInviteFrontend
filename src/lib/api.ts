/**
 * Thin client for the NestJS backend. Token is kept in localStorage (Phase 5);
 * every authed request attaches it as a Bearer header.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const TOKEN_KEY = "wedding-auth-token";

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request<T = any>(
  path: string,
  opts: RequestInit = {},
  auth = false,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as Record<string, string>),
  };
  if (auth) {
    const t = tokenStore.get();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.message || `Request failed (${res.status})`) as Error & {
      status?: number;
    };
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null as T;
  return res.json();
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export const api = {
  // auth
  register: (body: { email: string; password: string; name?: string }) =>
    request<{ token: string; user: AuthUser }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  login: (body: { email: string; password: string }) =>
    request<{ token: string; user: AuthUser }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  me: () => request<AuthUser>("/auth/me", {}, true),

  // invitations (owner)
  listInvitations: () => request<any[]>("/invitations", {}, true),
  getInvitation: (id: string) => request<any>(`/invitations/${id}`, {}, true),
  createInvitation: (body: any) =>
    request<any>("/invitations", { method: "POST", body: JSON.stringify(body) }, true),
  updateInvitation: (id: string, body: any) =>
    request<any>(`/invitations/${id}`, { method: "PUT", body: JSON.stringify(body) }, true),
  publishInvitation: (id: string) =>
    request<any>(`/invitations/${id}/publish`, { method: "POST" }, true),
  unpublishInvitation: (id: string) =>
    request<any>(`/invitations/${id}/unpublish`, { method: "POST" }, true),
  deleteInvitation: (id: string) =>
    request<any>(`/invitations/${id}`, { method: "DELETE" }, true),
  listRsvps: (id: string) => request<any>(`/invitations/${id}/rsvps`, {}, true),
  sendExport: (id: string) =>
    request<{ sent: boolean; recipient: string; savedTo?: string; count: number }>(
      `/invitations/${id}/send-export`,
      { method: "POST" },
      true,
    ),
  downloadRsvpsXlsx: async (id: string): Promise<Blob> => {
    const t = tokenStore.get();
    const res = await fetch(`${API_BASE}/invitations/${id}/rsvps.xlsx`, {
      headers: t ? { Authorization: `Bearer ${t}` } : {},
    });
    if (!res.ok) throw new Error(`Download failed (${res.status})`);
    return res.blob();
  },

  // public
  createRsvp: (
    slug: string,
    body: { guestName: string; attending: string; guests?: number; message?: string },
  ) =>
    request<{ ok: boolean }>(`/public/invitations/${slug}/rsvp`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  // admin
  adminStats: () => request<any>("/admin/stats", {}, true),
  adminInvitations: () => request<any[]>("/admin/invitations", {}, true),
  adminUsers: () => request<any[]>("/admin/users", {}, true),
};
