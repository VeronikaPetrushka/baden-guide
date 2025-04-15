const spaGame = [
    {
        topic: 'Therme Erding',
        options: [
            'African Savannah Sauna',
            'Mammoth Fur Wrap',
            'Hot Stone Massage',
            'Inflatable Mat Race'
        ],
        combo: [
            {
                options: ['African Savannah Sauna', 'Hot Stone Massage'],
                match: '95%',
                text: 'Perfect Combo'
            },
            {
                options: ['Mammoth Fur Wrap', 'African Savannah Sauna'],
                match: '85%',
                text: 'Great Match'
            },
            {
                options: ['African Savannah Sauna', 'Inflatable Mat Race'],
                match: '78%',
                text: 'Great Match'
            },
            {
                options: ['Inflatable Mat Race', 'Hot Stone Massage'],
                match: '65%',
                text: 'Not Bad'
            },
            {
                options: ['Mammoth Fur Wrap', 'Hot Stone Massage'],
                match: '40%',
                text: 'Questionable'
            },
            {
                options: ['Mammoth Fur Wrap', 'Inflatable Mat Race'],
                match: '15%',
                text: 'Epic Fail'
            }
        ]
    },
    {
        topic: 'Caracalla Therme',
        options: [
            'Marble Roller Massage',
            'Volcanic Stone Treatment',
            'Gladiator Armor Massage',
            'Wine Barrel Soak'
        ],
        combo: [
            {
                options: ['Marble Roller Massage', 'Wine Barrel Soak'],
                match: '95%',
                text: 'Perfect Combo'
            },
            {
                options: ['Volcanic Stone Treatment', 'Wine Barrel Soak'],
                match: '85%',
                text: 'Great Match'
            },
            {
                options: ['Marble Roller Massage', 'Volcanic Stone Treatment'],
                match: '78%',
                text: 'Great Match'
            },
            {
                options: ['Gladiator Armor Massage', 'Marble Roller Massage'],
                match: '65%',
                text: 'Not Bad'
            },
            {
                options: ['Gladiator Armor Massage', 'Volcanic Stone Treatment'],
                match: '45%',
                text: 'Questionable'
            },
            {
                options: ['Volcanic Stone Treatment', 'Wine Barrel Soak'],
                match: '20%',
                text: 'Epic Fail'
            }
        ]
    },
    {
        topic: 'Vabali Spa',
        options: [
            'Four-Hand Massage',
            'Bamboo Scrub',
            '1,000 Petal Bath',
            'Tibetan Bowl Karaoke'
        ],
        combo: [
            {
                options: ['Four-Hand Massage', '1,000 Petal Bath'],
                match: '100%',
                text: 'Perfect Combo'
            },
            {
                options: ['Bamboo Scrub', '1,000 Petal Bath'],
                match: '85%',
                text: 'Great Match'
            },
            {
                options: ['1,000 Petal Bath', 'Tibetan Bowl Karaoke'],
                match: '78%',
                text: 'Great Match'
            },
            {
                options: ['Four-Hand Massage', 'Bamboo Scrub'],
                match: '70%',
                text: 'Not Bad'
            },
            {
                options: ['Tibetan Bowl Karaoke', 'Bamboo Scrub'],
                match: '45%',
                text: 'Questionable'
            },
            {
                options: ['Tibetan Bowl Karaoke', 'Four-Hand Massage'],
                match: '20%',
                text: 'Epic Fail'
            }
        ]
    },
    {
        topic: 'Europa Therme',
        options: [
            'VR Meditation',
            'LED Hydrojet',
            'Zero-G Salt Floa',
            'Cryo-Capsule'
        ],
        combo: [
            {
                options: ['LED Hydrojet', 'Zero-G Salt Float'],
                match: '95%',
                text: 'Perfect Combo'
            },
            {
                options: ['VR Meditation', 'LED Hydrojet'],
                match: '85%',
                text: 'Great Match'
            },
            {
                options: ['Zero-G Salt Float', 'VR Meditation'],
                match: '80%',
                text: 'Great Match'
            },
            {
                options: ['Zero-G Salt Float', 'Cryo-Capsule' ],
                match: '65%',
                text: 'Not Bad'
            },
            {
                options: ['VR Meditation', 'Cryo-Capsule'],
                match: '45%',
                text: 'Questionable'
            },
            {
                options: ['Cryo-Capsule', 'LED Hydrojet'],
                match: '20%',
                text: 'Epic Fail'
            }
        ]
    },
    {
        topic: 'Brenners Spa',
        options: [
            'Oxygen Facial',
            'Diamond Cream Wrap',
            'Goat Wool Nap',
            'Caviar Body Mask'
        ],
        combo: [
            {
                options: ['Diamond Cream Wrap', 'Caviar Body Mask'],
                match: '95%',
                text: 'Perfect Combo'
            },
            {
                options: ['Oxygen Facial', 'Diamond Cream Wrap'],
                match: '85%',
                text: 'Great Match'
            },
            {
                options: ['Diamond Cream Wrap', 'Goat Wool Nap'],
                match: '75%',
                text: 'Great Match'
            },
            {
                options: ['Goat Wool Nap', 'Caviar Body Mask'],
                match: '65%',
                text: 'Not Bad'
            },
            {
                options: ['Oxygen Facial', 'Goat Wool Nap'],
                match: '45%',
                text: 'Questionable'
            },
            {
                options: ['Caviar Body Mask', 'Oxygen Facial'],
                match: '20%',
                text: 'Epic Fail'
            }
        ]
    },
    {
        topic: 'Tropical Islands ',
        options: [
            'Coconut Scrub',
            'Jacuzzi Karaoke',
            'Pirate Quest',
            'Flamingo Yoga'
        ],
        combo: [
            {
                options: ['Coconut Scrub', 'Flamingo Yoga'],
                match: '95%',
                text: 'Perfect Combo'
            },
            {
                options: ['Jacuzzi Karaoke', 'Coconut Scrub'],
                match: '80%',
                text: 'Great Match'
            },
            {
                options: ['Flamingo Yoga', 'Jacuzzi Karaoke'],
                match: '78%',
                text: 'Great Match'
            },
            {
                options: ['Pirate Quest', 'Coconut Scrub'],
                match: '65%',
                text: 'Not Bad'
            },
            {
                options: ['Jacuzzi Karaoke', 'Pirate Quest'],
                match: '45%',
                text: 'Questionable'
            },
            {
                options: ['Flamingo Yoga', 'Pirate Quest'],
                match: '20%',
                text: 'Epic Fail'
            }
        ]
    }
];

export default spaGame;