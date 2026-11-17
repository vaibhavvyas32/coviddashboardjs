import RubberSegment from "../reactbits/RubberSegment";

/** React Bits' RubberSegment, themed with the dashboard's colour tokens. */
export default function SegmentedControl({ items, value, onChange, label, size = "md", className = "" }) {
  return (
    <RubberSegment
      items={items}
      value={value}
      onChange={onChange}
      aria-label={label}
      size={size}
      radius={999}
      trackColor="var(--paper)"
      thumbColor="var(--ink)"
      textColor="var(--ink)"
      activeTextColor="var(--paper)"
      className={`border border-line ${className}`}
    />
  );
}
