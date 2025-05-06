const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
dotenv.config();
const genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
app.use(cors());
app.use(express.json());

let articles = [
  {
    "id": 100,
    "title": "India's Digital Personal Data Protection Bill 2025: A Comprehensive Overview",
    "content": "India's Digital Personal Data Protection Bill 2025: A Comprehensive Overview\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Digital Policy Bureau",
    "published_date": "2025-05-04",
    "category": "Governance",
    "source_url": "https://example.com/news/article-100",
    "image_url": "https://images.pexels.com/photos/3881113/pexels-photo-3881113.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  {
    "id": 101,
    "title": "Supreme Court Sets New Precedent in Data Retention and Surveillance Laws in India",
    "content": "Supreme Court Sets New Precedent in Data Retention and Surveillance Laws in India\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "AI Insights",
    "published_date": "2025-05-03",
    "category": "Regulation",
    "source_url": "https://example.com/news/article-101",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 102,
    "title": "Delhi HC Clarifies Patent Rules for Software Innovations",
    "content": "Delhi HC Clarifies Patent Rules for Software Innovations\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Digital Policy Bureau",
    "published_date": "2025-05-02",
    "category": "Governance",
    "source_url": "https://example.com/news/article-102",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 103,
    "title": "Government Launches National AI Governance Framework",
    "content": "Government Launches National AI Governance Framework\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "AI Insights",
    "published_date": "2025-05-01",
    "category": "Legal Reform",
    "source_url": "https://example.com/news/article-103",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 104,
    "title": "Major Tech Firms React to New Cross-Border Data Rules",
    "content": "Major Tech Firms React to New Cross-Border Data Rules\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "AI Insights",
    "published_date": "2025-04-30",
    "category": "Tech Law",
    "source_url": "https://example.com/news/article-104",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 105,
    "title": "Cybersecurity Guidelines Tightened for Critical Infrastructure",
    "content": "Cybersecurity Guidelines Tightened for Critical Infrastructure\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "AI Insights",
    "published_date": "2025-04-29",
    "category": "Cybersecurity",
    "source_url": "https://example.com/news/article-105",
    "image_url": "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=600" 
  
  },
  {
    "id": 106,
    "title": "NITI Aayog Releases Whitepaper on Ethical AI Use",
    "content": "NITI Aayog Releases Whitepaper on Ethical AI Use\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Digital Policy Bureau",
    "published_date": "2025-04-28",
    "category": "Legal Reform",
    "source_url": "https://example.com/news/article-106",
    "image_url": "https://media.istockphoto.com/id/1129782400/photo/maski-karnataka-india-january-2019-niti-aayog-indian-statutory-body-printed-in-book.jpg?b=1&s=612x612&w=0&k=20&c=UQbKBBk515h08oC8h_pWRgj2aRtz-9BNGNW-BcLfrOU=" 
  
  },
  {
    "id": 107,
    "title": "Startups Push Back Against Draft Encryption Mandates",
    "content": "Startups Push Back Against Draft Encryption Mandates\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Tech Law Journal",
    "published_date": "2025-04-27",
    "category": "AI Policy",
    "source_url": "https://example.com/news/article-107",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 108,
    "title": "Regulators Issue Notice to Social Platforms Over Deepfakes",
    "content": "Regulators Issue Notice to Social Platforms Over Deepfakes\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "GovTech Weekly",
    "published_date": "2025-04-26",
    "category": "Cybersecurity",
    "source_url": "https://example.com/news/article-108",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 109,
    "title": "Public Consultation Open for India's First Cloud Law Draft",
    "content": "Public Consultation Open for India's First Cloud Law Draft\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Digital Policy Bureau",
    "published_date": "2025-04-25",
    "category": "Data Privacy",
    "source_url": "https://example.com/news/article-109",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 110,
    "title": "Data Localization Norms Could Impact Global Trade, Say Experts",
    "content": "Data Localization Norms Could Impact Global Trade, Say Experts\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Data Regulation Review",
    "published_date": "2025-04-24",
    "category": "Data Privacy",
    "source_url": "https://example.com/news/article-110",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 111,
    "title": "RTI Activists Challenge Government Data Exemptions in Court",
    "content": "RTI Activists Challenge Government Data Exemptions in Court\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Data Regulation Review",
    "published_date": "2025-04-23",
    "category": "Cybersecurity",
    "source_url": "https://example.com/news/article-111",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 112,
    "title": "Landmark Case Examines User Consent in Fintech Apps",
    "content": "Landmark Case Examines User Consent in Fintech Apps\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Digital Policy Bureau",
    "published_date": "2025-04-22",
    "category": "Intellectual Property",
    "source_url": "https://example.com/news/article-112",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 113,
    "title": "IT Ministry to Monitor Compliance with Digital India Act",
    "content": "IT Ministry to Monitor Compliance with Digital India Act\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "IP Watch India",
    "published_date": "2025-04-21",
    "category": "Tech Law",
    "source_url": "https://example.com/news/article-113",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 114,
    "title": "High Court Rules Against Biometric Surveillance in Public Spaces",
    "content": "High Court Rules Against Biometric Surveillance in Public Spaces\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "AI Insights",
    "published_date": "2025-04-20",
    "category": "Data Privacy",
    "source_url": "https://example.com/news/article-114",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 115,
    "title": "Academic Consortium Proposes AI Liability Principles",
    "content": "Academic Consortium Proposes AI Liability Principles\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Data Regulation Review",
    "published_date": "2025-04-19",
    "category": "Regulation",
    "source_url": "https://example.com/news/article-115",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 116,
    "title": "Digital Evidence Law Gets Overhaul in New Bill",
    "content": "Digital Evidence Law Gets Overhaul in New Bill\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Digital Policy Bureau",
    "published_date": "2025-04-18",
    "category": "Data Privacy",
    "source_url": "https://example.com/news/article-116",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 117,
    "title": "Government Appoints National Data Ethics Committee",
    "content": "Government Appoints National Data Ethics Committee\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "GovTech Weekly",
    "published_date": "2025-04-17",
    "category": "Intellectual Property",
    "source_url": "https://example.com/news/article-117",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 118,
    "title": "Legal Experts Call for Unified IP and Cyber Law Framework",
    "content": "Legal Experts Call for Unified IP and Cyber Law Framework\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "Data Regulation Review",
    "published_date": "2025-04-16",
    "category": "Regulation",
    "source_url": "https://example.com/news/article-118",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  },
  {
    "id": 119,
    "title": "Judiciary Begins Pilot of AI Tools for Legal Research",
    "content": "Judiciary Begins Pilot of AI Tools for Legal Research\n\nThis article discusses the latest developments in India's technology and legal landscape. It highlights how recent policies, judicial rulings, or regulatory updates are shaping the future of digital governance, privacy, or IP law. Experts from industry and academia have weighed in on the implications of the changes, noting both opportunities and challenges. The discussion also includes possible amendments, expected industry responses, and how these reforms compare to international practices.\n\nStakeholders are encouraged to participate in upcoming consultations and provide feedback to ensure inclusive and balanced law-making. The long-term effects of these developments will influence innovation, user rights, and the ease of doing digital business in India.",
    "author": "GovTech Weekly",
    "published_date": "2025-04-15",
    "category": "Data Privacy",
    "source_url": "https://example.com/news/article-119",
    "image_url": "https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
  
  }
]


app.get('/api/articles', (req, res) => {
  res.json(articles);
});


app.get('/api/summary/:id', async (req, res) => {
 
  try {
    const article = articles.find(a => a.id == req.params.id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Summarize the following article:\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
    console.log("Sending prompt to Gemini:", prompt);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();

    console.log('Summary received:', text);
    res.json({ summary: text });
  } catch (err) {
    console.error(" Gemini API call failed:");
    console.error(err); 
    res.status(500).json({ error: 'Failed to generate summary', details: err.message });
  }
});





app.post('/api/articles', (req, res) => {
  const { title, content } = req.body;
  const id = articles.length + 1;
  articles.push({ id, title, content });
  res.json({ success: true });
});


app.delete('/api/articles/:id', (req, res) => {
  articles = articles.filter(a => a.id != req.params.id);
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
