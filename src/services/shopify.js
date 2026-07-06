// Shopify Storefront API Integration Service
// Falls back gracefully to local mockup database if credentials are not provided in environment variables

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const hasShopifyConfig = SHOPIFY_DOMAIN && SHOPIFY_ACCESS_TOKEN;

// Premium local outdoor & camp products database for fallback and demo runs
const MOCK_PRODUCTS = [
  {
    id: "prod_1",
    title: "Revive Expedition 4-Person Tent",
    handle: "revive-expedition-tent",
    description: "Built for true wilderness explorers. Features ripstop waterproof fabric, premium aluminum poles, double vestibules, and advanced climate control vents. Designed to withstand harsh wind and downpours, offering ultimate shelter for up to 4 adults.",
    price: "189.99",
    category: "Camping Gear",
    images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=800&auto=format&fit=crop"],
    variants: [
      { id: "var_1_1", title: "Forest Green", price: "189.99", available: true },
      { id: "var_1_2", title: "Desert Sand", price: "189.99", available: true }
    ],
    features: [
      "100% Waterproof Ripstop Polyester (3000mm rating)",
      "Aircraft-grade lightweight aluminum poles",
      "Stargazing high-density mesh ceiling panels",
      "Dual entry with windproof storm flaps"
    ]
  },
  {
    id: "prod_2",
    title: "Campfire Insulated Thermal Flask",
    handle: "campfire-thermal-flask",
    description: "Keep your drinks piping hot for 24 hours or freezing cold for 48 hours. Crafted from double-wall professional grade 18/8 stainless steel. Zero condensation, sweat-proof exterior, and includes a heavy-duty leakproof handle cap.",
    price: "29.99",
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop"],
    variants: [
      { id: "var_2_1", title: "Matte Black (1L)", price: "29.99", available: true },
      { id: "var_2_2", title: "Active Lime (1L)", price: "29.99", available: true }
    ],
    features: [
      "Double-wall vacuum insulation",
      "BPA-free 18/8 food-grade stainless steel",
      "Leakproof utility carry-loop lid",
      "Durable powder-coated sweat-proof finish"
    ]
  },
  {
    id: "prod_3",
    title: "Apex Wilderness Backpack 55L",
    handle: "apex-wilderness-backpack-55l",
    description: "Designed for multi-day trekking and extreme comfort. Features a custom adjustable ergonomic suspension frame, high-capacity dry compartments, padded hip belt, and integrated whistle. Comes with a hidden hi-vis waterproof rain cover.",
    price: "119.99",
    category: "Camping Gear",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"],
    variants: [
      { id: "var_3_1", title: "Standard 55L", price: "119.99", available: true }
    ],
    features: [
      "Ergonomic steel-flex weight distribution frame",
      "Anti-sweat breathable mesh back support",
      "Integrated emergency whistle buckle",
      "Concealed high-vis rain cover included"
    ]
  },
  {
    id: "prod_4",
    title: "Revive Classic Active Cap",
    handle: "revive-classic-active-cap",
    description: "Top off your adventure look with this breathable, water-resistant quick-dry active cap. Laser-cut ventilation holes, adjustable toggle elastic strap, and a moisture-wicking sweatband make this perfect for sunny trails or sports action.",
    price: "24.99",
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"],
    variants: [
      { id: "var_4_1", title: "Olive Green", price: "24.99", available: true },
      { id: "var_4_2", title: "Camp Sand", price: "24.99", available: true }
    ],
    features: [
      "Water-repellent micro-weave fabric",
      "Laser-perforated side ventilation panels",
      "Moisture-wicking inner cooling band",
      "Elastic quick-adjust bungee closure"
    ]
  },
  {
    id: "prod_5",
    title: "Trailblazer Sub-Zero Sleeping Bag",
    handle: "trailblazer-sub-zero-sleeping-bag",
    description: "Enjoy comfortable sleep even in extreme cold. Rated down to -5°C (23°F), featuring high-loft hollow fiber insulation, a cozy draft collar, 3D hood, and an anti-snag durable zipper. Compresses exceptionally small for easy travel.",
    price: "79.99",
    category: "Camping Gear",
    images: ["https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?q=80&w=800&auto=format&fit=crop"],
    variants: [
      { id: "var_5_1", title: "Single Person", price: "79.99", available: true }
    ],
    features: [
      "Extreme rating down to -5°C",
      "High-loft thermal hollow-fiber insulation",
      "Ripstop wind-resistant outer shell",
      "Heavy-duty compression sack included"
    ]
  },
  {
    id: "prod_6",
    title: "Camp Revive Signature Trail Hoodie",
    handle: "camp-revive-signature-trail-hoodie",
    description: "The ultimate cozy hoodie for cool campfires and outdoor training. Crafted from a thick organic cotton-fleece blend. Offers an oversized adjustable hood, deep front pouch pocket, and high-density branding details.",
    price: "49.99",
    category: "Apparel",
    images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"],
    variants: [
      { id: "var_6_1", title: "S", price: "49.99", available: true },
      { id: "var_6_2", title: "M", price: "49.99", available: true },
      { id: "var_6_3", title: "L", price: "49.99", available: true },
      { id: "var_6_4", title: "XL", price: "49.99", available: true }
    ],
    features: [
      "Ultra-soft organic cotton-fleece blend",
      "Double-lined hood with adjustable drawcords",
      "Ribbed cuffs and waistband for optimal warmth",
      "High-durability flatlock seam stitching"
    ]
  }
];

