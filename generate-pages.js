/* ============================================================
   Finland Merchandise Tier 2 - Page Generator
   Generates 64 subpages (homepage already exists as index.html)
   ============================================================ */

const fs = require('fs');
const path = require('path');

// ============================================================
// PAGES ARRAY — Each entry: { slug, title, description, h1, h2s[], closing }
// ============================================================

const pages = [
  {
    slug: 'finland-saunas-per-capita',
    title: 'Finland Saunas Per Capita – Finnish Sauna Statistics',
    description: 'Discover how many saunas Finland has per capita. Explore Finnish sauna culture statistics and why saunas are a way of life in Finland.',
    h1: 'Finland Saunas Per Capita',
    h2s: ['How Many Saunas Does Finland Have?', 'Saunas Per Capita Statistics', 'Why Saunas Are So Common in Finland', 'The Cultural Significance of Finnish Sauna'],
    closing: 'Experience Finnish Sauna Culture'
  },
  {
    slug: 'finnish-sauna',
    title: 'Finnish Sauna – The Heart of Finnish Culture',
    description: 'Explore the authentic Finnish sauna experience. Learn about traditions, health benefits, and what makes Finnish sauna unique in the world.',
    h1: 'Finnish Sauna',
    h2s: ['The History of Finnish Sauna', 'Traditional Finnish Sauna Rituals', 'Health Benefits of Finnish Sauna', 'Modern Finnish Sauna Design'],
    closing: 'Embrace the Finnish Sauna Tradition'
  },
  {
    slug: 'finnish-sauna-culture',
    title: 'Finnish Sauna Culture – Traditions and Customs',
    description: 'Discover the rich traditions of Finnish sauna culture. Learn about customs, etiquette, and the social importance of sauna in Finland.',
    h1: 'Finnish Sauna Culture',
    h2s: ['The Roots of Sauna Culture in Finland', 'Sauna Etiquette and Customs', 'Sauna as a Social Space', 'How Sauna Culture Is Passed Down'],
    closing: 'Dive Into Finnish Sauna Culture'
  },
  {
    slug: 'finnish-sauna-helsinki',
    title: 'Finnish Sauna Helsinki – Best Saunas in the Capital',
    description: 'Find the best Finnish sauna experiences in Helsinki. From public saunas to luxury spas, explore Helsinki sauna culture.',
    h1: 'Finnish Sauna Helsinki',
    h2s: ['Public Saunas in Helsinki', 'Hotel and Spa Saunas in Helsinki', 'Unique Sauna Experiences in Helsinki', 'Helsinki Sauna Culture and Events'],
    closing: 'Find Your Helsinki Sauna'
  },
  {
    slug: 'finland-sauna-accessories',
    title: 'Finland Sauna Accessories – Essential Sauna Gear',
    description: 'Shop authentic Finland sauna accessories. Find löyly buckets, sauna hats, aroma oils, and traditional Finnish sauna essentials.',
    h1: 'Finland Sauna Accessories',
    h2s: ['Traditional Sauna Accessories from Finland', 'Sauna Buckets and Ladles', 'Sauna Hats and Aroma Oils', 'Where to Buy Finnish Sauna Accessories'],
    closing: 'Shop Sauna Accessories'
  },
  {
    slug: 'sauna-decor',
    title: 'Sauna Decor – Finnish-Inspired Sauna Design',
    description: 'Discover sauna decor ideas inspired by Finnish design. Transform your sauna space with authentic Finnish aesthetics and accessories.',
    h1: 'Sauna Decor',
    h2s: ['Finnish Sauna Design Principles', 'Lighting and Ambiance for Sauna Decor', 'Natural Materials in Sauna Design', 'Accessories That Elevate Your Sauna Space'],
    closing: 'Design Your Sauna Space'
  },
  {
    slug: 'sauna-humor-shirts',
    title: 'Sauna Humor Shirts – Funny Sauna T-Shirts',
    description: 'Find the best sauna humor shirts and funny sauna t-shirts. Perfect gifts for sauna lovers who appreciate Finnish-style humor.',
    h1: 'Sauna Humor Shirts',
    h2s: ['Why Sauna Humor Is So Popular', 'Best Finnish Sauna Jokes and Sayings', 'Sauna Humor Shirt Design Ideas', 'Where to Find Funny Sauna T-Shirts'],
    closing: 'Find Your Funny Sauna Tee'
  },
  {
    slug: 'sauna-culture-in-finland',
    title: 'Sauna Culture in Finland – A Way of Life',
    description: 'Explore the deep-rooted sauna culture in Finland. Learn how sauna bathing shapes Finnish life, customs, and social connections.',
    h1: 'Sauna Culture in Finland',
    h2s: ['The Origins of Sauna Culture', 'Sauna in Daily Finnish Life', 'Seasonal Sauna Traditions', 'Sauna Culture Beyond Finland'],
    closing: 'Explore Finnish Sauna Culture'
  },
  {
    slug: 'finland-products-1',
    title: 'Finland Products – Authentic Finnish Merchandise',
    description: 'Shop authentic Finland products. Discover Finnish design, traditional items, and modern merchandise that celebrate Finnish culture.',
    h1: 'Finland Products',
    h2s: ['Traditional Finnish Products', 'Modern Finnish Design Items', 'Finnish Food and Beverage Products', 'Where to Buy Finland Products'],
    closing: 'Shop Finland Products'
  },
  {
    slug: 'sauna-gift-ideas',
    title: 'Sauna Gift Ideas – Perfect Presents for Sauna Lovers',
    description: 'Find the best sauna gift ideas. From sauna accessories to Finnish-themed gifts, discover presents that any sauna enthusiast will love.',
    h1: 'Sauna Gift Ideas',
    h2s: ['Sauna Accessories as Gifts', 'Finnish Sauna-Themed Apparel', 'Home Sauna Gift Ideas', 'Unique Sauna Gifts for Every Budget'],
    closing: 'Find the Perfect Sauna Gift'
  },
  {
    slug: 'sauna-lifestyle-products',
    title: 'Sauna Lifestyle Products – Embrace the Sauna Way of Life',
    description: 'Explore sauna lifestyle products that complement your sauna routine. From wellness items to relaxation accessories, elevate your sauna experience.',
    h1: 'Sauna Lifestyle Products',
    h2s: ['Wellness Products for Sauna Enthusiasts', 'Sauna Relaxation Accessories', 'Skincare and Body Care for Sauna', 'Sauna Lifestyle Apparel'],
    closing: 'Embrace the Sauna Lifestyle'
  },
  {
    slug: 'sauna-lifestyle',
    title: 'Sauna Lifestyle – Living the Finnish Way',
    description: 'Discover the sauna lifestyle and how it promotes wellbeing. Learn how to incorporate Finnish sauna traditions into your daily routine.',
    h1: 'Sauna Lifestyle',
    h2s: ['What Is the Sauna Lifestyle?', 'Health Benefits of a Regular Sauna Routine', 'Combining Sauna with Cold Plunge', 'Building Your Own Sauna Lifestyle'],
    closing: 'Start Living the Sauna Lifestyle'
  },
  {
    slug: 'funny-sauna-merch',
    title: 'Funny Sauna Merch – Hilarious Sauna-Themed Products',
    description: 'Shop funny sauna merch! Find hilarious t-shirts, mugs, and gifts with sauna humor. Perfect for Finnish sauna enthusiasts with a sense of humor.',
    h1: 'Funny Sauna Merch',
    h2s: ['Best Funny Sauna T-Shirts', 'Sauna Humor Mugs and Drinkware', 'Funny Sauna Signs and Decor', 'Gifting Funny Sauna Merchandise'],
    closing: 'Browse Funny Sauna Merch'
  },
  {
    slug: 'sauna-products',
    title: 'Sauna Products – Everything You Need for Sauna',
    description: 'Shop sauna products from Finland. Find traditional sauna accessories, modern sauna gear, and authentic Finnish sauna essentials.',
    h1: 'Sauna Products',
    h2s: ['Essential Sauna Products', 'Traditional Finnish Sauna Accessories', 'Modern Sauna Technology', 'Where to Buy Quality Sauna Products'],
    closing: 'Shop Quality Sauna Products'
  },
  {
    slug: 'finnish-cities',
    title: 'Finnish Cities – Explore Urban Finland',
    description: 'Discover Finnish cities from Helsinki to Rovaniemi. Learn about urban culture, attractions, and what makes each Finnish city unique.',
    h1: 'Finnish Cities',
    h2s: ['Major Cities in Finland', 'Helsinki – The Capital City', 'Tampere, Turku, and Other Urban Centers', 'Why Finnish Cities Are Worth Visiting'],
    closing: 'Explore Finnish Cities'
  },
  {
    slug: 'places-in-finland',
    title: 'Places in Finland – Must-Visit Destinations',
    description: 'Explore the most beautiful places in Finland. From national parks to archipelago islands, discover Finland stunning natural and cultural sites.',
    h1: 'Places in Finland',
    h2s: ['Natural Wonders of Finland', 'Historic Towns and Cities', 'National Parks and Outdoor Destinations', 'Islands and Archipelagos of Finland'],
    closing: 'Discover Places in Finland'
  },
  {
    slug: 'aurora-borealis-in-finland',
    title: 'Aurora Borealis in Finland – The Northern Lights Experience',
    description: 'Discover the best places to see aurora borealis in Finland. Learn about Northern Lights viewing, seasons, and tips for your Finland trip.',
    h1: 'Aurora Borealis in Finland',
    h2s: ['Best Places to See Northern Lights in Finland', 'When to Visit for Aurora Borealis', 'Northern Lights Photography Tips', 'Aurora-Themed Merchandise and Souvenirs'],
    closing: 'Plan Your Aurora Adventure'
  },
  {
    slug: 'finnish-avanto-cold-plunge',
    title: 'Finnish Avanto – The Original Cold Plunge Experience',
    description: 'Discover Finnish avanto, the original cold plunge tradition. Learn about ice swimming, health benefits, and how to experience avanto in Finland.',
    h1: 'Finnish Avanto – The Original Cold Plunge',
    h2s: ['What Is Finnish Avanto?', 'Health Benefits of Cold Plunge', 'Avanto Traditions and Customs', 'How to Experience Avanto in Finland'],
    closing: 'Try Finnish Avanto'
  },
  {
    slug: 'finland-clothes',
    title: 'Finland Clothes – Finnish Fashion and Apparel',
    description: 'Shop Finland clothes inspired by Finnish design. Find apparel that celebrates Finnish culture, from casual wear to designer fashion.',
    h1: 'Finland Clothes',
    h2s: ['Finnish Fashion Brands', 'Casual Finland Apparel', 'Traditional Finnish Clothing', 'Where to Buy Finland Clothes Online'],
    closing: 'Shop Finland Clothes'
  },
  {
    slug: 'finland-ice-hockey-shirt',
    title: 'Finland Ice Hockey Shirt – Finnish Hockey Apparel',
    description: 'Find Finland ice hockey shirts and apparel. Celebrate Finnish hockey culture with authentic team-inspired clothing and merchandise.',
    h1: 'Finland Ice Hockey Shirt',
    h2s: ['Finland Ice Hockey History', 'Popular Finnish Hockey Teams', 'Ice Hockey Shirt Styles and Designs', 'Where to Buy Finland Hockey Apparel'],
    closing: 'Get Your Finland Hockey Shirt'
  },
  {
    slug: 'finland-hoodie',
    title: 'Finland Hoodie – Comfortable Finnish Apparel',
    description: 'Shop Finland hoodies featuring Finnish design and culture. Stay warm and stylish with authentic Finland-themed hoodies and sweatshirts.',
    h1: 'Finland Hoodie',
    h2s: ['Finland Hoodie Styles', 'Finnish Design on Hoodies', 'Hoodies with Finland Landmarks', 'Where to Buy Finland Hoodies Online'],
    closing: 'Shop Finland Hoodies'
  },
  {
    slug: 'finland-merchandise-1',
    title: 'Finland Merchandise – Authentic Finnish Products',
    description: 'Discover authentic Finland merchandise. Shop Finnish design, souvenirs, apparel, and gifts that celebrate the best of Finland.',
    h1: 'Finland Merchandise',
    h2s: ['Popular Finland Merchandise Categories', 'Finnish Design Items', 'Finland Souvenirs and Gifts', 'Why Choose Authentic Finland Merchandise'],
    closing: 'Browse Finland Merchandise'
  },
  {
    slug: 'finland-shirt',
    title: 'Finland Shirt – Finnish-Themed T-Shirts and Tops',
    description: 'Shop Finland shirts featuring Finnish design, landmarks, and cultural symbols. Find the perfect Finland-themed shirt for any occasion.',
    h1: 'Finland Shirt',
    h2s: ['Finland Shirt Designs', 'Popular Finland T-Shirt Themes', 'Quality Materials and Printing', 'Where to Buy Finland Shirts'],
    closing: 'Find Your Finland Shirt'
  },
  {
    slug: 'finland-souvenirs',
    title: 'Finland Souvenirs – Bring Finland Home',
    description: 'Shop Finland souvenirs that capture the spirit of Finnish culture. Find authentic keepsakes, gifts, and mementos from Finland.',
    h1: 'Finland Souvenirs',
    h2s: ['Traditional Finnish Souvenirs', 'Helsinki-Themed Souvenirs', 'Lapland and Arctic Souvenirs', 'Where to Buy Finland Souvenirs Online'],
    closing: 'Shop Finland Souvenirs'
  },
  {
    slug: 'finland-t-shirt',
    title: 'Finland T-Shirt – Finnish Pride Apparel',
    description: 'Shop Finland t-shirts featuring Finnish flags, symbols, and cultural designs. Wear your Finnish pride with authentic t-shirts.',
    h1: 'Finland T-Shirt',
    h2s: ['Finland T-Shirt Design Ideas', 'Finnish Flag T-Shirts', 'Finland Landmark T-Shirts', 'Comfortable and Durable Finland T-Shirts'],
    closing: 'Wear Your Finnish Pride'
  },
  {
    slug: 'finnish-clothing',
    title: 'Finnish Clothing – Design and Fashion from Finland',
    description: 'Discover Finnish clothing brands and fashion. From timeless design to modern streetwear, explore authentic Finnish apparel.',
    h1: 'Finnish Clothing',
    h2s: ['Iconic Finnish Clothing Brands', 'Finnish Design in Fashion', 'Traditional Finnish Garments', 'Where to Buy Finnish Clothing'],
    closing: 'Discover Finnish Clothing'
  },
  {
    slug: 'finnish-design',
    title: 'Finnish Design – Timeless Nordic Aesthetics',
    description: 'Explore Finnish design known worldwide for its simplicity, functionality, and beauty. Discover iconic Finnish design products and brands.',
    h1: 'Finnish Design',
    h2s: ['Principles of Finnish Design', 'Iconic Finnish Design Brands', 'Finnish Design in Home and Lifestyle', 'Why Finnish Design Matters'],
    closing: 'Explore Finnish Design'
  },
  {
    slug: 'finnish-humor',
    title: 'Finnish Humor – Funny Finnish Sayings and Jokes',
    description: 'Discover Finnish humor and funny Finnish sayings. Explore hilarious t-shirts, mugs, and gifts featuring Finnish wit and sarcasm.',
    h1: 'Finnish Humor',
    h2s: ['What Makes Finnish Humor Unique', 'Popular Finnish Sayings and Jokes', 'Finnish Humor Merchandise', 'Gifts for Fans of Finnish Humor'],
    closing: 'Enjoy Finnish Humor'
  },
  {
    slug: 'finnish-language',
    title: 'Finnish Language – Learn and Celebrate Finnish',
    description: 'Explore the Finnish language and its unique characteristics. Find Finnish language-themed gifts, apparel, and learning resources.',
    h1: 'Finnish Language',
    h2s: ['Why Finnish Is a Unique Language', 'Common Finnish Words and Phrases', 'Finnish Language Merchandise', 'Learning Resources for Finnish'],
    closing: 'Celebrate the Finnish Language'
  },
  {
    slug: 'finnish-santa-clause',
    title: 'Finnish Santa Claus – Joulupukki from Lapland',
    description: 'Discover the Finnish Santa Claus tradition. Learn about Joulupukki, the real Santa from Finnish Lapland, and find Santa-themed merchandise.',
    h1: 'Finnish Santa Claus',
    h2s: ['Who Is Finnish Santa Claus?', 'Santa Claus Village in Rovaniemi', 'Finnish Christmas Traditions', 'Santa Claus Merchandise and Gifts'],
    closing: 'Meet Finnish Santa Claus'
  },
  {
    slug: 'finnish-sisu',
    title: 'Finnish Sisu – The Spirit of Resilience',
    description: 'Discover the meaning of Finnish sisu, the unique Finnish concept of resilience and determination. Find sisu-themed merchandise and gifts.',
    h1: 'Finnish Sisu',
    h2s: ['What Is Finnish Sisu?', 'The History and Meaning of Sisu', 'Sisu in Modern Finnish Culture', 'Sisu-Themed Products and Apparel'],
    closing: 'Embrace Finnish Sisu'
  },
  {
    slug: 'finnish-things',
    title: 'Finnish Things – Unique Items from Finland',
    description: 'Discover Finnish things that make Finland special. From design items to traditional products, explore what Finland is known for.',
    h1: 'Finnish Things',
    h2s: ['Things Finland Is Famous For', 'Unique Finnish Products', 'Finnish Cultural Icons', 'Where to Find Authentic Finnish Things'],
    closing: 'Discover Finnish Things'
  },
  {
    slug: 'happiest-country-in-the-world',
    title: 'Happiest Country in the World – Why Finland Wins',
    description: 'Discover why Finland is the happiest country in the world. Learn about Finnish wellbeing, lifestyle, and the secrets to Finland happiness.',
    h1: 'Happiest Country in the World',
    h2s: ['Why Is Finland the Happiest Country?', 'Finnish Wellbeing and Lifestyle', 'Factors Behind Finland Happiness', 'Happiness-Themed Finland Merchandise'],
    closing: 'Celebrate Finland Happiness'
  },
  {
    slug: 'helsinki-finland',
    title: 'Helsinki Finland – The Vibrant Capital City',
    description: 'Explore Helsinki Finland, the dynamic capital of Finland. Discover attractions, culture, design districts, and Helsinki-inspired merchandise.',
    h1: 'Helsinki Finland',
    h2s: ['Helsinki Architecture and Design', 'Top Attractions in Helsinki', 'Helsinki Food and Culture Scene', 'Helsinki-Themed Gifts and Souvenirs'],
    closing: 'Explore Helsinki Finland'
  },
  {
    slug: 'helsinki-shirt',
    title: 'Helsinki Shirt – Celebrate the Finnish Capital',
    description: 'Shop Helsinki shirts featuring the capital city landmarks, design, and culture. Find the perfect Helsinki-themed apparel.',
    h1: 'Helsinki Shirt',
    h2s: ['Helsinki Shirt Designs', 'Helsinki Landmark Shirts', 'Quality Helsinki Apparel', 'Where to Buy Helsinki Shirts'],
    closing: 'Get Your Helsinki Shirt'
  },
  {
    slug: 'helsinki-souvenirs',
    title: 'Helsinki Souvenirs – Memories of the Capital',
    description: 'Shop Helsinki souvenirs that capture the essence of Finland capital. Find authentic keepsakes, gifts, and mementos from Helsinki.',
    h1: 'Helsinki Souvenirs',
    h2s: ['Popular Helsinki Souvenirs', 'Helsinki Design Souvenirs', 'Helsinki Food and Drink Gifts', 'Where to Buy Helsinki Souvenirs Online'],
    closing: 'Shop Helsinki Souvenirs'
  },
  {
    slug: 'helsinki-tote-bag',
    title: 'Helsinki Tote Bag – Stylish Finnish Carryalls',
    description: 'Shop Helsinki tote bags featuring Finnish design and city themes. Durable, stylish, and perfect for everyday use.',
    h1: 'Helsinki Tote Bag',
    h2s: ['Helsinki Tote Bag Designs', 'Finnish Design on Tote Bags', 'Eco-Friendly Helsinki Totes', 'Where to Buy Helsinki Tote Bags'],
    closing: 'Shop Helsinki Tote Bags'
  },
  {
    slug: 'helsinki-towel',
    title: 'Helsinki Towel – Finnish Sauna and Beach Towels',
    description: 'Shop Helsinki towels featuring Finnish design. Perfect for sauna, beach, or home. Discover stylish Finnish towel collections.',
    h1: 'Helsinki Towel',
    h2s: ['Helsinki Towel Designs', 'Finnish Sauna Towels', 'Beach and Bath Towels from Helsinki', 'Quality Materials in Helsinki Towels'],
    closing: 'Browse Helsinki Towels'
  },
  {
    slug: 'ice-hockey-apparel',
    title: 'Ice Hockey Apparel – Finnish Hockey Style',
    description: 'Shop ice hockey apparel inspired by Finnish hockey culture. Find jerseys, t-shirts, and gear for true hockey fans.',
    h1: 'Ice Hockey Apparel',
    h2s: ['Finnish Ice Hockey Culture', 'Types of Ice Hockey Apparel', 'Popular Hockey Apparel Designs', 'Where to Buy Ice Hockey Apparel'],
    closing: 'Shop Ice Hockey Apparel'
  },
  {
    slug: 'ice-hockey-merchandise',
    title: 'Ice Hockey Merchandise – Finnish Hockey Gear',
    description: 'Discover ice hockey merchandise celebrating Finnish hockey. From apparel to accessories, find authentic hockey-themed products.',
    h1: 'Ice Hockey Merchandise',
    h2s: ['Finnish Hockey Team Merchandise', 'Ice Hockey Accessories', 'Hockey-Themed Gifts', 'Where to Find Ice Hockey Merchandise'],
    closing: 'Find Hockey Merchandise'
  },
  {
    slug: 'ice-hockey-t-shirts',
    title: 'Ice Hockey T-Shirts – Finnish Hockey Apparel',
    description: 'Shop ice hockey t-shirts featuring Finnish hockey teams and culture. Comfortable, stylish, and perfect for hockey fans.',
    h1: 'Ice Hockey T-Shirts',
    h2s: ['Ice Hockey T-Shirt Designs', 'Finnish Hockey Team T-Shirts', 'Hockey Humor T-Shirts', 'Quality Ice Hockey T-Shirts'],
    closing: 'Shop Hockey T-Shirts'
  },
  {
    slug: 'kuopio-finland',
    title: 'Kuopio Finland – City of Lakes and Culture',
    description: 'Discover Kuopio Finland, a beautiful lake city in Eastern Finland. Explore attractions, culture, and Kuopio-inspired merchandise.',
    h1: 'Kuopio Finland',
    h2s: ['Kuopio Location and Geography', 'Top Attractions in Kuopio', 'Kuopio Culture and Events', 'Kuopio-Themed Gifts and Souvenirs'],
    closing: 'Discover Kuopio Finland'
  },
  {
    slug: 'lapland-finland',
    title: 'Lapland Finland – The Arctic Wonderland',
    description: 'Explore Lapland Finland, the magical Arctic region. Discover Northern Lights, Santa Claus, wilderness, and Lapland-inspired merchandise.',
    h1: 'Lapland Finland',
    h2s: ['What Makes Lapland Special', 'Northern Lights in Lapland', 'Santa Claus and Christmas in Lapland', 'Lapland-Themed Merchandise and Gifts'],
    closing: 'Explore Lapland Finland'
  },
  {
    slug: 'lapland-shirts',
    title: 'Lapland Shirts – Arctic Finnish Apparel',
    description: 'Shop Lapland shirts featuring Arctic themes and Finnish Lapland designs. Perfect for those who love the magic of Northern Finland.',
    h1: 'Lapland Shirts',
    h2s: ['Lapland Shirt Designs', 'Northern Lights Apparel', 'Santa Claus and Reindeer Shirts', 'Where to Buy Lapland Shirts'],
    closing: 'Shop Lapland Shirts'
  },
  {
    slug: 'lapland-souvenir-shirt',
    title: 'Lapland Souvenir Shirt – Memories of the Arctic',
    description: 'Find Lapland souvenir shirts that celebrate your Arctic adventure. Authentic designs inspired by Finnish Lapland culture.',
    h1: 'Lapland Souvenir Shirt',
    h2s: ['Lapland Souvenir Shirt Styles', 'Popular Lapland Shirt Themes', 'Quality Souvenir Apparel', 'Where to Buy Lapland Souvenir Shirts'],
    closing: 'Get Your Lapland Souvenir Shirt'
  },
  {
    slug: 'oulu-finland',
    title: 'Oulu Finland – Northern Tech Hub and Culture',
    description: 'Discover Oulu Finland, a vibrant city in Northern Finland. Explore attractions, tech culture, and Oulu-inspired merchandise.',
    h1: 'Oulu Finland',
    h2s: ['Oulu Location and History', 'Top Attractions in Oulu', 'Oulu Technology and Innovation', 'Oulu-Themed Gifts and Souvenirs'],
    closing: 'Discover Oulu Finland'
  },
  {
    slug: 'porvoo-finland',
    title: 'Porvoo Finland – Charming Old Town',
    description: 'Discover Porvoo Finland, one of the oldest towns in Finland. Explore cobblestone streets, red houses, and Porvoo-inspired merchandise.',
    h1: 'Porvoo Finland',
    h2s: ['Porvoo History and Heritage', 'Porvoo Old Town Attractions', 'Porvoo Culture and Events', 'Porvoo-Themed Gifts and Souvenirs'],
    closing: 'Visit Porvoo Finland'
  },
  {
    slug: 'rovaniemi-finland',
    title: 'Rovaniemi Finland – Official Hometown of Santa',
    description: 'Discover Rovaniemi Finland, the official hometown of Santa Claus. Explore Arctic attractions, Northern Lights, and Rovaniemi merchandise.',
    h1: 'Rovaniemi Finland',
    h2s: ['Rovaniemi and Santa Claus Village', 'Arctic Attractions in Rovaniemi', 'Northern Lights in Rovaniemi', 'Rovaniemi-Themed Souvenirs and Gifts'],
    closing: 'Explore Rovaniemi Finland'
  },
  {
    slug: 'senate-square-helsinki',
    title: 'Senate Square Helsinki – Historic Heart of the Capital',
    description: 'Explore Senate Square Helsinki, the historic center of Finland capital. Learn about its architecture, history, and significance.',
    h1: 'Senate Square Helsinki',
    h2s: ['History of Senate Square', 'Architecture Around Senate Square', 'Events and Gatherings at Senate Square', 'Senate Square Souvenirs and Merchandise'],
    closing: 'Visit Senate Square Helsinki'
  },
  {
    slug: 'suomenlinna-finland',
    title: 'Suomenlinna Finland – The Sea Fortress',
    description: 'Explore Suomenlinna Finland, a UNESCO World Heritage sea fortress. Discover its history, attractions, and Suomenlinna-inspired merchandise.',
    h1: 'Suomenlinna Finland',
    h2s: ['History of Suomenlinna Fortress', 'Exploring Suomenlinna Today', 'Suomenlinna Museums and Attractions', 'Suomenlinna-Themed Gifts and Souvenirs'],
    closing: 'Explore Suomenlinna Finland'
  },
  {
    slug: 'tampere-finland',
    title: 'Tampere Finland – Sauna Capital of the World',
    description: 'Discover Tampere Finland, known as the sauna capital of the world. Explore attractions, culture, and Tampere-inspired merchandise.',
    h1: 'Tampere Finland',
    h2s: ['Tampere and Its Sauna Culture', 'Top Attractions in Tampere', 'Tampere Culture and Events', 'Tampere-Themed Gifts and Souvenirs'],
    closing: 'Discover Tampere Finland'
  },
  {
    slug: 'traveling-in-finland',
    title: 'Traveling in Finland – Your Finnish Adventure Guide',
    description: 'Discover tips for traveling in Finland. From cities to nature, learn how to make the most of your Finnish travel experience.',
    h1: 'Traveling in Finland',
    h2s: ['Best Times to Visit Finland', 'Top Destinations in Finland', 'Travel Tips for Finland', 'Finland Travel Merchandise and Gear'],
    closing: 'Plan Your Finland Trip'
  },
  {
    slug: 'turku-finland',
    title: 'Turku Finland – The Former Capital and Cultural Hub',
    description: 'Discover Turku Finland, the former capital and oldest city in Finland. Explore history, culture, and Turku-inspired merchandise.',
    h1: 'Turku Finland',
    h2s: ['Turku History and Heritage', 'Top Attractions in Turku', 'Turku Culture and Events', 'Turku-Themed Gifts and Souvenirs'],
    closing: 'Explore Turku Finland'
  },
  {
    slug: 'vaasa-finland',
    title: 'Vaasa Finland – Coastal City with Character',
    description: 'Discover Vaasa Finland, a charming coastal city on the west coast. Explore attractions, culture, and Vaasa-inspired merchandise.',
    h1: 'Vaasa Finland',
    h2s: ['Vaasa Location and History', 'Top Attractions in Vaasa', 'Vaasa Nature and Outdoor Activities', 'Vaasa-Themed Gifts and Souvenirs'],
    closing: 'Discover Vaasa Finland'
  },
  {
    slug: 'funny-finland-t-shirt',
    title: 'Funny Finland T-Shirt – Hilarious Finnish Tees',
    description: 'Shop funny Finland t-shirts with hilarious Finnish humor. Perfect gifts for anyone who loves Finland and Finnish wit.',
    h1: 'Funny Finland T-Shirt',
    h2s: ['Funny Finland T-Shirt Designs', 'Popular Finnish Humor Themes', 'Quality Funny T-Shirts', 'Where to Buy Funny Finland T-Shirts'],
    closing: 'Shop Funny Finland T-Shirts'
  },
  {
    slug: 'cool-shirts',
    title: 'Cool Shirts – Stylish Finnish Apparel',
    description: 'Discover cool shirts with Finnish design inspiration. From minimalist to bold, find stylish shirts that celebrate Finnish aesthetics.',
    h1: 'Cool Shirts',
    h2s: ['Cool Shirt Design Ideas', 'Finnish-Inspired Cool Shirts', 'Shirt Styles and Quality', 'Where to Find Cool Shirts Online'],
    closing: 'Find Cool Finnish Shirts'
  },
  {
    slug: 'hilarious-finnish-tees',
    title: 'Hilarious Finnish Tees – Funny Finland Apparel',
    description: 'Shop hilarious Finnish tees with the best Finnish humor. Unique funny t-shirts that celebrate Finnish culture with a laugh.',
    h1: 'Hilarious Finnish Tees',
    h2s: ['Best Hilarious Finnish Tee Designs', 'Finnish Humor That Translates', 'Quality Tee Materials and Printing', 'Where to Buy Hilarious Finnish Tees'],
    closing: 'Shop Hilarious Finnish Tees'
  },
  {
    slug: 'printed-helsinki-shirts',
    title: 'Printed Helsinki Shirts – Custom Helsinki Apparel',
    description: 'Shop printed Helsinki shirts featuring custom designs of the capital. Find unique Helsinki-themed apparel for every style.',
    h1: 'Printed Helsinki Shirts',
    h2s: ['Printed Helsinki Shirt Designs', 'Helsinki Landmarks on Shirts', 'Helsinki Typography and Logo Shirts', 'Where to Buy Printed Helsinki Shirts'],
    closing: 'Shop Printed Helsinki Shirts'
  },
  {
    slug: 'classic-helsinki-hoodie',
    title: 'Classic Helsinki Hoodie – Timeless Capital Style',
    description: 'Shop classic Helsinki hoodies featuring timeless designs inspired by the Finnish capital. Comfortable and authentic Finnish apparel.',
    h1: 'Classic Helsinki Hoodie',
    h2s: ['Classic Helsinki Hoodie Designs', 'Helsinki-Inspired Hoodie Styles', 'Quality Materials and Comfort', 'Where to Buy Classic Helsinki Hoodies'],
    closing: 'Get Your Helsinki Hoodie'
  },
  {
    slug: 'finland-mugs',
    title: 'Finland Mugs – Finnish Coffee and Tea Cups',
    description: 'Shop Finland mugs featuring Finnish design, landmarks, and cultural symbols. Perfect for your morning coffee or tea.',
    h1: 'Finland Mugs',
    h2s: ['Finland Mug Designs', 'Finnish Design on Mugs', 'Mug Materials and Quality', 'Where to Buy Finland Mugs'],
    closing: 'Shop Finland Mugs'
  },
  {
    slug: 'helsinki-coffee-mugs',
    title: 'Helsinki Coffee Mugs – Capital City Designs',
    description: 'Shop Helsinki coffee mugs featuring designs inspired by the Finnish capital. Start your day with a touch of Helsinki.',
    h1: 'Helsinki Coffee Mugs',
    h2s: ['Helsinki Coffee Mug Designs', 'Helsinki Landmarks on Mugs', 'Coffee Mug Quality and Materials', 'Where to Buy Helsinki Coffee Mugs'],
    closing: 'Shop Helsinki Coffee Mugs'
  },
  {
    slug: 'finnish-ceramic-mug',
    title: 'Finnish Ceramic Mug – Authentic Pottery from Finland',
    description: 'Discover Finnish ceramic mugs featuring traditional and modern Finnish design. High-quality pottery that celebrates Finnish craftsmanship.',
    h1: 'Finnish Ceramic Mug',
    h2s: ['Finnish Ceramic Traditions', 'Finnish Ceramic Mug Designs', 'Quality and Craftsmanship', 'Where to Buy Finnish Ceramic Mugs'],
    closing: 'Shop Finnish Ceramic Mugs'
  },
  {
    slug: 'funny-finland-coffee-mugs',
    title: 'Funny Finland Coffee Mugs – Humorous Finnish Drinkware',
    description: 'Shop funny Finland coffee mugs with hilarious Finnish humor and sayings. Perfect gifts for coffee lovers who love Finland.',
    h1: 'Funny Finland Coffee Mugs',
    h2s: ['Funny Finland Mug Designs', 'Finnish Humor on Mugs', 'Mug Quality and Durability', 'Where to Buy Funny Finland Coffee Mugs'],
    closing: 'Shop Funny Finland Mugs'
  },
  {
    slug: 'finland-mugs-collection',
    title: 'Finland Mugs Collection – Finnish Drinkware',
    description: 'Browse our Finland mugs collection featuring the best Finnish mug designs. From traditional to modern, find your perfect Finnish mug.',
    h1: 'Finland Mugs Collection',
    h2s: ['Popular Finland Mug Styles', 'Finnish Design Mug Collection', 'Gift-Worthy Finland Mugs', 'Where to Buy Finland Mugs Online'],
    closing: 'Browse Finland Mugs'
  }
];

