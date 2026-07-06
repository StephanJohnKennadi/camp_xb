// Central Mock Database and Constant Data Assets
// Used for populating galleries, facilities sliders, and camps showcases with premium content

export const EXPERIENCES = [
  {
    id: "exp_corp_1",
    title: "Wilderness Leadership & Synergy Summit",
    category: "Corporate Experiences",
    tagline: "Unify teams, forge leaders, and spark strategic innovations in the heart of nature.",
    description: "Designed for modern hyper-growth startup teams and mature organizations alike. Features navigation challenges, outdoor trust tasks, cooperative shelter design, campfire debriefings, and professional executive team alignment workshops led by qualified business guides.",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop",
    features: [
      "Tactical team orientation & geocaching challenges",
      "Dynamic obstacle course & rope synergy bridges",
      "Sunset fireside strategic bonding sessions",
      "Full professional chef-curated outdoor dinners",
      "Executive group feedback sessions"
    ],
    priceStarting: "149",
    duration: "2 Days, 1 Night"
  },
  {
    id: "exp_fam_1",
    title: "Eco-Adventure Family Bond Camp",
    category: "Family Experiences",
    tagline: "Create lifelong memories around the campfire with hands-on nature discovery.",
    description: "Unplug from the digital noise and reconnect with what matters. Features guided bird watching, parent-child archery tournaments, basic outdoor knotting workshops, forest night safaris, and organic clay modeling. Pure safety and luxury camping standards.",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop",
    features: [
      "Eco-nature arts & organic clay painting",
      "Stargazing astronomy telescope sessions",
      "Archery and classic field sports",
      "Safe, premium water sports and kayaking",
      "Kids adventure play trails"
    ],
    priceStarting: "89",
    duration: "3 Days, 2 Nights"
  },
  {
    id: "exp_sport_1",
    title: "High-Performance Sports & Endurance Academy",
    category: "Sports Activities",
    tagline: "Push physical thresholds and elevate dynamic skills under elite expert coaches.",
    description: "A high-octane boot camp combining modern functional training, trail endurance running, speed turf drills, obstacle clearance, yoga flexibility, and expert customized nutrition. Fully engineered to boost athletic stamina and agility.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    features: [
      "Scientific baseline athletic screening",
      "Professional UEFA/FIBA certified coaches",
      "Altitude forest trail running trails",
      "Recovery ice baths & sports massage",
      "Tailored nutritional fueling guide"
    ],
    priceStarting: "69",
    duration: "Daily Workshops / Weekly Passes"
  },
  {
    id: "exp_camp_1",
    title: "Ultimate Forest Primitive Survival Camp",
    category: "Camp Activities",
    tagline: "Acquire ancient bushcraft mastery and outdoor self-sufficiency.",
    description: "Learn to live directly from nature's bounty. Discover wild edible plant identification, organic friction fire building, rain-water purification methods, survival shelter physics, and wilderness first response tactics under global veteran rangers.",
    image: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?q=80&w=800&auto=format&fit=crop",
    features: [
      "Friction bow-drill fire starting",
      "Natural canvas and forest log shelter craft",
      "Wild botanical tracking & foraging",
      "Safe water collection and gravel filtration",
      "Basic solar and compass trail mapping"
    ],
    priceStarting: "119",
    duration: "3 Days, 2 Nights"
  }
];

