import { Link } from "react-router"
import {
  ArrowRight,
  PlayCircle,
  ShieldCheck,
  Code,
  Lock,
  Ban,
  Activity,
  PlaneTakeoff,
  Gauge,
  Fingerprint,
  CheckCircle2,
  Radar,
  SlidersHorizontal,
  Eye,
  XCircle,
  Check,
  Search,
  Shield,
  Wallet,
  Building2,
  LineChart
} from "lucide-react"

export function Landing() {
  return (
    <div className="min-h-full antialiased flex flex-col text-[#1C2541] bg-[#F8FAFC] font-['IBM_Plex_Sans',sans-serif]">
      {/* TOP BAR & NAVIGATION */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-slateBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img 
                alt="PayScratch Logo" 
                className="h-9 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbBllwcJGsgFqRuYam39LnSbUrKQHPvSxSEQP91SAwHqIyll1GPY73tsNdKdFSw_7Qw0-yx1rwqdZvJlHW2_TcJQ4kOoKzVHtD5P3qMDNJZA0Ryt8Lkv4JvNYPKZ3MCq8jSkBGoSb4AvMy16YJcswcHl5E7IndXBJEA1X7rW3Z_a12w81d8P9fv2MNV0ndBab3_KoCWP26u-G1KMEdAS4z19REBDZX6xrPoF35OhwhLhd45wjBh437VH1ENJE4f1gd0Q" 
              />
              <span className="font-headline font-bold text-xl tracking-tight text-midnight uppercase hidden sm:inline-block">PayScratch</span>
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-slateLight border border-slateBorder text-xs text-sapphire font-data font-medium">
              <span className="w-2 h-2 rounded-full bg-cerulean animate-pulse"></span>
              <span>v2.4 Engine</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slateText">
            <a className="hover:text-sapphire transition-colors" href="#product">Product</a>
            <a className="hover:text-sapphire transition-colors" href="#how-it-works">How It Works</a>
            <a className="hover:text-sapphire transition-colors" href="#analytics">Workbench</a>
            <a className="hover:text-sapphire transition-colors" href="#audience">Audience</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slateText hover:text-midnight px-3.5 py-2 rounded-lg hover:bg-slateLight transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm font-semibold text-white bg-cerulean hover:bg-sapphire px-4 py-2 rounded-lg shadow-sm shadow-cerulean/30 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-24">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="w-2 h-2 rounded-full bg-cerulean"></span>
              <span className="text-xs font-semibold tracking-wider text-sapphire uppercase">Payment Fraud Detection &amp; Explainability Engine</span>
            </div>
            <h1 className="font-headline font-bold text-4xl sm:text-5xl lg:text-[54px] leading-[1.12] text-midnight tracking-tight">
              Payments move fast. <span className="text-cerulean">Fraud shouldn’t.</span>
            </h1>
            <p className="mt-6 text-lg text-slateText leading-relaxed max-w-xl">
              PayScratch analyzes continuous transaction telemetry, detects suspicious behavioral deviations in real time, and explains exactly why every alert was flagged.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link to="/signup" className="px-6 py-3.5 bg-cerulean hover:bg-sapphire text-white font-semibold rounded-xl shadow-lg shadow-cerulean/25 transition-all flex items-center justify-center gap-2 group">
                <span>Explore PayScratch</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a className="px-6 py-3.5 bg-white hover:bg-slateLight border border-slateBorder text-midnight font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2" href="#how-it-works">
                <PlayCircle className="w-5 h-5 text-cerulean" />
                <span>See How It Works</span>
              </a>
            </div>
            
            <div className="mt-10 pt-6 border-t border-slateBorder/80 w-full flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slateText font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sapphire" />
                <span>Sub-12ms Ingestion SLA</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slateBorder hidden sm:inline-block"></span>
              <div className="flex items-center gap-1.5">
                <Code className="w-4 h-4 text-sapphire" />
                <span>Full Causal Explainability</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slateBorder hidden sm:inline-block"></span>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-sapphire" />
                <span>Zero Black-Box Guesswork</span>
              </div>
            </div>
          </div>

          {/* Miniature PayScratch Interface */}
          <div className="lg:col-span-6 relative animate-in fade-in zoom-in-95 duration-1000 delay-150">
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative bg-white rounded-2xl border border-slateBorder shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="bg-midnight px-4 py-3 flex items-center justify-between border-b border-navy">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></span>
                  </div>
                  <span className="font-data text-xs text-slate-300 ml-2 tracking-tight">console.payscratch.io/triage/tx-90428</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-data">
                  <span className="bg-red-500/20 text-red-300 border border-red-500/40 px-2 py-0.5 rounded font-semibold">Queue: P1-CRITICAL</span>
                  <span className="text-slate-400 hidden sm:inline-block">Elapsed: 00:01:14</span>
                </div>
              </div>
              <div className="p-5 lg:p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-5 border-b border-slateBorder">
                  <div className="sm:col-span-7 bg-slateLight/60 p-3.5 rounded-xl border border-slateBorder/60">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-semibold tracking-wider text-slateText uppercase">Transaction Hash</span>
                      <span className="bg-dangerBg border border-dangerBorder text-danger text-[10px] font-bold px-2 py-0.5 rounded font-data">CRITICAL ANOMALY</span>
                    </div>
                    <div className="font-data font-bold text-lg text-midnight tracking-tight">TX-90428</div>
                    <div className="mt-2.5 pt-2.5 border-t border-slateBorder/80 flex items-baseline justify-between">
                      <div>
                        <div className="text-[11px] text-slateText">Authorized Amount</div>
                        <div className="font-headline font-bold text-xl text-midnight">$14,250.00 <span className="text-xs font-normal text-slateText font-sans">USD</span></div>
                      </div>
                      <div className="text-right text-xs text-slateText">
                        <div>Card Type: Debit Corp</div>
                        <div className="font-data text-[11px] font-medium text-navy">BIN •••• 8812</div>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-5 bg-midnight text-white p-3.5 rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-slate-300 font-medium">Composite Risk Index</span>
                        <span className="font-data font-bold text-red-400 text-lg">94 / 100</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-danger rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-[11px] text-slate-300">
                        Action recommendation: <strong className="text-red-400">Immediate Block &amp; Re-Auth</strong>
                      </p>
                      <button className="mt-2 w-full py-1.5 bg-danger hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1">
                        <Ban className="w-3.5 h-3.5" />
                        <span>Block &amp; Flag Fraud</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Explainability Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      <Search className="text-cerulean w-[18px] h-[18px]" />
                      <span className="font-headline font-bold text-sm text-midnight">Why Was This Flagged?</span>
                    </div>
                    <span className="text-[11px] font-data text-sapphire bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">Causal Explainability Model v2.4</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg bg-slateLight/50 border border-slateBorder/60 flex items-start gap-2.5 hover:border-blue-200 transition-colors">
                      <div className="w-6 h-6 rounded-md bg-red-100 text-danger flex items-center justify-center shrink-0 mt-0.5">
                        <Activity className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-midnight">Unusual Transaction Amount</span>
                          <span className="bg-red-500 text-white font-data text-[10px] font-bold px-1.5 py-0.5 rounded">+34 pts</span>
                        </div>
                        <p className="text-[11px] text-slateText mt-0.5">
                          Authorized volume is <strong className="text-midnight">11.4x higher</strong> than cardholder 90-day baseline ($125 avg). First debit ticket over $5,000 on account.
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-2.5 rounded-lg bg-slateLight/50 border border-slateBorder/60 flex items-start gap-2.5 hover:border-blue-200 transition-colors">
                      <div className="w-6 h-6 rounded-md bg-red-100 text-danger flex items-center justify-center shrink-0 mt-0.5">
                        <PlaneTakeoff className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-midnight">Terminal Geo Displacement</span>
                          <span className="bg-red-500 text-white font-data text-[10px] font-bold px-1.5 py-0.5 rounded">+28 pts</span>
                        </div>
                        <p className="text-[11px] text-slateText mt-0.5">
                          Physical impossibility: Previous valid terminal swipe was recorded in <strong className="text-midnight">Frankfurt (DE)</strong> 12 minutes prior to this request in <strong className="text-midnight">Lagos (NG)</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slateLight/50 border border-slateBorder/60 flex items-start gap-2.5 hover:border-blue-200 transition-colors">
                      <div className="w-6 h-6 rounded-md bg-navy text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Gauge className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-midnight">Velocity Surge Spike</span>
                          <span className="bg-navy text-white font-data text-[10px] font-bold px-1.5 py-0.5 rounded">+18 pts</span>
                        </div>
                        <p className="text-[11px] text-slateText mt-0.5">
                          6 consecutive authorization attempts triggered within 240 seconds across 3 virtual POS terminals.
                        </p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slateLight/50 border border-slateBorder/60 flex items-start gap-2.5 hover:border-blue-200 transition-colors">
                      <div className="w-6 h-6 rounded-md bg-sapphire text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Fingerprint className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-midnight">Customer Channel Deviation</span>
                          <span className="bg-sapphire text-white font-data text-[10px] font-bold px-1.5 py-0.5 rounded">+14 pts</span>
                        </div>
                        <p className="text-[11px] text-slateText mt-0.5">
                          MCC 6051 (Quasi-Cash / Crypto Instrument) via unverified merchant relay with bypassed 3DS step-up protocol.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slateBorder">
                  <div className="flex items-center gap-2 text-xs font-data text-slateText">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-[15px] h-[15px]" />
                      <span>Decision confidence: 99.1%</span>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-midnight font-medium">Action Window: 18 seconds before settlement push</span>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-3 py-1 bg-slateLight hover:bg-slate-200 text-midnight text-xs font-medium rounded-lg transition-colors">
                      Escalate P1
                    </button>
                    <button className="flex-1 sm:flex-none px-3 py-1 bg-slateLight hover:bg-slate-200 text-midnight text-xs font-medium rounded-lg transition-colors">
                      Override &amp; Clear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 CORE PILLARS */}
        <section className="pt-8" id="product">
          <div className="text-center max-w-3xl mx-auto mb-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-xs font-bold font-data tracking-widest text-cerulean uppercase">Built for Precision &amp; Speed</span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-midnight mt-3">
              Three core capabilities engineered for high-throughput fraud operations
            </h2>
            <p className="mt-3 text-slateText text-base">
              Eliminate alert exhaustion and decision paralysis through deterministic behavioral analytics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl border border-slateBorder p-8 hover:border-cerulean/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-cerulean flex items-center justify-center mb-6 group-hover:bg-cerulean group-hover:text-white transition-all">
                  <Radar className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-midnight">1. Detect</h3>
                <p className="mt-3 text-slateText text-sm leading-relaxed">
                  Identify suspicious transaction behavior in real time across card networks, ACH, RTP, and merchant gateways with millisecond latency.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-slateText">
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Continuous customer baselining</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Device &amp; IP velocity indexing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Rail-agnostic payload ingestion</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slateBorder text-xs font-data text-slateText">
                Median Processing: <strong className="text-midnight font-bold">11.8ms</strong>
              </div>
            </div>

            <div className="group bg-white rounded-2xl border border-slateBorder p-8 hover:border-cerulean/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between delay-75">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-cerulean flex items-center justify-center mb-6 group-hover:bg-cerulean group-hover:text-white transition-all">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-midnight">2. Prioritize</h3>
                <p className="mt-3 text-slateText text-sm leading-relaxed">
                  Surface only the highest-risk transactions and alerts, eliminating cognitive fatigue with calibrated financial risk tiers.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-slateText">
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Dollar-at-risk weighted queues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Automated Low-Risk fast-pass</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Real-time SLA countdown counters</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slateBorder text-xs font-data text-slateText">
                Noise Reduction: <strong className="text-midnight font-bold">68% vs Rule-Only</strong>
              </div>
            </div>

            <div className="group bg-white rounded-2xl border border-slateBorder p-8 hover:border-cerulean/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between delay-150">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-cerulean flex items-center justify-center mb-6 group-hover:bg-cerulean group-hover:text-white transition-all">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-midnight">3. Explain</h3>
                <p className="mt-3 text-slateText text-sm leading-relaxed">
                  Show the exact behavioral indicators behind every flag with plain-English causality instead of indecipherable model weights.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-slateText">
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Human-readable root causes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Point-by-point score attribution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-[18px] h-[18px] text-cerulean" />
                    <span>Pre-built audit logs for regulators</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slateBorder text-xs font-data text-slateText">
                Triage Speed: <strong className="text-midnight font-bold">4.2x Faster Reviews</strong>
              </div>
            </div>
          </div>
        </section>

        {/* SPEED VS SCRUTINY */}
        <section className="bg-gradient-to-b from-slateLight/70 to-white rounded-3xl border border-slateBorder p-8 lg:p-14">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold font-data tracking-widest text-cerulean uppercase">The Core Dilemma</span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-midnight mt-2">Speed vs. Scrutiny in Fraud Triage</h2>
            <p className="mt-3 text-slateText text-base">
              Financial systems process transactions in milliseconds. Risk analysts are forced to spend minutes reconstructing why an alert fired.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white rounded-2xl border border-red-200/80 p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-danger"></div>
              <div className="flex items-center gap-2.5 text-danger mb-6">
                <XCircle className="w-6 h-6" />
                <span className="font-headline font-bold text-lg">The Fragmented Workflow</span>
              </div>
              <ul className="space-y-6 text-sm text-slateText">
                <li className="flex items-start gap-3">
                  <XCircle className="w-[18px] h-[18px] text-danger shrink-0 mt-0.5" />
                  <span><strong className="text-midnight font-semibold">Opaque Machine Scores:</strong> An isolated integer like "Score: 87" leaves the analyst wondering what actually triggered the alert.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-[18px] h-[18px] text-danger shrink-0 mt-0.5" />
                  <span><strong className="text-midnight font-semibold">Tab &amp; Tool Juggling:</strong> Analysts switch between payment gateways, card network portals, and customer CRM tools to piece together data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-[18px] h-[18px] text-danger shrink-0 mt-0.5" />
                  <span><strong className="text-midnight font-semibold">Alert Paralysis:</strong> Thousands of unranked low-priority notifications drown out real corporate account takeover threats.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-midnight rounded-2xl border border-navy p-8 shadow-xl relative overflow-hidden text-white">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-cerulean"></div>
              <div className="flex items-center gap-2.5 text-ceruleanBright mb-6">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-headline font-bold text-lg text-white">The PayScratch Standard</span>
              </div>
              <ul className="space-y-6 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <Check className="w-[18px] h-[18px] text-ceruleanBright shrink-0 mt-0.5" />
                  <span><strong className="text-white font-semibold">Deterministic Causality:</strong> Every alert displays the top behavioral drivers in plain language with exact point contributions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-[18px] h-[18px] text-ceruleanBright shrink-0 mt-0.5" />
                  <span><strong className="text-white font-semibold">Unified Single Pane:</strong> Device telemetry, geo-vectors, and past card behavior are unified into an intuitive analyst ledger.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-[18px] h-[18px] text-ceruleanBright shrink-0 mt-0.5" />
                  <span><strong className="text-white font-semibold">1-Click Audit Readiness:</strong> Dispositions automatically log timestamped rationale and regulation-ready reason codes.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SEQUENTIAL PIPELINE */}
        <section className="pt-4" id="how-it-works">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold font-data tracking-widest text-cerulean uppercase">Sequential Pipeline</span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-midnight mt-2">How PayScratch Powers Fraud Operations</h2>
            <p className="mt-3 text-slateText text-base">
              From raw transaction ingestion to audit-compliant resolution in four transparent steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-slateBorder p-6 flex flex-col justify-between hover:border-cerulean/50 transition-colors shadow-sm">
              <div>
                <span className="font-data font-bold text-3xl text-cerulean/30">01</span>
                <h3 className="font-headline font-bold text-lg text-midnight mt-2">Analyze</h3>
                <p className="mt-2 text-slateText text-xs leading-relaxed">
                  Ingest live payloads and continuous behavioral telemetry across cards, wallets, and payment rails via REST or Webhooks.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slateBorder/80 font-data text-[11px] text-slateText">
                Input: JSON Payload
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slateBorder p-6 flex flex-col justify-between hover:border-cerulean/50 transition-colors shadow-sm">
              <div>
                <span className="font-data font-bold text-3xl text-cerulean/30">02</span>
                <h3 className="font-headline font-bold text-lg text-midnight mt-2">Detect</h3>
                <p className="mt-2 text-slateText text-xs leading-relaxed">
                  Cross-examine the event against dynamic customer baselines, device fingerprints, and merchant velocity curves.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slateBorder/80 font-data text-[11px] text-slateText">
                Evaluation: Heuristics
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slateBorder p-6 flex flex-col justify-between hover:border-cerulean/50 transition-colors shadow-sm">
              <div>
                <span className="font-data font-bold text-3xl text-cerulean/30">03</span>
                <h3 className="font-headline font-bold text-lg text-midnight mt-2">Explain</h3>
                <p className="mt-2 text-slateText text-xs leading-relaxed">
                  Translate model triggers into human-readable causal indicators with specific point weights and clear risk rationale.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slateBorder/80 font-data text-[11px] text-slateText">
                Output: Causal Tree
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slateBorder p-6 flex flex-col justify-between hover:border-cerulean/50 transition-colors shadow-sm">
              <div>
                <span className="font-data font-bold text-3xl text-cerulean/30">04</span>
                <h3 className="font-headline font-bold text-lg text-midnight mt-2">Act</h3>
                <p className="mt-2 text-slateText text-xs leading-relaxed">
                  Empower analysts with 1-click audit-compliant disposition (Approve, Challenge via 3DS, or Instant Freeze).
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slateBorder/80 font-data text-[11px] text-slateText">
                Outcome: Disposition Log
              </div>
            </div>
          </div>
        </section>

        {/* WORKBENCH */}
        <section className="pt-4" id="analytics">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold font-data tracking-widest text-cerulean uppercase">Triage Workbench</span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-midnight mt-2">A unified workbench built for daily triage</h2>
            <p className="mt-3 text-slateText text-base">
              Review real-time operations, track risk distribution across payment corridors, and resolve alerts with precision.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slateBorder shadow-xl overflow-hidden">
            <div className="bg-midnight px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b border-navy">
              <div className="flex items-center gap-4">
                <span className="font-headline font-bold text-white text-lg">Operations Workstation</span>
                <div className="flex items-center gap-2 bg-navy px-3 py-1 rounded-full border border-navyLight">
                  <span className="w-2 h-2 rounded-full bg-cerulean animate-pulse"></span>
                  <span className="text-xs font-medium text-slate-200">Live Feed: Synchronized</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button className="px-3.5 py-1.5 bg-navy hover:bg-navyLight text-xs font-medium text-slate-200 rounded-lg border border-navyLight transition-colors">
                  Filter Corridor: Global
                </button>
                <button className="px-3.5 py-1.5 bg-cerulean hover:bg-sapphire text-white text-xs font-semibold rounded-lg shadow-sm transition-all">
                  Export Report
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 p-6 gap-4 bg-slateLight/40 border-b border-slateBorder">
              <div className="bg-white p-4 rounded-xl border border-slateBorder">
                <span className="text-xs text-slateText font-medium">Monitored Volume (24h)</span>
                <div className="font-data font-bold text-2xl text-midnight mt-1 tabular-nums">$48.2M</div>
                <span className="text-xs text-cerulean font-medium">312,480 tx processed</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slateBorder">
                <span className="text-xs text-slateText font-medium">Active Triage Backlog</span>
                <div className="font-data font-bold text-2xl text-midnight mt-1 tabular-nums">14 <span className="text-danger text-sm font-sans font-semibold">Alerts</span></div>
                <span className="text-xs text-slateText font-data">SLA target: &lt; 3 mins</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slateBorder">
                <span className="text-xs text-slateText font-medium">Confirmed Anomalies</span>
                <div className="font-data font-bold text-2xl text-danger mt-1 tabular-nums">1.24%</div>
                <span className="text-xs text-slateText font-medium">Within target corridor</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slateBorder">
                <span className="text-xs text-slateText font-medium">Explainability Score</span>
                <div className="font-data font-bold text-2xl text-cerulean mt-1 tabular-nums">100%</div>
                <span className="text-xs text-slateText font-medium">Full causal breakdown</span>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-white border-b border-slateBorder">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs font-medium text-slateText">
                <span>Corridor Risk Distribution</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-200"></span> Low (0-39)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span> Med (40-74)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span> High (75-89)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-danger"></span> Critical (90+)</span>
                </div>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full flex overflow-hidden">
                <div className="h-full bg-blue-200" style={{ width: '82%' }}></div>
                <div className="h-full bg-blue-500" style={{ width: '11%' }}></div>
                <div className="h-full bg-indigo-600" style={{ width: '5%' }}></div>
                <div className="h-full bg-danger" style={{ width: '2%' }}></div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left font-data text-xs">
                <thead>
                  <tr className="bg-slateLight/70 border-b border-slateBorder text-slateText font-semibold">
                    <th className="py-3 px-6">TxID</th>
                    <th className="py-3 px-6">Timestamp</th>
                    <th className="py-3 px-6">Entity / Account</th>
                    <th className="py-3 px-6">Amount</th>
                    <th className="py-3 px-6">Risk Score</th>
                    <th className="py-3 px-6">Primary Trigger</th>
                    <th className="py-3 px-6 text-right">Disposition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slateBorder">
                  <tr className="hover:bg-slateLight/40 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-cerulean">TX-90428</td>
                    <td className="py-3.5 px-6 text-slateText">14:02:18 UTC</td>
                    <td className="py-3.5 px-6 font-sans font-medium text-midnight">Vortex Corp (AC-4410)</td>
                    <td className="py-3.5 px-6 font-bold text-midnight">$14,250.00</td>
                    <td className="py-3.5 px-6">
                      <span className="bg-dangerBg border border-dangerBorder text-danger text-[11px] px-2 py-0.5 rounded font-bold">94 / 100</span>
                    </td>
                    <td className="py-3.5 px-6 font-sans text-slateText">Geo Impossibility (FRA &gt; LOS)</td>
                    <td className="py-3.5 px-6 text-right font-sans">
                      <button className="px-3 py-1 bg-danger hover:bg-red-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm">Review &amp; Block</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slateLight/40 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-cerulean">TX-90427</td>
                    <td className="py-3.5 px-6 text-slateText">14:01:55 UTC</td>
                    <td className="py-3.5 px-6 font-sans font-medium text-midnight">Global Pay Direct (AC-8812)</td>
                    <td className="py-3.5 px-6 font-bold text-midnight">$2,400.00</td>
                    <td className="py-3.5 px-6">
                      <span className="bg-blue-50 border border-blue-200 text-sapphire text-[11px] px-2 py-0.5 rounded font-bold">78 / 100</span>
                    </td>
                    <td className="py-3.5 px-6 font-sans text-slateText">Sudden Velocity Spike (5x in 3m)</td>
                    <td className="py-3.5 px-6 text-right font-sans">
                      <button className="px-3 py-1 bg-slateLight hover:bg-slate-200 text-midnight font-medium text-xs rounded-lg border border-slateBorder transition-colors">Inspect</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slateLight/40 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-cerulean">TX-90426</td>
                    <td className="py-3.5 px-6 text-slateText">14:00:12 UTC</td>
                    <td className="py-3.5 px-6 font-sans font-medium text-midnight">Acuity Retail (AC-1029)</td>
                    <td className="py-3.5 px-6 font-bold text-midnight">$89.50</td>
                    <td className="py-3.5 px-6">
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] px-2 py-0.5 rounded font-bold">12 / 100</span>
                    </td>
                    <td className="py-3.5 px-6 font-sans text-slateText">Known recurring POS profile</td>
                    <td className="py-3.5 px-6 text-right font-sans">
                      <span className="text-emerald-600 font-semibold text-xs">Auto-Cleared</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* WHY PAYSCRATCH */}
        <section className="pt-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold font-data tracking-widest text-cerulean uppercase">Why PayScratch</span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-midnight mt-2">Purpose-built for mission-critical risk teams</h2>
            <p className="mt-3 text-slateText text-base">
              Engineered specifically to solve the friction points of modern payment fraud operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slateBorder shadow-sm hover:border-cerulean/50 transition-all flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-cerulean flex items-center justify-center shrink-0">
                <LineChart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-midnight">Dynamic Behavioral Profiling</h3>
                <p className="mt-2 text-slateText text-sm leading-relaxed">
                  Static if-then rules break down under high card turnover. PayScratch maintains adaptive baselines for each merchant corridor, card bin, and user entity.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slateBorder shadow-sm hover:border-cerulean/50 transition-all flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-cerulean flex items-center justify-center shrink-0">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-midnight">Financial Risk Prioritization</h3>
                <p className="mt-2 text-slateText text-sm leading-relaxed">
                  Alert queues are structured automatically by financial loss exposure and SLA deadlines, guaranteeing that catastrophic threats are triaged first.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slateBorder shadow-sm hover:border-cerulean/50 transition-all flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-cerulean flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-midnight">Full Causal Transparency</h3>
                <p className="mt-2 text-slateText text-sm leading-relaxed">
                  Black-box scores create analyst hesitation. PayScratch breaks down score components into straightforward causal statements that explain the flag.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slateBorder shadow-sm hover:border-cerulean/50 transition-all flex items-start gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-cerulean flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-lg text-midnight">Audit-Compliant Records</h3>
                <p className="mt-2 text-slateText text-sm leading-relaxed">
                  Every block, escalation, or override is committed to an immutable ledger with timestamps, reason codes, and analyst operator identity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AUDIENCE */}
        <section className="pt-4" id="audience">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold font-data tracking-widest text-cerulean uppercase">Target Operators</span>
            <h2 className="font-headline font-bold text-3xl sm:text-4xl text-midnight mt-2">Tailored for modern payment architectures</h2>
            <p className="mt-3 text-slateText text-base">
              Whether handling high-volume consumer cards or specialized corporate treasury rails.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl border border-slateBorder p-6 flex flex-col justify-between hover:border-cerulean/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slateLight text-cerulean flex items-center justify-center mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-lg text-midnight">Fraud Analysts</h3>
                <p className="mt-2 text-slateText text-xs leading-relaxed">
                  Clear queues faster with instant behavioral context and zero cognitive fatigue from opaque numeric scores.
                </p>
              </div>
              <div className="mt-6 text-cerulean font-semibold text-xs">
                Accelerated Triage Flow
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slateBorder p-6 flex flex-col justify-between hover:border-cerulean/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 delay-75">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slateLight text-cerulean flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-lg text-midnight">Risk &amp; Compliance</h3>
                <p className="mt-2 text-slateText text-xs leading-relaxed">
                  Maintain complete auditability with PCI-DSS compliant decision records and verifiable reason codes for regulators.
                </p>
              </div>
              <div className="mt-6 text-cerulean font-semibold text-xs">
                Immutable Audit Trails
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slateBorder p-6 flex flex-col justify-between hover:border-cerulean/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 delay-150">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slateLight text-cerulean flex items-center justify-center mb-4">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-lg text-midnight">FinTech Companies</h3>
                <p className="mt-2 text-slateText text-xs leading-relaxed">
                  Protect transaction margins and user accounts against fraud without introducing checkout friction for good users.
                </p>
              </div>
              <div className="mt-6 text-cerulean font-semibold text-xs">
                Zero Conversion Drag
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slateBorder p-6 flex flex-col justify-between hover:border-cerulean/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 delay-200">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slateLight text-cerulean flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-headline font-bold text-lg text-midnight">Financial Institutions</h3>
                <p className="mt-2 text-slateText text-xs leading-relaxed">
                  Scale automated fraud monitoring across high-volume card networks, corporate accounts, and RTP payment rails.
                </p>
              </div>
              <div className="mt-6 text-cerulean font-semibold text-xs">
                Multi-Rail Scalability
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-4">
          <div className="bg-midnight rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden border border-navy shadow-2xl">
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cerulean/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-ceruleanBright mb-6 border border-navyLight">
                <ShieldCheck className="w-[28px] h-[28px]" />
              </div>
              <h2 className="font-headline font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Turn suspicious transactions into actionable insights.
              </h2>
              <p className="mt-4 text-slate-300 text-base leading-relaxed max-w-lg">
                Equip your risk team with the behavioral intelligence needed to detect, prioritize, and stop payment fraud.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link to="/signup" className="px-6 py-3 bg-cerulean hover:bg-sapphire text-white font-semibold rounded-xl shadow-lg shadow-cerulean/30 transition-all">
                  Get Started with PayScratch
                </Link>
                <Link to="/signup" className="px-6 py-3 bg-navy hover:bg-navyLight border border-navyLight text-white font-semibold rounded-xl transition-all">
                  Request a Product Tour
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slateBorder bg-white mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-sapphire" />
            <span className="font-headline font-bold text-lg tracking-tight text-midnight uppercase">PayScratch</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slateText">
            <Link to="/login" className="hover:text-cerulean transition-colors">Log In</Link>
            <Link to="/signup" className="hover:text-cerulean transition-colors">Sign Up</Link>
            <a href="#" className="hover:text-cerulean transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cerulean transition-colors">Terms of Service</a>
          </div>
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} PayScratch Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
