export async function createContext() {
  // puedes poner lógica de autenticación aquí si necesitas
  return {};
}

export type Context = Awaited<ReturnType<typeof createContext>>;