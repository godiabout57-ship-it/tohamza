'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, MessageCircle, Share2, ArrowRight, ShoppingBag, CheckCircle, Info, Sparkles, Droplets, Star, Beaker, Phone, Users, Target, Eye } from 'lucide-react';

// --- مصفوفة المنتجات الكاملة مع الصور والبيانات ---
export const PRODUCTS = [
  {
    id: 10,
    name: "دهان الحنظل وذروة الجمل – راحة طبيعية",
    category: "علاجي طبيعي",
    price: 2990,
    size: "50g",
    image: "/green.jpeg", 
    description: "دهان طبيعي مستخلص من سنام الجمل والحنظل، مصمم ليمنحك راحة سريعة وطبيعية من آلام الجسم والخشونة، بدون أي مواد كيميائية.",
    isNew: true,
    details: {
      benefits: [
        "تخفيف الخشونة وآلام المفاصل والعظام",
        "تخفيف آلام الرقبة والديسك",
        "علاج فعال لعرق النساء ومشط القدم",
        "تركيبة طبيعية 100% خالية من الكيماويات"
      ],
      usage: {
        routine: "ضع الدهان على المنطقة المصابة مرتين يومياً.",
        tip: "يُفضل تغطية المنطقة بقماش لزيادة الفعالية.",
        bestTime: "الاستخدام الأمثل: قبل النوم لضمان راحة تامة عند الاستيقاظ."
      }
    }
  },
  {
    id: 9,
    name: "شحم سنام الجمل – كنز الصحراء الخام",
    category: "كنوز الصحراء",
    price: 2600,
    size: "200g",
    image: "/jamal.jpeg", 
    description: "منتج طبيعي 100%، مستخلص من سنام الإبل، خالي من المواد الكيميائية. كنز صحي وجمالي شامل يعيد للجسم توازنه وحيويته.",
    isNew: false,
    details: {
      benefits: [
        "علاج طبيعي للربو، السعال، والتهابات الحلق",
        "تسكين آلام المفاصل والروماتيزم وتشقق القدمين",
        "ترطيب عميق وتفتيح طبيعي للبشرة",
        "تقوية الشعر ومنع تساقطه"
      ],
      usage: {
        skin: "للعناية الخارجية: دهن الجسم أو الشعر بالشحم المذاب حسب الحاجة.",
        hair: "لتقوية الشعر: يدلك الفروة بالشحم المذاب ويترك لساعة قبل الغسل.",
        internal: "للعلاج الداخلي: تناول ملعقة صغيرة من الشحم المذاب صباحاً ومساءً."
      }
    }
  },
  {
    id: 8,
    name: "زيت الأركان تندوف الخام – الذهب السائل",
    category: "كنوز الصحراء",
    price: 1750,
    size: "10ml",
    image: "/arkan.jpeg", 
    description: "يُستخرج من لوز شجرة الأركان التي تنمو في تندوف. يُعرف بـ 'الذهب السائل' لفوائده العظيمة ويحتوي على فيتامين E الطبيعي.",
    isNew: false,
    details: {
      benefits: [
        "مضاد طبيعي للتجاعيد وعلامات الشيخوخة",
        "يعالج حب الشباب ويصفي البشرة",
        "يرطب الشعر الجاف والمجعد"
      ],
      usage: "قطرات بسيطة تدلك على البشرة أو الشعر قبل النوم."
    }
  },
  {
    id: 5,
    name: "كريم الوجه بذروة الجمل والنيلة الصحراوية",
    category: "الذهب الأزرق",
    price: 2990,
    size: "50g",
    image: "/face.jpeg", 
    description: "مزيج ملكي يجمع بين فوائد ذروة الجمل المغذية والنيلة الصحراوية المفتحة لتصفية البشرة وشد الترهلات.",
    isNew: false,
    details: {
      benefits: [
        "تبييض فوري وتوحيد لون البشرة",
        "التخلص من الكلف وآثار الشمس",
        "شد البشرة المترهلة"
      ],
      usage: "يُدهن على وجه نظيف قبل النوم يومياً."
    }
  },
  {
    id: 6,
    name: "النيلة الصحراوية الخام 💙",
    category: "كنوز الصحراء",
    price: 990,
    size: "20g",
    image: "/blue.jpeg",
    description: "نيلة تندوف الأصلية الخام، السر الصحراوي لتفتيح الجسم وتوحيد لونه بلمسة واحدة.",
    isNew: false,
    details: {
      benefits: [
        "تفتيح المناطق الداكنة",
        "توحيد لون البشرة وإزالة البقع",
        "نعومة حريرية"
      ],
      usage: "تخلط مع الزبادي أو ماء الورد كقناع لمدة 20 دقيقة."
    }
  },{
    id: 11,
    name: 'إكسير الصحراء – راحة طبيعية للمفاصل والعضلات',
    category: 'علاجي طبيعي',
    price: 299,
    size: "50g",
    image: "/yellow.jpeg", 
    description: 'من قلب الصحراء… يأتيك سر الراحة الطبيعية. تركيبة طبيعية 100% تخفف آلام المفاصل والعضلات وتساعد في حالات الروماتيزم والتهابات الخفيفة.',
    isNew: true,
    details: {
      benefits: [
        'يخفف آلام المفاصل والعضلات',
        'يساعد في حالات الروماتيزم والالتهابات الخفيفة',
        'مثالي بعد المجهود الرياضي',
        'تركيبة طبيعية 100%',
        'امتصاص سريع دون أثر دهني',
        'إحساس بالدفء أو البرودة المريحة'
      ],
      usage: 'ضع كمية صغيرة ودلّك بلطف 2 – 3 مرات يوميًا عند الحاجة. لا يوضع على الجروح المفتوحة ويُتجنب ملامسة العينين.'
    }
  }
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  const [products, setProducts] = useState<any[]>(PRODUCTS);
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [checkoutData, setCheckoutData] = useState({ name: '', state: '', address: '', phone: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kosa_products');
    if (saved) {
       try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.length > 0) setProducts(parsed);
       } catch(e) {}
    } else {
       localStorage.setItem('kosa_products', JSON.stringify(PRODUCTS));
    }
  }, []);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: any) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const submitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutData.name || !checkoutData.state || !checkoutData.address || !checkoutData.phone) return;
    
    // totalAmount will be calculated in the component
    const totalAmount = cart.reduce((acc, item) => acc + ((item.discountPrice || item.price) * item.quantity), 0);
    
    const newOrder = {
      id: Date.now().toString(),
      customer: checkoutData,
      items: cart,
      total: totalAmount,
      status: 'Pending',
      date: new Date().toISOString()
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('kosa_orders') || '[]');
    localStorage.setItem('kosa_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    setCart([]);
    setIsCartOpen(false);
    setCheckoutStep(false);
    setOrderSuccess(true);
  };

  const totalAmount = cart.reduce((acc, item) => acc + ((item.discountPrice || item.price) * item.quantity), 0);

  const scrollTo = (id: any) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-right" dir="rtl">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-amber-600/20 h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex flex-col items-center">
             <img src="/logo/logo.png" alt="KOSA" className="h-16 w-auto" />
          </div>
          <div className="hidden md:flex space-x-reverse space-x-10 text-gray-300 font-bold text-sm">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-amber-400 border-b border-amber-500 mx-2">الرئيسية</button>
            <button onClick={() => scrollTo('store')} className="hover:text-amber-400 transition-colors mx-2">المتجر</button>
            <button onClick={() => scrollTo('about')} className="hover:text-amber-400 transition-colors mx-2">من نحن</button>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="p-3 bg-amber-500 text-black rounded-xl relative hover:scale-105 transition-transform">
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="absolute -top-2 -left-2 bg-white text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border border-black">{cart.length}</span>}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-50">
           <img src="https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Sahara" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
           <div className="max-w-2xl animate-fade-in">
              <span className="inline-block px-4 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-xs font-bold mb-6 tracking-widest">تندوف • الجزائر</span>
              <h2 className="text-6xl md:text-8xl font-black text-white mb-8 italic leading-tight">جمال <br/><span className="text-amber-500">من قلب الصحراء</span></h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">نحن مؤسسة "كنوز الصحراء"، خبراء في ابتكار الجمال الطبيعي من شحم وحليب الإبل وزيت الأركان الخام.</p>
              <div className="flex gap-4">
                <button onClick={() => scrollTo('store')} className="bg-amber-500 text-black px-10 py-4 rounded-xl font-black text-lg hover:bg-white transition-all shadow-xl">تسوقي الآن</button>
                <button onClick={() => scrollTo('about')} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all italic">اكتشفي قصة KOSA</button>
              </div>
           </div>
        </div>
      </section>

      {/* About Section - NEW */}
      <section id="about" className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 text-amber-600 font-black tracking-widest uppercase text-sm">
                  <Users size={20} /> من نحن
                </div>
                <h2 className="text-5xl font-black text-amber-950 italic leading-tight">مؤسسة <span className="text-amber-600 underline decoration-amber-200 underline-offset-8">كنوز الصحراء</span></h2>
                <p className="text-xl text-gray-600 leading-relaxed font-light">
                  نحن خبراء في إنتاج وتسويق مواد تجميل طبيعية 100٪ مستخلصة من كنوز تندوف. معنا، كل منتج هو قصة طبيعة واهتمام بجمالك وصحتك.
                </p>
                <div className="bg-[#fafafa] p-8 rounded-[3rem] border-r-8 border-amber-500 shadow-sm">
                  <p className="text-amber-900 font-bold text-lg leading-loose italic italic">
                    "نؤمن بأن الجمال يبدأ من الطبيعة، والقوة تبدأ من اختيارك الصحيح."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 bg-black text-white rounded-[3.5rem] shadow-2xl transform hover:-translate-y-2 transition-transform">
                <Target className="text-amber-500 mb-6" size={40} />
                <h3 className="text-2xl font-black mb-4 italic">مهمتنا</h3>
                <p className="text-gray-400 text-sm leading-relaxed">تقديم منتجات مبتكرة، آمنة، ومفيدة لكل فئات المجتمع، مع التزام دائم بالجودة والشفافية.</p>
              </div>
              <div className="p-10 bg-amber-50 border border-amber-100 rounded-[3.5rem] shadow-sm transform translate-y-8 hover:-translate-y-2 transition-transform">
                <Eye className="text-amber-600 mb-6" size={40} />
                <h3 className="text-2xl font-black text-amber-950 mb-4 italic">رؤيتنا</h3>
                <p className="text-amber-900/70 text-sm leading-relaxed">أن نصبح المرجع الأول للمنتجات الطبيعية في الجزائر والعالم العربي، حاملين هوية الصحراء إلى العالمية.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section id="store" className="py-24 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-20 text-center">
            <h3 className="text-4xl font-black text-amber-950 mb-4 italic">المتجر الملكي</h3>
            <p className="text-gray-500 font-light max-w-xl">منتجات أصلية وفعّالة تراعي الجودة والمعايير العالمية، لتجعلك تشعر بالثقة والقيمة.</p>
            <div className="w-20 h-1 bg-amber-500 rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {products.map(product => (
               <div key={product.id} className="bg-white rounded-[2.5rem] p-4 border border-amber-100 hover:shadow-2xl transition-all group overflow-hidden">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
                     <img src={product.image || '/face.jpeg'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                     {product.isNew && <span className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">جديد</span>}
                     {product.discountPrice && <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">تخفيض</span>}
                  </div>
                  <div className="px-2">
                     <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{product.category || 'العناية بالبشرة'}</span>
                     <h4 className="text-xl font-bold text-amber-950 mt-1 mb-4 h-14 overflow-hidden italic px-2">{product.name}</h4>
                     <div className="flex justify-between items-center pt-4 border-t border-amber-50">
                        <div className="flex flex-col">
                           {product.discountPrice ? (
                              <>
                                 <span className="text-xl font-black text-amber-900">{product.discountPrice.toLocaleString()}</span>
                                 <span className="text-[12px] text-gray-400 line-through font-bold">{product.price.toLocaleString()} د.ج</span>
                              </>
                           ) : (
                               <>
                                 <span className="text-xl font-black text-amber-900">{product.price.toLocaleString()}</span>
                                 <span className="text-[10px] text-gray-400 font-bold uppercase">دج الجزائري</span>
                               </>
                           )}
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => setSelectedProduct(product)} className="p-3 bg-amber-50 text-amber-900 rounded-xl hover:bg-amber-100"><Info size={18}/></button>
                           <button onClick={() => addToCart(product)} className="p-3 bg-black text-white rounded-xl hover:bg-amber-500 hover:text-black transition-colors"><ShoppingCart size={18}/></button>
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Modal Detail */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
           <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] p-8 md:p-12 animate-scale-up text-right">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-8 left-8 p-2 text-gray-400 hover:text-amber-500"><X size={32}/></button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <div className="rounded-[2rem] overflow-hidden border-4 border-amber-50 shadow-xl">
                    <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-amber-600 font-black text-xs tracking-widest uppercase mb-4">{selectedProduct.category}</span>
                    <h2 className="text-4xl font-black text-amber-950 mb-6 italic">{selectedProduct.name}</h2>
                    <div className="text-3xl font-black text-amber-700 pb-6 border-b border-amber-50 flex items-end gap-3 mb-8">
                       {selectedProduct.discountPrice ? (
                          <>
                            <span>{selectedProduct.discountPrice.toLocaleString()} دج</span>
                            <span className="text-lg text-gray-400 line-through">{selectedProduct.price.toLocaleString()} دج</span>
                          </>
                       ) : (
                            <span>{selectedProduct.price.toLocaleString()} دج</span>
                       )}
                    </div>
                    
                    <p className="text-gray-500 text-lg mb-8 font-light italic">{selectedProduct.description}</p>
                    
                    <div className="space-y-8 mb-10">
                       <div className="bg-amber-50/50 p-6 rounded-[2rem] border border-amber-100">
                          <h5 className="font-black text-amber-950 mb-4 flex items-center gap-2"><Sparkles className="text-amber-500"/> الفوائد:</h5>
                          <ul className="space-y-3">
                             {selectedProduct.details.benefits.map((b: any, i: any) => (
                               <li key={i} className="flex items-start gap-3 text-amber-900 text-sm font-bold">
                                  <CheckCircle size={16} className="mt-1 shrink-0 text-amber-500"/> {b}
                               </li>
                             ))}
                          </ul>
                       </div>

                       <div className="pr-6 border-r-4 border-amber-500">
                          <h5 className="font-black text-amber-950 mb-4 flex items-center gap-2 italic">طريقة الاستعمال:</h5>
                          {typeof selectedProduct.details.usage === 'string' ? (
                            <p className="text-gray-600 text-sm leading-relaxed">{selectedProduct.details.usage}</p>
                          ) : (
                            <div className="grid grid-cols-1 gap-4">
                               <div className="p-4 bg-gray-50 rounded-2xl">
                                  <span className="block font-black text-amber-800 text-xs mb-1">للبشرة</span>
                                  <p className="text-gray-600 text-xs">{selectedProduct.details.usage.skin}</p>
                               </div>
                               <div className="p-4 bg-gray-50 rounded-2xl">
                                  <span className="block font-black text-amber-800 text-xs mb-1">للشعر</span>
                                  <p className="text-gray-600 text-xs">{selectedProduct.details.usage.hair}</p>
                               </div>
                               <div className="p-4 bg-gray-50 rounded-2xl">
                                  <span className="block font-black text-amber-800 text-xs mb-1">للأظافر</span>
                                  <p className="text-gray-600 text-xs">{selectedProduct.details.usage.nails}</p>
                               </div>
                            </div>
                          )}
                       </div>
                    </div>

                    <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="mt-auto w-full bg-black text-white py-5 rounded-2xl font-black text-xl hover:bg-amber-600 hover:text-black transition-all flex items-center justify-center gap-3 italic">
                       أضيفي للحقيبة <ShoppingCart size={24}/>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
           <div className="relative w-full max-w-md bg-white h-full p-8 flex flex-col shadow-2xl animate-slide-left">
              <div className="flex justify-between items-center mb-10 border-b pb-6">
                 <h2 className="text-2xl font-black italic">حقيبة التسوق</h2>
                 <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-black"><X size={32}/></button>
              </div>
              
              {!checkoutStep ? (
                 <>
                    <div className="flex-1 overflow-y-auto space-y-6">
                       {cart.map(item => (
                         <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl">
                            <img src={item.image} className="w-20 h-20 object-cover rounded-xl border border-white" alt={item.name} />
                            <div className="flex-1">
                               <h4 className="font-bold text-amber-950 text-sm">{item.name}</h4>
                               <p className="text-amber-600 font-black">{(item.discountPrice || item.price).toLocaleString()} دج <span className="text-xs text-gray-400 font-normal">x{item.quantity}</span></p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"><X size={16}/></button>
                         </div>
                       ))}
                       {cart.length === 0 && <p className="text-center py-20 text-gray-400 italic">حقيبتك فارغة حالياً</p>}
                    </div>

                    <div className="mt-auto pt-8 border-t">
                       <div className="flex justify-between text-2xl font-black mb-8 italic">
                          <span>المجموع:</span>
                          <span className="text-amber-600">{totalAmount.toLocaleString()} دج</span>
                       </div>
                       <button onClick={() => setCheckoutStep(true)} disabled={cart.length === 0} className="w-full bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-black py-5 rounded-2xl font-black text-lg hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3">
                          إتمام الطلب <Phone size={20}/>
                       </button>
                    </div>
                 </>
              ) : (
                 <form onSubmit={submitOrder} className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 px-1">
                       <button type="button" onClick={() => setCheckoutStep(false)} className="text-sm font-bold text-amber-600 mb-4 inline-block">← الرجوع للسلة</button>
                       <h3 className="font-black text-xl mb-4 text-amber-950">معلومات التوصيل</h3>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل *</label>
                          <input required type="text" value={checkoutData.name} onChange={e => setCheckoutData({...checkoutData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans" placeholder="مثال: أحمد محمادي" />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">الولاية *</label>
                          <input required type="text" value={checkoutData.state} onChange={e => setCheckoutData({...checkoutData, state: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans" placeholder="مثال: الجزائر العاصمة" />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">الهاتف *</label>
                          <input required type="tel" value={checkoutData.phone} onChange={e => setCheckoutData({...checkoutData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans" placeholder="055..." dir="ltr" />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">العنوان الكامل *</label>
                          <textarea required value={checkoutData.address} onChange={e => setCheckoutData({...checkoutData, address: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-sans resize-none h-24" placeholder="الشارع، الحي، البلدية..."></textarea>
                       </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t font-sans">
                       <div className="flex justify-between items-center text-lg font-black mb-4">
                          <span>الإجمالي المراد دفعه:</span>
                          <span className="text-amber-600">{totalAmount.toLocaleString()} دج</span>
                       </div>
                       <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-black text-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-2">
                          إرسال الطلب الآن <CheckCircle size={20}/>
                       </button>
                    </div>
                 </form>
              )}
           </div>
        </div>
      )}

      {/* Success Overlay */}
      {orderSuccess && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4">
           <div className="bg-white p-12 rounded-[3.5rem] max-w-lg w-full text-center shadow-2xl animate-scale-up border-8 border-amber-50">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                 <CheckCircle size={50} />
              </div>
              <h2 className="text-4xl font-black text-amber-950 mb-4 italic">تم إرسال طلبك بنجاح!</h2>
              <p className="text-gray-500 font-light mb-8 text-lg">سنتواصل معك قريباً لتأكيد الطلب وترتيب عملية التوصيل.</p>
              <button onClick={() => setOrderSuccess(false)} className="w-full bg-amber-500 text-black py-4 rounded-xl font-black text-lg hover:bg-black hover:text-white transition-all">
                 العودة للمتجر
              </button>
           </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-20 text-center">
         <div className="max-w-7xl mx-auto px-6">
            <img src="/logo/logo.png" alt="KOSA" className="h-20 w-auto mx-auto mb-6" />
            <p className="text-gray-500 max-w-md mx-auto mb-10 italic">من قلب تندوف، نقدم أجود ما جادت به الطبيعة للعناية بجمالكِ.</p>
            <div className="flex justify-center gap-6 mb-12">
               <MessageCircle className="text-gray-400 hover:text-amber-500 cursor-pointer transition-colors" />
               <Share2 className="text-gray-400 hover:text-amber-500 cursor-pointer transition-colors" />
            </div>
            <div className="text-[10px] text-gray-700 font-bold tracking-[0.3em] uppercase">© 2024 KOSA BEAUTY • TINDOUF, ALGERIA</div>
         </div>
      </footer>

      <style>{`
        @keyframes slide-left { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes scale-up { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-slide-left { animation: slide-left 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
