import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Menu,
  ExternalLink, 
  ArrowRight, 
  User,
  Briefcase,
  ChevronRight,
  X,
  Send,
  FileText,
  Code,
  Dribbble,
  Instagram
} from 'lucide-react';
import { PROJECTS, WORKSPACE, EXPERIENCES } from './constants';
import { Project } from './types';
import { IMAGES } from './images';

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white neo-border rounded-3xl overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b-2 border-dark flex items-center justify-between bg-light">
              <h2 className="text-3xl font-display font-black">{title}</h2>
              <button onClick={onClose} className="w-10 h-10 neo-border bg-white flex items-center justify-center hover:bg-brand hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto flex-1">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ activePage, setActivePage }: { activePage: string, setActivePage: (page: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: '首页', id: 'home' },
    { name: '关于我', id: 'about' },
    { name: 'AI实践', id: 'ai' },
    { name: '我的作品', id: 'works' },
    { name: '工作区', id: 'workspace' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className="container mx-auto px-6">
        <div className={`relative flex items-center bg-white/80 backdrop-blur-md neo-border px-8 py-4 transition-all ${scrolled ? 'rounded-full' : 'rounded-2xl'}`}>
          <button onClick={() => setActivePage('home')} className="text-3xl font-display font-black tracking-tighter hover:text-brand transition-colors">
            MUHAN
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => setActivePage(item.id)} 
                className={`font-bold text-lg transition-all hover:scale-105 px-4 py-2 rounded-full ${activePage === item.id ? 'text-brand bg-brand/10' : 'hover:text-brand hover:bg-brand/5'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-4">
            <a href="mailto:hello@muhan.com" className="hidden sm:flex w-10 h-10 neo-border bg-white items-center justify-center hover:bg-brand hover:text-white transition-all">
              <Mail size={18} />
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-10 h-10 neo-border bg-white flex items-center justify-center hover:bg-brand hover:text-white transition-all"
              aria-label="Open menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-50"
          >
            <div
              className="absolute inset-0 bg-dark/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-6 left-6 right-6 bg-white neo-border rounded-3xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-2xl font-display font-black tracking-tight">导航</p>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 neo-border bg-white flex items-center justify-center hover:bg-brand hover:text-white transition-all"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      setMobileOpen(false);
                    }}
                    className={`w-full text-left px-5 py-4 rounded-2xl neo-border font-black text-lg transition-all ${activePage === item.id ? 'bg-brand text-white' : 'bg-white hover:bg-light'}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex gap-4">
                <a
                  href="mailto:hello@muhan.com"
                  className="flex-1 neo-button bg-white flex items-center justify-center gap-2"
                >
                  <Mail size={18} /> 发邮件
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenContact, onOpenWorks }: { onOpenContact: () => void, onOpenWorks: () => void }) => {
  const [heroImage, setHeroImage] = useState<string>(IMAGES.hero);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setHeroImage(url);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-black text-white">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 bg-cyan-950/50 text-cyan-400 px-5 py-2 rounded-sm border border-cyan-500/30 mb-8 font-mono text-sm uppercase tracking-widest backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 bg-cyan-500"></span>
              </span>
              SYSTEM ONLINE // AI CREATOR
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] tracking-tighter font-black uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              欢迎光临<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">我的世界</span>
            </h1>
            <p className="text-xl md:text-2xl text-cyan-100/70 mb-12 max-w-xl leading-relaxed font-light font-mono">
              &gt; 我致力于用 AI 做出更多有用且丰富的作品和内容。<span className="animate-pulse">_</span>
            </p>
            <div className="flex flex-wrap gap-6">
              <button onClick={onOpenWorks} className="group relative px-8 py-4 bg-cyan-500 text-black font-black uppercase tracking-wider text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                <span className="relative z-10">初始化作品集</span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out skew-x-12"></div>
              </button>
              <button onClick={onOpenContact} className="group px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 font-black uppercase tracking-wider text-lg transition-all hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                建立连接
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            {/* Tech Frame for Image */}
            <div className="relative aspect-[4/5] p-2 bg-gray-900 border border-cyan-500/30 rounded-sm shadow-[0_0_40px_rgba(6,182,212,0.15)] group overflow-hidden">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 z-20"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 z-20"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-20"></div>
              
              <div className="w-full h-full relative overflow-hidden bg-black">
                <img 
                  src={heroImage} 
                  alt="Portrait" 
                  className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-50"></div>
                
                <label className="absolute inset-0 bg-cyan-950/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer text-cyan-400 backdrop-blur-sm z-30">
                  <span className="text-xl font-black uppercase tracking-widest border border-cyan-400 px-6 py-3 hover:bg-cyan-400 hover:text-black transition-colors">上传视觉数据</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            
            {/* Tech Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-gray-900 border border-cyan-500/40 p-4 shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md z-30">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                  <Code className="text-cyan-400" size={20} />
                </div>
                <div>
                  <p className="font-mono text-xs text-cyan-400/60 uppercase tracking-widest mb-1">当前坐标</p>
                  <p className="font-black text-lg text-white leading-none tracking-wider">湖南, CN</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-light to-transparent pointer-events-none"></div>
    </section>
  );
};

const LifeSection = () => {
  return (
    <section className="py-32 bg-white text-black relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[260px] bg-light rounded-[80px] blur-3xl opacity-70"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">生活与<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">灵感</span></h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">除了代码与 AI，我也热爱记录生活中的美好瞬间。这些点滴是我创作灵感的源泉。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px]">
          {/* Large Image Card */}
          <div className="md:col-span-8 md:row-span-2 group relative overflow-hidden rounded-3xl neo-border shadow-lg">
            <img 
              src={IMAGES.life1} 
              alt="Life Moment 1" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">旅行</span>
              <h3 className="text-3xl font-black">探索未知的风景</h3>
            </div>
          </div>

          {/* Medium Image Card 1 */}
          <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-3xl neo-border shadow-lg bg-orange-50">
            <img 
              src={IMAGES.life2} 
              alt="Life Moment 2" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">摄影</span>
              <h3 className="text-xl font-black">捕捉光影</h3>
            </div>
          </div>

          {/* Medium Image Card 2 */}
          <div className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-3xl neo-border shadow-lg bg-rose-50">
             <img 
              src={IMAGES.life3} 
              alt="Life Moment 3" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 left-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">阅读</span>
              <h3 className="text-xl font-black">沉浸书海</h3>
            </div>
          </div>

          {/* Quote Card */}
          <div className="md:col-span-4 md:row-span-1 bg-gray-50 rounded-3xl neo-border shadow-lg p-8 flex flex-col justify-center relative overflow-hidden">
             <div className="absolute -top-4 -right-4 text-9xl text-gray-200 font-serif leading-none opacity-50">"</div>
             <p className="text-xl font-medium text-gray-700 leading-relaxed relative z-10 italic">
               "设计不仅仅是外观和感觉。设计是它的工作原理。在生活中也是如此，体验比表象更重要。"
             </p>
             <div className="mt-6 flex items-center gap-3 relative z-10">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-rose-500"></div>
               <div>
                 <p className="font-black text-sm">Steve Jobs</p>
                 <p className="text-xs text-gray-500">关于设计的思考</p>
               </div>
             </div>
          </div>
           
           {/* Long Image Card */}
           <div className="md:col-span-8 md:row-span-1 group relative overflow-hidden rounded-3xl neo-border shadow-lg">
             <img 
              src={IMAGES.life4} 
              alt="Life Moment 4" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
             <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-1/2 -translate-y-1/2 left-0 p-8 -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 text-white">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold mb-3 inline-block">咖啡与代码</span>
              <h3 className="text-3xl font-black">静谧的下午茶时光</h3>
            </div>
           </div>

        </div>
      </div>
    </section>
  );
};

