

export async function fetchMeals() {
  const url = import.meta.env.VITE_MEALS_URL?.trim();
  const res = await fetch(url, { headers: { Accept: "application/json" } });

  const ct = res.headers.get("content-type") || "";
  if (!ct.includes("application/json")) {
    const text = await res.text();
    throw new Error(`expected JSON, got ${res.status} ${text.slice(0, 100)}`);
  }

  const data = await res.json();

  const pick = (...vals) =>
    vals.map(v => (typeof v === "string" ? v.trim() : "")).find(Boolean);

  const PLACEHOLDER_DESC =
    "Lorem ipsum is simply dummy text of the printing and typesetting industry.";

  return data.map((x, i) => {
    const title = pick(
      x.meal, x.title, x.name, x.mealTitle, x.label, x.dish, x.product, x.food
    ) || `Item ${i + 1}`;

    const image = pick(x.img, x.image, x.photo, x.picture, x.avatar) || "";

    const price = Number(x.price ?? x.amount ?? x.cost ?? 0);

    return {
      id: x.id ?? i,
      title,
      image,
      description: PLACEHOLDER_DESC, 
      price,
    };
  });
}
