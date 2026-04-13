import React, { useState } from 'react';
import aboutHero from '../assets/au1.jpg';
import villageMap from '../assets/village-map.jpg';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, 
  Line, ComposedChart, PieChart, Pie, Cell 
} from 'recharts';
import { Users, Home, Map, Briefcase, Droplet, Zap, Phone, Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // Hook එක import කරගන්න

export default function About() {
  const [activeTab, setActiveTab] = useState('demographics');
  const { lang } = useLanguage(); // Global Context එකෙන් භාෂාව ලබාගැනීම

  
  const t = {
    heroTitle: { si: 'අපගේ කර්මාන්තයේ හදවත', en: 'The Heart of Our Industry' },
    profileTitle: { si: 'ග්‍රාමීය පැතිකඩ:', en: 'Village Profile:' },
    profileDesc: { 
      si: 'අපගේ වේදිකාවේ ඇති සෑම වේවැල් නිර්මාණයක්ම රදාවඩුන්න ගම්මානයේ දක්ෂ ශිල්පීන්ගේ දෑතින් හැඩගැන්වුණු ඒවාය. මෙම ඓතිහාසික ප්‍රජාව පිළිබඳ සවිස්තරාත්මක දත්ත මෙහි දැක්වේ.', 
      en: 'Every cane product on our platform is handcrafted by the skilled artisans of Radawadunna village. Detailed data about this historic community is presented here.' 
    },
    historyTitle: { si: 'ඓතිහාසික පසුබිම', en: 'Historical Background' },
    gnDivision: { si: 'ග්‍රාම නිලධාරි වසම', en: 'GN Division' },
    dsDivision: { si: 'ප්‍රා.ලේ. කොට්ඨාසය', en: 'DS Division' },
    mapTitle: { si: 'ගමේ සමාජ සිතියම', en: 'Village Social Map' },
    dashboardTitle: { si: 'සවිස්තරාත්මක ග්‍රාමීය දත්ත විශ්ලේෂණය', en: 'Detailed Village Data Analysis' },
    kpiPop: { si: 'මුළු ජනගහනය', en: 'Total Population' },
    kpiFamilies: { si: 'පවුල්', en: 'Families' },
    kpiLand: { si: 'භූමි ප්‍රමාණය', en: 'Land Area' },
    kpiHectares: { si: 'හෙක්ටයාර', en: 'Hectares' },
    kpiEmp: { si: 'සේවා නියුක්තිය', en: 'Employment' },
    kpiEmpSub: { si: 'කාන්තා 134, පිරිමි 195', en: 'Female 134, Male 195' },
    kpiBudget: { si: 'යෝජිත අයවැය', en: 'Proposed Budget' },
    kpiBudgetSub: { si: 'සංවර්ධන යෝජනා 38', en: '38 Development Proposals' },
    tab1: { si: 'ජනගහනය සහ ආර්ථිකය', en: 'Demographics & Economy' },
    tab2: { si: 'භූගෝලීය සහ යටිතල පහසුකම්', en: 'Geography & Infrastructure' },
    tab3: { si: 'සංවර්ධන යෝජනා', en: 'Development Proposals' },
  };

  
  const villageData = {
    name: { si: "රදාවඩුන්න", en: "Radawadunna" },
    gnDivision: { si: "360 - රදාවඩුන්න", en: "360 - Radawadunna" },
    district: { si: "ගම්පහ", en: "Gampaha" },
    dsDivision: { si: "මීරිගම", en: "Mirigama" },
    population: "1,452",
    families: "421",
    landArea: { si: "හෙක්ටයාර 127.478", en: "127.478 Hectares" },
    history: { 
      si: "පණ්ඩුකාභය රජු වැඩඋන්නු ගම පසුකාලීනීව රජාවැඩුන්න ද පසුව එය රදාවඩුන්න ලෙස ව්‍යවහාර වූ බව කියවේ.", 
      en: "It is said that the village where King Pandukabhaya resided was later called 'Rajawadunna' and eventually evolved into 'Radawadunna'." 
    }
  };

  
  const weatherData = [
    { month: 'Jan', rain: 29, temp: 30.8 }, { month: 'Feb', rain: 36, temp: 31.7 },
    { month: 'Mar', rain: 55, temp: 32.1 }, { month: 'Apr', rain: 112, temp: 32.0 },
    { month: 'May', rain: 204, temp: 30.8 }, { month: 'Jun', rain: 231, temp: 29.6 },
    { month: 'Jul', rain: 177, temp: 29.2 }, { month: 'Aug', rain: 210, temp: 29.3 },
    { month: 'Sep', rain: 153, temp: 29.5 }, { month: 'Oct', rain: 224, temp: 29.9 },
    { month: 'Nov', rain: 174, temp: 30.2 }, { month: 'Dec', rain: 139, temp: 29.9 },
  ];

  const ageData = [
    { age: '0-5', count: 137 }, { age: '6-10', count: 158 },
    { age: '11-17', count: 192 }, { age: '18-29', count: 182 },
    { age: '30-45', count: 268 }, { age: '46-59', count: 253 },
    { age: '60-69', count: 127 }, { age: '70-99', count: 135 },
  ];

  const incomeExpData = [
    { range: '< 15k', income: 146, exp: 120 },
    { range: '15k-30k', income: 107, exp: 116 },
    { range: '30k-45k', income: 83, exp: 87 },
    { range: '45k-60k', income: 48, exp: 56 },
    { range: '60k-75k', income: 20, exp: 23 },
    { range: '75k-100k', income: 16, exp: 18 },
    { range: '> 100k', income: 6, exp: 6 },
  ];

  const employmentData = [
    { name: lang === 'si' ? 'රාජ්‍ය/අර්ධ රාජ්‍ය' : 'Gov/Semi-Gov', value: 110 }, 
    { name: lang === 'si' ? 'පෞද්ගලික' : 'Private', value: 42 },
    { name: lang === 'si' ? 'ස්වයං රැකියා' : 'Self-Employed', value: 125 }, 
    { name: lang === 'si' ? 'විදේශ සේවා' : 'Foreign Emp', value: 9 },
    { name: lang === 'si' ? 'වෙනත්' : 'Other', value: 43 }
  ];

  const landUseData = [
    { name: lang === 'si' ? 'ගෙවතු' : 'Home Gardens', value: 55.854 }, 
    { name: lang === 'si' ? 'මාර්ග හා ගොඩනැගිලි' : 'Roads & Buildings', value: 15.2 },
    { name: lang === 'si' ? 'කුඹුරු (වගා කළ)' : 'Paddy (Cultivated)', value: 5.260 }, 
    { name: lang === 'si' ? 'පුරන් කුඹුරු' : 'Abandoned Paddy', value: 5.256 },
    { name: lang === 'si' ? 'ප්‍රධාන/අපනයන බෝග' : 'Export Crops', value: 3.276 }, 
    { name: lang === 'si' ? 'මිශ්‍ර බෝග' : 'Mixed Crops', value: 0.808 }
  ];

  const projectProposals = [
    { category: lang === 'si' ? 'යටිතල පහසුකම් (ජලය/මාර්ග)' : 'Infrastructure (Water/Roads)', amount: 40420000, items: 11 },
    { category: lang === 'si' ? 'නව ව්‍යවසායකත්ව' : 'New Enterprises', amount: 7075000, items: 4 },
    { category: lang === 'si' ? 'දැනට පවතින ව්‍යවසායකත්ව' : 'Existing Enterprises', amount: 6200000, items: 3 },
    { category: lang === 'si' ? 'සමාජ සංවර්ධන' : 'Social Development', amount: 7010000, items: 5 },
    { category: lang === 'si' ? 'අධ්‍යාපන, සෞඛ්‍ය හා කෘෂිකර්ම' : 'Edu, Health & Agriculture', amount: 10250000, items: 8 },
    { category: lang === 'si' ? 'පරිසර හා නිපුණතා' : 'Environment & Skills', amount: 250000, items: 7 },
  ];

  const COLORS = ['#244034', '#D4AF37', '#4A5568', '#2B6CB0', '#C53030', '#38A169'];

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 font-sans">
      
      {/* 1. Hero Section */}
      <div className="w-full h-80 md:h-[450px] overflow-hidden relative">
        <img src={aboutHero} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight shadow-sm text-center px-4" style={{ textShadow: '0px 4px 12px rgba(0, 0, 0, 0.6)' }}>
            {t.heroTitle[lang]}
          </h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16">
        
        {/* 2. Village Profile Intro */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-4">
              {t.profileTitle[lang]} <span className="text-[#244034]">{villageData.name[lang]}</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-[15px] leading-relaxed">
              {t.profileDesc[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Historical Background Box - Refined Version */}
<div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 flex flex-col justify-center relative overflow-hidden group">
  {/* Decorative Elements */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-110"></div>
  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#244034]/5 rounded-full -z-10"></div>
  
  {/* Label Header */}
  <div className="flex items-center gap-3 mb-8">
    <div className="h-[2px] w-8 bg-[#D4AF37]"></div>
    <h3 className="text-sm font-black text-[#D4AF37] uppercase tracking-[0.2em]">
      {t.historyTitle[lang]}
    </h3>
  </div>

  {/* Main Quote Content */}
  <div className="relative">
    <svg 
      className="absolute -top-8 -left-6 w-16 h-16 text-gray-100 opacity-80" 
      fill="currentColor" viewBox="0 0 24 24"
    >
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.89543 10.9124 7 12.017 7H19.017C20.1216 7 21.017 7.89543 21.017 9V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H4.017C3.46472 8 3.017 8.44772 3.017 9V12C3.017 12.5523 2.56928 13 2.017 13H0.017C-0.535282 13 -1.017 12.5523 -1.017 12V9C-1.017 7.89543 -0.121573 7 0.983002 7H8.017C9.12157 7 10.017 7.89543 10.017 9V15C10.017 18.3137 7.33072 21 4.017 21H3.017Z" />
    </svg>
    
    <p className="text-[20px] md:text-[22px] leading-[1.8] text-gray-800 font-serif italic relative z-10 px-4">
      {villageData.history[lang]}
    </p>
  </div>

  {/* Location Tags */}
  <div className="mt-12 flex flex-wrap gap-4 pt-8 border-t border-gray-50">
    <div className="bg-[#244034]/5 px-4 py-2 rounded-full flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-[#244034]"></div>
      <span className="text-[12px] font-bold text-gray-500 uppercase">{t.gnDivision[lang]}:</span>
      <span className="text-[13px] font-bold text-[#244034]">{villageData.gnDivision[lang]}</span>
    </div>
    <div className="bg-[#D4AF37]/5 px-4 py-2 rounded-full flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
      <span className="text-[12px] font-bold text-gray-500 uppercase">{t.dsDivision[lang]}:</span>
      <span className="text-[13px] font-bold text-[#D4AF37]">{villageData.dsDivision[lang]}</span>
    </div>
  </div>
</div>

            {/* Social Map */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col">
               <h3 className="text-xl font-bold text-gray-900 mb-4">{t.mapTitle[lang]}</h3>
               <div className="flex-1 overflow-hidden rounded-xl border border-gray-200">
                 <img src={villageMap} alt="Map" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
               </div>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE DATA DASHBOARD */}
        <div className="mb-20 pt-10 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-8">{t.dashboardTitle[lang]}</h2>
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <KpiCard icon={<Users size={24} />} title={t.kpiPop[lang]} value="1,452" subtext={`421 ${t.kpiFamilies[lang]}`} />
            <KpiCard icon={<Map size={24} />} title={t.kpiLand[lang]} value="127.47" subtext={t.kpiHectares[lang]} />
            <KpiCard icon={<Briefcase size={24} />} title={t.kpiEmp[lang]} value="329" subtext={t.kpiEmpSub[lang]} />
            <KpiCard icon={<Landmark size={24} />} title={t.kpiBudget[lang]} value="Rs. 71.2M" subtext={t.kpiBudgetSub[lang]} />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-300 mb-10 overflow-x-auto hide-scrollbar gap-2">
            <TabButton active={activeTab === 'demographics'} onClick={() => setActiveTab('demographics')} label={t.tab1[lang]} />
            <TabButton active={activeTab === 'geography'} onClick={() => setActiveTab('geography')} label={t.tab2[lang]} />
            <TabButton active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} label={t.tab3[lang]} />
          </div>

          {/* --- TAB 1: Demographics --- */}
          {activeTab === 'demographics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
              <ChartCard title={lang === 'si' ? 'වයස් කාණ්ඩ අනුව ජනගහනය' : 'Population by Age Group'}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ageData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="age" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <ChartTooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="count" fill="#244034" radius={[4, 4, 0, 0]} name={lang === 'si' ? 'ජනගහනය' : 'Population'} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title={lang === 'si' ? 'මාසික ආදායම් හා වියදම් රටාව' : 'Monthly Income & Expenditure'}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={incomeExpData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <ChartTooltip cursor={{ fill: 'transparent' }} />
                    <Legend />
                    <Bar dataKey="income" fill="#244034" name={lang === 'si' ? 'ආදායම' : 'Income'} radius={[2, 2, 0, 0]} />
                    <Bar dataKey="exp" fill="#D4AF37" name={lang === 'si' ? 'වියදම' : 'Expense'} radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title={lang === 'si' ? 'සේවා නියුක්තිය' : 'Employment'}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={employmentData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value">
                      {employmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-center">
                 <h3 className="text-lg font-bold text-gray-900 mb-6">{lang === 'si' ? 'විශේෂ අවධානය සහ සහනාධාර' : 'Special Attention & Subsidies'}</h3>
                 <div className="space-y-4">
                    <StatRow label={lang === 'si' ? 'අස්වැසුම ප්‍රතිලාභී පවුල්' : 'Aswesuma Beneficiary Families'} value={lang === 'si' ? '122' : '122'} />
                    <StatRow label={lang === 'si' ? 'වෙනත් සහනාධාර' : 'Other Subsidies'} value={lang === 'si' ? '47' : '47'} />
                    <StatRow label={lang === 'si' ? 'කාන්තා මූලික පවුල්' : 'Female Headed Families'} value={lang === 'si' ? '112' : '112'} />
                    <StatRow label={lang === 'si' ? 'තනි මාපිය පවුල්' : 'Single Parent Families'} value={lang === 'si' ? '121' : '121'} />
                    <StatRow label={lang === 'si' ? 'ආබාධිත පවුල්' : 'Disabled Families'} value={lang === 'si' ? '10' : '10'} />
                 </div>
              </div>
            </div>
          )}

          {/* --- TAB 2: Geography --- */}
          {activeTab === 'geography' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
              <ChartCard title={lang === 'si' ? 'කාලගුණික තත්ත්වය' : 'Weather Conditions'}>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={weatherData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[25, 35]} />
                    <ChartTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="rain" fill="#3182CE" name={lang === 'si' ? 'වර්ෂාපතනය (mm)' : 'Rainfall (mm)'} radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#E53E3E" strokeWidth={3} name={lang === 'si' ? 'උෂ්ණත්වය (°C)' : 'Temperature (°C)'} />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title={lang === 'si' ? 'භූමි පරිභෝජනය' : 'Land Use (Hectares)'}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={landUseData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}>
                      {landUseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>

              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{lang === 'si' ? 'මූලික යටිතල පහසුකම්' : 'Basic Infrastructure'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InfraBox icon={<Home className="text-[#244034]" />} title={lang === 'si' ? 'නිවාස' : 'Housing'} text={lang === 'si' ? 'ස්ථීර නිවාස 405' : '405 Permanent Houses'} />
                  <InfraBox icon={<Droplet className="text-[#3182CE]" />} title={lang === 'si' ? 'පානීය ජලය' : 'Drinking Water'} text={lang === 'si' ? 'නල ජලය 395, ළිං 14' : '395 Pipe, 14 Wells'} />
                  <InfraBox icon={<Zap className="text-[#D4AF37]" />} title={lang === 'si' ? 'විදුලිය' : 'Electricity'} text={lang === 'si' ? 'නිවාස 408 ක් සඳහා' : 'Available for 408 houses'} />
                  <InfraBox icon={<Droplet className="text-gray-500" />} title={lang === 'si' ? 'සනීපාරක්ෂක' : 'Sanitation'} text={lang === 'si' ? 'වල වැසිකිළි 398' : '398 Pit Latrines'} />
                  <InfraBox icon={<Phone className="text-blue-500" />} title={lang === 'si' ? 'සන්නිවේදන' : 'Communication'} text={lang === 'si' ? 'ජංගම 398, අන්තර්ජාල 24' : 'Mobile 398, Internet 24'} />
                  <InfraBox icon={<Map className="text-green-600" />} title={lang === 'si' ? 'මාර්ග' : 'Roads'} text={lang === 'si' ? 'මුළු දුර කි.මී. 11.95' : 'Total length 11.95 km'} />
                </div>
              </div>
            </div>
          )}

          {/* --- TAB 3: Projects --- */}
          {activeTab === 'projects' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 animate-in fade-in duration-500">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{lang === 'si' ? 'ප්‍රමුඛතා ගත කළ සංවර්ධන යෝජනා' : 'Prioritized Development Proposals'}</h3>
              <p className="text-gray-600 mb-6">{lang === 'si' ? 'ග්‍රාම නිලධාරී වසම විසින් ඉල්ලා ඇති යෝජිත අයවැය සහ ව්‍යාපෘති සාරාංශය.' : 'Proposed budget and project summary requested by the GN Division.'}</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF9F6] border-y border-gray-200">
                      <th className="py-4 px-4 font-bold text-gray-700">{lang === 'si' ? 'ව්‍යාපෘති ක්ෂේත්‍රය' : 'Project Category'}</th>
                      <th className="py-4 px-4 font-bold text-gray-700 text-center">{lang === 'si' ? 'යෝජනා සංඛ්‍යාව' : 'No. of Proposals'}</th>
                      <th className="py-4 px-4 font-bold text-gray-700 text-right">{lang === 'si' ? 'දළ ඇස්තමේන්තුව' : 'Estimated Amount'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectProposals.map((proj, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-gray-800 font-medium">{proj.category}</td>
                        <td className="py-4 px-4 text-gray-600 text-center">{proj.items}</td>
                        <td className="py-4 px-4 text-[#244034] font-semibold text-right">Rs. {proj.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#244034]/5 border-t-2 border-[#244034]/20">
                      <td colSpan="2" className="py-4 px-4 text-gray-900 font-bold text-lg">{lang === 'si' ? 'මුළු ඇස්තමේන්තුගත මුදල' : 'Total Estimated Budget'}</td>
                      <td className="py-4 px-4 text-[#244034] font-bold text-xl text-right">Rs. 71,205,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}



function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-[13px] text-gray-500 font-bold uppercase tracking-wider mb-1">{label}</p>
      <p className="text-[16px] font-bold text-gray-900">{value}</p>
    </div>
  );
}

function KpiCard({ icon, title, value, subtext }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
      <div className="p-3 bg-[#FAF9F6] rounded-lg text-[#244034]">{icon}</div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{subtext}</p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-4 font-bold text-[16px] md:text-[18px] whitespace-nowrap border-b-[3px] transition-all duration-300 rounded-t-lg ${
        active ? 'border-[#244034] text-[#244034] bg-[#244034]/5' : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-[16px] font-bold text-gray-900 mb-6 text-center">{title}</h3>
      {children}
    </div>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600 text-[15px]">{label}</span>
      <span className="font-bold text-gray-900 text-[15px]">{value}</span>
    </div>
  );
}

function InfraBox({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#FAF9F6] rounded-lg border border-gray-100">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-gray-900 text-[15px]">{title}</h4>
        <p className="text-[14px] text-gray-600 mt-1">{text}</p>
      </div>
    </div>
  );
}