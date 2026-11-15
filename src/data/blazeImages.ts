import heroSpreadImg from '../assets/images/hero_blaze_addis_1794740396083.jpg';
import habeshanFeastImg from '../assets/images/dish_habeshan_feast_1794740395332.jpg';
import artisanPizzaImg from '../assets/images/dish_artisan_pizza_1794740395800.jpg';
import gourmetBurgerImg from '../assets/images/dish_gourmet_burger_1794740396447.jpg';
import spicedBreakfastImg from '../assets/images/dish_spiced_breakfast_1794740397339.jpg';
import bakeryPastriesImg from '../assets/images/dish_bakery_pastries_1794740396274.jpg';
import pastaGrillImg from '../assets/images/dish_pasta_grill_1794740397697.jpg';

export const BLAZE_IMAGES = {
  hero: heroSpreadImg,
  habeshan: habeshanFeastImg,
  pizza: artisanPizzaImg,
  burger: gourmetBurgerImg,
  breakfast: spicedBreakfastImg,
  bakery: bakeryPastriesImg,
  pastaGrill: pastaGrillImg,
} as const;

export type BlazeImageKey = keyof typeof BLAZE_IMAGES;
