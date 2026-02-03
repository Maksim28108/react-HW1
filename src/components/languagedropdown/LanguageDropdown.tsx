import { useTranslation } from "react-i18next";
import i18n, { STORAGE_KEY } from "../../i18n/i18n";

export function LanguageDropdown() {
  const { i18n: hookI18n } = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = e.target.value;
    i18n.changeLanguage(lng);
    localStorage.setItem(STORAGE_KEY, lng);
  };

  return (
    <select value={hookI18n.language || "en"} onChange={onChange}>
      <option value="en">EN</option>
      <option value="ru">RU</option>
      <option value="lt">LT</option>
    </select>
  );
}
