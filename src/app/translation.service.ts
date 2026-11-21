import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type Language = 'en' | 'hi' | 'mr';

const translations: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  hi: {
    'Home': 'होम',
    'Services': 'सेवाएं',
    'Our Approach': 'हमारा दृष्टिकोण',
    'About Us': 'हमारे बारे में',
    'Blogs': 'ब्लॉग',
    'Contact': 'संपर्क',
    'Client testimonials': 'ग्राहकों के प्रशंसापत्र',
    'Chat with us': 'हमसे चैट करें',
    'Guide for financial freedom': 'आर्थिक स्वतंत्रता की दिशा',
    'Talk to Sujit': 'सुजित से बात करें',
    'Explore services': 'सेवाएं देखें',
    'Plan today for a more': 'आज योजना बनाएं',
    'secure tomorrow.': 'एक सुरक्षित कल के लिए।',
    'Goal-based': 'लक्ष्य-आधारित',
    'Planning': 'योजना',
    'Smart Selection of': 'समझदारी से चयन',
    'Mutual Funds': 'म्यूचुअल फंड',
    'Work toward': 'की ओर बढ़ें',
    'Financial Freedom': 'आर्थिक स्वतंत्रता',
    'About us': 'हमारे बारे में',
    'A financial guide built around clarity and long-term confidence.': 'स्पष्टता और दीर्घकालीन विश्वास पर आधारित एक आर्थिक मार्गदर्शक।',
    'Sujit brings 22+ years of corporate experience and more than 4 years in personal finance. At Sarathi, he is committed to helping individuals understand money better, plan for their goals, and work towards financial freedom.': 'सुजित के पास कॉर्पोरेट क्षेत्र का 22+ वर्षों और व्यक्तिगत वित्त का 4+ वर्षों का अनुभव है। सारथी में वे लोगों को पैसे की बेहतर समझ, लक्ष्य-आधारित योजना और आर्थिक स्वतंत्रता की दिशा में मार्गदर्शन करने के लिए प्रतिबद्ध हैं।',
    'He is an AMFI-registered mutual fund distributor and AMFI-registered SIF distributor, serving clients without boundaries.': 'वे AMFI-पंजीकृत म्यूचुअल फंड वितरक और AMFI-पंजीकृत SIF वितरक हैं, और सीमा-विहीन सेवा देते हैं।',
    'Start a conversation': 'बातचीत शुरू करें',
    'Why': 'क्यों',
    'Financial guidance that is clear, personal, and ongoing.': 'साफ़, व्यक्तिगत और निरंतर आर्थिक मार्गदर्शन।',
    'The objective is simple: improve financial literacy, provide expert guidance, and empower individuals to make sound financial decisions.': 'उद्देश्य सरल है: आर्थिक साक्षरता बढ़ाना, विशेषज्ञ मार्गदर्शन देना और लोगों को सही वित्तीय निर्णय लेने में सक्षम बनाना।',
    'Financial literacy': 'आर्थिक साक्षरता',
    'Personalised plans': 'व्यक्तिगत योजनाएं',
    'Ongoing support': 'निरंतर सहायता',
    'What': 'क्या',
    'offers': 'प्रस्तावित है',
    'Practical guidance for every stage of your financial journey.': 'आपकी आर्थिक यात्रा के हर चरण के लिए व्यावहारिक मार्गदर्शन।',
    'Specialised Investment Funds': 'विशेषीकृत निवेश फंड',
    'Health Insurance': 'स्वास्थ्य बीमा',
    'Term Insurance': 'टर्म बीमा',
    'Bonds, NCDs & Principal Protected Market-Linked Debentures': 'बॉन्ड, NCD और मूलधन-सुरक्षित बाजार-जुड़े डिबेंचर',
    'PMS, AIFs & Gift City Funds': 'PMS, AIF और गिफ्ट सिटी फंड',
    'Corporate Deposits': 'कॉर्पोरेट जमा',
    'National Pension System': 'राष्ट्रीय पेंशन प्रणाली',
    'Let’s talk': 'आइए बात करें',
    'Start with a conversation about your financial goals.': 'अपने आर्थिक लक्ष्यों के बारे में बातचीत से शुरुआत करें।',
    'WhatsApp': 'व्हाट्सऐप',
    'Explore': 'देखें',
    'Mumbai and beyond': 'मुंबई और उससे आगे',
    'Blog': 'ब्लॉग',
    'Read article': 'लेख पढ़ें',
  },
  mr: {
    'Home': 'मुख्यपृष्ठ',
    'Services': 'सेवा',
    'Our Approach': 'आमचा दृष्टिकोन',
    'About Us': 'आमच्याबद्दल',
    'Blogs': 'ब्लॉग',
    'Contact': 'संपर्क',
    'Client testimonials': 'ग्राहकांचे अभिप्राय',
    'Chat with us': 'आमच्याशी चॅट करा',
    'Guide for financial freedom': 'आर्थिक स्वातंत्र्याचा मार्गदर्शक',
    'Talk to Sujit': 'सुजितशी बोला',
    'Explore services': 'सेवा पहा',
    'Plan today for a more': 'आजच योजना करा',
    'secure tomorrow.': 'एक सुरक्षित उद्याच्या दिशेने.',
    'Goal-based': 'ध्येयाधारित',
    'Planning': 'योजना',
    'Smart Selection of': 'हुशार निवड',
    'Mutual Funds': 'म्युच्युअल फंड',
    'Work toward': 'च्या दिशेने प्रगती करा',
    'Financial Freedom': 'आर्थिक स्वातंत्र्य',
    'About us': 'आमच्याबद्दल',
    'A financial guide built around clarity and long-term confidence.': 'स्पष्टता आणि दीर्घकालीन विश्वासावर आधारित आर्थिक मार्गदर्शक.',
    'Sujit brings 22+ years of corporate experience and more than 4 years in personal finance. At Sarathi, he is committed to helping individuals understand money better, plan for their goals, and work towards financial freedom.': 'सुजित यांना कॉर्पोरेट क्षेत्राचा 22+ वर्षांचा आणि वैयक्तिक वित्तातील 4+ वर्षांचा अनुभव आहे. सारथीमध्ये ते लोकांना पैसे समजून घेणे, लक्ष्यांची योजना आणि आर्थिक स्वातंत्र्याच्या दिशेने मार्गदर्शन करण्यासाठी वचनबद्ध आहेत.',
    'He is an AMFI-registered mutual fund distributor and AMFI-registered SIF distributor, serving clients without boundaries.': 'ते AMFI-नोंदणीकृत म्युच्युअल फंड वितरक आणि AMFI-नोंदणीकृत SIF वितरक आहेत आणि सीमा न पाळता सेवा देतात.',
    'Start a conversation': 'संवाद सुरू करा',
    'Why': 'का',
    'Financial guidance that is clear, personal, and ongoing.': 'स्पष्ट, वैयक्तिक आणि सतत आर्थिक मार्गदर्शन.',
    'The objective is simple: improve financial literacy, provide expert guidance, and empower individuals to make sound financial decisions.': 'उद्देश सोपा आहे: आर्थिक साक्षरता वाढवणे, तज्ज्ञ मार्गदर्शन देणे आणि लोकांना योग्य आर्थिक निर्णय घेण्यास सक्षम करणे.',
    'Financial literacy': 'आर्थिक साक्षरता',
    'Personalised plans': 'वैयक्तिक योजना',
    'Ongoing support': 'सतत मदत',
    'What': 'काय',
    'offers': 'देते',
    'Practical guidance for every stage of your financial journey.': 'तुमच्या आर्थिक प्रवासातील प्रत्येक टप्प्यासाठी व्यावहारिक मार्गदर्शन.',
    'Specialised Investment Funds': 'विशेषीकृत गुंतवणूक फंड',
    'Health Insurance': 'आरोग्य विमा',
    'Term Insurance': 'मुदत विमा',
    'Bonds, NCDs & Principal Protected Market-Linked Debentures': 'बॉन्ड, NCD आणि मुळ भांडवल संरक्षित बाजार-संबंधित डिबेंचर्स',
    'PMS, AIFs & Gift City Funds': 'PMS, AIF आणि गिफ्ट सिटी फंड',
    'Corporate Deposits': 'कॉर्पोरेट डिपॉझिट',
    'National Pension System': 'राष्ट्रीय पेन्शन प्रणाली',
    'Let’s talk': 'चला चर्चा करूया',
    'Start with a conversation about your financial goals.': 'आपल्या आर्थिक ध्येयांबद्दल संवादापासून सुरुवात करा.',
    'WhatsApp': 'व्हॉट्सअॅप',
    'Explore': 'पहा',
    'Mumbai and beyond': 'मुंबई आणि पुढे',
    'Blog': 'ब्लॉग',
    'Read article': 'लेख वाचा',
  },
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly language = signal<Language>('en');
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('sarathi-language');
      if (saved === 'hi' || saved === 'mr' || saved === 'en') {
        this.language.set(saved);
        document.documentElement.lang = saved;
      }
    }
  }

  setLanguage(language: Language): void {
    this.language.set(language);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('sarathi-language', language);
      document.documentElement.lang = language;
    }
  }

  translate(text: string): string {
    const language = this.language();
    if (language === 'en') return text;
    return translations[language][text] ?? text;
  }
}