export const FACILITIES = [
  {
    id: "fac_arena",
    title: "Revive Multisports Arena",
    tag: "Pro-Training Turf",
    description: "A masterclass sports installation featuring professional synthetic football turf, multi-court tennis layouts, Olympic standard basketball courts, and advanced LED night floodlights for non-stop action. Perfectly optimized for elite leagues and friendly team scrimmages.",
    mainImage: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=800&auto=format&fit=crop"
    ],
    capacity: "200+ Players",
    highlights: ["FIFA Standard Grass", "Night LED Floodlights", "Premium Equipment"]
  },
  {
    id: "fac_dorms",
    title: "Luxury Eco-Dormitories",
    tag: "Glamping Comforts",
    description: "Experience premium rustic dormitories blending clean wooden architecture with deluxe modern comforts. Features plush warm bedding, individual privacy dividers, personal reading docks, climate control, and stunning glass panoramas facing the misty hills.",
    mainImage: "https://images.unsplash.com/photo-1563833717765-00462801314e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563833717765-00462801314e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
    ],
    capacity: "80 Guests",
    highlights: ["Air Conditioned", "Individual Lockers", "Hillside Balcony views"]
  },
  {
    id: "fac_dining",
    title: "The Fire Pit Dining Pavilion",
    tag: "Culinary Hearth",
    description: "An open-concept timber-framed dining hall centered around a massive open-hearth stone fireplace. Serves nourishing farm-to-table organic recipes, high-fuel sports diets, and gourmet campfire barbecue specialties crafted by resident expert chefs.",
    mainImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop"
    ],
    capacity: "120 Seats",
    highlights: ["Farm-to-Table Organic", "Live BBQ Hearth", "Dietitian Curated"]
  },
  {
    id: "fac_amphi",
    title: "Mountain View Amphitheatre",
    tag: "Stargazer Stage",
    description: "Carved directly into the natural contours of the valley, our open-air stone amphitheatre offers tiered seating wrapping around a center fire pit. Perfect for corporate theater events, cinematic screenings, live performances, and deep galactic stargazing.",
    mainImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
    ],
    capacity: "150 Audience",
    highlights: ["Acoustically Tuned", "Large Center Fire Pit", "Cinema Projector"]
  },
  {
    id: "fac_meeting",
    title: "The Summit Conference Hall",
    tag: "Corporate Synergy",
    description: "A premium, fully air-conditioned log-cabin style boardroom offering cutting-edge multimedia equipment, high-speed fiber internet, writing walls, and comfortable ergonomic seating. Blends corporate utility with serene outdoor backdrops.",
    mainImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
    ],
    capacity: "60 Delegates",
    highlights: ["4K Projectors", "Video Conference setup", "Whiteboard Walls"]
  },
  {
    id: "fac_outdoors",
    title: "Revive Outdoor Activity Zones",
    tag: "Nature Play",
    description: "Sprawling wilderness zones featuring multi-level obstacle circuits, survival training arenas, clean archery ranges, specialized mountain biking trails, and quiet tranquil riverfront meditation clearings to experience peace.",
    mainImage: "https://images.unsplash.com/photo-1469050624972-a04541081625?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1469050624972-a04541081625?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop"
    ],
    capacity: "300+ Explorers",
    highlights: ["Rope obstacle course", "Mountain Bike loops", "Riverfront Meditations"]
  }
];

export const TESTIMONIALS = [
  {
    id: "test_1",
    name: "Rohit Shrikhande",
    role: "VP of People Operations",
    company: "NeoTech Softwares",
    text: "Camp Revive transformed our engineering team. The Wilderness Leadership Summit combined authentic forest bonding with deep strategic exercises. We returned to the office more integrated and aligned than ever!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test_2",
    name: "Dr. Anjali Mehta",
    role: "Sports Orthopedic & Mother",
    company: "Family Bond Camp Guest",
    text: "Unplugging my children from social apps was proving impossible until we arrived at Camp Revive. The archery courses, telescope sessions, and lake kayaking kept them thrilled and physically active all weekend. Absolutely brilliant!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "test_3",
    name: "Vikram Malhotra",
    role: "Marathon Runner & Athlete",
    company: "Sports Academy Alumni",
    text: "The High-Performance Sports academy is no joke. The altitude running trails, professional speed turf drills, and strict chef-curated nutrition fuels helped me trim 12 minutes off my trial times. Highly recommended for any athlete.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gal_1",
    category: "Camps",
    imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop",
    title: "Starlight Glamping",
    caption: "Premium safari tents illuminated under the clear celestial canopy."
  },
  {
    id: "gal_2",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop",
    title: "Football Academy Scrimmage",
    caption: "Teams facing off on our professional night-lit synthetic turf."
  },
  {
    id: "gal_3",
    category: "Corporate",
    imageUrl: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=800&auto=format&fit=crop",
    title: "Synergy Firecircle",
    caption: "Corporate delegates aligning goals around the main hearth."
  },
  {
    id: "gal_4",
    category: "Family",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop",
    title: "Family Campfire Barbecue",
    caption: "Laughs and delicious chef recipes shared by parent and child."
  },
  {
    id: "gal_5",
    category: "Camps",
    imageUrl: "https://images.unsplash.com/photo-1496080174650-637e3f22fa03?q=80&w=800&auto=format&fit=crop",
    title: "Wilderness Survival Shelter",
    caption: "Survivalists showcasing primitive shelter building structures."
  },
  {
    id: "gal_6",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    title: "High-Agility Training",
    caption: "Elite athletes practicing shuttle sprints on the outdoor tracks."
  },
  {
    id: "gal_7",
    category: "Corporate",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    title: "Summit Retreat Presentation",
    caption: "Directors sharing roadmaps inside our timber boardroom cabins."
  },
  {
    id: "gal_8",
    category: "Family",
    imageUrl: "https://images.unsplash.com/photo-1469050624972-a04541081625?q=80&w=800&auto=format&fit=crop",
    title: "Riverfront Kayaking Trails",
    caption: "Families navigating our calm water kayaking pathways safely."
  }
];
