import type { Meal } from "../store/mealsSlice";

type RawMeal = {
  id: string | number;
  meal: string;
  price: string | number;
  img?: string;
  category?: string;
};

export async function fetchMeals(signal?: AbortSignal): Promise<Meal[]> {
  const URL = import.meta.env.VITE_MEALS_URL as string | undefined;
  if (!URL) throw new Error("VITE_MEALS_URL is not defined");

  const res = await fetch(URL, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const raw: RawMeal[] = await res.json();

  return raw.map((m) => ({
    id: m.id,
    title: m.meal,
    price: Number(m.price),
    image: m.img ?? "",
    category: m.category ?? "",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
  }));
}
