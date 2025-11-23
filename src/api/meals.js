export async function fetchMeals() {
  const URL = import.meta.env.VITE_MEALS_URL;           
  if (!URL) throw new Error('VITE_MEALS_URL is not defined');

  const res = await fetch(URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const raw = await res.json();

  return raw.map((m) => ({
    id: m.id,
    title: m.meal,                       
    price: Number(m.price),             
    image: m.img,                      
    category: m.category,                
    description:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
  }));
}

