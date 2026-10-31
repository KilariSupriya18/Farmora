export interface CategoryCardData {
  id: string;
  name: {
    en: string;
    te: string;
    hi: string;
  };
  description: {
    en: string;
    te: string;
    hi: string;
  };
  itemCount: number;
  imageUrl: string;
  fallbackColor: string;
  categoryKey: 'vegetables' | 'fruits' | 'grains' | 'spices' | 'dairy_honey' | 'organic';
}

export interface FarmerSpotlight {
  id: string;
  name: string;
  farmName: string;
  location: string;
  state: string;
  specialty: {
    en: string;
    te: string;
    hi: string;
  };
  experienceYears: number;
  landAcreage: number;
  bio: {
    en: string;
    te: string;
    hi: string;
  };
  quote: {
    en: string;
    te: string;
    hi: string;
  };
  imageUrl: string;
  verifiedCert: string;
}

export interface BuyerPersona {
  id: string;
  title: {
    en: string;
    te: string;
    hi: string;
  };
  subtitle: {
    en: string;
    te: string;
    hi: string;
  };
  description: {
    en: string;
    te: string;
    hi: string;
  };
  scale: string;
  benefits: {
    en: string[];
    te: string[];
    hi: string[];
  };
  iconName: string;
  roleKey: 'household' | 'retailer' | 'restaurant' | 'wholesaler';
}

export const LANDING_CATEGORIES: CategoryCardData[] = [
  {
    id: 'cat-veg',
    name: {
      en: 'Vegetables',
      te: 'తాజా కూరగాయలు',
      hi: 'ताज़ी सब्जियां',
    },
    description: {
      en: 'Crisp morning harvests, heirloom vine tomatoes, root vegetables & tender greens.',
      te: 'ఉదయం కోసిన తాజా కూరగాయలు, నాటు టమాటాలు మరియు ఆకుకూరలు.',
      hi: 'सुबह तोड़े गए कुरकुरे देशी टमाटर, हरी पत्तियां और जड़ वाली सब्जियां।',
    },
    itemCount: 48,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#285B37',
    categoryKey: 'vegetables',
  },
  {
    id: 'cat-fruits',
    name: {
      en: 'Fruits',
      te: 'పండ్లు',
      hi: 'ताज़े फल',
    },
    description: {
      en: 'Tree-ripened Alphonso mangoes, Nagpur oranges, hill apples & seasonal melons.',
      te: 'చెట్టున పండిన రత్నగిరి ఆల్ఫాన్సో మామిడి, నారింజ మరియు పర్వత ఆపిల్స్.',
      hi: 'प्राकृतिक रूप से पके अल्फोंसो आम, नागपुरी संतरे और पहाड़ी सेब।',
    },
    itemCount: 32,
    imageUrl: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#F4A261',
    categoryKey: 'fruits',
  },
  {
    id: 'cat-grains',
    name: {
      en: 'Grains',
      te: 'ధాన్యాలు',
      hi: 'अनाज',
    },
    description: {
      en: 'Aged Krishna Sona Masoori, traditional Basmati, indigenous millets & whole wheat.',
      te: 'కృష్ణా పాత సోనా మసూరి, బాస్మతి, సిరి ధాన్యాలు మరియు సేంద్రీయ గోధుమలు.',
      hi: 'कृष्णा घाटी का पुराना सोना मसूरी, बासमती चावल, बाजरा और शुद्ध गेहूं।',
    },
    itemCount: 26,
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#F4EBD7',
    categoryKey: 'grains',
  },
  {
    id: 'cat-pulses',
    name: {
      en: 'Pulses',
      te: 'పప్పు దినుసులు',
      hi: 'दालें और दलहन',
    },
    description: {
      en: 'Single-origin unpolished Toor dal, desi Chana, Green Moong & protein legumes.',
      te: 'పాలిష్ చేయని స్వచ్ఛమైన కందిపప్పు, శనగలు, పెసలు మరియు మినుములు.',
      hi: 'बिना पॉलिश की हुई अरहर दाल, देसी चना, साबुत मूंग और पोषक दालें।',
    },
    itemCount: 19,
    imageUrl: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#E28236',
    categoryKey: 'pulses',
  },
  {
    id: 'cat-dairy',
    name: {
      en: 'Dairy',
      te: 'పాల ఉత్పత్తులు & తేనె',
      hi: 'डेयरी और शुद्ध घी',
    },
    description: {
      en: 'Vedic Bilona A2 Desi Gir cow ghee, raw forest honey & farm-fresh cultured curd.',
      te: 'స్వచ్ఛమైన బిల్వోనా A2 గిర్ ఆవు నెయ్యి, అడవి ముడి తేనె మరియు స్వచ్ఛమైన వెన్న.',
      hi: 'पारंपरिक बिलोना पद्धति से बना गिर गाय का A2 घी और कच्चा शहद।',
    },
    itemCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#F4A261',
    categoryKey: 'dairy',
  },
  {
    id: 'cat-organic',
    name: {
      en: 'Organic Produce',
      te: 'సేంద్రీయ ఉత్పత్తులు',
      hi: 'जैविक प्रमाणित उपज',
    },
    description: {
      en: '100% NPOP certified chemical-free harvests grown with Jeevamrutha and zero pesticides.',
      te: 'రసాయనాలు మరియు క్రిమిసంహారకాలు లేని NPOP ధృవీకరించబడిన సహజ సేంద్రీయ పంటలు.',
      hi: 'जीवामृत और प्राकृतिक खाद से उगाई गई शत-प्रतिशत जैविक प्रमाणित फसलें।',
    },
    itemCount: 41,
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    fallbackColor: '#B9D49B',
    categoryKey: 'organic',
  },
];

