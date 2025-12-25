import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  Search, 
  BookOpen, 
  ChevronRight, 
  X,
  Bot,
  MapPin,
  Calendar,
  ExternalLink,
  Menu,
  Home,
  Settings,
  Copy,
  Check,
  ZoomIn,
  ZoomOut,
  ChevronLeft
} from 'lucide-react';

// --- Mock Data ---

const MOCK_KNOWLEDGE_BASE = {
  flood: [
    {
      id: 1,
      title: "Flood Claim Deductible Logic",
      summary: "In declared disaster zones (Zone A), the standard $500 deductible is waived if damages exceed $5,000. This supersedes the 2023 policy.",
      source: "FL_Insurance_Regs_2024.pdf",
      page: 42,
      paragraph: "12.3.a",
      confidence: 98,
      lastUpdated: "2024-01-15",
      type: "Regulation"
    },
    {
      id: 2,
      title: "SOP: Water Damage Evidence",
      summary: "Agents must request geolocated photos for standing water claims. Metadata verification is required for all digital submissions.",
      source: "SOP_Claims_Processing_v9.pdf",
      page: 15,
      paragraph: "4.1",
      confidence: 92,
      lastUpdated: "2023-11-20",
      type: "SOP"
    },
    {
      id: 5,
      title: "Emergency Housing Stipend",
      summary: "Policyholders displaced by Category 3+ storms are eligible for immediate $2,500 emergency housing stipend pending final adjustment.",
      source: "FEMA_Integration_Guide.pdf",
      page: 8,
      paragraph: "2.1",
      confidence: 85,
      lastUpdated: "2023-09-01",
      type: "Guideline"
    }
  ],
  auto: [
    {
      id: 3,
      title: "No-Fault State Protocol",
      summary: "Florida is a no-fault state. Personal Injury Protection (PIP) applies regardless of driver liability up to the $10,000 limit.",
      source: "FL_Traffic_Statutes_2024.pdf",
      page: 108,
      paragraph: "627.736",
      confidence: 99,
      lastUpdated: "2024-03-01",
      type: "Statute"
    },
    {
      id: 4,
      title: "Total Loss Calculation",
      summary: "A vehicle is a total loss if the cost of repair plus salvage value exceeds 80% of the Actual Cash Value (ACV).",
      source: "Auto_Claims_Handbook.pdf",
      page: 22,
      paragraph: "7.B",
      confidence: 89,
      lastUpdated: "2022-08-10",
      type: "Internal Policy"
    }
  ]
};

// --- Helper Components ---

const Tooltip = ({ text, children }) => (
  <div className="group relative flex items-center justify-center">
    {children}
    <div className="absolute left-14 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
      {text}
    </div>
  </div>
);

