export interface Translation {
  nav: {
    home: string;
    about: string;
    values: string;
    products: string;
    whyUs: string;
    process: string;
    gallery: string;
    faq: string;
    contact: string;
    requestQuotation: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    strengths: {
      professionalCommunication: string;
      professionalCommunicationDesc: string;
      exportProcess: string;
      exportProcessDesc: string;
      supplierPartnership: string;
      supplierPartnershipDesc: string;
      responsiveService: string;
      responsiveServiceDesc: string;
      documentationSupport: string;
      documentationSupportDesc: string;
      longTermCommitment: string;
      longTermCommitmentDesc: string;
    };
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    visionTitle: string;
    vision: string;
    missionTitle: string;
    mission: string;
    whyIndonesiaEyebrow: string;
    whyIndonesiaTitle: string;
    whyIndonesia: string[];
  };
  values: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  products: {
    eyebrow: string;
    title: string;
    subtitle: string;
    customSourcingPrompt: string;
    customSourcingCta: string;
    requestDetails: string;
    fields: {
      origin: string;
      applications: string;
      forms: string;
      packaging: string;
      moq: string;
    };
    featured: string;
    items: {
      id: string;
      description: string;
      applications: string;
      forms: string;
    }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    labels: { farms: string; warehouses: string; packaging: string; containers: string; loading: string };
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      contactPerson: string;
      contactPersonPlaceholder: string;
      email: string;
      companyName: string;
      country: string;
      industry: string;
      industryOptions: string[];
      phone: string;
      interestedProduct: string;
      selectProduct: string;
      productLabels: Record<string, string>;
      otherProductName: string;
      otherProductNamePlaceholder: string;
      requiredQuantity: string;
      quantityPlaceholder: string;
      preferredIncoterm: string;
      incotermLabels: Record<string, string>;
      incotermHelper: string;
      destinationPort: string;
      portPlaceholder: string;
      deliveryDate: string;
      deliveryDatePlaceholder: string;
      packagingRequest: string;
      packagingPlaceholder: string;
      additionalNotes: string;
      notesPlaceholder: string;
      submit: string;
      submitting: string;
      required: string;
      selectProductError: string;
      selectIncotermError: string;
      invalidEmail: string;
      invalidPhone: string;
      duplicateError: string;
      submitError: string;
      honeypotLabel: string;
    };
    success: {
      title: string;
      message: string;
      whatsappNote: string;
      whatsappCta: string;
      another: string;
    };
    info: {
      whatsappTitle: string;
      whatsappDesc: string;
      emailTitle: string;
      addressTitle: string;
      mapTitle: string;
    };
  };
  footer: {
    tagline: string;
    company: string;
    links: { about: string; whyUs: string; process: string; gallery: string };
    productsTitle: string;
    productLinks: string[];
    contactTitle: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  languageSwitcher: {
    label: string;
  };
}

