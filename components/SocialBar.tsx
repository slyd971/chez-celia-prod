import { brand, socials } from "@/content/celia";
import { InstagramIcon, TiktokIcon, YoutubeIcon } from "./icons";

const icons = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
};

// Bandeau sous le hero : liens vers les réseaux sociaux de Célia.
export function SocialBar() {
  return (
    <nav className="social-bar" aria-label="Réseaux sociaux">
      <div className="wrap social-bar-inner">
        <span className="social-bar-label">{socials.label}</span>
        <ul className="social-bar-list">
          {socials.items.map((item) => {
            const Icon = icons[item.network];
            return (
              <li key={item.network}>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <Icon />
                  <span>{item.name}</span>
                  <span className="sr-only"> {brand.handle} (nouvel onglet)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