// Helper to query actual Shopify Storefront API
async function shopifyQuery(query, variables = {}) {
  try {
    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API responded with status ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      console.error('Shopify GraphQL Errors:', json.errors);
      throw new Error(json.errors[0].message);
    }
    return json.data;
  } catch (error) {
    console.error('Failed to query Shopify API:', error);
    throw error;
  }
}

// Service exports
export const shopifyService = {
  // Fetch list of products
  async getProducts() {
    if (!hasShopifyConfig) {
      console.warn("Shopify configuration missing. Using local mock products database.");
      return MOCK_PRODUCTS;
    }

    const query = `
      query GetProducts {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 3) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const data = await shopifyQuery(query);
      return data.products.edges.map(edge => {
        const node = edge.node;
        return {
          id: node.id,
          title: node.title,
          handle: node.handle,
          description: node.description,
          price: node.priceRange.minVariantPrice.amount,
          images: node.images.edges.map(e => e.node.url),
          variants: node.variants.edges.map(e => ({
            id: e.node.id,
            title: e.node.title,
            price: e.node.price.amount,
            available: e.node.availableForSale
          })),
          features: ["Premium quality gear", "Official Camp Revive product"]
        };
      });
    } catch (e) {
      console.error("Shopify getProducts failed. Falling back to local mock products.", e);
      return MOCK_PRODUCTS;
    }
  },

  // Fetch single product by handle
  async getProductByHandle(handle) {
    if (!hasShopifyConfig) {
      const product = MOCK_PRODUCTS.find(p => p.handle === handle);
      if (!product) throw new Error(`Product not found: ${handle}`);
      return product;
    }

    const query = `
      query GetProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 5) {
            edges {
              node {
                url
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                nodeId: id
                title
                price {
                  amount
                }
                availableForSale
              }
            }
          }
        }
      }
    `;

    try {
      const data = await shopifyQuery(query, { handle });
      const node = data.productByHandle;
      if (!node) {
        throw new Error(`Product ${handle} not found in Shopify`);
      }
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        description: node.description,
        price: node.priceRange.minVariantPrice.amount,
        images: node.images.edges.map(e => e.node.url),
        variants: node.variants.edges.map(e => ({
          id: e.node.nodeId,
          title: e.node.title,
          price: e.node.price.amount,
          available: e.node.availableForSale
        })),
        features: ["Premium quality gear", "Official Camp Revive product"]
      };
    } catch (e) {
      console.error(`Shopify getProductByHandle for "${handle}" failed. Checking mock database.`, e);
      const product = MOCK_PRODUCTS.find(p => p.handle === handle);
      if (!product) throw e;
      return product;
    }
  },

  // Create checkout and return redirect url
  async createCheckout(lineItems) {
    // lineItems format: [{ variantId: '...', quantity: 1 }]
    if (!hasShopifyConfig) {
      console.log("Mocking Shopify checkout initiation with items:", lineItems);
      // Simulate slow loading for premium UX
      await new Promise(r => setTimeout(r, 1200));
      // Return a beautiful success path fallback
      return `/inquiry-success?type=store&ref=ORD-${Math.floor(Math.random() * 90000) + 10000}`;
    }

    const mutation = `
      mutation CheckoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            webUrl
          }
          checkoutUserErrors {
            message
          }
        }
      }
    `;

    const formattedLineItems = lineItems.map(item => ({
      variantId: item.variantId,
      quantity: parseInt(item.quantity)
    }));

    try {
      const data = await shopifyQuery(mutation, {
        input: { lineItems: formattedLineItems }
      });

      if (data.checkoutCreate.checkoutUserErrors && data.checkoutCreate.checkoutUserErrors.length > 0) {
        throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
      }

      return data.checkoutCreate.checkout.webUrl;
    } catch (e) {
      console.error("Shopify checkout creation failed. Falling back to local success screen.", e);
      return `/inquiry-success?type=store&ref=ORD-${Math.floor(Math.random() * 90000) + 10000}`;
    }
  }
};