// ============================================================
// CONTENT GENERATION FUNCTIONS
// ============================================================

function generateWelcome(h1) {
  return `<p>Welcome to our comprehensive guide on <strong>${h1}</strong>. Finland is a country rich in culture, natural beauty, and unique traditions that captivate people from around the world. Whether you have a personal connection to Finland, admire its design and lifestyle, or are simply curious about what makes this Nordic nation so special, this page is your starting point for discovery. We have curated information, insights, and recommendations to help you explore and celebrate everything related to ${h1}.</p>`;
}

function generateP2(h1) {
  return `<p>At Finland Merchandise, we believe that understanding <strong>${h1}</strong> is key to appreciating the depth and richness of Finnish culture. Finland has given the world so much — from innovative design and technology to timeless traditions like sauna and sisu. By learning more about this topic, you open the door to a deeper connection with Finland and its people. Our goal is to provide you with accurate, engaging, and useful content that enhances your knowledge and appreciation.</p>`;
}

function generateP3(h1) {
  return `<p>Whether you are looking for information, inspiration, or authentic products related to <strong>${h1}</strong>, you have come to the right place. We take pride in sharing the best of Finland with our audience, combining expertise with a genuine passion for Finnish culture. Explore the sections below to dive deeper into this topic and discover what makes it truly special.</p>`;
}

