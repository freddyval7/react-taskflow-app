import { isValid, parse } from "date-fns";

export const generateID = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

export const getSafeDate = (
  key: string,
  defaultDate: Date,
  searchParams: URLSearchParams,
) => {
  const param = searchParams.get(key);
  if (!param) return defaultDate;

  // Intentamos parsear el formato que viene en la URL (dd-MM-yyyy)
  const parsed = parse(param, "dd-MM-yyyy", new Date());

  // Si es inválido (ej. "hola" o "32-13-2026"), devolvemos el default
  return isValid(parsed) ? parsed : defaultDate;
};
