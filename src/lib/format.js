const fullNumber = new Intl.NumberFormat("en-US");
const compactNumber = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

const isNumber = (value) => typeof value === "number" && Number.isFinite(value);

export const formatNumber = (value) => (isNumber(value) ? fullNumber.format(Math.round(value)) : "—");

export const formatCompact = (value) => (isNumber(value) ? compactNumber.format(value) : "—");

export const formatDate = (value) => (value ? longDate.format(new Date(value)) : "—");
