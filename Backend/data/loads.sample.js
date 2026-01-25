const loadsSample = [
  {
    loadNumber: "LD1001",
    customer: "Amazon",
    workOrder: "WO-8891",
    driver: "John Carter",
    truckNum: "TRK-101",
    trailerNum: "TRL-555",
    status: "Open",

    pickup: {
      shipper: "Amazon Warehouse",
      street: "Sector 21",
      city: "Delhi",
      state: "DL",
      zip: "110001",
      date: new Date("2026-01-24"),
      notes: "Pickup before 10 AM"
    },

    delivery: {
      consignee: "Flipkart Hub",
      street: "Whitefield",
      city: "Bangalore",
      state: "KA",
      zip: "560066",
      date: new Date("2026-01-26"),
      notes: "Unload at Dock 3"
    }
  },

  {
    loadNumber: "LD1002",
    customer: "Reliance Retail",
    workOrder: "WO-8892",
    driver: "Rahul Sharma",
    truckNum: "TRK-202",
    trailerNum: "TRL-777",
    status: "Dispatched",

    pickup: {
      shipper: "Reliance DC",
      street: "MIDC Area",
      city: "Mumbai",
      state: "MH",
      zip: "400093",
      date: new Date("2026-01-22"),
      notes: "Security gate entry required"
    },

    delivery: {
      consignee: "Reliance Store",
      street: "MG Road",
      city: "Pune",
      state: "MH",
      zip: "411001",
      date: new Date("2026-01-23"),
      notes: "Call manager before arrival"
    }
  },

  {
    loadNumber: "LD1003",
    customer: "Tata Logistics",
    workOrder: "WO-8893",
    driver: "Amit Verma",
    truckNum: "TRK-303",
    trailerNum: "TRL-888",
    status: "Delivered",

    pickup: {
      shipper: "Tata Steel Plant",
      street: "Industrial Area",
      city: "Jamshedpur",
      state: "JH",
      zip: "831001",
      date: new Date("2026-01-20"),
      notes: "Heavy load"
    },

    delivery: {
      consignee: "Construction Site",
      street: "Sector 62",
      city: "Noida",
      state: "UP",
      zip: "201301",
      date: new Date("2026-01-21"),
      notes: "Unload with crane"
    },

    completedAt: new Date("2026-01-21")
  }
];

export default loadsSample;
