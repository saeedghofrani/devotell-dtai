import { BadRequestException } from "@nestjs/common";

export function formatCompensation(comp: {
  min: number;
  max: number;
  currency: string;
}): string {
  if (!comp.currency) {
    throw new BadRequestException("Currency cannot be an empty string");
  }
  if (comp.min > comp.max) {
    throw new BadRequestException("Minimum value cannot be greater than maximum value");
  }
  const formatNumber = (num: number): string => {
    if (num !== 0 && Math.abs(num) < 0.01) {
      return num.toString();
    }
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    });
  };
  return `${formatNumber(comp.min)} ${comp.currency} - ${formatNumber(comp.max)} ${comp.currency}`;
}
