export interface ShopProperties {
    id: string,
    name: string,
    width: number,
    height: number,
    depth: number,
    color: number
}

const COUNT_SHOPS = 100
const SHOPS: ShopProperties[] = new Array(COUNT_SHOPS);
const HEIGHT = 3;

const brands = ["Apple", "Zara", "H&M", "Starbucks", "Nike", "Adidas", "KFC", "McDonalds", "LG", "Samsung", "Pizza Hut", "Subway", "Burger King", "Puma", "Reebok", "Levis", "Gucci", "Prada", "Chanel", "Dior"];
const colors = [0xffaa00, 0x00aa55, 0xaa44aa, 0x4444aa, 0xaa4444, 0x00aaaa, 0xff5500, 0x5500ff];

for (let i = 0; i < COUNT_SHOPS; i++) {
    SHOPS[i] = {
        id: `shop_${String(i + 1).padStart(3, '0')}`,
        name: `${brands[i % brands.length]} ${i + 1}`,
        width: Math.floor(Math.random() * 5) + 2,
        height: HEIGHT,
        depth: Math.floor(Math.random() * 5) + 2,
        color: colors[i % colors.length]
    };
}

export default SHOPS;