function generateH2Content(h2Title, h1) {
  return `<p><strong>${h2Title}</strong> is an important aspect of understanding ${h1}. Finland offers a wealth of experiences and knowledge in this area, shaped by its unique history, geography, and cultural values. From traditional practices that have been passed down through generations to modern innovations that continue to evolve, this topic reflects the dynamic and resilient spirit of Finland. By exploring ${h2Title.toLowerCase()}, you gain valuable insights into what makes Finnish culture so distinctive and admired worldwide.</p>

<p>When you engage with this topic, you are connecting with a legacy of craftsmanship, creativity, and community that defines the Finnish way of life. Whether you are a longtime admirer of Finland or discovering its treasures for the first time, there is always something new to learn and appreciate. We invite you to explore further and discover the products, stories, and experiences that bring ${h1} to life.</p>`;
}

function generateConclusion(h1, closing) {
  return `<p>We hope this exploration of <strong>${h1}</strong> has been informative and inspiring. Finland continues to share its unique culture and products with the world, and we are proud to be part of that journey. ${closing ? 'Browse our collection of Finland merchandise to find authentic items that celebrate this topic and bring a piece of Finland into your life. ' : ''}Thank you for visiting, and we look forward to helping you discover more about Finland.</p>`;
}

// ============================================================
// HTML TEMPLATE
// ============================================================

