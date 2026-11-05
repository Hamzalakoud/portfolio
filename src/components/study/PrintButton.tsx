"use client";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="textlink" onClick={() => window.print()}>
      {label}
    </button>
  );
}
