export async function fetchMeals(signal) {
  const url = import.meta.env.VITE_MEALS_URL?.trim();

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal
  });

  if (!res.ok) {
    throw new Error(`Failed to load meals: ${res.status}`);
  }

  const data = await res.json();

  return data.map((x, i) => {
    return {
      id: x.id ?? i,
      title: x.meal,
      image: x.img,
      description: x.instructions,
      price: Number(x.price),
    };
  });
}
