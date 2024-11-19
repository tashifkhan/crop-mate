const weatherPatterns = [
    {
        "name": "Andaman and Nicobar Islands",
        "latitude": 11.7401,
        "longitude": 92.6586,
        "avg_annual_rainfall": 2967,
        "historical_rainfall": [2500, 3100, 2800, 3200, 2900, 3050, 2750, 3300, 2650, 3150],
        "recent_rainfall": [350, 380, 400]
    },
    {
        "name": "Andhra Pradesh",
        "latitude": 15.9129,
        "longitude": 79.7400,
        "avg_annual_rainfall": 1200,
        "historical_rainfall": [1095.7, 1094, 1680, 1250, 1350, 1100, 1450, 1300, 1200, 1400],
        "recent_rainfall": [250, 280, 270]
    },
    {
        "name": "Arunachal Pradesh",
        "latitude": 26.2006,
        "longitude": 92.9376,
        "avg_annual_rainfall": 2782,
        "historical_rainfall": [2237.2, 2320.1, 2548.5, 2415.3, 2684.4, 2500, 2600, 2750, 2450, 2550],
        "recent_rainfall": [400, 420, 390]
    },
    {
        "name": "Assam",
        "latitude": 28.2180,
        "longitude": 94.7278,
        "avg_annual_rainfall": 2818,
        "historical_rainfall": [2083.8, 2900, 2700, 3000, 2600, 2800, 2950, 2650, 2750, 2850],
        "recent_rainfall": [350, 380, 370]
    },
    {
        "name": "Bihar",
        "latitude": 25.9644,
        "longitude": 85.2722,
        "avg_annual_rainfall": 1326,
        "historical_rainfall": [1200, 1400, 1100, 1350, 1250, 1300, 1450, 1150, 1500, 1275],
        "recent_rainfall": [200, 250, 220]
    },
    {
        "name": "Chandigarh",
        "latitude": 30.7333,
        "longitude": 76.7794,
        "avg_annual_rainfall": 617,
        "historical_rainfall": [600, 550, 650, 575, 625, 590, 610, 635, 580, 605],
        "recent_rainfall": [100, 120, 110]
    },
    {
        "name": "Chhattisgarh",
        "latitude": 21.2787,
        "longitude": 81.8661,
        "avg_annual_rainfall": 1300,
        "historical_rainfall": [1200, 1400, 1250, 1350, 1100, 1450, 1300, 1150, 1500, 1275],
        "recent_rainfall": [230, 250, 240]
    },
    {
        "name": "Dadra and Nagar Haveli",
        "latitude": 20.1809,
        "longitude": 73.0169,
        "avg_annual_rainfall": 2275,
        "historical_rainfall": [2050, 2500, 2200, 2350, 2100, 2400, 2300, 2250, 2450, 2150],
        "recent_rainfall": [300, 320, 310]
    },
    {
        "name": "Goa",
        "latitude": 15.2993,
        "longitude": 74.1240,
        "avg_annual_rainfall": 3005,
        "historical_rainfall": [2900, 3100, 3050, 2950, 3200, 2850, 3250, 2800, 3300, 2750],
        "recent_rainfall": [400, 420, 410]
    },
    {
        "name": "Gujarat",
        "latitude": 22.6708,
        "longitude": 71.5724,
        "avg_annual_rainfall": 1107,
        "historical_rainfall": [1000, 1200, 950, 1150, 1050, 1250, 900, 1300, 1100, 1000],
        "recent_rainfall": [180, 200, 190]
    },
    {
        "name": "Haryana",
        "latitude": 29.0588,
        "longitude": 76.0856,
        "avg_annual_rainfall": 617,
        "historical_rainfall": [550, 600, 500, 650, 575, 625, 540, 610, 590, 565],
        "recent_rainfall": [100, 120, 110]
    },
    {
        "name": "Himachal Pradesh",
        "latitude": 32.1024,
        "longitude": 77.5619,
        "avg_annual_rainfall": 1251,
        "historical_rainfall": [1100, 1300, 1050, 1350, 1200, 1400, 1000, 1450, 1150, 1250],
        "recent_rainfall": [200, 220, 210]
    },
    {
        "name": "Jammu and Kashmir",
        "latitude": 32.7266,
        "longitude": 74.8570,
        "avg_annual_rainfall": 1011,
        "historical_rainfall": [900, 1100, 850, 1150, 1000, 1200, 800, 1250, 950, 1050],
        "recent_rainfall": [150, 170, 160]
    },
    {
        "name": "Jharkhand",
        "latitude": 23.6913,
        "longitude": 85.2722,
        "avg_annual_rainfall": 1300,
        "historical_rainfall": [1100, 1500, 1200, 1400, 1050, 1350, 1250, 1450, 1000, 1300],
        "recent_rainfall": [220, 240, 230]
    },
    {
        "name": "Karnataka",
        "latitude": 15.3173,
        "longitude": 75.7139,
        "avg_annual_rainfall": 1284,
        "historical_rainfall": [1100, 1350, 1200, 1400, 1050, 1500, 1250, 1450, 1000, 1300],
        "recent_rainfall": [250, 270, 260]
    },
    {
        "name": "Kerala",
        "latitude": 10.1632,
        "longitude": 76.6413,
        "avg_annual_rainfall": 3055,
        "historical_rainfall": [2900, 3200, 3050, 3300, 2850, 3350, 2800, 3400, 2750, 3250],
        "recent_rainfall": [450, 470, 460]
    },
    {
        "name": "Madhya Pradesh",
        "latitude": 22.9734,
        "longitude": 78.6569,
        "avg_annual_rainfall": 1178,
        "historical_rainfall": [1000, 1250, 1100, 1300, 950, 1350, 1050, 1400, 900, 1200],
        "recent_rainfall": [200, 220, 210]
    },
    {
        "name": "Maharashtra",
        "latitude": 19.2900,
        "longitude": 75.7100,
        "avg_annual_rainfall": 1108,
        "historical_rainfall": [950, 1200, 1000, 1250, 900, 1300, 1050, 1350, 850, 1150],
        "recent_rainfall": [190, 210, 200]
    },
    {
        "name": "Manipur",
        "latitude": 24.6637,
        "longitude": 93.9063,
        "avg_annual_rainfall": 1881,
        "historical_rainfall": [1750, 2000, 1800, 2050, 1700, 2100, 1850, 2150, 1650, 1950],
        "recent_rainfall": [320, 340, 330]
    },
    {
        "name": "Meghalaya",
        "latitude": 25.5788,
        "longitude": 91.8832,
        "avg_annual_rainfall": 2818,
        "historical_rainfall": [2600, 3000, 2700, 3100, 2500, 3200, 2650, 3250, 2450, 2950],
        "recent_rainfall": [400, 420, 410]
    },
    {
        "name": "Mizoram",
        "latitude": 23.1645,
        "longitude": 92.9376,
        "avg_annual_rainfall": 1881,
        "historical_rainfall": [1750, 2000, 1800, 2050, 1700, 2100, 1850, 2150, 1650, 1950],
        "recent_rainfall": [320, 340, 330]
    },
    {
        "name": "Nagaland",
        "latitude": 26.1584,
        "longitude": 94.5624,
        "avg_annual_rainfall": 1881,
        "historical_rainfall": [1750, 2000, 1800, 2050, 1700, 2100, 1850, 2150, 1650, 1950],
        "recent_rainfall": [320, 340, 330]
    },
    {
        "name": "Odisha",
        "latitude": 20.7967,
        "longitude": 85.8135,
        "avg_annual_rainfall": 1489,
        "historical_rainfall": [1300, 1600, 1400, 1650, 1250, 1700, 1450, 1750, 1200, 1550],
        "recent_rainfall": [250, 270, 260]
    },
    {
        "name": "Puducherry",
        "latitude": 11.9416,
        "longitude": 79.8083,
        "avg_annual_rainfall": 998,
        "historical_rainfall": [850, 1100, 900, 1150, 800, 1200, 950, 1250, 750, 1050],
        "recent_rainfall": [170, 190, 180]
    },
    {
        "name": "Punjab",
        "latitude": 31.1471,
        "longitude": 75.3412,
        "avg_annual_rainfall": 649,
        "historical_rainfall": [550, 700, 600, 750, 500, 800, 650, 850, 450, 600],
        "recent_rainfall": [110, 130, 120]
    },
    {
        "name": "Rajasthan",
        "latitude": 27.0238,
        "longitude": 74.2179,
        "avg_annual_rainfall": 313,
        "historical_rainfall": [250, 350, 275, 400, 225, 450, 300, 500, 200, 375],
        "recent_rainfall": [80, 100, 90]
    },
    {
        "name": "Sikkim",
        "latitude": 27.5330,
        "longitude": 88.6126,
        "avg_annual_rainfall": 2739,
        "historical_rainfall": [2500, 2900, 2600, 3000, 2450, 3100, 2550, 3200, 2400, 2850],
        "recent_rainfall": [400, 420, 410]
    },
    {
        "name": "Tamil Nadu",
        "latitude": 11.1270,
        "longitude": 78.6569,
        "avg_annual_rainfall": 998,
        "historical_rainfall": [850, 1100, 900, 1150, 800, 1200, 950, 1250, 750, 1050],
        "recent_rainfall": [170, 190, 180]
    },
    {
        "name": "Telangana",
        "latitude": 18.1124,
        "longitude": 79.0193,
        "avg_annual_rainfall": 1100,
        "historical_rainfall": [950, 1250, 1000, 1300, 900, 1350, 1050, 1400, 850, 1200],
        "recent_rainfall": [200, 220, 210]
    },
    {
        "name": "Tripura",
        "latitude": 23.9408,
        "longitude": 91.9882,
        "avg_annual_rainfall": 1881,
        "historical_rainfall": [1750, 2000, 1800, 2050, 1700, 2100, 1850, 2150, 1650, 1950],
        "recent_rainfall": [320, 340, 330]
    },
    {
        "name": "Uttar Pradesh",
        "latitude": 27.0731,
        "longitude": 81.1673,
        "avg_annual_rainfall": 1025,
        "historical_rainfall": [900, 1150, 950, 1200, 850, 1250, 1000, 1300, 800, 1100],
        "recent_rainfall": [180, 200, 190]
    },
    {
        "name": "Uttarakhand",
        "latitude": 30.0668,
        "longitude": 79.0193,
        "avg_annual_rainfall": 1700,
        "historical_rainfall": [1500, 1850, 1600, 1900, 1450, 1950, 1550, 2000, 1400, 1800],
        "recent_rainfall": [280, 300, 290]
    },
    {
        "name": "West Bengal",
        "latitude": 22.9868,
        "longitude": 87.8550,
        "avg_annual_rainfall": 1439,
        "historical_rainfall": [1250, 1600, 1350, 1650, 1200, 1700, 1400, 1750, 1150, 1550],
        "recent_rainfall": [240, 260, 250]
    }
];

export default weatherPatterns;