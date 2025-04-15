const catalog = [
    {
        image: require('../assets/catalog/ThermeErding.png'),
        category: 'Thermen',
        name: 'Therme Erding',
        place: 'Bavaria, 85435 Erding, Thermenallee 1',
        coordinates: [48.3060, 11.9080],
        temperature: ['28-36°C (there is a zone with 47°C)'],
        cost: ['from €25 (3 hours)'],
        contacts: '+49 8122 88990',
        hotel: 'Thermenhotel (4*, 200 m from the entrance)',
        hours: '9:00-23:00 (daily)',
        features: [
            "Europe's largest thermal complex with a tropical zone",
            'Unique "Galvanic Grotto" with mineral baths',
            'Night bathing on Fridays until 1:00',
            'Separate Galaxy Erding zone with 27 slides.'
        ],
        services: [
            '27 themed pools (indoor/outdoor)',
            '10 types of saunas (including aromatic and herbal)',
            'Salt grotto with Himalayan salt',
            'Whirlpool stations',
            'Underwater music therapy.'
        ],
        additional: [
            'Spa massages (from €60/60 min)',
            'Mud wraps',
            'Cosmetic facials',
            'Detox programs'
        ]
    },
    {
        image: require('../assets/catalog/CaracallaTherme.png'),
        category: 'Thermen',
        name: 'Caracalla Therme',
        place: 'Baden-Baden, 76530, Römerplatz 1',
        coordinates: [48.7606, 8.2398],
        temperature: ['32-38°C'],
        cost: ['€23 (3 hours at Caracalla Therme)'],
        contacts: '+49 7221 275940',
        hotel: 'Brenners Park-Hotel (5*)',
        hours: '8:00–22:00',
        features: [
            'Historic Roman-Irish baths with marble halls',
            'Unique "Grotto Therapy" with hot stones',
            'Evening aroma sessions with essential oils',
            'Ban on swimsuits in some areas (tradition)'
        ],
        services: [
            'Roman and Irish baths',
            'Open-air thermal baths',
            'Aromatic steam baths',
            'Cold baths for contrast therapy.'
        ],
        additional: [
            'Classic massages (from €50)',
            'Stone therapy',
            'Anti-stress programs'
        ]
    },
    {
        image: require('../assets/catalog/VabaliSpa.png'),
        category: 'Saunen',
        name: 'Vabali Spa',
        place: 'Berlin, 10557, Seydlitzstraße 6',
        coordinates: [52.5256, 13.3695],
        sauna: [
            'Finnish (90°C)',
            'Biosauna (60°C)',
            'Ice grotto'
        ],
        cost: ['€39'],
        contacts: '+49 30 39820990',
        hours: '10:00-23:00',
        features: [
            'Tropical garden with waterfalls inside the complex',
            '"Ice Fountain" for contrast therapy',
            'Special "Women`s Days" on Tuesdays'
        ],
        services: [
            '12 thematic saunas (Finnish, biosauna, etc.)',
            'Outdoor heated swimming pool',
            'Relaxation area with hammocks',
            'Ice grotto'
        ],
        additional: [
            'Balinese massages (from €70)',
            'Aromatherapy',
            'Meditation programs'
        ]
    },
    {
        image: require('../assets/catalog/EuropaTherme.png'),
        category: 'Saunen',
        name: 'Europa Therme',
        place: 'Sulzbach, 66280, Am Kurpark 1',
        coordinates: [49.2529, 8.8786],
        sauna: [
            'Alpine (with mountain view)',
            'Infrared'
        ],
        cost: ['€21'],
        contacts: '+49 6897 5080',
        hours: '9:00-23:00',
        features: [
            'Panoramic "Alpine Sauna" with mountain views',
            'Unique "Wine Sauna" with grape extracts',
            'Night "Sauna Performances" with aroma shows'
        ],
        services: [
            'Roman and Irish baths',
            'Open-air thermal baths',
            'Aromatic steam baths',
            'Cold baths for contrast therapy.'
        ],
        additional: [
            'Classic massages (from €50)',
            'Stone therapy',
            'Anti-stress programs'
        ]
    },
    {
        image: require('../assets/catalog/BrennersSpa.png'),
        category: 'Wellness',
        name: 'Brenners Spa',
        place: 'Baden-Baden, 76530, Schillerstraße 4-6',
        coordinates: [48.7625, 8.2410],
        cost: ['Packages from €350', 'Ayurveda (€95)'],
        contacts: '+49 7221 9000',
        hours: '8:00-20:00',
        features: [
            'Exclusive "Black Forest Herbal Wraps"',
            '"Golden Massage" with 24-carat gold',
            'Personal wellness concierge'
        ],
        services: [
            'Personal wellness concierge',
            'Terrace with thermal baths'
        ],
        additional: [
            'Detox programs (from €250)',
            'Anti-stress massages (€120/90 min)',
            'Cryotherapy'
        ]
    },
    {
        image: require('../assets/catalog/TropicalIslands.png'),
        category: 'Wasserwelten',
        name: 'Tropical Islands',
        place: 'Brandenburg, 15910, Tropical-Islands-Allee 1',
        coordinates: [51.9917, 13.7389],
        temperature: ['Tropical lagoon (32°C)', "Children's water park (20°C)"],
        cost: ['€47'],
        contacts: '+49 35477 605050',
        hours: '10:00-24:00',
        services: [
            'Tropical lagoon (32°C, 14000 m²)',
            "Children's water park with slides",
            'Bamboo sauna'
        ],
        additional: [
            'Beach volleyball',
            'Hot air balloon rides'
        ]
    },
    {
        image: require('../assets/catalog/Kristalltherme.png'),
        category: 'Wasserwelten',
        name: 'Kristalltherme Schwimmbad',
        place: 'Sachsen, 01920, Am Kurpark 1',
        coordinates: [51.2634, 14.0936],
        temperature: ['Salt (35°C)', 'Outdoor (heated)'],
        cost: ['€18'],
        contacts: '+49 30 25800350',
        hours: '10:00-23:00',
        services: [
            'Salt pool (35°C)',
            'Outdoor heated pool'
        ],
        additional: [
            "Children's Spa",
            'Underground Salt Tunnel'
        ]
    }
];

export default catalog;