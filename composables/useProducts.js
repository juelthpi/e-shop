export const useProducts = () => {
    const getRandomImage = (folder = 'products', max = 14) => {
        const num = Math.floor(Math.random() * max) + 1;
        return `/assets/images/${folder}/${num}.jpg`;
    };

    const generateProducts = (count = 10) => {
        return Array.from({ length: count }, (_, i) => ({
            id: `prod-${i}`,
            name: ['Women Fashion', 'Trendy Shoes', 'Baby Accessories', 'Man Watch'][Math.floor(Math.random() * 4)],
            image: getRandomImage(),
            images: [getRandomImage(), getRandomImage(), getRandomImage()],
            price: Math.floor(Math.random() * 1000) + 100,
            oldPrice: Math.floor(Math.random() * 200) + 1100,
            rating: 5,
            reviews: '1.2K',
            discount: '15% OFF'
        }));
    };

    const generateBrands = (count = 10) => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            name: ['Aveeno', 'Simple', 'Footco'][Math.floor(Math.random() * 3)],
            image: getRandomImage('products', 10) // reusing product images as brands for demo as per user request to maintain design but randomize
        }));
    };

    return {
        generateProducts,
        generateBrands
    };
};