export const FARMER_SPOTLIGHTS: FarmerSpotlight[] = [
  {
    id: 'spot-1',
    name: 'Rameshwar Patil',
    farmName: 'Amrai Devgad Orchards',
    location: 'Devgad, Ratnagiri',
    state: 'Maharashtra',
    specialty: {
      en: 'GI-Tagged Alphonso Mangoes',
      te: 'జిఐ ట్యాగ్డ్ ఆల్ఫాన్సో మామిడి పండ్లు',
      hi: 'जीआई प्रमाणित अल्फोंसो आम',
    },
    experienceYears: 24,
    landAcreage: 18,
    bio: {
      en: 'Third-generation Konkan orchardist cultivating native Devgad Alphonso mangoes using traditional rice straw ripening without synthetic calcium carbide.',
      te: 'మూడు తరాలుగా రసాయనాలు వాడకుండా వరి గడ్డితో సహజంగా ఆల్ఫాన్సో మామిడి సాగు చేస్తున్న రైతు.',
      hi: 'तीन पीढ़ियों से धान के पुआल में प्राकृतिक रूप से आम पकाने वाले अनुभवी किसान।',
    },
    quote: {
      en: 'Farmora lets me sell directly to chefs in Mumbai and Hyderabad without middlemen swallowing 40% of our hard-earned harvest value.',
      te: 'ఫార్మోరా ద్వారా మధ్యవర్తులు లేకుండా నా పంటను నేరుగా చెఫ్‌లు మరియు వినియోగదారులకు అమ్ముకోగలుగుతున్నాను.',
      hi: 'फार्मोर की बदौलत अब बिचौलियों को 40% कमीशन दिए बिना हम सीधे होटलों और परिवारों तक पहुंचते हैं।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80',
    verifiedCert: 'GI-APEDA-MH-2026/041',
  },
  {
    id: 'spot-2',
    name: 'Anasuya Devi',
    farmName: 'Shanti Agro Sanctuary',
    location: 'Shamirpet, Medchal',
    state: 'Telangana',
    specialty: {
      en: 'Zero-Budget Natural Greens & Chillies',
      te: 'జీరో బడ్జెట్ సేంద్రీయ ఆకుకూరలు & మిర్చి',
      hi: 'शून्य बजट प्राकृतिक साग और सब्जियां',
    },
    experienceYears: 12,
    landAcreage: 6,
    bio: {
      en: 'Pioneer of community natural farming in Medchal. Trains women self-help groups in desi cow dung microorganisms and vermicompost soil enrichment.',
      te: 'మేడ్చల్ ప్రాంతంలో దేశీ ఆవు ఆధారిత ప్రకృతి వ్యవసాయం చేస్తూ మహిళా సంఘాలకు శిక్షణ ఇస్తున్న ఆదర్శ రైతు.',
      hi: 'देसी गोवंश आधारित प्राकृतिक खेती करने वाली और महिला स्वयं सहायता समूहों को प्रेरित करने वाली किसान।',
    },
    quote: {
      en: 'When urban families come for farm gate pickup on weekends, their children see where real clean food actually comes from.',
      te: 'శని, ఆదివారాల్లో నగరవాసులు పిల్లలతో మా పొలానికి వచ్చి స్వయంగా తాజా కూరగాయలు కోసుకోవడం చాలా ఆనందంగా ఉంటుంది.',
      hi: 'जब शहर के परिवार हमारे खेत पर ताज़ी सब्जियां लेने आते हैं, तो देखकर दिल खुश हो जाता है।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1609137144822-263a4365287f?auto=format&fit=crop&w=800&q=80',
    verifiedCert: 'PGS-India Jaivik 2026',
  },
  {
    id: 'spot-3',
    name: 'Subba Reddy',
    farmName: 'Krishna Valley Agro Collective',
    location: 'Tenali, Guntur',
    state: 'Andhra Pradesh',
    specialty: {
      en: 'Aged Sona Masoori & Organic Pulses',
      te: 'పాత సోనా మసూరి బియ్యం & పప్పులు',
      hi: 'सोना मसूरी चावल और जैविक दालें',
    },
    experienceYears: 28,
    landAcreage: 35,
    bio: {
      en: 'President of Tenali Organic Farmers Guild. Nurtures indigenous paddy varieties using river silt replenishment and neem cake bio-pest management.',
      te: 'కృష్ణా నదీ పరీవాహక ప్రాంతంలో నల్లరేగడి నేలలో పురాతన దేశీ వరి వంగడాలను సంరక్షిస్తున్న రైతు నాయకుడు.',
      hi: 'कृष्णा नदी तट पर देशी धान और दालों की जैविक खेती करने वाले वरिष्ठ प्रगतिशील किसान।',
    },
    quote: {
      en: 'Retail stores and wholesalers buy our 50kg bags at fair farm-gate prices, with money credited straight to our bank within 24 hours.',
      te: 'దుకాణాలు మరియు వర్తకులు మా ధాన్యాన్ని న్యాయమైన ధరకు కొనుగోలు చేస్తున్నారు, 24 గంటల్లో నగదు మా ఖాతాకు చేరుతుంది.',
      hi: 'थोक व्यापारी और किराना स्टोर सीधे खेत से उचित दाम पर माल उठाते हैं और तुरंत भुगतान करते हैं।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
    verifiedCert: 'FSSAI-11224334000189',
  },
];

export const BUYER_PERSONAS: BuyerPersona[] = [
  {
    id: 'p-households',
    title: {
      en: 'Household Buyers',
      te: 'ఇంటి కొనుగోలుదారులు',
      hi: 'घरेलू परिवार',
    },
    subtitle: {
      en: 'Daily Farm-Fresh Nutrition',
      te: 'రోజూ తాజా ఇంటి పోషణ',
      hi: 'रसोई के लिए ताज़ा जैविक आहार',
    },
    description: {
      en: 'Enjoy crisp vegetables, juicy fruits, and unpolished grains harvested within hours of arriving at your kitchen table.',
      te: 'ఈ రోజే కోసిన తాజా కూరగాయలు, పండ్లు మరియు కల్తీ లేని సరుకులు నేరుగా మీ ఇంటికి.',
      hi: 'खेत से सीधी तोड़ी गई ताज़ी सब्जियां और फल, जो आपके परिवार को दें शुद्ध पोषण।',
    },
    scale: '1 kg – 15 kg Orders',
    benefits: {
      en: [
        'Dawn harvest delivered by morning',
        'Transparent grower names & village origins',
        'Optional farm gate pickup with zero fees',
        'Zero chemical waxes or artificial ripening',
      ],
      te: [
        'ఉదయం కోసిన పంట నేరుగా ఇంటికే',
        'రైతు పేరు, గ్రామం పూర్తి వివరాలు',
        'పొలం వద్ద పికప్ చేసుకునే వెసులుబాటు',
        'రసాయనాలు లేని స్వచ్ఛమైన ఆహారం',
      ],
      hi: [
        'सुबह-सुबह तोड़ी गई ताज़ी फसल',
        'किसान का नाम और खेत की पूरी जानकारी',
        'खेत पर जाकर सीधे लेने की सुविधा',
        'केमिकल मुक्त शत-प्रतिशत प्राकृतिक उपज',
      ],
    },
    iconName: 'Home',
    roleKey: 'household',
  },
  {
    id: 'p-retailers',
    title: {
      en: 'Retailers & Stores',
      te: 'కిరాణా & సూపర్ మార్కెట్లు',
      hi: 'दुकानदार व किराना स्टोर',
    },
    subtitle: {
      en: 'Tiered Bulk Shop Replenishment',
      te: 'దుకాణాల కోసం టోకు సరుకు',
      hi: 'दुकान के लिए नियमित थोक स्टॉक',
    },
    description: {
      en: 'Keep your neighborhood grocery shelves stocked with consistent, farm-graded produce at 15%–35% tiered wholesale discounts.',
      te: 'మీ దుకాణానికి అవసరమైన తాజా కూరగాయలు మరియు సరుకులను టోకు ధరలకు క్రమం తప్పకుండా పొందండి.',
      hi: 'अपनी दुकान के लिए सीधे किसानों से 15% से 35% थोक छूट पर ताज़ा माल प्राप्त करें।',
    },
    scale: '50 kg – 500 kg Batches',
    benefits: {
      en: [
        'Automated twice-weekly replenishment',
        'Volume price breaks (50kg+ to 500kg+)',
        'Commercial GST input tax invoices',
        'Consistent grade sorting & shelf longevity',
      ],
      te: [
        'వారానికి రెండు సార్లు క్రమబద్ధమైన సరఫరా',
        'పెద్ద ఆర్డర్లకు ప్రత్యేక టోకు రాయితీలు',
        'జిఎస్టీ పన్ను రశీదుల సౌకర్యం',
        'నాణ్యతా ప్రమాణాల ప్రకారం గ్రేడింగ్',
      ],
      hi: [
        'सप्ताह में दो बार नियमित आपूर्ति',
        '50 किग्रा से अधिक पर विशेष थोक छूट',
        'जीएसटी इनपुट टैक्स बिल की सुविधा',
        'ग्रेड-ए गुणवत्ता और लंबी शेल्फ-लाइफ',
      ],
    },
    iconName: 'Store',
    roleKey: 'retailer',
  },
  {
    id: 'p-restaurants',
    title: {
      en: 'Restaurants & Chefs',
      te: 'రెస్టారెంట్లు & చెఫ్‌లు',
      hi: 'रेस्टोरेंट और होटल शेफ',
    },
    subtitle: {
      en: 'Pre-8 AM Culinary Sourcing',
      te: 'ఉదయమే హోటల్ కిచెన్ డెలివరీ',
      hi: 'सुबह 8 बजे से पहले सीधी आपूर्ति',
    },
    description: {
      en: 'Chef-curated heirloom greens, cold-pressed oils, baby vegetables, and Vedic A2 ghee delivered to your receiving dock before lunch prep starts.',
      te: 'చెఫ్‌ల కోసం ప్రత్యేకంగా పండించిన నాణ్యమైన కూరగాయలు మరియు స్వచ్ఛమైన నెయ్యి ఉదయమే కిచెన్‌కు.',
      hi: 'मास्टर शेफ की पसंद की विशेष ताज़ी सब्जियां, कोल्ड-प्रेस्ड तेल और शुद्ध देसी घी।',
    },
    scale: '25 kg – 300 kg Daily Lots',
    benefits: {
      en: [
        'Guaranteed pre-8:00 AM receiving dock arrival',
        'Sample 5kg tasting crates on demand',
        'Custom farm contract growing for menus',
        'Zero cold-storage transit degradation',
      ],
      te: [
        'ఉదయం 8 గంటల లోపే డెలివరీ హామీ',
        '5 కిలోల శాంపిల్ బాక్స్ పొందే అవకాశం',
        'మెనూకి తగినట్లుగా కాంట్రాక్ట్ సాగు',
        'కోసిన కొన్ని గంటల్లోనే వంటగదికి',
      ],
      hi: [
        'सुबह 8:00 बजे से पहले किचन में डिलीवरी',
        '5 किग्रा का टेस्टिंग सैंपल बॉक्स उपलब्ध',
        'रेसिपी के अनुसार विशेष फसल अनुबंध',
        'बिना कोल्ड स्टोरेज के ताज़गी की गारंटी',
      ],
    },
    iconName: 'Utensils',
    roleKey: 'restaurant',
  },
  {
    id: 'p-wholesalers',
    title: {
      en: 'Wholesalers & Mandis',
      te: 'హోల్‌సేలర్లు & మండి వర్తకులు',
      hi: 'थोक व्यापारी और मंडी आढ़ती',
    },
    subtitle: {
      en: 'Multi-Ton Farm Gate Freight',
      te: 'టన్నుల కొద్దీ పొలం వద్దే రవాణా',
      hi: 'टन व क्विंटल में सीधी लोडिंग',
    },
    description: {
      en: 'Source full truckloads (5 to 20 metric tons) directly from grower cooperatives with pre-negotiated quintal rates and coordinated freight logistics.',
      te: 'రైతు సంఘాల నుండి నేరుగా లారీల కొద్దీ సరుకు క్వింటాళ్లు, టన్నులలో కొనుగోలు చేయండి.',
      hi: 'सीधे किसान उत्पादक संघों से 5 से 20 मीट्रिक टन तक पूरे ट्रकलोड की सीधी खरीद।',
    },
    scale: '1 Ton – 20 Metric Tons',
    benefits: {
      en: [
        'Coordinated refrigerated freight trucks',
        'Direct loading at farm gate collection centers',
        'Batch moisture & residue lab reports',
        'Direct grower collective trade agreements',
      ],
      te: [
        'శీతలీకరణ రవాణా లారీల సమన్వయం',
        'పొలం సేకరణ కేంద్రాల వద్దే డైరెక్ట్ లోడింగ్',
        'తేమ శాతం మరియు నాణ్యత ల్యాబ్ నివేదికలు',
        'రైతు సంఘాలతో ప్రత్యక్ష వ్యాపార ఒప్పందాలు',
      ],
      hi: [
        'वातानुकूलित कोल्ड-चेन फ्रेट ट्रक सुविधा',
        'खेत कलेक्शन सेंटर से सीधे ट्रक लोडिंग',
        'नमी व गुणवत्ता जांच लैब रिपोर्ट',
        'किसान समूहों के साथ पारदर्शी थोक सौदे',
      ],
    },
    iconName: 'Warehouse',
    roleKey: 'wholesaler',
  },
];
