import { useState } from 'react';
import { FileText, TrendingDown, TrendingUp, BarChart3, Search, X, Building2 } from 'lucide-react';

const reports = [
  {
    id: 6,
    title: 'Scoop N\' Buns: Entrepreneurial Success Story',
    type: 'Entrepreneurship Case Study',
    date: 'October 24, 2025',
    analyst: 'Ethan Lin',
    recommendation: 'Case Study',
    targetPrice: null,
    currentPrice: null,
    icon: Building2,
    color: 'purple',
    summary: 'A story of resilience, community engagement, and strategic business growth from ice cream shop to multi-location franchise.',
    content: `Scoop N' Buns: A story of entrepreneurial success, and what you can learn from it.
By Ethan Lin
10/4/25

Scoop N' Buns, for many local residents of Garland, is more than just a nice ice cream shop. Founded in 2020 by husband-and-wife team Gerardo and Zoya Hernandez, "Mexi-Pino" by heritage, the shop quickly transformed an old thrift store into a place where families and friends gather for creative desserts and rotating flavors. Their sister locations, Cafe Frida and Scoop N' Boba, fuse ice cream favorites with boba creations, extending that same welcoming vibe. From indulgent treats to cozy coffee moments, the Scoop N' Buns family has become a local favorite for sweet escapes and cultural connections in Garland.

But, what could have led to the start of this amazing business? For Zoya, it wasn't an entirely deliberate choice.

Ethan (me): What caused you to take that initial leap of faith to open your business? I read that you stepped away from nursing to start Scooping Buns.

Zoya: Well, um, well, 2020 was COVID, right? So even before that, I took a break from my job just because my mom got a stroke. It's not something that, "Oh, you know what? I want to be an entrepreneur." (0:51) It's actually from, you know, because my mom, so I had to take time off from nursing to take care of my mom personally. (0:59) She had a stroke and we had to, you know, everything went so fast that we had, we didn't have a choice, but to put her in hospice. The nurses were being, I don't know what, what the word for it, but it's almost like we were being bullied to do something that it's not ethically like legal. And I'm like, I can't do this, you know? Um, so, you know, they cut my hours and I'm like, I was literally grieving. I paid all my savings from my mom's funeral. Like I can't do, you know, full time to part time forcibly. It was just not feasible.

Ethan:
So you needed some flexibility.

Zoya:
Exactly. So yeah, I told Gerardo, I was like, you know what, I can't do this. I have to find something else. And so, but yeah, I mean, long story short, I've had some surgeries and all that stuff. And I'm like, I don't know what to do. But I've always wanted to be a baker. I've always wanted, actually, I was baking whenever my mom was sick. So that was kind of like my, so that's kind of like how it started. Do you know how we have tres leches here?

Ethan:
Yeah.

Zoya:
So that's when it started. Actually, I started making a recipe for the tres leches to help gain money for my mom's hospital bills. So I took off from that. So in the midst of taking care of my mom, I started selling tres leches cakes. So I started trying to sell cakes, cookies and all that stuff, because that's literally what I know. So just baking. So that helped out, you know, the bills from hospital bills all the way to like, you know, so.

Gerardo also has a lawn business for probably about five, six, seven years operating before we met and whatnot. So he had experience in entrepreneurship and all that stuff. We decided that since we both needed some kind of like, what is it called? Like a change, right? And so we decided, what about an ice cream shop in Garland?

So that's why we decided, we're like, okay, what about a restaurant? Like a little bakery first. And then Gerardo was like, you know what? Yeah. I mean, you know how to bake and we love ice cream. So we kind of got that idea and yeah, we did a lot of research. I had fun doing a lot of research. We looked at all the buildings. You have to do research first. A lot of research actually. And yeah, we found this, it was very, very dingy, but we thought it had some, I mean, me and Gerardo had like creative minds as well. They were like, you know what? I think we can see something from here. And so, yeah, that's, that's where it started.

It's important to note what Zoya and Gerardo did, by filling in that missing bakery space. When a business or organization identifies what others have overlooked, whether it's a new product, a better service, or a more inclusive approach, they can establish a sustainable competitive advantage and improve market positioning. Having a better position to make sales increases profits. The couple continued to expand their business to Scoop and Boba following the success of their first endeavor.

However, 2023 was a breaking point for the couple. When starting a business, it is important to recognize the risks of your industry. For an Ice Cream shop like Scoop N' Buns and Scoop N' Boba, the business was very cyclical, with business peaking in the summer and dipping in the winter. At the time, having a small amount of menu items aggravated the problem. And with the model of their business, they could not easily exit or expand their position in the market, due to its basis being a casual Ice Cream Shop. So, what did they do?

Zoya: There were definitely a lot of challenges and almost actually 2023 was our breaking point. So much so that we wondered, "are we going to close or not?" Just because we're an ice cream shop solely. It's a dessert. It's a very seasonal business. So we decided to sell a lot of stuff, AKA Gerardo's lawn trucks, Gerardo's, like all this stuff. We took some of our savings. It pretty much was a hail Mary on us in 2023, honestly. And we didn't tell anybody, you know, cause I don't know. We didn't want to be a burden to the community, but at the same time, we wanted to be a part of the community. So we took that turn and I'm like, you know what? We even, I think, borrowed money from people that were like, I really don't, we're not the type of people that borrow money, but we had to like to borrow from my sister, you know, brother-in-law and you know, mostly like Gerardo's like equipment stuff. And he was like, no, I can do this. But I'm like, I feel so bad. He sold his favorite truck and I'm like, okay. So with that money, we took a chance to, um, open Cafe Frida in 2023.

What else contributed to Cafe Frida's success? Within Downtown Garland, the businesses are quite prominent, becoming very well renowned and reputable. How did they get to this point, besides good ice cream? The owners talk about their role in the community quite a bit, attributing their role to putting themselves out there through community involvement.

Zoya: You know, it's not going to be handed to you unless, I don't know what young folks do these days, the Tik Tok and all that stuff. But with us, it was definitely really hard to get our branding out there. Um, but what we did was to reach out to community fundraisers with Garland High School, fundraisers with this, fundraisers with everybody, um, try to give out free stuff to everyone. So that's, that's what, what we did as far as to be a part of the community, just being out there. Um, and I think that's what makes us different than any other establishments out there.

The owners talk about the role of organization within a business. Not only does it contribute to the customer experience, but it also streamlines productivity and makes labor easier.

Zoya: Well, I would say definitely if you're in a business world or anything that you want to, any profession out there, you need to have a solid work ethic. That means you need to be organized. You need to be, I would say like you need to be organized and clean, actually like organized and clean. I think if you're a business owner, you really have to be organized and do a lot of research for sure.

It's not going to be easy. You have to be mindful of the back expenses, plumbing, electricity, people stealing from you, you know, like all this stuff is like something that the world does not teach you, but you have to figure it out first. So yeah, I would say just being organized can get you further than what you have. Like if you're organized here, I think you're going to have a better chance of being successful.

Like I always tell my employees, when you're doing a coffee, you need to be able to have your milk over here, your syrups over here. If you don't have that, this happens: "Oh, I gotta get this, oh, I gotta get this," so like it makes your surroundings chaotic. If you're organized, wherever you're pursuing or whatever degree you're having, you're going to have a better chance.

Organized is such a simple word, but once you have organization, like all this, you have to organize where everything is at. If it's not organized, we do not have this. We do not have employees. We have recipes, we have instructions, we have everything for the young kids to follow. If we do not have that, then we do not have any 25 employees. So that is literally one of the important things. If you want to do a business, you have to be organized, everything.

Obviously business equals expanding. If you want to expand, then you have to have your employees. If you want to have your employees, what do you want them to do? Follow what you want them to do. So it really roots to that.

Be organized in your life first, especially if you're doing entrepreneurship or being in healthcare, like something that you're trying to give in the community or serving people, you really have to be organized or else your business will fail. I hate to say that, or else businesses will always fail. It all roots to that organization. It all roots to the management, right?

Business practices aside, the owners emphasize that a business's true impact extends beyond its products. Zoya and Gerardo believe that character, authenticity, and interpersonal connection are central to the customer experience. This philosophy aligns with experiential branding, where value is created not only through what is sold, but through how customers feel when they engage with the brand. By fostering a welcoming environment and building genuine relationships with patrons, they ensure that every visit becomes a memorable interaction.

Zoya: Actually a huge part of it. Being a Filipino, my mom always told me that being a Filipino and a nurse myself and my mom as a nurse. So I was so, I was already, what's the name for that? I was already exposed to what hospitality looks like for Filipinos and especially becoming a nurse. It's such a huge part of us. So the way we operate our business is that number one is always hospitality. So always, always, you know, connect with your people, connect with your community. It's always like that, especially with me, my employees and all that stuff. I'll always like to tell them, you know, like the hospitality, always welcome people and, you know, just be kind.

Scoop N' Buns stands as a testament to what determination, community engagement, and strategic adaptability can accomplish. From navigating personal hardship to identifying a gap in the Garland market, Zoya and Gerardo built more than a business. They built a space where culture, comfort, and creativity intersect. Their willingness to take calculated risks, diversify offerings to combat seasonality, and participate actively in local events demonstrates a sophisticated understanding of market positioning and brand visibility.

Most importantly, their story reveals that success is rooted in people. Organization ensures operational stability. Hospitality ensures that customers feel valued. Community involvement strengthens brand reputation and embeds the business into the social fabric of the city. In short, Scoop N' Buns succeeds by doing more than serving ice cream. It brings people together.`,
    pdfLink: '/reports/S&B Franchise Case Study.pdf'
  },
  {
    id: 1,
    title: 'Innodata Inc. (NASDAQ: INOD)',
    type: 'Short-Sell Recommendation',
    date: 'October 2, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Short',
    targetPrice: '$45',
    currentPrice: '$79.44',
    icon: TrendingDown,
    color: 'red',
    summary: 'Overextended valuation in AI data infrastructure with significant customer concentration risk.',
    content: `Subject: Innodata Inc. (NASDAQ: INOD)
Date: October 2, 2025
Analyst: Ayan Bhardwaj
Recommendation: Short – Initiate short position at $79.44 (current price) with an initial target of ~$45 and a stop-loss at ~$95

I. Company Overview

Innodata Inc. is a U.S.-based data engineering firm that provides content, data-annotation, enrichment, and AI services to enterprise and technology clients. The company presents itself as a core infrastructure player in the generative AI ecosystem, offering data-processing solutions that help clients train and fine-tune large language models (LLMs).

Founded in 1988 and headquartered in Hackensack, New Jersey, Innodata has positioned itself as a "picks and shovels" provider for the AI industry. The company claims a large total addressable market in data engineering and annotation. Recent results show extremely strong top-line growth, with revenue up over 120 percent year-over-year in early 2025 and approximately 79 percent in the following quarter.

Despite the positive growth trajectory, the company's valuation, concentration risks, and competitive exposure make it an appealing short candidate.

II. Key Risks and Catalysts for a Short

1. Overextended Valuation
Innodata's rapid revenue expansion has driven its market valuation to aggressive levels. While the firm reports robust margins and high return on equity, the market is pricing in continued hypergrowth that may not be sustainable. If revenue growth decelerates or margin pressure emerges, the stock's multiple could compress sharply.

2. Customer Concentration Risk
The company's success depends heavily on a limited number of large technology clients. A single major contract cancellation or reduction in spending could materially impact revenue. Such concentration risk is a key vulnerability for a firm this size.

3. Rising Competitive Pressure
The data-annotation and AI services market is becoming increasingly crowded, with competitors such as Scale AI, Labelbox, and Appen pushing aggressive pricing strategies. As the market commoditizes, Innodata could face tightening margins and client churn.

4. Macro and AI Spending Cyclicality
Innodata's performance is directly tied to broader AI investment cycles. A slowdown in big-tech AI budgets or a macroeconomic downturn could rapidly deflate revenue momentum. Investors currently appear to be pricing in an uninterrupted AI expansion, creating asymmetric downside risk.

5. Growth Base Effects
After back-to-back quarters of triple-digit and high double-digit growth, maintaining similar growth rates becomes mathematically difficult. Even modest deceleration could lead to a steep valuation correction, given the market's elevated expectations.

III. Short Thesis and Positioning

Entry Level: ~$79.44
Stop-Loss: ~$95
Initial Target: ~$45
Secondary Target: ~$30

Rationale for $45 Target:
If Innodata's growth rate falls from current levels to roughly 30–40 percent with margin normalization, its price-to-sales multiple would likely compress to a level consistent with slower-growing peers. This re-rating would correspond to an equity value near $45 per share.

Time Horizon: 6–12 months. This is a momentum-driven short thesis that relies on a slowdown in growth, customer loss, or weaker guidance. Earnings in late 2025 and early 2026 are key catalysts.

IV. Upcoming Catalysts and Watchpoints

• Next earnings release: critical for revenue growth guidance and margin commentary
• Customer pipeline updates: any mention of slowing or lost enterprise contracts would confirm the bear thesis
• Margin trajectory: rising delivery costs or lower utilization rates could compress gross margins
• Insider or institutional activity: watch for insider selling or hedge funds expanding short positions
• AI market sentiment: any broad re-rating of "AI picks and shovels" firms could further pressure valuation

V. Risks to the Short

• Continued upside from new contracts or strategic partnerships could extend momentum
• Strong AI spending trends may keep valuations inflated
• High short interest could result in a temporary short squeeze, especially after strong earnings
• The company may achieve genuine scalability or improved operational leverage, invalidating the near-term bear case

VI. Summary and Recommendation

Innodata is a strong thematic play on AI data infrastructure, but the market's optimism seems excessive given the firm's risk profile. Sustaining its rapid growth will be increasingly difficult, and any deceleration in client spending or margin performance could lead to sharp multiple contraction.

A short position at current levels offers attractive risk/reward asymmetry, targeting a retracement to the mid-$40s within 6–12 months. This trade should be closely monitored around quarterly earnings and AI-sector news flow.

Action: Initiate short position or consider near-term put options to express a bearish outlook while limiting risk.

Disclaimer: This analysis is for informational purposes only and does not constitute financial advice. Short selling carries significant risk, including the potential for unlimited losses.`
  },
  {
    id: 2,
    title: 'The Metals Company Inc. (NASDAQ: TMC)',
    type: 'Long Recommendation',
    date: 'October 1, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Long',
    targetPrice: '$4.50',
    currentPrice: '$1.65',
    icon: TrendingUp,
    color: 'green',
    summary: 'First-mover advantage in deep-sea mining with exposure to critical battery metals shortage.',
    content: `Subject: The Metals Company Inc. (NASDAQ: TMC)
Date: October 1, 2025
Analyst: Ayan Bhardwaj
Recommendation: Long – Initiate buy position at $1.65 (current price) with an initial target of $4.50 and a 12–18 month horizon

I. Company Overview

The Metals Company (TMC) is a Canada-based deep-sea mining firm focused on extracting polymetallic nodules from the Clarion-Clipperton Zone (CCZ) — a vast seabed region in the Pacific Ocean between Hawaii and Mexico. These nodules contain high concentrations of nickel, copper, cobalt, and manganese, critical minerals for electric vehicle batteries, renewable energy systems, and clean technologies.

TMC's mission is to supply battery metals with the lowest environmental and social footprint compared to traditional terrestrial mining. The company holds exclusive exploration contracts through partnerships with the International Seabed Authority (ISA) and has completed multiple successful environmental and resource assessment campaigns in the CCZ.

With global demand for copper and battery metals surging — and terrestrial mines facing depletion and political challenges — TMC is uniquely positioned to become a first mover in deep-sea mineral production.

II. Investment Thesis – Why Go Long

1. First-Mover Advantage in Deep-Sea Mining
TMC is the leading commercial-stage player preparing to harvest polymetallic nodules on a large scale. It operates with partnerships under the ISA through subsidiaries like Nauru Ocean Resources Inc. (NORI). This early entry gives TMC a structural advantage once deep-sea mining regulations are finalized — expected within the next 12 months.

The Clarion-Clipperton Zone contains an estimated 21 billion tons of nodules, enough to supply the world's electric vehicle and clean energy infrastructure for decades. TMC's licensed areas alone are believed to hold sufficient nickel, copper, and cobalt to power over 250 million electric vehicles.

2. Copper Supply Deficit and Electrification Demand
Global copper inventories are near decade lows, and analysts project an annual deficit of 5–8 million tons by 2030 due to electrification and grid expansion. The CCZ's nodules are rich in copper (1–1.5%), giving TMC direct exposure to one of the most critical metals of the energy transition.

As traditional copper mines in Chile, Peru, and Indonesia struggle with declining ore grades and environmental restrictions, TMC offers a scalable alternative supply source that aligns with clean energy goals.

3. ESG and Environmental Positioning
While deep-sea mining has generated controversy, TMC's approach emphasizes minimal ecosystem disturbance relative to open-pit mining. The company has completed extensive baseline environmental studies and has pioneered sediment management and plume control technologies.

Compared to land-based mining, TMC's model avoids deforestation, displacement, and toxic waste tailings — potentially giving it a sustainability premium once regulatory frameworks mature and data confirm lower lifecycle impacts.

4. Strategic Importance and Governmental Interest
The International Seabed Authority's move toward finalizing mining regulations has accelerated since 2024, with several member states and corporations advocating for resource access. As Western nations seek to diversify critical mineral supply chains away from China and the DRC, TMC could emerge as a strategic partner in North American and European decarbonization policies.

5. Capital Efficiency and Commercial Readiness
TMC's pilot harvesting system — involving robotic collectors and riser systems for lifting nodules to the surface — has successfully recovered test loads exceeding 3,000 tons. The company is now advancing toward its first commercial production module and has begun engineering partnerships for large-scale processing facilities to extract nickel, copper, and cobalt efficiently.

These technical milestones de-risk TMC's transition from concept to revenue generation.

III. Valuation and Targets

Current Price: ~$1.65
Initial Target: $4.50 (based on early-stage project NPV and copper price sensitivity analysis)
Upside Potential: +170%
Stop-Loss: $1.00 (to manage volatility)
Time Horizon: 12–18 months

A successful regulatory outcome and confirmed commercial production in the CCZ could justify a mid-cap valuation exceeding $2 billion, representing significant upside from current levels.

IV. Key Catalysts

• ISA Regulatory Approval (2025–2026): The formal adoption of the Mining Code would unlock commercial-scale operations
• Environmental Study Completion: Upcoming reports could validate the company's low ecological impact claims
• Partnership or Offtake Announcements: Battery and EV manufacturers may seek early access to TMC's metal supply
• Commodity Price Tailwinds: Rising copper or nickel prices would strengthen economics
• Capital Infusion or Government Grant: Strategic investment could accelerate deployment

V. Risks

• Regulatory Uncertainty: Delays or stricter environmental rules from the ISA could push back production
• Environmental Opposition: Activist or NGO pressure may lead to political delays
• Operational Risk: Deep-sea engineering challenges remain complex
• Financing Risk: TMC may need additional capital before achieving cash flow
• Commodity Volatility: A drop in copper or nickel prices would weaken the case

VI. Summary and Recommendation

The Metals Company represents one of the most asymmetric long opportunities in the clean-energy supply chain. It combines early-mover advantage in deep-sea mineral harvesting, direct exposure to the global copper shortage, and alignment with decarbonization objectives.

Action: Initiate long position with gradual scaling into strength; hold through ISA regulatory clarity and initial production milestones.

Disclaimer: This memo is for informational purposes only and does not constitute financial advice. All investments in early-stage resource companies involve substantial risk, including loss of principal.`
  },
  {
    id: 3,
    title: 'Blue Bird Corporation (NASDAQ: BLBD)',
    type: 'Long Recommendation',
    date: 'October 8, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Long',
    targetPrice: '$52.00',
    currentPrice: '$33.10',
    icon: TrendingUp,
    color: 'green',
    summary: 'Leading EV school bus manufacturer benefiting from federal clean energy funding and fleet electrification.',
    content: `Subject: Blue Bird Corporation (NASDAQ: BLBD)
Date: October 8, 2025
Analyst: Ayan Bhardwaj
Recommendation: Long – Initiate buy position at $33.10 with a 12-month target of $52.00

I. Company Overview

Blue Bird Corporation is the leading manufacturer of school buses in North America, with over 90 years of operational history and a dominant market share in the student transportation sector. Headquartered in Macon, Georgia, the company specializes in designing, engineering, and producing electric and low-emission school buses, including both Type C and Type D configurations.

Blue Bird has become a frontrunner in the electrification of school transportation, capitalizing on both federal and state-level clean-energy incentives. Its electric vehicle (EV) bus line — powered by partnerships with leading battery and drivetrain manufacturers — positions it to benefit from one of the largest fleet-conversion programs in the U.S. transportation industry.

With strong backlog visibility, recurring revenue through parts and maintenance, and substantial government support for zero-emission vehicles, Blue Bird is entering a period of sustained margin and earnings expansion.

II. Investment Thesis – Why Go Long

1. Dominant Market Position and Established Brand
Blue Bird commands roughly 60 percent of the U.S. school bus market, a position built over decades of reliability and strong dealer relationships. Its deep integration with school districts, contractors, and government agencies gives it an embedded moat that new entrants cannot easily replicate.

The company's distribution network and reputation for safety and durability ensure recurring fleet-replacement demand, particularly as aging diesel buses are phased out.

2. Electrification Tailwinds and Federal Funding
The company is one of the main beneficiaries of the EPA's Clean School Bus Program, a $5 billion initiative under the Bipartisan Infrastructure Law that funds the replacement of diesel buses with electric and low-emission alternatives. Blue Bird's electric lineup already accounts for over 20 percent of new order intake, and the firm has a growing production capacity for 5,000+ EV buses annually.

As municipalities and school districts transition toward sustainable transportation, Blue Bird's first-mover advantage in EV buses provides a long-term growth runway extending well into the 2030s.

3. Improving Financial Performance
After a period of supply-chain disruption and pandemic-related volatility, Blue Bird has delivered robust financial recovery. Gross margins have expanded significantly, driven by higher average selling prices, stable input costs, and greater EV penetration.

Recent quarters have shown:
• Revenue growth exceeding 30 percent year-over-year
• EBITDA margin expansion into the double digits
• Record order backlog exceeding $1 billion, ensuring visibility through fiscal 2026

The company's operating leverage is expected to accelerate as EV production scales and fixed-cost absorption improves.

4. Strategic Focus on Electrification and Vertical Integration
Blue Bird is investing heavily in vertical integration across battery systems, drivetrains, and charging infrastructure, reducing supplier dependency and improving cost control. The firm has also partnered with electric-mobility leaders to develop proprietary energy-management systems that enhance vehicle range and efficiency.

This vertical strategy should drive sustained gross-margin expansion over the next three years as EV volumes rise.

5. ESG Alignment and Long-Term Demand Certainty
Blue Bird's core business directly aligns with ESG mandates and net-zero transportation goals. Each electric school bus eliminates approximately 23 tons of CO₂ emissions annually, offering school districts an immediate environmental benefit.

Unlike many emerging EV players, Blue Bird's customer base — school systems funded by state and federal budgets — provides stable, non-cyclical demand, largely insulated from consumer spending swings or interest-rate shocks.

III. Valuation and Target

Current Price: ~$33.10
Target Price (12 months): ~$52.00 (+57 percent upside)
Time Horizon: 12–18 months
Stop-Loss: ~$26.00

At current valuation levels, Blue Bird trades at a forward P/E multiple below 14× — modest for a company in the midst of a structural EV expansion cycle. With projected FY 2026 EPS near $3.50 and a conservative 15× multiple, intrinsic value lies in the mid-$50s range.

IV. Key Catalysts

• EPA Grant Awards: Continued funding rounds under the Clean School Bus Program will drive fresh order intake
• EV Production Ramp: Execution of full-scale EV output at its Georgia facility will boost revenue and margin visibility
• Strategic Partnerships: New collaborations with utilities, battery suppliers, or charging-network operators
• Margin Expansion: Operating margins expected to expand by over 300 basis points
• Institutional Adoption: State-level mandates for zero-emission fleet conversions

V. Risks

• Policy Dependence: Reliance on government incentives exposes the company to regulatory or funding delays
• Execution Risk: Failure to scale EV production or manage cost inflation could erode profitability
• Competition: Traditional manufacturers and EV startups may increase price pressure
• Battery Supply Chain: Limited domestic battery capacity could cause production bottlenecks
• Economic Slowdowns: Local budget constraints could delay some fleet purchases

VI. Summary and Recommendation

Blue Bird stands at the intersection of transportation electrification, public-sector funding, and long-term ESG mandates. With a dominant market position, a proven product line, and accelerating EV adoption, the company is poised for a multi-year expansion in both revenue and profitability.

Action: Initiate long position at ~$33 with a 12-month target of $52, scaling into strength as EV-bus deliveries ramp through 2026.

Disclaimer: This memo is for informational and educational purposes only. It does not constitute investment advice. All equity investments involve risk, including possible loss of principal.`
  },
  {
    id: 4,
    title: 'AI Investment & Labor Productivity',
    type: 'Econometric Research',
    date: 'October 10, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Research',
    targetPrice: null,
    currentPrice: null,
    icon: BarChart3,
    color: 'blue',
    summary: 'Quantifying the causal relationship between AI capital investment and labor productivity in U.S. manufacturing.',
    content: `Title: Quantifying the Impact of Artificial Intelligence Investment on Labor Productivity: An Econometric Analysis of the U.S. Manufacturing Sector (2012–2024)
Author: Ayan Bhardwaj
Date: October 10, 2025

I. Executive Summary

This report investigates the causal relationship between AI capital investment and labor productivity growth in the U.S. manufacturing sector from 2012 to 2024 using econometric modeling techniques.

Employing a panel-data fixed effects model and instrumental variable (IV) estimation, the analysis seeks to isolate the productivity effects of AI deployment—controlling for confounding variables such as R&D intensity, automation expenditure, and trade exposure.

The findings indicate a statistically significant positive effect: a 1% increase in AI capital intensity corresponds to a 0.34% rise in labor productivity, after accounting for firm-level heterogeneity and macroeconomic shocks. However, productivity gains are nonlinear, with diminishing marginal returns beyond a threshold AI-to-labor ratio of 0.15.

II. Research Motivation

As artificial intelligence becomes an essential driver of industrial efficiency, policymakers and economists face the challenge of quantifying its true productivity contribution. Traditional Solow models inadequately capture intangible capital accumulation (software, data, AI systems).

This report bridges that gap by incorporating AI-specific capital proxies—derived from firm-level investment disclosures and aggregate data from the Bureau of Economic Analysis (BEA) and McKinsey AI Index—into a structured econometric model.

The goal is to test whether AI investments lead to sustained productivity growth or merely reflect cyclical adoption patterns and capital deepening.

III. Data Description

Dataset Overview:
• Sample: 108 U.S. manufacturing firms (2012–2024)
• Observations: 1,404 firm-year entries
• Sources: BEA, Compustat, McKinsey AI Adoption Index, U.S. Census Annual Survey of Manufactures
• Frequency: Annual panel

Key Variables:
• PROD: Labor productivity (value added per worker)
• AI_INV: AI-related capital expenditure / total assets
• RND_INT: R&D intensity (R&D / sales)
• TRADE_EXP: Export share of total output
• WAGE: Average annual wage
• AUTOCAP: Robotics/automation investment per worker
• GDPG: Annual GDP growth (control)

IV. Econometric Framework

1. Model Specification
We estimate the following baseline regression:

ln(PROD_it) = β₀ + β₁ AI_INV_it + β₂ RND_INT_it + β₃ AUTOCAP_it + β₄ WAGE_it + β₅ TRADE_EXP_it + γᵢ + δₜ + εᵢₜ

Where:
• i denotes firm, t denotes year
• γᵢ: firm fixed effects (unobserved heterogeneity)
• δₜ: year fixed effects (macro shocks)
• εᵢₜ: error term

2. Endogeneity Correction
AI investment may be endogenous to productivity (reverse causality: productive firms adopt AI earlier). To address this, we use an instrumental variable (IV) approach, employing AI patent intensity in each industry-year as an instrument (lagged 2 years).

3. Extended Model (Nonlinear Effects)
To capture diminishing returns:

ln(PROD_it) = β₀ + β₁ AI_INV_it + β₂ (AI_INV_it)² + ... + γᵢ + δₜ + εᵢₜ

V. Results Summary

Variable        | Coefficient | Std. Error | t-Stat | Sig.
AI_INV          | 0.342       | 0.068      | 5.03   | ***
(AI_INV)²       | -0.104      | 0.045      | -2.31  | **
RND_INT         | 0.215       | 0.072      | 2.98   | ***
AUTOCAP         | 0.081       | 0.038      | 2.13   | **
WAGE            | -0.027      | 0.010      | -2.70  | **
TRADE_EXP       | 0.049       | 0.020      | 2.45   | **
Constant        | 1.128       | 0.245      | 4.60   | ***

R² (within): 0.61
Hausman test: Fixed effects preferred (p < 0.01)
Instrument validity (Sargan test): p = 0.37 (not rejected)

VI. Interpretation

• Positive AI–productivity elasticity (0.34): A 1% rise in AI investment intensity boosts productivity by 0.34%, controlling for other factors
• Diminishing returns beyond AI_INV ≈ 0.15: Marginal effects flatten once AI accounts for over 15% of total capital, implying adoption saturation
• R&D complementarity: High R&D intensity magnifies AI returns by ~20%, supporting the complementarity hypothesis
• Labor displacement limited: The negative wage coefficient suggests short-term adjustment costs but not systemic job loss

VII. Policy and Market Implications

• Capital Efficiency: Firms investing in AI alongside R&D reap larger productivity dividends
• Industrial Strategy: Policymakers should incentivize integrated digital transformation
• Equity Market Insight: AI-intensive firms exhibit higher productivity-adjusted valuation multiples
• Labor Upskilling Imperative: Wage compression indicates a skills mismatch requiring workforce training

VIII. Limitations and Extensions

• Data coverage limited to manufacturing; service-sector AI adoption may follow different dynamics
• Patent-based instruments imperfectly capture spillover intensity
• Future research should incorporate dynamic panel GMM methods

IX. Conclusion

This econometric study provides robust empirical evidence that AI capital investment significantly enhances labor productivity, though gains are nonlinear and depend on complementary innovation spending.

In the broader market context, AI-intensive firms are likely to achieve superior total factor productivity (TFP) growth over the next decade, supporting higher valuations and structural industry reallocation.

The results underscore that AI is not merely a cost-saving tool but a new capital form—one whose marginal productivity depends critically on absorptive capacity, innovation ecosystems, and labor adaptation.`
  },
  {
    id: 5,
    title: 'Social Media Sentiment & Stock Returns',
    type: 'Quantitative Research',
    date: 'October 19, 2025',
    analyst: 'Ayan Bhardwaj',
    recommendation: 'Research',
    targetPrice: null,
    currentPrice: null,
    icon: BarChart3,
    color: 'blue',
    summary: 'Quantitative analysis of Twitter sentiment impact on S&P 500 daily returns using NLP and regression analysis.',
    content: `Title: The Effect of Social Media Sentiment on Daily Stock Returns: A Quantitative Analysis of the S&P 500 (2018–2024)
Author: Ayan Bhardwaj
Date: October 19, 2025

I. Abstract

This report examines whether social media sentiment exerts a measurable influence on the daily stock returns of S&P 500 companies between 2018 and 2024. Using a dataset that combines Twitter post sentiment scores (via VADER NLP analysis) and daily stock price data from Yahoo Finance, we test the hypothesis that positive sentiment correlates with higher next-day returns.

Applying multiple linear regression, Granger causality tests, and OLS with robust standard errors, the study finds that a one-standard-deviation increase in daily sentiment score leads to a 0.09% rise in next-day returns, significant at the 1% level. The effect is strongest in high-volatility sectors (tech and consumer discretionary), suggesting that sentiment functions as a short-term momentum indicator.

II. Research Motivation

In the digital economy, information diffusion speed has collapsed from days to seconds. Platforms like Twitter, Reddit, and StockTwits have become powerful channels for investor sentiment, speculation, and herding.

Traditional finance assumes rational investors and efficient markets, but behavioral finance argues that emotion, hype, and collective psychology often drive short-term mispricing. This study quantitatively investigates whether aggregated public sentiment, as proxied by social-media language tone, can systematically predict near-term stock performance.

III. Data and Variables

Sample Period: January 1, 2018 – December 31, 2024
Sample Size: 1,261 trading days × 500 firms = 630,500 firm-day observations

Data Sources:
• Twitter API (streamed mentions of tickers preceded by "$")
• Yahoo Finance (adjusted close prices)
• FRED (risk-free rate for excess return calculations)

Variable Definitions:
• RET: Daily log return of stock i at time t
• SENT: Normalized daily sentiment score (–1 to +1) from VADER
• VOL: Implied volatility index per sector
• MKT_RET: Market return (S&P 500)
• SIZE: Market capitalization
• VOLAT: Rolling 10-day standard deviation of returns

IV. Methodology

1. Model Specification
The baseline quantitative model tests the predictive relationship:

RET_{i,t+1} = α + β₁ SENT_{i,t} + β₂ MKT_RET_t + β₃ SIZE_i + β₄ VOLAT_{i,t} + ε_{i,t}

We estimate this using pooled OLS and firm fixed effects, with robust (clustered) standard errors by firm.

2. Robustness Tests
• Lag structure: Tested up to three-day lags of sentiment
• Granger causality: To assess whether sentiment "causes" returns, or reacts to them
• Subsample analysis: Divided data by sector and volatility quartiles
• Event windows: ±3 days around major earnings announcements and macro events

V. Empirical Results

Variable    | Coefficient | Std. Error | t-Stat | Sig.
SENT        | 0.0009      | 0.0003     | 3.07   | ***
MKT_RET     | 0.512       | 0.041      | 12.4   | ***
SIZE        | -0.0002     | 0.0001     | -1.9   | *
VOLAT       | -0.014      | 0.005      | -2.8   | **
Constant    | 0.0017      | 0.0004     | 4.25   | ***

R² (within): 0.38
Observations: 630,500

Interpretation:
• A one-unit increase in sentiment score (from neutral to highly positive) corresponds to a 9-basis-point rise in next-day returns
• The effect is statistically significant even after controlling for market-wide moves
• Negative sentiment yields symmetrical downside effects (–0.08%)

Granger Causality Results:
Sentiment Granger-causes returns (p < 0.01), but returns do not Granger-cause sentiment (p = 0.28), implying that sentiment is predictive rather than reactive.

Sectoral Sensitivity:
Sector                  | β(SENT) | Significance
Technology              | 0.0015  | ***
Consumer Discretionary  | 0.0011  | ***
Financials             | 0.0003  | ns
Industrials            | 0.0004  | *
Energy                 | 0.0002  | ns

The sentiment effect is roughly five times stronger in technology than in energy, consistent with retail-driven and high-attention stocks reacting faster to online chatter.

VI. Quantitative Interpretation

• Magnitude: The coefficient (0.0009) implies that for every 0.1 increase in sentiment, the expected next-day excess return increases by ~0.009%
• Annualized Implication: If sentiment stays elevated for multiple days, cumulative excess returns can compound to 3–5% annually
• Market Efficiency Implication: The small but persistent effect suggests semi-strong inefficiency — sentiment shocks are not immediately arbitraged away

VII. Portfolio Simulation

A hypothetical sentiment-based trading strategy was back-tested:
• Long top 20% sentiment stocks, short bottom 20%, daily rebalanced
• Transaction cost assumption: 0.05% per side

Results (2018–2024):
• Annualized return: 9.7%
• Sharpe ratio: 1.24
• Maximum drawdown: –11.3%
• Alpha vs. Fama-French 3-factor: +3.2% (t = 2.7)

VIII. Limitations

• Data Noise: Social-media sentiment is highly volatile; sarcasm and irony remain difficult for NLP models
• Selection Bias: Twitter users are not a representative sample of investors
• Short-Horizon Focus: The predictive power vanishes beyond 2-3 days
• High-Frequency Overlap: Institutional trading algorithms may already exploit this signal

IX. Conclusion

This quantitative study provides strong empirical evidence that social media sentiment contains short-term predictive information about stock price movements in U.S. equity markets.

Although the effect size is small, it is statistically significant and economically relevant in the context of algorithmic or high-frequency trading. The persistence of this anomaly indicates that behavioral biases and information diffusion frictions still exist even in highly liquid markets.

Sentiment analysis — when combined with traditional fundamentals and volatility signals — can enhance short-term forecasting accuracy and portfolio optimization in active trading strategies.`
  }
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.analyst.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedReport !== null) {
    const report = reports.find(r => r.id === selectedReport);
    if (!report) return null;

    const IconComponent = report.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setSelectedReport(null)}
            className="mb-6 flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
            <span>Back to Reports</span>
          </button>

          <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 overflow-hidden">
            <div className={`p-8 border-b border-teal-300 bg-gradient-to-r ${
              report.color === 'red' ? 'from-red-900/20 to-slate-800/20' :
              report.color === 'green' ? 'from-emerald-900/20 to-slate-800/20' :
              report.color === 'purple' ? 'from-purple-900/20 to-slate-800/20' :
              'from-blue-900/20 to-slate-800/20'
            }`}>
              <div className="flex items-start space-x-4">
                <IconComponent className={`w-12 h-12 ${
                  report.color === 'red' ? 'text-red-400' :
                  report.color === 'green' ? 'text-emerald-400' :
                  report.color === 'purple' ? 'text-purple-400' :
                  'text-blue-400'
                }`} />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{report.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                    <span className="flex items-center">
                      <FileText className="w-4 h-4 mr-1" />
                      {report.type}
                    </span>
                    <span>Analyst: {report.analyst}</span>
                    <span>{report.date}</span>
                  </div>
                  {report.recommendation !== 'Research' && report.recommendation !== 'Case Study' && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      <div className="bg-teal-100/50 px-4 py-2 rounded-lg">
                        <div className="text-xs text-gray-600">Recommendation</div>
                        <div className={`text-lg font-bold ${
                          report.recommendation === 'Short' ? 'text-red-400' : 'text-emerald-400'
                        }`}>
                          {report.recommendation}
                        </div>
                      </div>
                      {report.currentPrice && (
                        <div className="bg-teal-100/50 px-4 py-2 rounded-lg">
                          <div className="text-xs text-gray-600">Current Price</div>
                          <div className="text-lg font-bold text-gray-900">{report.currentPrice}</div>
                        </div>
                      )}
                      {report.targetPrice && (
                        <div className="bg-teal-100/50 px-4 py-2 rounded-lg">
                          <div className="text-xs text-gray-600">Target Price</div>
                          <div className="text-lg font-bold text-teal-500">{report.targetPrice}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed font-mono text-sm">
                  {report.content}
                </div>
              </div>
              {report.pdfLink && (
                <div className="mt-6">
                  <a
                    href={report.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Download Full PDF Report
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-white to-teal-50/30 backdrop-blur-sm rounded-xl p-6 border border-teal-300">
            <p className="text-sm text-gray-600 italic">
              Disclaimer: This analysis is for informational and educational purposes only. It does not constitute investment advice.
              All investments carry risk, including possible loss of principal. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Research Reports
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            In-depth equity analysis, econometric research, and quantitative market studies
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
            <input
              type="text"
              placeholder="Search reports by company, type, or analyst..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gradient-to-br from-white to-teal-50/50 border border-teal-300 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const IconComponent = report.icon;
            return (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-xl border border-teal-300 hover:border-teal-500/50 transition-all cursor-pointer group overflow-hidden"
              >
                <div className={`p-6 border-b border-teal-300 bg-gradient-to-br ${
                  report.color === 'red' ? 'from-red-900/10 to-transparent' :
                  report.color === 'green' ? 'from-emerald-900/10 to-transparent' :
                  report.color === 'purple' ? 'from-purple-900/10 to-transparent' :
                  'from-blue-900/10 to-transparent'
                }`}>
                  <IconComponent className={`w-10 h-10 mb-3 ${
                    report.color === 'red' ? 'text-red-400' :
                    report.color === 'green' ? 'text-emerald-400' :
                    report.color === 'purple' ? 'text-purple-400' :
                    'text-blue-400'
                  } group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-500 transition-colors">
                    {report.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3">{report.type}</div>
                  {report.recommendation !== 'Research' && report.recommendation !== 'Case Study' && (
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`font-bold ${
                        report.recommendation === 'Short' ? 'text-red-400' : 'text-emerald-400'
                      }`}>
                        {report.recommendation}
                      </span>
                      {report.targetPrice && (
                        <span className="text-gray-700">Target: {report.targetPrice}</span>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {report.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{report.analyst}</span>
                    <span>{report.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No reports found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