const en: Translation = {
  nav: {
    home: 'Home',
    about: 'About',
    values: 'Values',
    products: 'Products',
    whyUs: 'Why Us',
    process: 'Process',
    gallery: 'Gallery',
    faq: 'FAQ',
    contact: 'Contact',
    requestQuotation: 'Request Quotation',
    closeMenu: 'Close menu',
  },
  hero: {
    eyebrow: 'Indonesian Export Trading Company',
    title: 'Connecting Global Buyers with Premium Indonesian Spices',
    subtitle:
      'We help international buyers source high-quality Indonesian spices through transparent communication, carefully selected supplier partnerships, and export-focused business support.',
    primaryCta: 'Request a Quotation',
    secondaryCta: 'Explore Products',
    strengths: {
      professionalCommunication: 'Professional Communication',
      professionalCommunicationDesc: 'Clear, responsive, and business-focused at every stage',
      exportProcess: 'Export-Oriented Process',
      exportProcessDesc: 'Built around international trade requirements',
      supplierPartnership: 'Supplier Partnerships',
      supplierPartnershipDesc: 'Carefully selected and continuously evaluated',
      responsiveService: 'Responsive Service',
      responsiveServiceDesc: 'Inquiries answered within 24 hours',
      documentationSupport: 'Documentation Support',
      documentationSupportDesc: 'Export paperwork prepared and verified',
      longTermCommitment: 'Long-Term Commitment',
      longTermCommitmentDesc: 'Relationships built on reliability, not transactions',
    },
  },
  about: {
    eyebrow: 'About Us',
    title: 'A Growing Indonesian Export Trading Company',
    paragraphs: [
      'Spice Supplier Indonesia is an export trading company based in Jakarta. We help international buyers source Indonesian spices with confidence — through clear communication, transparent processes, and carefully selected supplier partnerships.',
      'We are a growing company, and we are honest about that. What we offer is not a long history, but a genuine commitment to doing business the right way: responding promptly, sourcing responsibly, and supporting every order with proper documentation.',
      'Our role is to stand between international buyers and Indonesian suppliers — coordinating communication, quality expectations, and export logistics so that both sides can focus on building a lasting business relationship.',
    ],
    visionTitle: 'Our Vision',
    vision:
      'To become a trusted Indonesian sourcing partner for international buyers, known for transparent communication, reliable supplier relationships, and consistent export service.',
    missionTitle: 'Our Mission',
    mission:
      'We connect international buyers with carefully sourced Indonesian spices through professional communication, transparent business practices, and long-term supplier partnerships.',
    whyIndonesiaEyebrow: 'Why Indonesia',
    whyIndonesiaTitle: 'A Natural Source for the World\u2019s Spices',
    whyIndonesia: [
      'Indonesia is home to some of the world\u2019s most sought-after spices, grown across volcanic islands with distinct climates that shape each spice\u2019s aroma and character.',
      'Generations of farming knowledge, combined with a wide range of growing regions, make Indonesia a natural source for turmeric, ginger, cinnamon, clove, nutmeg, and moringa.',
      'As a strategic trading hub in Southeast Asia, Indonesia offers direct access to spice-producing regions and established export routes to global markets.',
    ],
  },
  values: {
    eyebrow: 'Our Values',
    title: 'Principles That Guide How We Work',
    subtitle:
      'These values shape every conversation, every order, and every partnership we build with international buyers and Indonesian suppliers.',
    items: [
      { title: 'Integrity', description: 'We do what we say. Every quotation, specification, and commitment is meant to be honored.' },
      { title: 'Transparency', description: 'We share information openly \u2014 about products, pricing, lead times, and limitations.' },
      { title: 'Quality', description: 'We work with suppliers who take grading, handling, and consistency seriously.' },
      { title: 'Responsibility', description: 'We take ownership of every order, from first inquiry to after-sales follow-up.' },
      { title: 'Collaboration', description: 'We see buyers and suppliers as partners, and we work to align their interests.' },
      { title: 'Continuous Improvement', description: 'We are a growing company, and we actively learn from every order and conversation.' },
    ],
  },
  products: {
    eyebrow: 'Our Products',
    title: 'Indonesian Spices, Sourced for Export',
    subtitle:
      'Our current focus includes turmeric, ginger, cinnamon, clove, nutmeg, and moringa. For each product, we coordinate with supplier partners to meet your specifications on origin, form, packaging, and quantity.',
    customSourcingPrompt: 'Looking for a different spice, herb, or agricultural commodity? We source on request.',
    customSourcingCta: 'Request Custom Sourcing',
    requestDetails: 'Request Details',
    featured: 'Featured',
    fields: {
      origin: 'Origin',
      applications: 'Applications',
      forms: 'Forms',
      packaging: 'Packaging',
      moq: 'MOQ',
    },
    items: [
      {
        id: 'turmeric',
        description:
          'Turmeric is one of Indonesia\u2019s most widely cultivated spices, valued for its vibrant color and distinctive aroma. We work with supplier partners in Java and Lampung to source turmeric suitable for international buyers.',
        applications: 'Food seasoning, natural colorant, herbal products, nutraceuticals, and cosmetics.',
        forms: 'Whole rhizome, sliced, and ground powder. Curcumin content can be confirmed on request.',
      },
      {
        id: 'ginger',
        description:
          'Indonesian ginger is known for its aromatic pungency and is used across food, beverage, and herbal applications. We coordinate with supplier partners in Java and Sumatra to meet buyer specifications.',
        applications: 'Culinary use, beverages, herbal remedies, and essential oil production.',
        forms: 'Fresh rhizome, dried, sliced, and ground powder.',
      },
      {
        id: 'cinnamon',
        description:
          'Indonesian cassia cinnamon, particularly from the Kerinci highlands, is appreciated for its sweet, warm aroma. We source through supplier partners and prepare it for export in the form buyers require.',
        applications: 'Baking, confectionery, beverages, and spice blends.',
        forms: 'Sticks, quills, broken bark, and ground powder.',
      },
      {
        id: 'clove',
        description:
          'Clove from Indonesia is recognized for its strong aroma and high essential-oil content. We work with supplier partners in Maluku and North Sulawesi to source clove that meets export specifications.',
        applications: 'Culinary use, spice blends, essential oil, and traditional products.',
        forms: 'Whole dried buds, sorted and graded.',
      },
      {
        id: 'nutmeg',
        description:
          'Nutmeg and mace from the Banda Islands and North Maluku are among Indonesia\u2019s most historically significant spices. We coordinate with supplier partners to source nutmeg graded for export markets.',
        applications: 'Food seasoning, baking, beverages, and essential oil production.',
        forms: 'Whole nutmeg, mace, and ground powder.',
      },
      {
        id: 'moringa',
        description:
          'Moringa is valued for its nutrient density and is increasingly used in nutraceutical and functional food applications. We work with supplier partners to source moringa prepared under appropriate handling standards.',
        applications: 'Nutraceuticals, functional foods, beverages, and natural supplements.',
        forms: 'Leaf powder, seeds, and other forms on request.',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why Choose Us',
    title: 'Built for Buyers Who Value Reliability',
    subtitle:
      'We are a growing company, and we earn trust through clear communication, honest information, and consistent service \u2014 not through exaggerated claims.',
    items: [
      {
        title: 'Professional Business Communication',
        description:
          'We respond to inquiries within 24 hours, communicate clearly at every stage, and keep you informed from first contact to after-sales follow-up.',
      },
      {
        title: 'Carefully Selected Supplier Partnerships',
        description:
          'We work with supplier partners across Indonesian spice-growing regions, evaluating them based on consistency, handling standards, and reliability.',
      },
      {
        title: 'Transparent Business Practices',
        description:
          'We share information openly \u2014 about products, pricing, lead times, and limitations \u2014 so buyers can make informed decisions.',
      },
      {
        title: 'Export-Oriented Documentation Support',
        description:
          'We prepare and verify export documents based on destination country requirements, so shipments can move through customs smoothly.',
      },
      {
        title: 'Flexible Product Sourcing',
        description:
          'Our current focus includes turmeric, ginger, cinnamon, clove, nutmeg, and moringa \u2014 and we are continuously expanding to support additional Indonesian spices and agricultural commodities.',
      },
      {
        title: 'Long-Term Partnership Commitment',
        description:
          'We are not interested in one-time deals. We invest in relationships with buyers and suppliers, and we work to align their interests over time.',
      },
    ],
  },
  process: {
    eyebrow: 'Export Process',
    title: 'From Inquiry to After-Sales \u2014 A Clear Workflow',
    subtitle:
      'A transparent, step-by-step process designed to keep international buyers informed at every stage of the order.',
    steps: [
      { title: 'Inquiry', description: 'You share your product, quantity, and specification needs via our contact form, email, or WhatsApp.' },
      { title: 'Product Discussion', description: 'We discuss your requirements in detail \u2014 origin, form, grade, packaging, and destination \u2014 to confirm what is feasible.' },
      { title: 'Quotation', description: 'We send a clear quotation covering pricing, specifications, lead time, and estimated shipping.' },
      { title: 'Agreement', description: 'We finalize terms, confirm the order, and agree on payment, delivery, and documentation requirements.' },
      { title: 'Supplier Coordination', description: 'We coordinate with our supplier partners to prepare the order according to the agreed specifications.' },
      { title: 'Quality Inspection', description: 'We arrange inspection of the prepared goods to confirm they meet the agreed specifications before packing.' },
      { title: 'Documentation', description: 'We prepare and verify export documents based on the requirements of your destination country.' },
      { title: 'Shipping', description: 'We coordinate freight forwarding and vessel booking, and we keep you informed of shipment status.' },
      { title: 'After-Sales Communication', description: 'We follow up after delivery to confirm receipt, gather feedback, and support any follow-up requirements.' },
    ],
  },
  gallery: {
    eyebrow: 'Gallery',
    title: 'From Farm to Port \u2014 A Glimpse of Our Operations',
    subtitle:
      'Transparency at every step: see how we source, process, pack, and ship premium Indonesian spices worldwide.',
    labels: {
      farms: 'Farms',
      warehouses: 'Warehouses',
      packaging: 'Packaging',
      containers: 'Containers',
      loading: 'Loading',
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Questions Buyers Often Ask',
    subtitle:
      'Straightforward answers about how we work. If something is not covered here, please reach out and we will respond directly.',
    items: [
      {
        question: 'What is your Minimum Order Quantity (MOQ)?',
        answer:
          'MOQ depends on the product, form, and packaging. We will confirm the minimum quantity for your specific request during quotation.',
      },
      {
        question: 'Can I request samples before placing an order?',
        answer:
          'Samples may be available upon request, subject to product and availability. We will discuss sample terms directly with you.',
      },
      {
        question: 'Is packaging customizable?',
        answer:
          'Yes. Packaging can be customized based on buyer requirements, including private label and retail-ready formats where applicable.',
      },
      {
        question: 'What export documents do you provide?',
        answer:
          'Export documents depend on the destination country and product. Common documents include packing list, commercial invoice, phytosanitary certificate, and certificate of origin. We will confirm requirements for your country.',
      },
      {
        question: 'What is the typical lead time?',
        answer:
          'Lead time depends on order quantity, product availability, and documentation requirements. We will provide an estimated timeline with your quotation.',
      },
      {
        question: 'Which products do you currently export?',
        answer:
          'Our current focus includes turmeric, ginger, nutmeg, clove, cinnamon, and moringa. We are continuously expanding our supplier network to support additional Indonesian spices, herbs, and agricultural commodities.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact Us',
    title: 'Let\u2019s Discuss Your Sourcing Requirements',
    subtitle:
      'We are ready to support your inquiry with professional communication and transparent information. Share what you are looking for and we will respond within 24 hours.',
    form: {
      contactPerson: 'Contact Person *',
      contactPersonPlaceholder: 'Your full name',
      email: 'Email *',
      companyName: 'Company Name *',
      country: 'Country *',
      industry: 'Industry *',
      industryOptions: [
        'Select industry',
        'Food & Beverage',
        'Pharmaceutical',
        'Herbal & Nutraceutical',
        'Cosmetics & Personal Care',
        'Distribution / Trading',
        'Retail',
        'Other',
      ],
      phone: 'Phone / WhatsApp *',
      interestedProduct: 'Product of Interest *',
      selectProduct: 'Select a Product',
      productLabels: {
        turmeric: 'Turmeric',
        ginger: 'Ginger',
        cinnamon: 'Cinnamon',
        nutmeg: 'Nutmeg',
        clove: 'Clove',
        moringa: 'Moringa',
        other: 'Other (Please Specify)',
      },
      otherProductName: 'Product Name',
      otherProductNamePlaceholder: 'Enter the product you are looking for',
      requiredQuantity: 'Quantity Required *',
      quantityPlaceholder: 'e.g. 5,000 kg',
      preferredIncoterm: 'Preferred Incoterm',
      incotermLabels: {
        fob: 'FOB (Recommended)',
        cfr: 'CFR',
        cif: 'CIF',
      },
      incotermHelper:
        'FOB (Free On Board) is our recommended shipping term for most international spice export transactions. If you prefer another shipping arrangement, please mention it in your message.',
      destinationPort: 'Destination Port',
      portPlaceholder: 'e.g. Rotterdam, Hamburg, Tokyo',
      deliveryDate: 'Target Delivery Date',
      deliveryDatePlaceholder: 'e.g. March 2026',
      packagingRequest: 'Preferred Packaging',
      packagingPlaceholder: 'e.g. 25 kg vacuum-sealed bags, private label',
      additionalNotes: 'Additional Requirements',
      notesPlaceholder:
        'Tell us about your product requirements, preferred form, packaging, destination, and any timeline considerations...',
      submit: 'Request Quotation',
      submitting: 'Submitting...',
      required: 'This field is required',
      selectProductError: 'Please select a product',
      selectIncotermError: 'Please select a shipping term',
      invalidEmail: 'Please enter a valid email address',
      invalidPhone: 'Please enter a valid phone number',
      duplicateError: 'You have already submitted an inquiry recently. Please wait before submitting again.',
      submitError: 'Something went wrong. Please try again or contact us directly.',
      honeypotLabel: 'Leave this field empty',
    },
    success: {
      title: 'Thank You!',
      message:
        'Your quotation request has been successfully submitted. Our export team will review your inquiry and contact you as soon as possible.',
      whatsappNote:
        'A WhatsApp message has been prepared for you — please press send so we receive your inquiry instantly.',
      whatsappCta: 'Continue on WhatsApp',
      another: 'Submit another inquiry',
    },
    info: {
      whatsappTitle: 'WhatsApp',
      whatsappDesc: 'Direct conversation during business hours',
      emailTitle: 'Email',
      addressTitle: 'Office Address',
      mapTitle: 'Office location map',
    },
  },
  footer: {
    tagline: 'Premium Indonesian spices exported worldwide with trust, quality, and consistency.',
    company: 'Company',
    links: {
      about: 'About Us',
      whyUs: 'Why Choose Us',
      process: 'Export Process',
      gallery: 'Gallery',
    },
    productsTitle: 'Products',
    productLinks: ['Turmeric', 'Ginger', 'Cinnamon', 'Clove & Nutmeg'],
    contactTitle: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    rights: 'All rights reserved.',
  },
  languageSwitcher: {
    label: 'Language',
  },
};

export default en;
