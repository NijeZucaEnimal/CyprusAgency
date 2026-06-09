const charMap: Record<string, string> = {
  č: "c", ć: "c", š: "s", ž: "z", đ: "dj",
  Č: "C", Ć: "C", Š: "S", Ž: "Z", Đ: "Dj",
  ı: "i", İ: "I", ş: "s", Ş: "S", ğ: "g", Ğ: "G",
};

export function slugify(input: string): string {
  return input
    .split("")
    .map((c) => charMap[c] ?? c)
    .join("")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