const DocumentPreviewModal = ({ doc, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(doc?.page || 1);

  if (!doc) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Toolbar */}
        <div className="bg-slate-800 text-white px-4 py-3 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 p-1 rounded">
              <FileText size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-sm">{doc.source}</h3>
              <p className="text-[10px] text-slate-400">Last Synced: {doc.lastUpdated} • <span className="text-green-400">Verified</span></p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-700 rounded-lg p-1">
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1.5 hover:bg-slate-600 rounded"><ZoomOut size={16} /></button>
            <span className="text-xs w-12 text-center font-mono">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1.5 hover:bg-slate-600 rounded"><ZoomIn size={16} /></button>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} className="text-slate-400 hover:text-white" />
          </button>
        </div>

        {/* Modal Content (Mock PDF View) */}
        <div className="flex-1 overflow-y-auto bg-slate-500/10 p-8 relative flex justify-center">
          <div 
            className="bg-white shadow-2xl transition-all duration-200 ease-out border border-slate-200"
            style={{ 
              width: `${800 * (zoom / 100)}px`, 
              minHeight: `${1100 * (zoom / 100)}px`,
              padding: `${60 * (zoom / 100)}px`
            }}
          >
            {/* Fake PDF Header */}
            <div className="flex justify-between border-b-2 border-slate-800 pb-4 mb-12 opacity-80">
               <div className="text-2xl font-serif font-bold text-slate-900">OFFICIAL POLICY DOCUMENT</div>
               <div className="text-sm font-mono text-slate-500">REF: {doc.type}-{doc.id}</div>
            </div>

            {/* Fake Content Generator */}
            <div className="space-y-6 opacity-80 font-serif text-slate-800 text-justify" style={{ fontSize: `${16 * (zoom / 100)}px` }}>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              
              <div className="pl-4 border-l-4 border-slate-300 py-2">
                 <p className="mb-2 font-bold text-slate-900">12.1 General Provisions</p>
                 <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
              </div>

              {/* The Highlighted Providence Section */}
              <div className="relative my-8">
                <div className="absolute -left-16 top-0 bottom-0 w-2 bg-yellow-400" />
                <div className="bg-yellow-50/80 p-6 rounded-r border-y border-r border-yellow-200">
                  <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-slate-900">Section {doc.paragraph} (Cited)</h4>
                     <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded shadow">AI MATCH</span>
                  </div>
                  <p className="leading-relaxed">
                    "{doc.summary}..." <br/>
                    <span className="text-slate-500 italic text-sm mt-2 block">
                      (Start of verifiable legal text) The insurer shall waive the deductible defined in Section 4A whenever the Governor declares a State of Emergency for the affected zones...
                    </span>
                  </p>
                </div>
              </div>

              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
              <div className="w-full h-48 bg-slate-100 border border-slate-200 mt-8 flex items-center justify-center text-slate-400 italic">
                 [Figure 1.2: Zone Demarcation Map Placeholder]
              </div>
            </div>

            {/* Footer */}
             <div className="mt-24 pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-400 font-sans">
               <span>Page {currentPage} of 58</span>
               <span>Confidential - Internal Use Only</span>
             </div>
          </div>
        </div>

        {/* Floating Page Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-4 text-sm z-20">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} className="hover:text-blue-300"><ChevronLeft size={16} /></button>
          <span>Page {currentPage}</span>
          <button onClick={() => setCurrentPage(p => p+1)} className="hover:text-blue-300"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};

// --- Views for the Main Panel ---

const DashboardView = ({ setView }) => (
  <div className="p-10 text-center max-w-2xl mx-auto">
    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
      <Home size={40} />
    </div>
    <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome back, Agent Smith</h2>
    <p className="text-slate-500 mb-8">You have 3 high-priority cases pending review and 1 regulatory update requiring acknowledgment.</p>
    <div className="grid grid-cols-2 gap-4 text-left">
      <div onClick={() => setView('case')} className="p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all group">
         <div className="flex justify-between mb-4">
           <FileText className="text-blue-500 group-hover:scale-110 transition-transform" />
           <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">ACTION REQUIRED</span>
         </div>
         <h3 className="font-bold text-slate-800">Case #492-881-AC</h3>
         <p className="text-sm text-slate-500 mt-1">Flood Claim • Florida</p>
      </div>
      <div className="p-6 bg-white border border-slate-200 rounded-xl hover:border-emerald-400 hover:shadow-lg cursor-pointer transition-all">
         <div className="flex justify-between mb-4">
           <ShieldCheck className="text-emerald-500" />
           <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">UPDATED</span>
         </div>
         <h3 className="font-bold text-slate-800">Compliance Hub</h3>
         <p className="text-sm text-slate-500 mt-1">Review Q3 Regulations</p>
      </div>
    </div>
  </div>
);

const ComplianceView = () => (
  <div className="p-8">
     <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
       <ShieldCheck className="text-emerald-500" /> Compliance Audit Log
     </h2>
     <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
       <table className="w-full text-sm text-left">
         <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
           <tr>
             <th className="p-4">Timestamp</th>
             <th className="p-4">Agent</th>
             <th className="p-4">Action</th>
             <th className="p-4">Source Cited</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-slate-100">
           {[1,2,3,4].map((i) => (
             <tr key={i} className="hover:bg-slate-50">
               <td className="p-4 text-slate-500">2024-10-24 09:1{i} AM</td>
               <td className="p-4 text-slate-900">A. Smith</td>
               <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">APPROVED</span></td>
               <td className="p-4 font-mono text-blue-600">FL_Regs_2024.pdf (Sec 12.3)</td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  // Navigation State
  const [activeView, setActiveView] = useState('case');
  
  // Case Workflow State
  const [caseType, setCaseType] = useState('flood');
  const [agentNotes, setAgentNotes] = useState('');
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Filter Logic for Knowledge Base
  const currentSuggestions = MOCK_KNOWLEDGE_BASE[caseType].filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCaseSwitch = (type) => {
    setLoading(true);
    setCaseType(type);
    setSearchQuery(''); // Clear filter on context switch
    setTimeout(() => setLoading(false), 600);
  };

  const handleCopyToNotes = (item) => {
    const citation = `\n[Reference: ${item.source}, Section ${item.paragraph}] - ${item.summary}\n`;
    setAgentNotes(prev => prev + citation);
    
    // Visual Feedback
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* 1. Header */}
      <header className="bg-slate-900 text-white h-14 flex items-center px-6 justify-between shadow-md z-30 relative">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Bot size={20} className="text-white" />
          </div>
          <h1 className="font-semibold text-lg tracking-tight">Appian <span className="text-blue-400 font-normal">Intelligent Case Management</span></h1>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-300">
          <div className="hidden md:flex items-center gap-6 mr-4">
             <span className="hover:text-white cursor-pointer transition-colors">Help</span>
             <span className="hover:text-white cursor-pointer transition-colors">Settings</span>
          </div>
          <span className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> 
            System Online
          </span>
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg border border-slate-600 cursor-pointer">AS</div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        
        {/* 2. Interactive Sidebar */}
        <div className="w-16 bg-slate-800 flex flex-col items-center py-6 gap-6 border-r border-slate-700 hidden md:flex z-20 shadow-xl">
          <Tooltip text="Menu"><Menu className="text-slate-400 hover:text-white cursor-pointer transition-colors" /></Tooltip>
          
          <div className="w-full h-px bg-slate-700 my-2"></div>
          
          <Tooltip text="Dashboard">
            <button 
              onClick={() => setActiveView('dashboard')}
              className={`p-3 rounded-xl transition-all ${activeView === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
            >
              <Home size={20} />
            </button>
          </Tooltip>

          <Tooltip text="Active Case">
            <button 
              onClick={() => setActiveView('case')}
              className={`p-3 rounded-xl transition-all ${activeView === 'case' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
            >
              <FileText size={20} />
            </button>
          </Tooltip>

          <Tooltip text="Compliance Logs">
            <button 
              onClick={() => setActiveView('compliance')}
              className={`p-3 rounded-xl transition-all ${activeView === 'compliance' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
            >
              <ShieldCheck size={20} />
            </button>
          </Tooltip>
          
          <div className="mt-auto pb-4">
             <Settings className="text-slate-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
        
        {/* 3. Main Content Area */}
        <main className="flex-1 flex overflow-hidden relative">
          
          {/* View Switcher Logic */}
          {activeView === 'dashboard' && <div className="flex-1 bg-slate-50 overflow-y-auto"><DashboardView setView={setActiveView} /></div>}
          {activeView === 'compliance' && <div className="flex-1 bg-slate-50 overflow-y-auto"><ComplianceView /></div>}
          
          {activeView === 'case' && (
            <>
              {/* Left Panel: The Case Workflow */}
              <div className="flex-1 overflow-y-auto p-8 border-r border-slate-200 bg-white min-w-[500px]">
                
                {/* Workflow Toolbar */}
                <div className="mb-8 flex justify-between items-end border-b border-slate-100 pb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                       <h2 className="text-2xl font-bold text-slate-900">Case #492-881-AC</h2>
                       <span className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-100">HIGH PRIORITY</span>
                    </div>
                    <p className="text-slate-500 text-sm">Opened 2 days ago • Assigned to Agent Smith</p>
                  </div>
                  
                  {/* Functional Scenario Switcher */}
                  <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium">
                     <button 
                      onClick={() => handleCaseSwitch('flood')}
                      className={`px-4 py-1.5 rounded-md transition-all ${caseType === 'flood' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                       Flood (FL)
                     </button>
                     <button 
                      onClick={() => handleCaseSwitch('auto')}
                      className={`px-4 py-1.5 rounded-md transition-all ${caseType === 'auto' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                       Auto (FL)
                     </button>
                  </div>
                </div>

                {/* Case Details Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Policy Holder</label>
                    <input type="text" value="Robert J. Oppenheimer" readOnly className="w-full p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 font-medium focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Policy Status</label>
                    <div className="flex items-center gap-2 w-full p-2.5 border border-green-200 rounded-lg bg-green-50 text-green-700 font-medium">
                      <ShieldCheck size={16} /> Verified Active
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Jurisdiction</label>
                    <div className="flex items-center gap-2 w-full p-2.5 border border-slate-200 rounded-lg bg-white text-slate-700">
                      <MapPin size={16} className="text-slate-400" /> Florida (Zone A)
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date of Loss</label>
                    <div className="flex items-center gap-2 w-full p-2.5 border border-slate-200 rounded-lg bg-white text-slate-700">
                      <Calendar size={16} className="text-slate-400" /> Oct 12, 2024
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Incident Report</label>
                  <div className="w-full p-4 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 text-sm leading-relaxed">
                    {caseType === 'flood' 
                      ? "Customer reports significant water intrusion in the ground floor living area following Hurricane Milton. Approximately 3 inches of standing water. Customer is asking about deductible waiver citing state of emergency."
                      : "Customer was rear-ended at a stoplight in Miami. Other driver admits fault but customer is asking if they need to use their own PIP coverage first."
                    }
                  </div>
                </div>

                 <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Agent Determination Notes</label>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Auto-save enabled</span>
                  </div>
                  <textarea 
                    className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-sm leading-relaxed shadow-inner"
                    placeholder="Enter your final determination here. Use the AI panel to cite specific regulations..."
                    value={agentNotes}
                    onChange={(e) => setAgentNotes(e.target.value)}
                  />
                  <p className="text-xs text-slate-400 italic">Tip: Click the 'Copy' icon on AI cards to insert verified citations directly.</p>
                </div>
              </div>

              {/* Right Panel: The Intelligent Knowledge System */}
              <div className="w-[420px] bg-slate-50 border-l border-slate-200 flex flex-col shadow-xl z-20 transition-all">
                
                {/* AI Header */}
                <div className="p-5 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                      <Bot className="text-blue-600" size={20} />
                      Providence AI
                    </h3>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full font-bold tracking-wide">CONFIDENTIAL</span>
                  </div>

                  {/* Context Badge */}
                  <div className="mb-4 flex flex-wrap gap-2">
                     <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                        <MapPin size={10} /> FL
                     </span>
                     <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                        {caseType === 'flood' ? 'Hurricane' : 'Vehicle Collision'}
                     </span>
                     <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-100 font-medium">
                        <ShieldCheck size={10} /> Verified Sources Only
                     </span>
                  </div>

                  {/* Search Filter */}
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filter relevant policies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Suggestions Stream */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  
                  {loading ? (
                    <div className="space-y-4 pt-4">
                       {[1,2,3].map(i => (
                         <div key={i} className="animate-pulse">
                           <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                           <div className="h-20 bg-slate-100 rounded mb-2"></div>
                           <div className="h-8 bg-slate-200 rounded"></div>
                         </div>
                       ))}
                    </div>
                  ) : currentSuggestions.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                      <Search size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No relevant policies found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    currentSuggestions.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all group overflow-hidden">
                        
                        {/* Card Header */}
                        <div className="px-4 py-3 bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            {item.type === 'Regulation' || item.type === 'Statute' ? (
                              <ShieldCheck size={14} className="text-orange-600" />
                            ) : (
                              <BookOpen size={14} className="text-blue-600" />
                            )}
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${item.type === 'Regulation' ? 'text-orange-700' : 'text-blue-700'}`}>
                              {item.type}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                             {item.confidence}% Match
                          </span>
                        </div>

                        {/* Card Body */}
                        <div className="p-4">
                          <h4 className="font-bold text-slate-800 text-sm mb-2 leading-tight">{item.title}</h4>
                          <p className="text-sm text-slate-600 leading-relaxed mb-4">
                            {item.summary}
                          </p>

                          {/* Action Bar */}
                          <div className="flex gap-2">
                            {/* Provenance Link */}
                            <button 
                              onClick={() => setSelectedDoc(item)}
                              className="flex-1 flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg text-xs transition-all group/btn"
                            >
                              <div className="flex items-center gap-2 text-slate-500 group-hover/btn:text-blue-700">
                                  <FileText size={14} />
                                  <span className="truncate max-w-[140px] font-medium">Verify Source</span>
                              </div>
                              <ExternalLink size={12} className="text-slate-300 group-hover/btn:text-blue-400" />
                            </button>

                            {/* Copy Action */}
                            <Tooltip text="Insert to Notes">
                              <button 
                                onClick={() => handleCopyToNotes(item)}
                                className={`px-3 py-2 border rounded-lg transition-colors flex items-center justify-center ${
                                  copiedId === item.id 
                                  ? 'bg-green-50 border-green-200 text-green-600' 
                                  : 'bg-white border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-200'
                                }`}
                              >
                                {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    ))
                  )}

                  {/* Disclaimer */}
                  <div className="flex gap-3 items-start p-3 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-800/80 mt-6">
                    <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
                    <p className="leading-snug">AI suggestions are generated based on currently indexed documents. Verify all regulations via the <span className="font-bold">Verify Source</span> button before finalizing determination.</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Providence Modal */}
      {selectedDoc && (
        <DocumentPreviewModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}

    </div>
  );
}
