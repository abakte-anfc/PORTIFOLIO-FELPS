import React from "react";

// Desenho vetorial inspirado no xadrez ondulado da referência de cores.
export function CheckerArtwork() {
  const rows = 7,
    cols = 5,
    size = 100;
  const point = (col, row) => ({
    x:
      col * size +
      (col > 0 && col < cols ? Math.sin(row * 1.14 + col * 0.73) * 18 : 0),
    y:
      row * size +
      (row > 0 && row < rows ? Math.sin(col * 1.4 + row * 0.68) * 12 : 0),
  });
  return (
    <svg
      viewBox="0 0 500 700"
      preserveAspectRatio="xMidYMid slice"
      className="checker-artwork"
      aria-hidden="true"
    >
      <rect width="500" height="700" fill="var(--petrol)" />
      {Array.from({ length: rows * cols }, (_, i) => {
        const col = i % cols,
          row = Math.floor(i / cols);
        if ((col + row) % 2) return null;
        const a = point(col, row),
          b = point(col + 1, row),
          c = point(col + 1, row + 1),
          d = point(col, row + 1);
        return (
          <path
            key={i}
            d={`M${a.x},${a.y} Q${(a.x + b.x) / 2},${a.y + 5} ${b.x},${b.y} Q${b.x - 8},${(b.y + c.y) / 2} ${c.x},${c.y} Q${(c.x + d.x) / 2},${c.y - 5} ${d.x},${d.y} Q${d.x + 8},${(d.y + a.y) / 2} ${a.x},${a.y}Z`}
            fill="var(--cream)"
          />
        );
      })}
    </svg>
  );
}
