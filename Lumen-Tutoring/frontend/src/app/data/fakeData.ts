export type Question = {
  text: string;
  options: string[];
  correctIndex: number;
};

export type Topic = {
  name: string;
  mastery: number;
  hook: string;
  example: string;
  questions: Question[];
};

export type Unit = {
  name: string;
  topics: Topic[];
};

export type Subject = {
  name: string;
  units: Unit[];
};

export const subjects: Subject[] = [
  {
    name: "Math",
    units: [
      {
        name: "Fractions and mixed numbers",
        topics: [
          {
            name: "Fractions and mixed numbers",
            mastery: 70,
            hook: "A fraction represents part of a whole, set or quantity. The denominator names the total number of equal parts; the numerator names how many of those parts are considered.",
            example: "If a pizza is divided into 4 equal parts and 3 are shaded, the fraction shaded is 3/4.",
            questions: [
              {
                text: "If a pizza is cut into 4 equal parts and 3 are shaded, what fraction is shaded?",
                options: ["1/4", "3/4", "4/3"],
                correctIndex: 1,
              },
              {
                text: "Which part of a fraction names how many equal parts are being considered?",
                options: ["Numerator", "Denominator", "Whole"],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        name: "Ratios, rates and proportions",
        topics: [
          {
            name: "Ratios, rates and proportions",
            mastery: 45,
            hook: "A ratio compares quantities multiplicatively. A rate is a ratio comparing different units, often expressed per 1 unit. A proportion states that two ratios are equivalent.",
            example: "2:3 and 4:6 are equivalent. A speed of 60 km/h is 60 kilometres per 1 hour.",
            questions: [
              {
                text: "Which ratio is equivalent to 2:3?",
                options: ["4:6", "3:2", "5:6"],
                correctIndex: 0,
              },
              {
                text: "A speed of 60 km/h means:",
                options: ["60 km every 2 hours", "60 km every 1 hour", "6 km every 1 hour"],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      {
        name: "Percents",
        topics: [
          {
            name: "Percents",
            mastery: 30,
            hook: "A percent is a ratio out of 100. Percent, decimal and fraction forms represent the same proportion: 25% = 0.25 = 1/4.",
            example: "20% of 50 = 0.20 × 50 = 10.",
            questions: [
              {
                text: "What is 20% of 50?",
                options: ["5", "10", "20"],
                correctIndex: 1,
              },
              {
                text: "Which fraction equals 25%?",
                options: ["1/2", "1/4", "1/5"],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      {
        name: "One-variable equations",
        topics: [
          {
            name: "One-variable equations",
            mastery: 15,
            hook: "An equation states that two expressions have equal value. Operations can be applied to both sides while preserving equality, provided the operations are valid.",
            example: "x + 5 = 12 gives x = 7.",
            questions: [
              {
                text: "Solve for x: x + 5 = 12",
                options: ["5", "7", "17"],
                correctIndex: 1,
              },
              {
                text: "To keep an equation balanced, what must you do to both sides?",
                options: ["Apply different operations", "Apply the same valid operation", "Ignore one side"],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "English",
    units: [
      {
        name: "Main idea",
        topics: [
          {
            name: "Main idea",
            mastery: 65,
            hook: "The main idea is the central point a text, paragraph, picture or section communicates. A complete main-idea statement identifies the subject and what the text says about it.",
            example: "If a passage explains how bees collect nectar, make honey and pollinate flowers, the main idea is about the roles bees play in nature and food production.",
            questions: [
              {
                text: "A passage explains how bees collect nectar, make honey, and pollinate flowers. What's the main idea?",
                options: [
                  "Bees play important roles in nature and food production",
                  "Bees have six legs",
                  "Honey is sticky",
                ],
                correctIndex: 0,
              },
              {
                text: "The main idea of a paragraph is best described as:",
                options: ["One random detail", "The central point the text communicates", "The title of the passage"],
                correctIndex: 1,
              },
            ],
          },
        ],
      },
      {
        name: "Author's purpose and tone",
        topics: [
          {
            name: "Author's purpose and tone",
            mastery: 50,
            hook: "Author's purpose is the reason a text was created. Common purposes are to inform, explain, entertain, persuade or describe.",
            example: "A recipe primarily informs or instructs; an advertisement aims to persuade.",
            questions: [
              {
                text: "What is the primary purpose of a recipe?",
                options: ["To persuade", "To inform or instruct", "To entertain"],
                correctIndex: 1,
              },
              {
                text: "An advertisement is usually written to:",
                options: ["Persuade", "Inform only", "Entertain only"],
                correctIndex: 0,
              },
            ],
          },
        ],
      },
      {
        name: "Point of view",
        topics: [
          {
            name: "Point of view",
            mastery: 38,
            hook: "Point of view is the perspective from which a text is presented. First person uses I/we; second person uses you; third person uses he, she, they or character names.",
            example: "First person: 'I opened the door.' Third person: 'Mia opened the door.'",
            questions: [
              {
                text: "'I opened the door.' is written in which point of view?",
                options: ["First person", "Second person", "Third person"],
                correctIndex: 0,
              },
              {
                text: "'Mia opened the door.' is written in which point of view?",
                options: ["First person", "Second person", "Third person"],
                correctIndex: 2,
              },
            ],
          },
        ],
      },
      {
        name: "Literary devices",
        topics: [
          {
            name: "Literary devices",
            mastery: 20,
            hook: "Literary devices are deliberate language choices that create meaning, emphasis, imagery or tone. Common devices include simile, metaphor, hyperbole, and oxymoron.",
            example: "Simile: 'as quiet as a mouse.' Hyperbole: 'I waited a million years.' Oxymoron: 'deafening silence.'",
            questions: [
              {
                text: "'As quiet as a mouse' is an example of a:",
                options: ["Simile", "Hyperbole", "Oxymoron"],
                correctIndex: 0,
              },
              {
                text: "'Deafening silence' is an example of a:",
                options: ["Simile", "Hyperbole", "Oxymoron"],
                correctIndex: 2,
              },
            ],
          },
        ],
      },
    ],
  },
    {
    name: "Python",
    units: [],
  },
];