const AIPractice = ({ onOpenContact, onOpenWorks }: { onOpenContact: () => void, onOpenWorks: () => void }) => {
  const promptTemplates = [
    {
      id: "t1",
      title: "内容摘要（结构化）",
      content: "请把下面内容总结成：1) 一句话结论 2) 三条要点 3) 可执行的下一步建议。内容：{{TEXT}}",
    },
    {
      id: "t2",
      title: "短视频脚本（生活方式）",
      content: "你是短视频编导。请基于主题生成 30 秒脚本：分镜、旁白、字幕、BGM建议、结尾 CTA。主题：{{TOPIC}}",
    },
    {
      id: "t3",
      title: "产品需求拆解（PRD）",
      content: "请把需求拆解为：目标、用户画像、使用流程、功能列表、边界与异常、指标、风险。需求：{{REQ}}",
    },
  ];

  const [activeTab, setActiveTab] = useState<"demos" | "prompts" | "playground">("demos");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [playgroundInput, setPlaygroundInput] = useState("");
  const [playgroundOutput, setPlaygroundOutput] = useState("");

  const copyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setToast("已复制到剪贴板");
      window.setTimeout(() => setCopiedId(null), 1200);
      window.setTimeout(() => setToast(null), 1600);
    } catch {
      setCopiedId(null);
      setToast("复制失败");
      window.setTimeout(() => setToast(null), 1600);
    }
  };

  const runPlayground = () => {
    const topic = playgroundInput.trim() || "（未填写主题）";
    setPlaygroundOutput(
      [
        "【AI 实践演示（本地模拟，不调用线上模型）】",
        `主题：${topic}`,
        "",
        "1) 核心观点：围绕“有用 + 好看”，用清晰结构把内容讲透。",
        "2) 三个要点：",
        "   - 先给结论，再给依据；信息密度要高但读起来轻松。",
        "   - 用例驱动：给 1 个真实场景 + 1 个可执行步骤。",
        "   - 体验一致：标题、段落、按钮与视觉节奏统一。",
        "",
        "3) 下一步建议：把你的目标用户、使用场景、期望输出补充完整，我可以把模板升级成可直接复用的工作流。",
      ].join("\n")
    );
  };

  return (
    <section id="ai" className="py-32 bg-light relative overflow-hidden">
      <div className="absolute top-24 -left-40 w-[520px] h-[520px] bg-brand/10 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-10 -right-40 w-[520px] h-[520px] bg-brand-light/10 rounded-full blur-[80px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white neo-border text-brand font-black text-sm mb-6">
              AI 实践
            </div>
            <h2 className="text-6xl md:text-7xl font-black leading-none mb-6">
              把想法变成可复用的<span className="text-brand">工作流</span>
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              这里汇总我的 AI 实践：从提示词结构、内容生产到工具化落地。目标不是“炫技”，而是让产出更稳定、更可控、更有品味。
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={onOpenWorks} className="neo-button bg-white flex items-center gap-3">
              <ArrowRight size={18} /> 去看作品
            </button>
            <button onClick={onOpenContact} className="neo-button bg-brand text-white flex items-center gap-3">
              <Send size={18} /> 一起合作
            </button>
          </div>
        </div>

        <div className="bg-white neo-border rounded-3xl p-3 inline-flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTab("demos")}
            className={`px-5 py-3 rounded-2xl font-black transition-all ${activeTab === "demos" ? "bg-dark text-white" : "hover:bg-light"}`}
          >
            实践案例
          </button>
          <button
            onClick={() => setActiveTab("prompts")}
            className={`px-5 py-3 rounded-2xl font-black transition-all ${activeTab === "prompts" ? "bg-dark text-white" : "hover:bg-light"}`}
          >
            提示词库
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={`px-5 py-3 rounded-2xl font-black transition-all ${activeTab === "playground" ? "bg-dark text-white" : "hover:bg-light"}`}
          >
            Playground
          </button>
        </div>

        {activeTab === "demos" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "内容生产流水线", desc: "从选题→大纲→成稿→润色→分发，强调一致的语气与结构。", tag: "内容" },
              { title: "知识整理与复盘", desc: "把碎片输入变成卡片、清单与行动项，便于长期迭代。", tag: "效率" },
              { title: "产品需求与方案", desc: "把模糊需求变成 PRD 结构，再生成可交付的方案与验收标准。", tag: "产品" },
            ].map((x) => (
              <div key={x.title} className="neo-card rounded-3xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-brand/10 text-brand font-black text-xs uppercase tracking-wider">{x.tag}</span>
                  <Code size={18} className="text-brand" />
                </div>
                <p className="text-2xl font-black mb-3">{x.title}</p>
                <p className="text-gray-600 leading-relaxed text-lg">{x.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "prompts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {promptTemplates.map((t) => (
              <div key={t.id} className="neo-card rounded-3xl">
                <div className="flex items-start justify-between gap-6 mb-4">
                  <div>
                    <p className="text-2xl font-black">{t.title}</p>
                    <p className="text-gray-500 font-medium mt-2">可直接复制使用，把占位符替换成你的内容。</p>
                  </div>
                  <button
                    onClick={() => copyText(t.id, t.content)}
                    className={`px-5 py-3 rounded-full font-black transition-all ${copiedId === t.id ? "bg-dark text-white" : "bg-white neo-border hover:bg-light"}`}
                  >
                    {copiedId === t.id ? "已复制" : "复制"}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap text-sm bg-light neo-border rounded-2xl p-5 font-mono text-dark/80 leading-relaxed">
                  {t.content}
                </pre>
              </div>
            ))}
          </div>
        )}

        {activeTab === "playground" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="neo-card rounded-3xl">
              <p className="text-2xl font-black mb-4">输入</p>
              <p className="text-gray-500 font-medium mb-6">这里用于演示结构化输出的模板效果（本地模拟，不依赖 API）。</p>
              <textarea
                value={playgroundInput}
                onChange={(e) => setPlaygroundInput(e.target.value)}
                className="w-full min-h-[220px] p-5 neo-border rounded-2xl outline-none focus:ring-2 ring-brand bg-white font-mono"
                placeholder="输入一个主题，比如：如何把个人网站做得更专业？"
              />
              <div className="mt-6 flex gap-4">
                <button onClick={runPlayground} className="neo-button bg-brand text-white flex items-center gap-3">
                  <ArrowRight size={18} /> 生成示例
                </button>
                <button onClick={() => setPlaygroundInput("")} className="neo-button bg-white">
                  清空
                </button>
              </div>
            </div>
            <div className="neo-card rounded-3xl">
              <p className="text-2xl font-black mb-4">输出</p>
              <pre className="whitespace-pre-wrap text-sm bg-light neo-border rounded-2xl p-5 font-mono text-dark/80 leading-relaxed min-h-[320px]">
                {playgroundOutput || "点击“生成示例”后，这里会出现结构化输出。"}
              </pre>
              <div className="mt-6">
                <button
                  onClick={() => copyText("out", playgroundOutput)}
                  className={`neo-button bg-white flex items-center gap-3 ${!playgroundOutput ? 'opacity-50 pointer-events-none' : ''}`}
                  disabled={!playgroundOutput}
                >
                  <FileText size={18} /> 复制输出
                </button>
              </div>
            </div>
          </div>
        )}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed bottom-6 right-6 z-[200] bg-dark text-white neo-border rounded-2xl px-5 py-3 font-black"
            >
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const About = ({ onOpenResume }: { onOpenResume: () => void }) => {
  return (
    <section id="about" className="py-32 bg-light border-y-2 border-dark relative overflow-hidden">
      <div className="absolute top-24 -left-40 w-[520px] h-[520px] bg-brand/10 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-10 -right-40 w-[520px] h-[520px] bg-brand-light/10 rounded-full blur-[80px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-24">
          <div className="md:w-1/3">
            <div className="sticky top-40">
              <h2 className="text-6xl mb-10 leading-none font-black">
                <div >关于<span className="text-brand">我</span></div>
              </h2>
              <div className="flex gap-5">
                <a href="#" className="w-14 h-14 neo-border flex items-center justify-center hover:bg-brand hover:text-white transition-all hover:-translate-y-1">
                  <Github size={24} />
                </a>
                <a href="#" className="w-14 h-14 neo-border flex items-center justify-center hover:bg-brand hover:text-white transition-all hover:-translate-y-1">
                  <Twitter size={24} />
                </a>
                <a href="#" className="w-14 h-14 neo-border flex items-center justify-center hover:bg-brand hover:text-white transition-all hover:-translate-y-1">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="space-y-20">
              <div>
                <h3 className="text-3xl mb-8 flex items-center gap-4 font-black">
                  <span className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center">
                    <User className="text-brand" size={24} />
                  </span>
                  我的故事
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="neo-card rounded-3xl">
                    <p className="font-black text-xl mb-3">我是谁</p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      我喜欢把复杂问题拆解成清晰结构，用设计思维把体验打磨得更顺滑，再用 AI 把效率和内容丰富度拉满。
                    </p>
                  </div>
                  <div className="neo-card rounded-3xl">
                    <p className="font-black text-xl mb-3">我在乎什么</p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      有用、好看、可靠。一个作品应该能解决真实问题，同时让人愿意反复使用并且感到愉悦。
                    </p>
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap gap-3">
                  {['AI', '产品体验', '交互细节', '性能', '可维护性', '内容创作'].map((t) => (
                    <span key={t} className="px-4 py-2 bg-white neo-border rounded-full font-black text-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-3xl mb-10 flex items-center gap-4 font-black">
                  <span className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center">
                    <Briefcase className="text-brand" size={24} />
                  </span>
                  工作经历
                </h3>
                <div className="space-y-8">
                  {EXPERIENCES.map((exp) => (
                    <motion.div 
                      key={exp.id} 
                      whileHover={{ x: 10 }}
                      className="neo-card group relative overflow-hidden rounded-3xl"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                        <div>
                          <h4 className="text-2xl font-black">{exp.role}</h4>
                          <p className="text-brand font-bold text-lg">{exp.company}</p>
                        </div>
                        <span className="text-sm font-mono bg-dark text-white px-4 py-2 rounded-full">{exp.period}</span>
                      </div>
                      <p className="text-gray-500 text-lg leading-relaxed">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
                <button onClick={onOpenResume} className="mt-10 neo-button flex items-center gap-3">
                  <FileText size={20} /> 查看完整简历
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Works = ({ onOpenProject, onOpenAllProjects }: { onOpenProject: (p: Project) => void, onOpenAllProjects: () => void }) => {
  return (
    <section id="works" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-24 -left-40 w-[520px] h-[520px] bg-brand/10 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-10 -right-40 w-[520px] h-[520px] bg-brand-light/10 rounded-full blur-[80px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand font-black text-sm neo-border mb-8">
              精选作品集
            </div>
            <h2 className="text-6xl md:text-7xl mb-6 font-black leading-none">
              把复杂做简单，把细节做<span className="text-brand">极致</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
              这里展示我最近的一些项目：从 UI 细节、交互动效到工程质量与性能优化，都尽量做到“好看、好用、可维护”。
            </p>
          </div>
          <button onClick={onOpenAllProjects} className="neo-button flex items-center gap-3 group">
            查看所有项目 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -15 }}
              className="neo-card group flex flex-col h-full rounded-3xl"
            >
              <div className="aspect-[16/10] mb-8 overflow-hidden neo-border bg-gray-100 rounded-3xl relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-dark/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono bg-brand/10 text-brand px-3 py-1 rounded-full uppercase font-bold tracking-wider">{tag}</span>
                ))}
              </div>
              <h3 className="text-3xl mb-4 font-black flex items-center justify-between">
                {project.title}
                <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-all text-brand" />
              </h3>
              <p className="text-gray-500 mb-8 text-lg flex-1 leading-relaxed">{project.description}</p>
              <button 
                onClick={() => onOpenProject(project)}
                className="flex items-center gap-2 font-black text-brand group-hover:gap-4 transition-all text-lg"
              >
                查看案例研究 <ChevronRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Workspace = () => {
  return (
    <section id="workspace" className="py-32 bg-dark text-white relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[560px] h-[560px] bg-brand/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] bg-brand-light/20 rounded-full blur-[100px]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand font-black text-sm mb-8">
              我的工作区
            </div>
            <h2 className="text-6xl md:text-7xl mb-10 font-black leading-none">我的 <span className="text-brand">工具箱</span></h2>
            <p className="text-2xl text-gray-400 mb-16 leading-relaxed font-medium">
              工欲善其事，必先利其器。我精心挑选了每一件设备和软件，以确保在创作过程中能够获得最极致的效率和灵感。
            </p>
            
            <div className="space-y-12">
              {['硬件', '外设', '软件'].map((cat) => (
                <div key={cat}>
                  <h4 className="text-brand font-mono uppercase tracking-[0.3em] text-xs mb-6 font-black">{cat}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {WORKSPACE.filter(item => item.category === cat).map(item => (
                      <motion.div 
                        key={item.id} 
                        whileHover={{ scale: 1.02 }}
                        className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group backdrop-blur-sm"
                      >
                        <p className="font-black text-xl mb-2 group-hover:text-brand transition-colors">{item.name}</p>
                        <p className="text-gray-300/70 leading-relaxed">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] neo-border border-white/80 bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
              <img 
                src={IMAGES.workspace} 
                alt="Workspace Setup" 
                className="w-full h-full object-cover opacity-90 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>
    </section>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const links = [
    { name: '首页', id: 'home' },
    { name: '关于我', id: 'about' },
    { name: 'AI实践', id: 'ai' },
    { name: '我的作品', id: 'works' },
    { name: '工作区', id: 'workspace' },
  ];

  return (
    <footer className="py-20 bg-dark text-white border-t-2 border-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <div className="space-y-4">
            <p className="text-3xl font-display font-black tracking-tight">MUHAN</p>
            <p className="text-gray-300/70 leading-relaxed">
              用 AI 与设计把“有用”和“好看”做成同一个答案。
            </p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-center">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => setActivePage(l.id)}
                className="px-5 py-3 border border-white/15 rounded-full hover:border-white/30 hover:bg-white/5 transition-all font-black"
              >
                {l.name}
              </button>
            ))}
          </div>
          <div className="flex md:justify-end items-center gap-4">
            <a href="#" className="w-12 h-12 border border-white/15 rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
              <Dribbble size={18} />
            </a>
            <a href="#" className="w-12 h-12 border border-white/15 rounded-full flex items-center justify-center hover:bg-white/5 transition-all">
              <Instagram size={18} />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 border border-white/15 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all"
            >
              <ArrowRight size={18} className="-rotate-90" />
            </button>
          </div>
        </div>
        <div className="mt-12 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-300/60">
          <p>© {new Date().getFullYear()} MUHAN. All rights reserved.</p>
          <p>muhan.org.cn</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [modalContent, setModalContent] = useState<{ title: string, content: React.ReactNode } | null>(null);

  const openContact = () => {
    setModalContent({
      title: "联系我",
      content: (
        <div className="space-y-8">
          <p className="text-xl text-gray-500">
            无论是项目咨询、技术交流，还是仅仅想打个招呼，我都非常欢迎。请填写下方表格，我会尽快回复。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-black uppercase text-xs tracking-widest">您的姓名</label>
              <input type="text" className="w-full p-4 neo-border rounded-xl focus:ring-2 ring-brand outline-none" placeholder="张三" />
            </div>
            <div className="space-y-2">
              <label className="font-black uppercase text-xs tracking-widest">您的邮箱</label>
              <input type="email" className="w-full p-4 neo-border rounded-xl focus:ring-2 ring-brand outline-none" placeholder="zhangsan@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-black uppercase text-xs tracking-widest">您的留言</label>
            <textarea className="w-full p-4 neo-border rounded-xl focus:ring-2 ring-brand outline-none h-40" placeholder="在这里输入您的想法..."></textarea>
          </div>
          <button className="neo-button bg-brand text-white w-full flex items-center justify-center gap-3 text-lg">
            <Send size={20} /> 发送消息
          </button>
        </div>
      )
    });
  };

  const openResume = () => {
    setModalContent({
      title: "个人简历",
      content: (
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-8 bg-brand/5 rounded-3xl border border-brand/10">
            <div>
              <h3 className="text-4xl font-black mb-2">MUHAN</h3>
              <p className="text-lg text-brand font-bold">高级全栈工程师 & 交互设计师</p>
            </div>
            <button className="neo-button bg-white flex items-center gap-2">
              <FileText size={18} /> 下载 PDF
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h4 className="text-2xl font-black border-b-2 border-dark pb-2">核心技能</h4>
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Next.js', 'Node.js', 'Go', 'Rust', 'PostgreSQL', 'Docker', 'AWS', 'Figma'].map(s => (
                  <span key={s} className="px-4 py-2 bg-white neo-border font-bold">{s}</span>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <h4 className="text-2xl font-black border-b-2 border-dark pb-2">教育背景</h4>
              <div className="space-y-4">
                <div>
                  <p className="font-black text-lg">计算机科学与技术 学士</p>
                  <p className="text-gray-500">某知名理工大学 | 2016 - 2020</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-2xl font-black border-b-2 border-dark pb-2">项目经验</h4>
            <div className="space-y-6">
              <div className="p-6 bg-light rounded-2xl border border-dark/5">
                <p className="font-black text-xl mb-2">分布式电商系统架构</p>
                <p className="text-gray-500">负责高并发场景下的系统架构设计与优化，支撑日活 100w+ 用户。</p>
              </div>
              <div className="p-6 bg-light rounded-2xl border border-dark/5">
                <p className="font-black text-xl mb-2">AI 驱动的内容创作平台</p>
                <p className="text-gray-500">利用大语言模型实现自动化的内容生成与分发，提升创作效率 300%。</p>
              </div>
            </div>
          </div>
        </div>
      )
    });
  };

  const openProject = (project: Project) => {
    setModalContent({
      title: project.title,
      content: (
        <div className="space-y-10">
          <div className="aspect-video w-full neo-border rounded-3xl overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-3xl font-black">项目概览</h3>
              <p className="text-xl text-gray-500 leading-relaxed">
                {project.description} 这是一个深入探索用户需求、技术挑战以及最终解决方案的案例。我们通过创新的交互设计和稳健的后端架构，成功解决了行业痛点。
              </p>
              <h3 className="text-3xl font-black pt-4">挑战与解决方案</h3>
              <p className="text-xl text-gray-500 leading-relaxed">
                在项目初期，我们面临了数据实时同步和多端适配的巨大挑战。通过引入 WebSocket 和响应式设计系统，我们不仅实现了毫秒级的延迟，还确保了在所有设备上的完美呈现。
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest mb-4">技术栈</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t: string) => (
                    <span key={t} className="px-3 py-1 bg-brand/10 text-brand rounded-full text-xs font-bold">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest mb-4">角色</h4>
                <p className="font-bold">主导开发 & UI 设计</p>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest mb-4">日期</h4>
                <p className="font-bold">2024年 3月</p>
              </div>
              <button className="neo-button bg-brand text-white w-full flex items-center justify-center gap-2">
                访问在线演示 <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>
      )
    });
  };

  const openAllProjects = () => {
    setModalContent({
      title: "所有项目",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map(project => (
            <div key={project.id} className="neo-card flex flex-col">
              <div className="aspect-video mb-4 overflow-hidden neo-border rounded-xl">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h4 className="text-2xl font-black mb-2">{project.title}</h4>
              <p className="text-gray-500 flex-1 mb-4">{project.description}</p>
              <button onClick={() => openProject(project)} className="text-brand font-bold flex items-center gap-2">
                详情 <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      )
    });
  };

  return (
    <div className="relative selection:bg-brand selection:text-white">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {activePage === 'home' && (
              <>
                <Hero 
                  onOpenContact={openContact} 
                  onOpenWorks={() => setActivePage('works')} 
                />
                <LifeSection />
              </>
            )}
            {activePage === 'about' && <About onOpenResume={openResume} />}
            {activePage === 'ai' && <AIPractice onOpenContact={openContact} onOpenWorks={() => setActivePage('works')} />}
            {activePage === 'works' && <Works onOpenProject={openProject} onOpenAllProjects={openAllProjects} />}
            {activePage === 'workspace' && <Workspace />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setActivePage={setActivePage} />
      
      <Modal 
        isOpen={!!modalContent} 
        onClose={() => setModalContent(null)} 
        title={modalContent?.title || ""}
      >
        {modalContent?.content}
      </Modal>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>
    </div>
  );
}