function generatePageContent(slug, title, description, h1, h2s, closing) {
  const welcomeP = generateWelcome(h1);
  const p2 = generateP2(h1);
  const p3 = generateP3(h1);
  const conclusionP = generateConclusion(h1, closing);

  let h2Sections = '';
  h2s.forEach(function(h2) {
    h2Sections += `
        <h2>${h2}</h2>
        ${generateH2Content(h2, h1)}`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- Header placeholder -->
  <div id="header-placeholder"></div>

  <!-- ====== HERO ====== -->
  <div class="page-hero">
    <img class="hero-bg"
         src="assets/images/finland-merchandise-international-shipping.avif"
         alt="${h1}"
         onerror="this.style.display='none'">
    <div class="hero-overlay">
      <div class="hero-category">Finnish products</div>
      <h1 class="hero-title"><a href="index.html">${h1}</a></h1>
      <p class="hero-description">${description}</p>
    </div>
  </div>

  <!-- ====== MAIN CONTENT ====== -->
  <section class="main-content">
    <div class="content-grid">

      <!-- ====== MAIN CONTENT ====== -->
      <main class="content-main">

        ${welcomeP}

        ${p2}

        ${p3}

        <div id="random-image-placeholder"></div>

        ${h2Sections}

        <h2>${closing}</h2>

        ${conclusionP}

      </main>

      <!-- ====== SIDEBAR ====== -->
      <aside class="sidebar">

        <div class="sidebar-card">
          <h4>About This Page</h4>
          <p>Learn more about ${h1} and discover authentic Finland merchandise that celebrates Finnish culture, design, and traditions.</p>
        </div>

        <div class="sidebar-card">
          <h4>Have Questions?</h4>
          <p>Looking for a specific product or more information? Reach out and we will help you find what you need.</p>
        </div>

      </aside>

    </div>
  </section>

  <!-- Footer placeholder -->
  <div id="footer-placeholder"></div>

  <!-- Scripts -->
  <script src="assets/js/include.js"></script>
</body>
</html>`;
}

// ============================================================
// GENERATE PAGES
// ============================================================

const outputDir = __dirname;

pages.forEach(function(page) {
  const content = generatePageContent(
    page.slug,
    page.title,
    page.description,
    page.h1,
    page.h2s,
    page.closing
  );

  const filePath = path.join(outputDir, page.slug + '.html');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Generated: ' + page.slug + '.html');
});

console.log('\nDone! Generated ' + pages.length + ' subpages.');