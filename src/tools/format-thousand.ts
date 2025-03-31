export function formatCompensation(comp: {
  min: number;
  max: number;
  currency: string;
}): string {
  return `${comp.min.toLocaleString()} ${comp.currency} - ${comp.max.toLocaleString()} ${comp.currency}`;
}
