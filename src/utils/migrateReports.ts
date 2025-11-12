import { supabase } from '../lib/supabase';

const legacyReports = [
  {
    title: 'Scoop N\' Buns: Entrepreneurial Success Story',
    type: 'Entrepreneurship Case Study',
    date: 'October 24, 2025',
    analyst: 'Ethan Lin',
    recommendation: 'Case Study',
    target_price: null,
    current_price: null,
    icon_name: 'Building2',
    color: 'purple',
    summary: 'A story of resilience, community engagement, and strategic business growth from ice cream shop to multi-location franchise.',
    content: `<p>Scoop N' Buns: A story of entrepreneurial success, and what you can learn from it.<br>By Ethan Lin<br>10/4/25</p>

<p>Scoop N' Buns, for many local residents of Garland, is more than just a nice ice cream shop. Founded in 2020 by husband-and-wife team Gerardo and Zoya Hernandez, "Mexi-Pino" by heritage, the shop quickly transformed an old thrift store into a place where families and friends gather for creative desserts and rotating flavors. Their sister locations, Cafe Frida and Scoop N' Boba, fuse ice cream favorites with boba creations, extending that same welcoming vibe. From indulgent treats to cozy coffee moments, the Scoop N' Buns family has become a local favorite for sweet escapes and cultural connections in Garland.</p>

<p>But, what could have led to the start of this amazing business? For Zoya, it wasn't an entirely deliberate choice.</p>

<p><strong>Ethan (me):</strong> What caused you to take that initial leap of faith to open your business? I read that you stepped away from nursing to start Scooping Buns.</p>

<p><strong>Zoya:</strong> Well, um, well, 2020 was COVID, right? So even before that, I took a break from my job just because my mom got a stroke. It's not something that, "Oh, you know what? I want to be an entrepreneur." It's actually from, you know, because my mom, so I had to take time off from nursing to take care of my mom personally. She had a stroke and we had to, you know, everything went so fast that we had, we didn't have a choice, but to put her in hospice. The nurses were being, I don't know what, what the word for it, but it's almost like we were being bullied to do something that it's not ethically like legal. And I'm like, I can't do this, you know? Um, so, you know, they cut my hours and I'm like, I was literally grieving. I paid all my savings from my mom's funeral. Like I can't do, you know, full time to part time forcibly. It was just not feasible.</p>

<p><strong>Key Insight:</strong> When a business or organization identifies what others have overlooked, whether it's a new product, a better service, or a more inclusive approach, they can establish a sustainable competitive advantage and improve market positioning.</p>

<p><strong>Strategic Adaptation:</strong> Scoop N' Buns stands as a testament to what determination, community engagement, and strategic adaptability can accomplish. Organization ensures operational stability. Hospitality ensures that customers feel valued. Community involvement strengthens brand reputation and embeds the business into the social fabric of the city.</p>`,
    pdf_url: '/reports/S&B Franchise Case Study.pdf'
  },
  {
    title: 'Innodata Inc. (NASDAQ: INOD)',
    type: 'Short-Sell Recommendation',
    date: 'October 2, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Short',
    target_price: '$45',
    current_price: '$79.44',
    icon_name: 'TrendingDown',
    color: 'red',
    summary: 'Overextended valuation in AI data infrastructure with significant customer concentration risk.',
    content: `<h2>Subject: Innodata Inc. (NASDAQ: INOD)</h2>
<p><strong>Date:</strong> October 2, 2025<br>
<strong>Analyst:</strong> Ayan Bhardwaj<br>
<strong>Recommendation:</strong> Short – Initiate short position at $79.44 (current price) with an initial target of ~$45 and a stop-loss at ~$95</p>

<h2>I. Company Overview</h2>
<p>Innodata Inc. is a U.S.-based data engineering firm that provides content, data-annotation, enrichment, and AI services to enterprise and technology clients. The company presents itself as a core infrastructure player in the generative AI ecosystem, offering data-processing solutions that help clients train and fine-tune large language models (LLMs).</p>

<h2>II. Key Risks and Catalysts for a Short</h2>
<ol>
<li><strong>Overextended Valuation:</strong> Innodata's rapid revenue expansion has driven its market valuation to aggressive levels.</li>
<li><strong>Customer Concentration Risk:</strong> The company's success depends heavily on a limited number of large technology clients.</li>
<li><strong>Rising Competitive Pressure:</strong> The data-annotation and AI services market is becoming increasingly crowded.</li>
<li><strong>Growth Base Effects:</strong> After back-to-back quarters of triple-digit growth, maintaining similar rates becomes mathematically difficult.</li>
</ol>

<h2>III. Short Thesis and Positioning</h2>
<p><strong>Entry Level:</strong> ~$79.44<br>
<strong>Stop-Loss:</strong> ~$95<br>
<strong>Initial Target:</strong> ~$45<br>
<strong>Time Horizon:</strong> 6–12 months</p>`
  },
  {
    title: 'The Metals Company Inc. (NASDAQ: TMC)',
    type: 'Long Recommendation',
    date: 'October 1, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Long',
    target_price: '$4.50',
    current_price: '$1.65',
    icon_name: 'TrendingUp',
    color: 'green',
    summary: 'First-mover advantage in deep-sea mining with exposure to critical battery metals shortage.',
    content: `<h2>Subject: The Metals Company Inc. (NASDAQ: TMC)</h2>
<p><strong>Date:</strong> October 1, 2025<br>
<strong>Analyst:</strong> Ayan Bhardwaj<br>
<strong>Recommendation:</strong> Long – Initiate buy position at $1.65 with an initial target of $4.50 and a 12–18 month horizon</p>

<h2>I. Investment Thesis – Why Go Long</h2>
<ol>
<li><strong>First-Mover Advantage:</strong> TMC is the leading commercial-stage player preparing to harvest polymetallic nodules on a large scale.</li>
<li><strong>Copper Supply Deficit:</strong> Global copper inventories are near decade lows, with analysts projecting an annual deficit of 5–8 million tons by 2030.</li>
<li><strong>ESG Positioning:</strong> TMC's approach emphasizes minimal ecosystem disturbance relative to open-pit mining.</li>
</ol>

<h2>II. Valuation and Targets</h2>
<p><strong>Current Price:</strong> ~$1.65<br>
<strong>Initial Target:</strong> $4.50<br>
<strong>Upside Potential:</strong> +170%<br>
<strong>Time Horizon:</strong> 12–18 months</p>`
  },
  {
    title: 'Blue Bird Corporation (NASDAQ: BLBD)',
    type: 'Long Recommendation',
    date: 'October 8, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Long',
    target_price: '$52.00',
    current_price: '$33.10',
    icon_name: 'TrendingUp',
    color: 'green',
    summary: 'Leading EV school bus manufacturer benefiting from federal clean energy funding and fleet electrification.',
    content: `<h2>Subject: Blue Bird Corporation (NASDAQ: BLBD)</h2>
<p><strong>Date:</strong> October 8, 2025<br>
<strong>Analyst:</strong> Ayan Bhardwaj<br>
<strong>Recommendation:</strong> Long – Initiate buy position at $33.10 with a 12-month target of $52.00</p>

<h2>I. Investment Thesis</h2>
<ol>
<li><strong>Dominant Market Position:</strong> Blue Bird commands roughly 60 percent of the U.S. school bus market.</li>
<li><strong>Electrification Tailwinds:</strong> Main beneficiary of EPA's Clean School Bus Program ($5 billion initiative).</li>
<li><strong>Improving Financial Performance:</strong> Revenue growth exceeding 30% year-over-year with expanding margins.</li>
</ol>

<h2>II. Valuation and Target</h2>
<p><strong>Current Price:</strong> ~$33.10<br>
<strong>Target Price:</strong> ~$52.00 (+57% upside)<br>
<strong>Time Horizon:</strong> 12–18 months</p>`
  },
  {
    title: 'AI Investment & Labor Productivity',
    type: 'Econometric Research',
    date: 'October 10, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Research',
    target_price: null,
    current_price: null,
    icon_name: 'BarChart3',
    color: 'blue',
    summary: 'Quantifying the causal relationship between AI capital investment and labor productivity in U.S. manufacturing.',
    content: `<h1>Quantifying the Impact of Artificial Intelligence Investment on Labor Productivity</h1>
<p><strong>Author:</strong> Ayan Bhardwaj<br>
<strong>Date:</strong> October 10, 2025</p>

<h2>I. Executive Summary</h2>
<p>This report investigates the causal relationship between AI capital investment and labor productivity growth in the U.S. manufacturing sector from 2012 to 2024 using econometric modeling techniques.</p>

<h2>II. Results Summary</h2>
<ul>
<li><strong>Positive AI–productivity elasticity (0.34):</strong> A 1% rise in AI investment intensity boosts productivity by 0.34%</li>
<li><strong>Diminishing returns beyond AI_INV ≈ 0.15:</strong> Marginal effects flatten once AI accounts for over 15% of total capital</li>
<li><strong>R&D complementarity:</strong> High R&D intensity magnifies AI returns by ~20%</li>
</ul>

<h2>III. Policy Implications</h2>
<p>Firms investing in AI alongside R&D reap larger productivity dividends. This supports integrated digital transformation strategies.</p>`
  },
  {
    title: 'Social Media Sentiment & Stock Returns',
    type: 'Quantitative Research',
    date: 'October 19, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Research',
    target_price: null,
    current_price: null,
    icon_name: 'BarChart3',
    color: 'blue',
    summary: 'Quantitative analysis of Twitter sentiment impact on S&P 500 daily returns using NLP and regression analysis.',
    content: `<h1>The Effect of Social Media Sentiment on Daily Stock Returns</h1>
<p><strong>Author:</strong> Ayan Bhardwaj<br>
<strong>Date:</strong> October 19, 2025</p>

<h2>I. Abstract</h2>
<p>This report examines whether social media sentiment exerts a measurable influence on the daily stock returns of S&P 500 companies between 2018 and 2024.</p>

<h2>II. Empirical Results</h2>
<p>A one-standard-deviation increase in daily sentiment score leads to a 0.09% rise in next-day returns, significant at the 1% level. The effect is strongest in high-volatility sectors (tech and consumer discretionary).</p>

<h2>III. Portfolio Simulation</h2>
<p><strong>Strategy:</strong> Long top 20% sentiment stocks, short bottom 20%<br>
<strong>Results (2018–2024):</strong></p>
<ul>
<li>Annualized return: 9.7%</li>
<li>Sharpe ratio: 1.24</li>
<li>Alpha vs. Fama-French 3-factor: +3.2%</li>
</ul>`
  }
];

export async function migrateReportsToDatabase() {
  console.log('Starting report migration...');

  try {
    for (const report of legacyReports) {
      const { error } = await supabase
        .from('reports')
        .insert([report]);

      if (error) {
        console.error(`Failed to migrate report: ${report.title}`, error);
      } else {
        console.log(`Successfully migrated: ${report.title}`);
      }
    }

    console.log('Migration completed!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}
