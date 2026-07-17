import React from 'react';
import { css, parseStyle } from './lib/css.js';
import Sprite from './lib/Sprite.jsx';
import ImageSlot from './lib/ImageSlot.jsx';
import WheelDatePicker from './lib/WheelDatePicker.jsx';
import {
  Home, Notifications, Birthdays, Survey, Club, News, Article, Lunch,
  Learn, Course, Menu, Links, Support, Profile, Directory, Person, Category,
} from './screens/index.jsx';

class FlashApp extends React.Component {
  state = {
    screen: 'splash',
    kbOpen: false, kbShift: false, kbLayer: 'abc',
    activeMember: null,
    dirSearch: '',
    // auth
    authMode: 'login',
    authEmail: '',
    authPw: '',
    authOtp: '',
    pwVisible: false,
    focusedField: null,
    devOpen: false,
    commentsOpen: false, cmtFilter: 'all',
    activeCat: null,
    activeArticle: null,
    activeCourse: null,
    toast: null,
    // notifications + survey
    notifRead: {},
    surveyStatus: 'available',
    surveyAnswered: 0,
    surveyStep: 0,
    surveyAnswers: {},
    // evidence transient
    note: '',
    expandedNom: null,
    photoAdded: false,
    checklist: [],
    // market visit transient
    mvReason: '',
    mvArea: '',
    mvStoreName: '',
    mvDate: null,
    mvDateOpen: false,
    mvDatePrev: null,
    mvPhoto: false,
    mvInsights: '',
    // vacancy share transient
    vacWhat: '',
    vacDate: null,
    vacDateOpen: false,
    vacDatePrev: null,
    vacPlatform: null,
    vacPlatformOpen: false,
    vacPhoto: false,
    // wellness transient
    wellType: null,
    wellTypeOpen: false,
    wellDesc: '',
    wellImpact: '',
    wellDate: null,
    wellDateOpen: false,
    wellDatePrev: null,
    wellPhoto: false,
    // values: given nomination
    vgTab: 'nominate',
    expandedGiven: null,
    nomEmp: null,
    empDropOpen: false,
    empSearch: '',
    nomVal: null,
    nomBeh: null,
    behDropOpen: false,
    nomSituation: '',
    nomImpact: '',
    nomPhoto: false,
    // categories completion — start empty so each refresh is a clean demo slate
    // `done` = completed THIS MONTH (resets on a new month); `yearlyDone` = ever
    // completed THIS YEARLY CYCLE (sticky, only clears on a new yearly cycle).
    done: {},
    yearlyDone: {},
    // lunch
    lunchDay: 'mon',
    lunchSel: {},
    lunchOrdered: false,
    lunchTab: 'menu',
    expandedDay: null,
    herdInfo: false,
    sheetMonth: null,
    rewarding: false,
    badgeEarned: false,
    monthEarned: false,
    barPoints: null,
    pendingBar: false,
    pendingReward: null,
    // learn
    courseDone: {},
    quizAnswers: [],
    quizSubmitted: false,
    newsTab: 'All',
    clubTab: 'progress',
    newsView: 'card',
    // support
    supportType: 'App support',
    supportMsg: '',
    supportFile: '',
    // profile
    bio: 'Sales lead in Joburg. Big on quick wins, good coffee, and getting traders set up fast. Always keen to learn something new.',
    editingBio: false,
    bioDraft: '',
  };

  PROFILE = {
    name: 'Alex Mokoena',
    initials: 'AM',
    role: 'Sales',
    location: 'Johannesburg',
    email: 'alex.mokoena@flash.co.za',
    team: 'Trader Sales',
    started: 'March 2022',
  };

  DIRECTORY = [
    { id:'admin', name:'Admin', tint:'#EBF0EF', fg:'#414141', members:[
      { name:'Lindiwe Dube', role:'Office Manager', location:'Johannesburg', email:'lindiwe.dube@flash.co.za', phone:'+27 82 555 0182' },
      { name:'Gerhard Coetzee', role:'Facilities Coordinator', location:'Cape Town', email:'gerhard.coetzee@flash.co.za', phone:'+27 83 555 0147' },
      { name:'Fatima Ismail', role:'Executive Assistant', location:'Johannesburg', email:'fatima.ismail@flash.co.za', phone:'+27 82 555 0233' },
    ]},
    { id:'bizops', name:'Business Operations', tint:'#E8F5EC', fg:'#0C8B43', members:[
      { name:'Naledi Khumalo', role:'Operations Lead', location:'Johannesburg', email:'naledi.khumalo@flash.co.za', phone:'+27 82 555 0512' },
      { name:'Thabo Molefe', role:'Process Analyst', location:'Pretoria', email:'thabo.molefe@flash.co.za', phone:'+27 83 555 0538' },
      { name:'Aisha Patel', role:'Vendor Manager', location:'Durban', email:'aisha.patel@flash.co.za', phone:'+27 84 555 0589' },
      { name:'Johan Steyn', role:'Logistics Coordinator', location:'Bloemfontein', email:'johan.steyn@flash.co.za', phone:'+27 83 555 0567' },
    ]},
    { id:'tech', name:'Tech', tint:'#E7F0FB', fg:'#0052B0', members:[
      { name:'Sipho Dlamini', role:'Engineering Manager', location:'Cape Town', email:'sipho.dlamini@flash.co.za', phone:'+27 83 555 0311' },
      { name:'Megan Pillay', role:'Senior Backend Engineer', location:'Cape Town', email:'megan.pillay@flash.co.za', phone:'+27 82 555 0398' },
      { name:'Riaan Botha', role:'Mobile Engineer', location:'Johannesburg', email:'riaan.botha@flash.co.za', phone:'+27 84 555 0420' },
      { name:'Lerato Mahlangu', role:'QA Engineer', location:'Pretoria', email:'lerato.mahlangu@flash.co.za', phone:'+27 83 555 0455' },
    ]},
    { id:'it', name:'IT', tint:'#E6F6F2', fg:'#0A7A5C', members:[
      { name:'Kabelo Tau', role:'IT Support Lead', location:'Johannesburg', email:'kabelo.tau@flash.co.za', phone:'+27 82 555 0741' },
      { name:'Chantal Adams', role:'Systems Administrator', location:'Cape Town', email:'chantal.adams@flash.co.za', phone:'+27 83 555 0788' },
      { name:'Dineo Radebe', role:'Helpdesk Technician', location:'Johannesburg', email:'dineo.radebe@flash.co.za', phone:'+27 84 555 0799' },
    ]},
    { id:'marketing', name:'Marketing', tint:'#F3E9FD', fg:'#7A2BD6', members:[
      { name:'Zanele Mthembu', role:'Brand Manager', location:'Johannesburg', email:'zanele.mthembu@flash.co.za', phone:'+27 82 555 0631' },
      { name:'Daniel Fourie', role:'Content Lead', location:'Cape Town', email:'daniel.fourie@flash.co.za', phone:'+27 83 555 0677' },
      { name:'Nomsa Sithole', role:'Social Media Manager', location:'Johannesburg', email:'nomsa.sithole@flash.co.za', phone:'+27 84 555 0698' },
    ]},
    { id:'infosec', name:'Infosec', tint:'#FDE9EC', fg:'#C2143A', members:[
      { name:'Bongani Zulu', role:'Security Lead', location:'Johannesburg', email:'bongani.zulu@flash.co.za', phone:'+27 82 555 0815' },
      { name:'Sarah Daniels', role:'Security Analyst', location:'Cape Town', email:'sarah.daniels@flash.co.za', phone:'+27 83 555 0856' },
      { name:'Pieter van Wyk', role:'Compliance Officer', location:'Cape Town', email:'pieter.vanwyk@flash.co.za', phone:'+27 83 555 0877' },
    ]},
  ];

  CATS = [
    { id:'transact', name:'Transact', pts:10, ev:'info', blurb:"Complete 2 transactions in the Flash or 1Voucher app to earn 10 points. Make sure you've registered your app with Flash Club.", iconSrc:'assets/cat-transact.svg', tint:'rgba(243,48,81,0.13)', steps:2 },
    { id:'learn', name:'Learn', pts:10, ev:'info', blurb:'Complete learning activities and invest in your development. Explore available courses and learning resources to expand your knowledge and support your growth.', iconSrc:'assets/cat-learn.svg', tint:'rgba(0,82,176,0.12)' },
    { id:'market', name:'Market visit', pts:10, ev:'market', blurb:'Complete a market visit by speaking to a retailer or trader, recording their responses, and submitting proof of your visit to earn Club Points.', iconSrc:'assets/cat-market.svg', tint:'rgba(8,191,145,0.14)' },
    { id:'values-recv', name:'Values: Received', pts:10, ev:'recv', blurb:"These employees have recognised you for living one of the Flash values. View the nominations you've received and see the behaviours, situations, and impacts that inspired your colleagues to recognise you.", iconSrc:'assets/cat-values-recv.svg', tint:'rgba(16,197,4,0.13)' },
    { id:'vacancy', name:'Vacancy share', pts:5, ev:'vacancy', blurb:'Share an open role at Flash with people in your network.', iconSrc:'assets/cat-vacancy.svg', tint:'rgba(0,151,247,0.13)' },
    { id:'wellness', name:'Wellness', pts:5, ev:'wellness', blurb:'Complete activities that support your physical, mental, or emotional wellbeing.', iconSrc:'assets/cat-wellness.svg', tint:'rgba(144,49,250,0.12)' },
    { id:'values-given', name:'Values: Given', pts:5, ev:'note', blurb:'Recognise a colleague for bringing one of our Flash Values to life. Please note that multiple nominations in this category do not earn additional points.', iconSrc:'assets/cat-values-given.svg', tint:'rgba(16,197,4,0.13)' },
    { id:'csi', name:'CSI', pts:5, ev:'csi', blurb:'Complete a Corporate Social Initiative (CSI) by participating in a community, environmental, charity, or social impact activity.', iconSrc:'assets/cat-csi.svg', tint:'rgba(255,137,0,0.14)' },
  ];

  CHECKS = {
    learn: ['Opened the module', 'Completed all sections', 'Passed the quiz'],
    vacancy: ['Picked an open role', 'Shared it on a channel', 'Tagged a potential candidate'],
  };

  EMPLOYEES = ['Aisha Patel','Bongani Dlamini','Chloé van der Merwe','David Nkosi','Emma Botha','Farai Moyo','Grace Mahlangu','Hannah Smit','Isaac Khumalo','Jabulani Sithole','Kabelo Molefe','Lerato Dube','Mandla Zulu','Naledi Mokoena','Omar Cassim','Priya Naidoo','Rethabile Sello','Sipho Khumalo','Thandi Mbeki','Ursula Jacobs','Vusi Ndlovu','Wendy Pillay','Xolani Mthembu','Yusuf Ebrahim','Zanele Ngcobo'];

  VALUES = [
    { id:'brave', label:'We are brave', icon:'assets/val-brave.svg', behaviours:['Spoke up with a bold idea','Took a smart, calculated risk','Owned a mistake openly','Challenged the status quo'] },
    { id:'backs', label:'We have each others backs', icon:'assets/val-backs.svg', behaviours:['Helped without being asked','Shared knowledge freely','Covered for a teammate','Gave honest, kind feedback'] },
    { id:'allin', label:'We are all in', icon:'assets/val-allin.svg', behaviours:['Went the extra mile','Brought energy to the team','Followed through fully','Put the customer first'] },
  ];

  // value badge palette + meta, keyed by value id
  VAL_META = {
    brave: { label:'We are brave', icon:'assets/val-brave.svg', color:'#FAA225', tint:'rgba(250,162,37,0.14)' },
    backs: { label:"We have each other's backs", icon:'assets/val-backs.svg', color:'#0C8B43', tint:'rgba(12,139,67,0.13)' },
    allin: { label:'We are all in', icon:'assets/val-allin.svg', color:'#0995D6', tint:'rgba(9,149,214,0.13)' },
  };

  // nominations the current user has received
  NOMINATIONS_RECV = [
    { id:'n1', val:'backs', nominator:'Lindiwe Dube', avTint:'#EBF0EF', avFg:'#414141', date:'12 June 2026',
      behaviour:'You stayed late to help me rebuild the trader onboarding deck before the regional review, even though it had nothing to do with your own targets.',
      situation:'My laptop crashed the afternoon before the Eastern Cape regional review and I lost most of my slides. I was panicking with only a few hours left.',
      impact:'We walked into the review fully prepared and the regional team signed off three new store rollouts on the spot. I would not have made it without you.' },
    { id:'n2', val:'brave', nominator:'David Nkosi', avTint:'rgba(250,162,37,0.16)', avFg:'#B4690C', date:'5 June 2026',
      behaviour:'You called out that our voucher reconciliation process had a gap, even though it meant flagging work your own team had signed off on.',
      situation:'During the month-end close we kept seeing small mismatches nobody could explain. Most people wanted to write them off and move on.',
      impact:'Your honesty led us to a settlement bug that was costing roughly R 18 000 a month. Finance has since closed it permanently.' },
    { id:'n3', val:'allin', nominator:'Grace Mahlangu', avTint:'rgba(9,149,214,0.15)', avFg:'#0A6CA6', date:'28 May 2026',
      behaviour:'You jumped on the support line over the long weekend when our queue spiked and personally worked through more than forty trader tickets.',
      situation:'A network outage hit a cluster of stores on the Saturday and the on-call team was overwhelmed with escalations.',
      impact:'Every affected trader was back online by Sunday evening and we kept our response-time promise. Customers noticed and several wrote in to thank us.' },
    { id:'n4', val:'backs', nominator:'Farai Moyo', avTint:'#E4EFF7', avFg:'#0A6CA6', date:'19 May 2026',
      behaviour:'You took the time to coach the two new sales joiners through their first market visits instead of just sending them in alone.',
      situation:'Both joiners started in the same week and were nervous about approaching retailers cold for the first time.',
      impact:'They each closed a sign-up on their very first visit and now mentor newer joiners themselves. You set the tone for the whole team.' },
  ];

  // nominations the current user has given to others
  NOMINATIONS_GIVEN = [
    { id:'g1', val:'allin', nominee:'Naledi Mokoena', position:'Trader support agent', date:'24 June 2026',
      behaviour:'Went the extra mile',
      situation:'A trader in Soweto was stuck mid-onboarding on a Friday afternoon and the rest of the team had clocked off. Naledi stayed on the call walking him through every step.',
      impact:'The store was transacting by Monday morning and the trader specifically called back to thank us. It set the tone for how we look after our partners.' },
    { id:'g2', val:'backs', nominee:'David Nkosi', position:'Finance analyst', date:'11 June 2026',
      behaviour:'Shared knowledge freely',
      situation:'I was new to the reconciliation reports and kept getting stuck. David sat with me for over an hour and built me a cheat sheet instead of just fixing it himself.',
      impact:'I now run the month-end recon on my own and have passed the same notes on to the next joiner. He genuinely lifted the whole team.' },
    { id:'g3', val:'brave', nominee:'Priya Naidoo', position:'Product manager', date:'2 June 2026',
      behaviour:'Challenged the status quo',
      situation:'In the roadmap review Priya pushed back on a feature leadership was keen on, arguing the data did not support it, even though it was an awkward thing to say in the room.',
      impact:'We paused the build and ran a quick test that proved her right, saving weeks of engineering effort on something customers did not want.' },
  ];


  // historical points log per month (category ids earned). July = live state.
  MONTH_LOG = {
    0: ['transact','wellness','values-given'],
    1: ['market','learn'],
    2: ['transact','values-recv'],
    3: ['learn','wellness','vacancy'],
    4: ['transact','csi','values-given'],
    5: ['wellness','values-given'],
  };

  openMonthSheet(i) { this.setState({ sheetMonth: i }); }
  closeMonthSheet() { this.setState({ sheetMonth: null }); }
  stepMonth(dir) { this.setState(s => { if (s.sheetMonth === null) return null; let n = s.sheetMonth + dir; if (n === 9) n += dir; if (n < 0 || n > 11) return null; return { sheetMonth: n }; }); }

  NEWS = [
    { id:'function', tag:'Events', title:'Year-end function: save the date', img:'linear-gradient(135deg,#10C504,#0E3A1E)', body:'Our annual year-end function is locked in for 6 December at the Sandton Convention Centre. Expect food, music and the awards we have all been waiting for. RSVP closes at the end of the month — keep an eye on your inbox for the invite.' },
    { id:'joiners', tag:'New people', title:'Welcome our four new joiners this month', img:'#D6DEDC', body:'Four new faces joined Flash across Sales, Engineering and Operations this month. Say hello when you see them around the office or on the floor. Onboarding buddies have been assigned — reach out to People Ops if you would like to be one.' },
    { id:'1voucher', tag:'Recent', title:'1Voucher crosses a new monthly milestone', img:'linear-gradient(135deg,#FF5F00,#C10021)', body:'1Voucher had its strongest month yet, driven by trader adoption in the Western Cape. Thank you to every team that helped get us here — from product to the field reps making it happen on the ground.' },
    { id:'wellness-week', tag:'Culture', title:'Wellness week kicks off Monday', img:'linear-gradient(135deg,#0995D6,#086198)', body:'Wellness week runs all of next week with on-site health screenings, lunchtime walks and a few surprises. Logging any wellness activity also earns you Flash Club points — a nice bonus for looking after yourself.' },
    { id:'app-update', tag:'Recent', title:'The Flash app gets a faster checkout', img:'linear-gradient(135deg,#0E3A1E,#10C504)', body:'This month’s release trims two steps from checkout and speeds up voucher redemption. Early numbers show a meaningful drop in drop-offs. Thanks to everyone who tested the beta and sent feedback.' },
    { id:'leadership', tag:'Events', title:'Town hall: Q&A with the leadership team', img:'#C2CBC8', body:'Join the next town hall on Thursday at 15:00. The leadership team will share where we are heading this quarter and take your questions live. Drop questions in advance through the People Ops channel.' },
    { id:'csi-day', tag:'Culture', title:'Flash gives back: CSI day recap', img:'linear-gradient(135deg,#FAA225,#C76A00)', body:'Over 120 Flashers spent a day with three community partners last week, from school refurbishments to food drives. Photos are up on the shared drive — and yes, it counts toward your Flash Club points.' },
    { id:'awards', tag:'New people', title:'Congratulations to this quarter’s award winners', img:'linear-gradient(135deg,#9747FF,#5B2B9E)', body:'We recognised standout work across every department this quarter. From quiet problem-solvers to team leads who went the extra mile — thank you for setting the bar. See the full list on the intranet.' },
  ];

  COURSES = [
    { id:'pos', tag:'Compliance', mins:6, pts:10, title:'POPIA & protecting customer data', body:'POPIA — the Protection of Personal Information Act — sets the rules for how we collect, store and use customer information at Flash. The golden rule: only collect what you need, keep it secure, and never share it without a lawful reason. If a customer asks what data we hold on them, route the request to the data team. When in doubt, do not guess — ask.', q:[ { q:'What is the golden rule of POPIA at Flash?', a:['Collect as much data as possible','Only collect what you need and keep it secure','Share data freely between teams'], correct:1 }, { q:'A customer asks what data we hold on them. You should:', a:['Tell them whatever you remember','Ignore the request','Route it to the data team'], correct:2 } ] },
    { id:'fraud', tag:'Security', mins:5, pts:10, title:'Spotting fraud on the floor', body:'Fraud often hides in plain sight — a voucher redeemed in an unusual pattern, a device used from a new location, repeated failed PINs. Trust the signals. If something feels off, pause the transaction and escalate to your supervisor. It is always better to verify than to let a fraudulent transaction through. Reporting early protects both the customer and Flash.', q:[ { q:'You notice an unusual voucher redemption pattern. First step?', a:['Pause and escalate to a supervisor','Approve it to avoid a queue','Delete the transaction'], correct:0 }, { q:'Why report suspected fraud early?', a:['To hit a target','It protects the customer and Flash','It is not necessary'], correct:1 } ] },
    { id:'values', tag:'Culture', mins:4, pts:5, title:'Living the Flash values', body:'The Flash values guide how we work: we keep it simple, we move fast, and we look after each other and our customers. Living the values is not a poster on the wall — it shows up in small daily choices. Recognise colleagues when you see them do it, and you both earn Flash Club points along the way.', q:[ { q:'How do the Flash values show up?', a:['Only in the handbook','In small daily choices','Once a year at review time'], correct:1 } ] },
  ];

  DAYS = [
    { key:'mon', label:'Mon', date:'7 Jul', long:'Monday 7 July' },
    { key:'tue', label:'Tue', date:'8 Jul', long:'Tuesday 8 July' },
    { key:'wed', label:'Wed', date:'9 Jul', long:'Wednesday 9 July' },
    { key:'thu', label:'Thu', date:'10 Jul', long:'Thursday 10 July' },
  ];

  // Confirmed orders for the current (locked) week — view-only.
  THIS_WEEK = [
    { key:'mon', label:'Mon', date:'30 Jun', meal:{ name:'Butter chicken', desc:'With basmati rice and naan', caterer:'Halaal' } },
    { key:'tue', label:'Tue', date:'1 Jul', meal:{ name:'Chicken schnitzel', desc:'Crumbed chicken, mash, gravy', caterer:'Mill & Press' } },
    { key:'wed', label:'Wed', date:'2 Jul', meal:null },
    { key:'thu', label:'Thu', date:'3 Jul', meal:{ name:'Gatsby', desc:'Cape-style steak and chip sub', caterer:'Halaal' } },
  ];

  WEEK_MENU = {
    mon: [
      { id:'mon-1', name:'Bunny chow', desc:'Quarter chicken curry in a loaf', caterer:'Halaal' },
      { id:'mon-2', name:'Beef lasagne', desc:'Layered pasta with a side salad', caterer:'Mill & Press' },
      { id:'mon-3', name:'Harvest bowl', desc:'Greens, roast veg, feta, seeds', caterer:'Mill & Press', veg:true },
    ],
    tue: [
      { id:'tue-1', name:'Kota special', desc:'Loaded bread, polony, chips, egg', caterer:'Halaal' },
      { id:'tue-2', name:'Chicken schnitzel', desc:'Crumbed chicken, mash, gravy', caterer:'Mill & Press' },
      { id:'tue-3', name:'Veggie wrap', desc:'Hummus, falafel, slaw', caterer:'Mill & Press', veg:true },
    ],
    wed: [
      { id:'wed-1', name:'Boerewors roll', desc:'Grilled wors, tomato relish', caterer:'Halaal' },
      { id:'wed-2', name:'Butter chicken', desc:'With basmati rice and naan', caterer:'Halaal' },
      { id:'wed-3', name:'Greek salad', desc:'Cucumber, olives, feta, mint', caterer:'Mill & Press', veg:true },
    ],
    thu: [
      { id:'thu-1', name:'Gatsby', desc:'Cape-style steak and chip sub', caterer:'Halaal' },
      { id:'thu-2', name:'Grilled hake and chips', desc:'Lemon, tartar, side slaw', caterer:'Mill & Press' },
      { id:'thu-3', name:'Falafel bowl', desc:'Quinoa, roast veg, tahini', caterer:'Mill & Press', veg:true },
    ],
  };

  LINKS = [
    { group:'Flash', items:[
      { label:'Flash website', host:'flash.co.za', url:'https://www.flash.co.za' },
    ]},
    { group:'Social', items:[
      { label:'Flash Life on Instagram', host:'instagram.com', url:'https://www.instagram.com' },
      { label:'Flash LinkedIn', host:'linkedin.com', url:'https://www.linkedin.com' },
    ]},
  ];

  BIRTHDAYS = [
    { ref:'bizops:Naledi Khumalo', date:'Today' },
    { ref:'tech:Sipho Dlamini', date:'24 Jun' },
    { ref:'tech:Megan Pillay', date:'26 Jun' },
    { ref:'it:Kabelo Tau', date:'28 Jun' },
    { ref:'marketing:Zanele Mthembu', date:'1 Jul' },
  ];

  SURVEY = { topic: 'How is AI changing the way you work?', total: 6, streak: 3 };

  SURVEY_QS = [
    { id:'freq', type:'choice', q:'How often do you use AI tools in your work?',
      help:'Anything from chatbots to built-in assistants.',
      options:['Never','A few times a month','Most weeks','Most days','Many times a day'] },
    { id:'tools', type:'multi', q:'Which AI tools have you used for work?',
      help:'Select all that apply.',
      options:['ChatGPT','Microsoft Copilot','Claude','Gemini','Company tools','None yet'] },
    { id:'impact', type:'rating', q:'How much has AI improved your day-to-day productivity?',
      help:'1 = not at all, 5 = a huge amount.',
      lowLabel:'Not at all', highLabel:'A huge amount' },
    { id:'use', type:'choice', q:'Where does AI help you most?',
      help:'Pick the one that fits best.',
      options:['Writing & emails','Research & summarising','Data & analysis','Coding','Customer queries','Brainstorming ideas'] },
    { id:'feel', type:'choice', q:'How do you feel about AI\u2019s role in your job?',
      help:'There are no wrong answers \u2014 we want the honest read.',
      options:['Excited','Optimistic','Neutral','Cautious','Concerned'] },
    { id:'wish', type:'text', q:'If AI could take one task off your plate, what would it be?',
      help:'Optional \u2014 a sentence is plenty.',
      placeholder:'e.g. Drafting first-pass meeting notes\u2026' }
  ];

  NOTIFS = [
    { id:'lunch', group:'today', icon:'#ic-lunch', iconBg:'#FEEFD2', iconColor:'#C77E12', time:'2h ago',
      title:'Lunch orders close tomorrow', body:'Place your order before it\u2019s too late \u2014 the kitchen locks the menu at noon.', cta:'Order lunch', target:'lunch' },
    { id:'club', group:'today', icon:'#ic-club', iconBg:'#E4F7E6', iconColor:'#0C8B43', time:'5h ago',
      title:'You\u2019re only 5 Club Points away', body:'Complete one more activity to hit this month\u2019s reward and keep your streak alive.', cta:'View Club Points', target:'club' },
    { id:'birthdays', group:'today', icon:'#ic-cal', iconBg:'#E7F0FB', iconColor:'#0052B0', time:'8h ago',
      title:'There are 3 birthdays today', body:'Don\u2019t forget to wish Naledi, Sipho and Megan a happy birthday!', cta:'See birthdays', target:'birthdays' },
    { id:'survey', group:'earlier', icon:'#ic-chat', iconBg:'#E6F6F2', iconColor:'#0A7A5C', time:'Yesterday',
      title:'New survey available', body:'Tell us what you think about the new lunch ordering process. Takes about 2 minutes.', cta:'Take survey', target:'survey' },
    { id:'news', group:'earlier', icon:'#ic-news', iconBg:'#F0F0F0', iconColor:'#414141', time:'2 days ago',
      title:'Year-end function: save the date', body:'Our annual year-end function is locked in for 6 December at the Sandton Convention Centre.', cta:'Read more', target:'article:function' },
  ];

  // ---- splash / lottie ----
  componentDidMount() { this.mountLottie(); this.setupKeyboard(); }
  componentDidUpdate() { this.mountLottie(); this.setupKeyboard(); }

  // ---- on-screen keyboard ----
  KB_HEIGHT = 300;
  setupKeyboard() {
    if (this._kbInit) return;
    this._kbInit = true;

    const inField = (el) => el && this._kbScreen() && this._kbScreen().contains(el) && this._isTextField(el);

    this._kbScreen = () => document.getElementById('fl-screen');

    this._isTextField = (el) => {
      if (!el || el.nodeType !== 1) return false;
      if (el.tagName === 'TEXTAREA') return true;
      if (el.tagName === 'INPUT') {
        const t = (el.getAttribute('type') || 'text').toLowerCase();
        return ['text','email','tel','number','search','password','url',''].indexOf(t) !== -1;
      }
      return !!el.isContentEditable;
    };

    // Document-level delegation — survives DC re-renders that replace nodes.
    document.addEventListener('focusin', (e) => {
      const el = e.target;
      if (!inField(el)) return;
      this._activeInput = el;
      const numeric = el.inputMode === 'numeric' || (el.getAttribute('type') || '') === 'number' || el.getAttribute('inputmode') === 'numeric';
      this.setState({ kbOpen: true, kbLayer: numeric ? '123' : 'abc', kbShift: false });
      setTimeout(() => this.ensureVisible(el), 60);
    });

    document.addEventListener('focusout', (e) => {
      if (!inField(e.target)) return;
      clearTimeout(this._kbBlurT);
      this._kbBlurT = setTimeout(() => {
        const a = document.activeElement;
        if (inField(a)) { this._activeInput = a; return; }
        this._activeInput = null;
        this.closeKeyboard();
      }, 70);
    });

    // delegated key presses — preventDefault keeps focus on the input
    document.addEventListener('pointerdown', (e) => {
      const kb = document.getElementById('fl-kb');
      if (!kb || !kb.contains(e.target)) return;
      e.preventDefault();
      const keyEl = e.target.closest('[data-key]');
      if (keyEl) this.pressKey(keyEl.getAttribute('data-key'));
    });
  }

  ensureVisible(el) {
    const screen = this._kbScreen && this._kbScreen();
    if (!el || !screen) return;
    const host = el.closest('.fl-scroll');
    if (!host) return;
    host.style.transition = 'padding-bottom .28s cubic-bezier(.2,.85,.25,1)';
    host.style.paddingBottom = (this.KB_HEIGHT + 26) + 'px';
    setTimeout(() => {
      const sRect = screen.getBoundingClientRect();
      const kbTopY = sRect.bottom - this.KB_HEIGHT;
      const topGuard = sRect.top + 44;
      const margin = 16;
      const r = el.getBoundingClientRect();
      if (r.bottom > kbTopY - margin) {
        host.scrollTo({ top: host.scrollTop + (r.bottom - (kbTopY - margin)), behavior: 'smooth' });
      } else if (r.top < topGuard + margin) {
        host.scrollTo({ top: host.scrollTop - ((topGuard + margin) - r.top), behavior: 'smooth' });
      }
    }, 40);
  }

  closeKeyboard() {
    this.setState({ kbOpen: false });
    const screen = this._kbScreen && this._kbScreen();
    if (screen) screen.querySelectorAll('.fl-scroll').forEach(h => { h.style.paddingBottom = ''; });
  }

  pressKey(k) {
    if (k === 'shift') { this.setState(s => ({ kbShift: !s.kbShift })); return; }
    if (k === '123') { this.setState({ kbLayer: '123', kbShift: false }); return; }
    if (k === 'abc') { this.setState({ kbLayer: 'abc', kbShift: false }); return; }
    if (k === 'sym') { this.setState({ kbLayer: 'sym' }); return; }
    if (k === 'emoji' || !k) return;
    const live = document.activeElement;
    const el = (this._isTextField(live) && this._kbScreen() && this._kbScreen().contains(live)) ? live : this._activeInput;
    this._activeInput = el;
    if (!el) return;
    if (k === 'del') { this.kbEdit(el, '', true); return; }
    if (k === 'ret') {
      if (el.tagName === 'TEXTAREA') { this.kbEdit(el, '\n', false); this.ensureVisible(el); }
      else { el.blur(); }
      return;
    }
    let ch = (k === 'space') ? ' ' : k;
    if (this.state.kbLayer === 'abc' && this.state.kbShift && ch.length === 1) ch = ch.toUpperCase();
    this.kbEdit(el, ch, false);
    if (this.state.kbShift && this.state.kbLayer === 'abc') this.setState({ kbShift: false });
    if (el.tagName === 'TEXTAREA') this.ensureVisible(el);
  }

  kbEdit(el, ch, isDelete) {
    const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement : window.HTMLInputElement;
    const setter = Object.getOwnPropertyDescriptor(proto.prototype, 'value').set;
    let start, end;
    try { start = el.selectionStart; end = el.selectionEnd; } catch (_) { start = end = null; }
    if (start == null) { start = end = el.value.length; }
    let val = el.value, caret;
    if (isDelete) {
      if (start !== end) { val = val.slice(0, start) + val.slice(end); caret = start; }
      else if (start > 0) { val = val.slice(0, start - 1) + val.slice(end); caret = start - 1; }
      else return;
    } else {
      const max = el.maxLength;
      if (max && max > 0 && (val.length - (end - start) + ch.length) > max) return;
      val = val.slice(0, start) + ch + val.slice(end);
      caret = start + ch.length;
    }
    setter.call(el, val);
    try { el.selectionStart = el.selectionEnd = caret; } catch (_) {}
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
  mountLottie() {
    if (this.state.screen !== 'splash') { this._lottie = null; return; }
    const el = document.getElementById('lottie-splash');
    if (!el || el.dataset.mounted || !window.lottie) return;
    el.dataset.mounted = '1';
    this._lottie = window.lottie.loadAnimation({
      container: el, renderer: 'svg', loop: false, autoplay: true,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
      path: 'assets/splash-lottie.json',
    });
    this._lottie.addEventListener('complete', () => { if (this.state.screen === 'splash') this.skipSplash(); });
    clearTimeout(this._splashT);
    this._splashT = setTimeout(() => { if (this.state.screen === 'splash') this.skipSplash(); }, 4200);
  }

  // ---- auth flow ----
  skipSplash = () => { clearTimeout(this._splashT); this.setState({ screen: 'welcome' }); };
  startLogin = () => this.setState({ screen: 'auth-email', authMode: 'login', authPw: '', authOtp: '' });
  startSignup = () => this.setState({ screen: 'auth-email', authMode: 'signup', authPw: '', authOtp: '' });
  setAuthEmail = (e) => this.setState({ authEmail: e.target.value });
  setAuthPw = (e) => this.setState({ authPw: e.target.value });
  setAuthOtp = (e) => this.setState({ authOtp: e.target.value.replace(/\D/g, '').slice(0, 6) });
  togglePw = () => this.setState(s => ({ pwVisible: !s.pwVisible }));
  focusEmail = () => this.setState({ focusedField: 'email' });
  focusPw = () => this.setState({ focusedField: 'pw' });
  blurField = () => this.setState({ focusedField: null });
  resendOtp = () => { this.setState({ authOtp: '' }); this.flash('New code sent to your email.'); };
  authBack = () => {
    const s = this.state;
    if (s.screen === 'auth-email') this.setState({ screen: 'welcome' });
    else if (s.screen === 'auth-otp') this.setState({ screen: 'auth-email' });
    else if (s.screen === 'auth-pw') this.setState({ screen: s.authMode === 'signup' ? 'auth-otp' : 'auth-email' });
  };
  authEmailNext = () => {
    if (!/.+@.+\..+/.test(this.state.authEmail)) { this.flash('Enter a valid work email.'); return; }
    this.setState({ screen: this.state.authMode === 'signup' ? 'auth-otp' : 'auth-pw' });
  };
  authOtpNext = () => {
    if (this.state.authOtp.length < 6) { this.flash('Enter the 6-digit code.'); return; }
    this.setState({ screen: 'auth-pw' });
  };
  authPwSubmit = () => {
    if (this.state.authPw.length < 6) { this.flash('Password must be at least 6 characters.'); return; }
    this.finishAuth();
  };
  useFaceId = () => this.finishAuth();
  finishAuth = () => {
    this.setState({ screen: 'auth-success' });
    clearTimeout(this._authT);
    this._authT = setTimeout(() => this.setState({ screen: 'home', devOpen: false }), 1500);
  };

  // ---- dev index ----
  toggleDev = () => this.setState(s => ({ devOpen: !s.devOpen }));
  // dev-only simulation of a new Flash Club month: clears monthly completion/points
  // state so the monthly indicators (points pill, "done this month" text, streak bar)
  // go back to inactive — yearlyDone is left untouched, since it only clears on a new
  // yearly cycle, not a new month.
  startNewMonth = () => {
    this.setState({ done: {}, barPoints: null, pendingBar: false, pendingReward: null, rewarding: false, badgeEarned: false, monthEarned: false, devOpen: false });
    this.flash('New month started — monthly progress reset.');
  };

  // ---- comments review panel (not shipped) ----
  toggleComments = () => this.setState(s => ({ commentsOpen: !s.commentsOpen }));
  closeComments = () => this.setState({ commentsOpen: false });
  setCmtFilter = (f) => this.setState({ cmtFilter: f });
  goComment = (t) => this.goDev(t);
  CMT_AUTHORS = {
    Katerina: { initials:'K', bg:'#10C504', you:true },
    Chelsea:  { initials:'C', bg:'#0995D6', you:false },
    Stu:      { initials:'S', bg:'#FAA225', you:false },
  };
  CMT_FILES = ['This prototype','Flash Life App (v1)','Club screen — version testing','Homescreen test','Home notification tests','Flash Life (lunch)','Desktop app','HR dashboard'];
  COMMENTS = [
    { author:'Katerina', file:'This prototype', where:'Home · date header "Mon, 3 July"', text:'Add timer', target:'home' },
    { author:'Katerina', file:'This prototype', where:'Club · "Earn 10 points"', text:'Add category completion indicator', target:'club' },
    { author:'Katerina', file:'This prototype', where:'Lunch · Bunny chow menu item', text:'Personalisation on orders — "You\u2019ve ordered this before" / add to favourites', target:'lunch' },

    { author:'Stu', file:'Flash Life App (v1)', where:'Verify your email', text:'Microsoft login' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Values: received / given cards', text:'The received and given cards look the same — add headers and a differentiator so it\u2019s clearer' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Nominate · value dropdown', text:'Can only edit dropdown once a value has been selected' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Nominate · behaviour select', text:'Select behaviour not working + needs correct options' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Values given', text:'Should have a history button — view previous nomination' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Nomination card · "24 Jun"', text:'Categories must be aligned' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Nomination detail', text:'Sticky close button?' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Nomination card', text:'Chevron direction should be up before click' },
    { author:'Stu', file:'Flash Life App (v1)', where:'Travel request', text:'Can we integrate to these systems?' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Lunch order card', text:'Tag must be below the name' },
    { author:'Stu', file:'Flash Life App (v1)', where:'Lunch calendar', text:'October is pause month' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Lunch order · Edit', text:'Shouldn\u2019t show pre-order' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Close button', text:'Arrow should be green' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Nominations list', text:'Grouping + header "Your nominations"' },
    { author:'Stu', file:'Flash Life App (v1)', where:'Category icons', text:'Better icons' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Lunch orders header', text:'Back button' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Category "+10" badge', text:'Indicate how many times a category has been earned? / which month / history?' },
    { author:'Stu', file:'Flash Life App (v1)', where:'Submit your evidence', text:'Show received notification and message' },
    { author:'Stu', file:'Flash Life App (v1)', where:'Select store', text:'Text input' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'"Where did you visit?"', text:'Fix text sizing' },
    { author:'Stu', file:'Flash Life App (v1)', where:'Home feed', text:'Survey in feed' },
    { author:'Stu', file:'Flash Life App (v1)', where:'Menu', text:'Business directory' },
    { author:'Katerina', file:'Flash Life App (v1)', where:'Directory · Aisha Patel', text:'Contrast ratio' },
    { author:'Stu', file:'Flash Life App (v1)', where:'Bunny chow menu item', text:'Favourite feature to save your best picks?' },

    { author:'Chelsea', file:'Club screen — version testing', where:'Monthly point icons', text:'Will these icons click through to the monthly points actuals so people can see what they earned each month?' },
    { author:'Chelsea', file:'Club screen — version testing', where:'April progress', text:'Please use the full month\u2019s name' },
    { author:'Chelsea', file:'Club screen — version testing', where:'"Grace month used"', text:'Cool to show when the grace month is used, but could it confuse people into thinking it\u2019s just monthly points and forgetting they also need all categories? Just raising it.' },
    { author:'Chelsea', file:'Club screen — version testing', where:'15/20 points · info icon', text:'The info icon should explain the combination of monthly points AND participation across categories (incl. joining between May and June). Please refer to the Flash Club leave & eligibility doc.' },
    { author:'Chelsea', file:'Club screen — version testing', where:'Leave tracker', text:'Grace-month availability needs to be more obvious — show an X / "not available" if used, or if the member joined between May and September?' },
    { author:'Chelsea', file:'Club screen — version testing', where:'"On track for 5 days leave"', text:'Where does the grace-month logic go? It got confusing with Georep — e.g. on the 5th before points are earned it shows the grace month as used, only flipping once points land.' },
    { author:'Chelsea', file:'Club screen — version testing', where:'"How Flash Club works" (i)', text:'Can we copy the copy from the "i" icon on the current Flash Life app?' },

    { author:'Katerina', file:'Homescreen test', where:'Lunch card · Edit', text:'Edit needs to be removed for the card state, before ordering' },
    { author:'Katerina', file:'Homescreen test', where:'Home feed', text:'Change colour? Link / green indicator' },
    { author:'Katerina', file:'Homescreen test', where:'Survey card', text:'Will completing the survey contribute to Club points?' },

    { author:'Katerina', file:'Home notification tests', where:'Notification badge "5"', text:'Fix styling' },

    { author:'Stu', file:'Flash Life (lunch)', where:'Lunch photo slot', text:'Add example photos' },
    { author:'Stu', file:'Flash Life (lunch)', where:'"Ordering closes Friday"', text:'Update to show a timer as per the home screen' },

    { author:'Chelsea', file:'Desktop app', where:'Halaal lunch item', text:'Do we need an update-order button if people order lunch then need to cancel before the cut-off, or will it auto-update / remove based on the selection below?' },

    { author:'Katerina', file:'HR dashboard', where:'People nav', text:'Directory with onboarding and role-based permissions / views' },
    { author:'Katerina', file:'HR dashboard', where:'Sidebar', text:'Role-based access — different users see different versions of the app' },
  ];
  buildCommentGroups() {
    const f = this.state.cmtFilter || 'all';
    const vis = this.COMMENTS.filter(c => f === 'all' || c.author === f);
    return this.CMT_FILES.map(file => {
      const items = vis.filter(c => c.file === file);
      return { file, count: items.length, items: items.map(c => {
        const m = this.CMT_AUTHORS[c.author] || { initials:'?', bg:'#666', you:false };
        return { author:c.author, initials:m.initials, avBg:m.bg, you:m.you, where:c.where, text:c.text,
          hasTarget: !!c.target, go: c.target ? () => this.goComment(c.target) : null };
      }) };
    }).filter(g => g.count > 0);
  }
  buildCommentFilters() {
    const f = this.state.cmtFilter || 'all';
    const counts = { all: this.COMMENTS.length };
    Object.keys(this.CMT_AUTHORS).forEach(a => { counts[a] = this.COMMENTS.filter(c => c.author === a).length; });
    return ['all','Katerina','Chelsea','Stu'].map(k => ({
      key:k, label: k === 'all' ? 'All' : k, count: counts[k] || 0,
      bg: f === k ? '#fff' : 'rgba(255,255,255,.07)',
      col: f === k ? '#0a0a0a' : '#c4c4c8',
      on: () => this.setCmtFilter(k),
    }));
  }
  goDev = (screen) => {
    const patch = { screen, devOpen: false, toast: null };
    if (screen === 'category') patch.activeCat = this.state.activeCat || this.CATS[0].id;
    if (screen === 'article') patch.activeArticle = this.state.activeArticle || this.NEWS[0].id;
    if (screen === 'course') patch.activeCourse = this.state.activeCourse || this.COURSES[0].id;
    this.setState(patch);
    const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0;
  };

  go(screen) { this.setState({ screen, toast: null }); const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0; }
  goHome = () => this.go('home');
  goClub = () => this.go('club');
  goLunch = () => this.go('lunch');
  goLearn = () => this.go('learn');
  goMenu = () => this.go('menu');
  goNews = () => this.go('news');
  goProfile = () => this.go('profile');
  goDirectory = () => this.go('directory');
  goNotifications = () => this.go('notifications');
  goBirthdays = () => this.go('birthdays');
  markAllRead = () => this.setState(() => { const r = {}; this.NOTIFS.forEach(n => r[n.id] = true); return { notifRead: r }; });
  openNotif = (n) => {
    this.setState(s => ({ notifRead: Object.assign({}, s.notifRead, { [n.id]: true }) }));
    if (n.target === 'survey') { this.openSurveyCard(); return; }
    if (n.target.indexOf('article:') === 0) { this.openArticle(n.target.split(':')[1]); const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0; return; }
    this.go(n.target);
  };
  openSurveyCard = () => { this.setState({ screen: 'survey' }); const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0; };
  _surveyAnsweredCount = (ans) => this.SURVEY_QS.filter(q => { const v = ans[q.id]; return Array.isArray(v) ? v.length > 0 : (v !== undefined && v !== null && String(v).trim() !== ''); }).length;
  setSurveyChoice = (qid, val) => this.setState(s => ({ surveyAnswers: Object.assign({}, s.surveyAnswers, { [qid]: val }) }));
  toggleSurveyMulti = (qid, val) => this.setState(s => { const cur = (s.surveyAnswers[qid] || []).slice(); const i = cur.indexOf(val); if (i >= 0) cur.splice(i, 1); else cur.push(val); return { surveyAnswers: Object.assign({}, s.surveyAnswers, { [qid]: cur }) }; });
  setSurveyText = (e) => { const v = e.target.value; this.setState(s => ({ surveyAnswers: Object.assign({}, s.surveyAnswers, { wish: v }) })); };
  surveyBack = () => { if (this.state.surveyStep <= 0) { this.go('home'); return; } this.setState(s => ({ surveyStep: s.surveyStep - 1 })); const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0; };
  surveyNext = () => {
    const last = this.SURVEY_QS.length - 1;
    const q = this.SURVEY_QS[Math.min(this.state.surveyStep || 0, last)];
    const v = this.state.surveyAnswers[q.id];
    const answered = q.type === 'multi' ? (Array.isArray(v) && v.length > 0)
      : q.type === 'text' ? true
      : (v !== undefined && v !== null && String(v).trim() !== '');
    if (!answered) return;
    if (this.state.surveyStep >= last) { this.submitSurvey(); return; }
    this.setState(s => ({ surveyStep: s.surveyStep + 1 })); const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0;
  };
  saveSurvey = () => { this.setState(s => ({ surveyStatus: 'progress', surveyAnswered: this._surveyAnsweredCount(s.surveyAnswers), screen: 'home' })); const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0; this.flash('Progress saved \u2014 pick up where you left off any time.'); };
  submitSurvey = () => { this.setState({ surveyStatus: 'done', surveyAnswered: this.SURVEY.total, surveyStep: 0, screen: 'home' }); const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0; this.flash('Survey submitted \u00b7 4-week streak. Nice one!'); };
  openMember = (id) => { this.setState({ screen:'person', activeMember:id, toast:null }); const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0; };
  setDirSearch = (e) => this.setState({ dirSearch: e.target.value });
  clearDirSearch = () => this.setState({ dirSearch: '' });
  goLinks = () => this.go('links');
  goSupport = () => this.go('support');
  setSupportType = (e) => this.setState({ supportType: e.target.value });
  setSupportMsg = (e) => this.setState({ supportMsg: e.target.value });
  pickSupportFile = (e) => { const f = e.target.files && e.target.files[0]; if (f) this.setState({ supportFile: f.name }); };
  clearSupportFile = () => this.setState({ supportFile: '' });
  submitSupport = () => {
    if (!this.state.supportMsg.trim()) { this.flash('Add a message before sending your request.'); return; }
    const type = this.state.supportType;
    this.setState({ screen:'menu', supportMsg:'', supportFile:'', supportType:'App support' });
    this.flash(type + ' request sent. We\u2019ll be in touch shortly.');
  };


  editBio = () => this.setState(s => ({ editingBio: true, bioDraft: s.bio }));
  cancelBio = () => this.setState({ editingBio: false });
  setBioDraft = (e) => this.setState({ bioDraft: e.target.value });
  saveBio = () => this.setState(s => ({ bio: s.bioDraft.trim(), editingBio: false }));

  flash(msg) {
    this.setState({ toast: msg });
    clearTimeout(this._t);
    this._t = setTimeout(() => this.setState({ toast: null }), 3800);
  }

  openCategory(id) {
    const cat = this.CATS.find(c => c.id === id);
    const checks = (this.CHECKS[id] || []).map(() => false);
    this.setState({ screen:'category', activeCat:id, note:'', expandedNom:null, photoAdded:false, checklist:checks, toast:null,
      mvReason:'', mvArea:'', mvStoreName:'', mvDate:null, mvDateOpen:false, mvDatePrev:null, mvPhoto:false, mvInsights:'',
      vacWhat:'', vacDate:null, vacDateOpen:false, vacDatePrev:null, vacPlatform:null, vacPlatformOpen:false, vacPhoto:false,
      wellType:null, wellTypeOpen:false, wellDesc:'', wellImpact:'', wellDate:null, wellDateOpen:false, wellDatePrev:null, wellPhoto:false,
      csiActivity:null, csiActivityOpen:false, csiDesc:'', csiDate:null, csiDateOpen:false, csiDatePrev:null, csiPhoto:false,
      vgTab:'nominate', expandedGiven:null, nomEmp:null, empDropOpen:false, empSearch:'', nomVal:null, nomBeh:null, behDropOpen:false, nomSituation:'', nomImpact:'', nomPhoto:false });
  }
  closeCategory = () => this.setState({ screen:'club', toast:null });
  setVgTab = (t) => this.setState({ vgTab: t });
  toggleGiven = (id) => this.setState(s => ({ expandedGiven: s.expandedGiven === id ? null : id }));
  toggleNom = (id) => this.setState(s => ({ expandedNom: s.expandedNom === id ? null : id }));
  setNote = (e) => this.setState({ note: e.target.value });
  addPhoto = () => this.setState({ photoAdded: true });
  // market visit handlers
  setMvReason = (e) => this.setState({ mvReason: e.target.value.slice(0,500) });
  setMvArea = (e) => this.setState({ mvArea: e.target.value });
  setMvStoreName = (e) => this.setState({ mvStoreName: e.target.value });
  setMvInsights = (e) => this.setState({ mvInsights: e.target.value.slice(0,500) });
  openMvDate = () => this.setState({ mvDateOpen: true, mvDatePrev: this.state.mvDate });
  onMvDatePick = (str) => this.setState({ mvDate: str });
  closeMvDate = () => this.setState({ mvDateOpen: false });
  cancelMvDate = () => this.setState({ mvDate: this.state.mvDatePrev, mvDateOpen: false });
  addMvPhoto = () => this.setState({ mvPhoto: true });
  // vacancy share handlers
  setVacWhat = (e) => this.setState({ vacWhat: e.target.value });
  openVacDate = () => this.setState({ vacDateOpen: true, vacDatePrev: this.state.vacDate });
  onVacDatePick = (str) => this.setState({ vacDate: str });
  closeVacDate = () => this.setState({ vacDateOpen: false });
  cancelVacDate = () => this.setState({ vacDate: this.state.vacDatePrev, vacDateOpen: false });
  toggleVacPlatform = () => this.setState(s => ({ vacPlatformOpen: !s.vacPlatformOpen }));
  pickVacPlatform = (p) => this.setState({ vacPlatform: p, vacPlatformOpen: false });
  addVacPhoto = () => this.setState({ vacPhoto: true });
  // wellness handlers
  toggleWellType = () => this.setState(s => ({ wellTypeOpen: !s.wellTypeOpen }));
  pickWellType = (t) => this.setState({ wellType: t, wellTypeOpen: false });
  setWellDesc = (e) => this.setState({ wellDesc: e.target.value });
  setWellImpact = (e) => this.setState({ wellImpact: e.target.value.slice(0,500) });
  openWellDate = () => this.setState({ wellDateOpen: true, wellDatePrev: this.state.wellDate });
  onWellDatePick = (str) => this.setState({ wellDate: str });
  closeWellDate = () => this.setState({ wellDateOpen: false });
  cancelWellDate = () => this.setState({ wellDate: this.state.wellDatePrev, wellDateOpen: false });
  addWellPhoto = () => this.setState({ wellPhoto: true });
  // CSI handlers
  toggleCsiActivity = () => this.setState(s => ({ csiActivityOpen: !s.csiActivityOpen }));
  pickCsiActivity = (a) => this.setState({ csiActivity: a, csiActivityOpen: false });
  setCsiDesc = (e) => this.setState({ csiDesc: e.target.value });
  openCsiDate = () => this.setState({ csiDateOpen: true, csiDatePrev: this.state.csiDate });
  onCsiDatePick = (str) => this.setState({ csiDate: str });
  closeCsiDate = () => this.setState({ csiDateOpen: false });
  cancelCsiDate = () => this.setState({ csiDate: this.state.csiDatePrev, csiDateOpen: false });
  addCsiPhoto = () => this.setState({ csiPhoto: true });
  toggleCheck(i) { this.setState(s => { const c = s.checklist.slice(); c[i] = !c[i]; return { checklist:c }; }); }
  // values: given handlers
  openEmpDrop = () => this.setState({ empDropOpen: true, empSearch: '' });
  closeEmpDrop = () => this.setState({ empDropOpen: false });
  setEmpSearch = (e) => this.setState({ empSearch: e.target.value });
  pickEmp = (name) => this.setState({ nomEmp: name, empDropOpen: false });
  pickNomVal = (v) => this.setState({ nomVal: v, nomBeh: null });
  toggleBehDrop = () => this.setState(s => ({ behDropOpen: !s.behDropOpen }));
  pickBeh = (b) => this.setState({ nomBeh: b, behDropOpen: false });
  setNomSituation = (e) => this.setState({ nomSituation: e.target.value.slice(0,500) });
  setNomImpact = (e) => this.setState({ nomImpact: e.target.value.slice(0,500) });
  addNomPhoto = () => this.setState({ nomPhoto: true });

  submitCategory() {
    const id = this.state.activeCat;
    const cat = this.CATS.find(c => c.id === id);
    const prevPts = Object.keys(this.state.done).filter(k=>this.state.done[k]).reduce((a,k)=>a+(this.CATS.find(c=>c.id===k)?.pts||0),0);
    const done = Object.assign({}, this.state.done, { [id]: true });
    // yearlyDone is a separate, sticky record of every category ever completed this
    // yearly cycle — it never clears when monthly progress resets (see startNewMonth).
    const yearlyDone = Object.assign({}, this.state.yearlyDone, { [id]: true });
    const newPts = Math.min(20, Object.keys(done).filter(k=>done[k]).reduce((a,k)=>a+(this.CATS.find(c=>c.id===k)?.pts||0),0));
    const onProgress = (this.state.clubTab||'progress') === 'progress';
    if (prevPts < 20 && newPts >= 20) {
      // reward choreography, deferred until the Progress tab is on screen: hold the bar at
      // its old value, queue the fill + badge + herd echo, and play once Progress is visible.
      this._rewardBusy = true;
      this.setState({ done, yearlyDone, screen:'club', barPoints: prevPts, pendingBar:true, pendingReward:{ idx:6 }, rewarding:true, badgeEarned:false, monthEarned:false });
      const el = document.querySelector('.fl-scroll'); if (el) el.scrollTop = 0;
      this.flash('You hit 20 points — that\u2019s a cow for July! 6 of 12 toward 5 days leave.');
      if (onProgress) setTimeout(() => this.playClubAnim(), 420);
    } else {
      // hold the bar at its old value and let it climb once Progress is viewed
      this.setState({ done, yearlyDone, screen:'club', barPoints: prevPts, pendingBar:true });
      this.flash(cat.name + ' logged · +' + cat.pts + ' points');
      if (onProgress) setTimeout(() => this.playClubAnim(), 420);
    }
  }

  // Play any queued Progress-tab animation, but only while the Progress tab is on screen.
  playClubAnim = () => {
    const s = this.state;
    if ((s.clubTab||'progress') !== 'progress') return;
    if (!s.pendingBar && !s.pendingReward) return;
    const target = Math.min(20, this.CATS.filter(c => this.state.done[c.id]).reduce((a,c) => a + c.pts, 0));
    const reward = s.pendingReward;
    requestAnimationFrame(() => {
      this.setState({ barPoints: target, pendingBar:false, pendingReward:null }, () => {
        if (reward) setTimeout(() => this.earnBadge(reward.idx), 1200);
      });
    });
  };

  // ===== Reward animation: earn 20/20 -> badge transitions to earned, herd month echoes it =====
  earnBadge = (idx) => {
    const card = document.querySelector('[data-club-card="v1"]');
    const badge = card && card.querySelector('[data-reward-cow]');
    if (!card || !badge) { this.setState({ pendingReward:{ idx } }); return; }
    const EASE = 'cubic-bezier(.2,.8,.2,1)';
    this.setState({ badgeEarned: true }, () => {
      requestAnimationFrame(() => {
        badge.animate([
          { transform: 'translate(-50%,-50%) scale(1)',    boxShadow: '0 2px 6px rgba(0,0,0,.22)', offset: 0 },
          { transform: 'translate(-50%,-50%) scale(1.26)', boxShadow: '0 0 0 7px rgba(29,250,15,.24), 0 7px 22px rgba(29,250,15,.55)', offset: .45 },
          { transform: 'translate(-50%,-50%) scale(1.26)', boxShadow: '0 0 0 7px rgba(29,250,15,.24), 0 7px 22px rgba(29,250,15,.55)', offset: .62 },
          { transform: 'translate(-50%,-50%) scale(1)',    boxShadow: '0 2px 6px rgba(0,0,0,.22)', offset: 1 }
        ], { duration: 1180, easing: EASE, fill: 'none' });
      });
    });
    setTimeout(() => this.landInHerd(idx), 1080);
  };

  landInHerd = (idx) => {
    this.setState({ monthEarned: true }, () => {
      requestAnimationFrame(() => {
        const card = document.querySelector('[data-club-card="v1"]');
        const cell = card && card.querySelector('[data-herd-idx="' + idx + '"]');
        if (!cell) { this._rewardBusy = false; this.setState({ rewarding:false }); return; }
        const EASE = 'cubic-bezier(.2,.8,.2,1)';
        cell.animate([
          { transform: 'scale(1)',    boxShadow: '0 0 0 0 rgba(29,250,15,0)', offset: 0 },
          { transform: 'scale(1.2)',  boxShadow: '0 0 0 6px rgba(29,250,15,.22), 0 5px 18px rgba(29,250,15,.5)', offset: .45 },
          { transform: 'scale(1.2)',  boxShadow: '0 0 0 6px rgba(29,250,15,.22), 0 5px 18px rgba(29,250,15,.5)', offset: .6 },
          { transform: 'scale(1)',    boxShadow: '0 0 0 0 rgba(29,250,15,0)', offset: 1 }
        ], { duration: 1100, easing: EASE, fill: 'none' });
        const cow = cell.querySelector('img');
        if (cow) cow.animate([
          { opacity: 0, transform: 'scale(.55)' },
          { opacity: 1, transform: 'scale(1.08)', offset: .7 },
          { opacity: 1, transform: 'scale(1)' }
        ], { duration: 820, easing: EASE, fill: 'none' });
        setTimeout(() => { this._rewardBusy = false; this.setState({ rewarding:false }); }, 1160);
      });
    });
  };

  copyEmail = (email) => {
    const done = () => this.flash('Email copied to clipboard');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(() => done());
    } else {
      try { const ta = document.createElement('textarea'); ta.value = email; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); } catch (e) {}
      done();
    }
  };
  openArticle(id) { this.setState({ screen:'article', activeArticle:id, toast:null }); }
  setNewsTab(t) { this.setState({ newsTab: t }); }
  setNewsView(v) { this.setState({ newsView: v }); }

  openCourse(id) { this.setState({ screen:'course', activeCourse:id, quizAnswers:[], quizSubmitted:false, toast:null }); }
  answerQuiz(qi, oi) { if (this.state.quizSubmitted) return; this.setState(s => { const a = s.quizAnswers.slice(); a[qi] = oi; return { quizAnswers:a }; }); }
  submitQuiz() {
    const course = this.COURSES.find(c => c.id === this.state.activeCourse);
    const correct = course.q.every((q,i) => this.state.quizAnswers[i] === q.correct);
    this.setState({ quizSubmitted:true });
    if (correct) {
      this.setState(s => ({ courseDone: Object.assign({}, s.courseDone, { [course.id]: true }) }));
    }
  }
  claimCourse() {
    const course = this.COURSES.find(c => c.id === this.state.activeCourse);
    this.setState({ screen:'learn' });
    this.flash(course.title + ' complete · +' + course.pts + ' points');
  }

  setLunchDay(d) { this.setState({ lunchDay:d }); }
  setLunchTab(t) { this.setState({ lunchTab:t }); }
  goLunchMenu = () => this.setLunchTab('menu');
  goLunchOrder = () => this.setLunchTab('order');
  selectMeal(day, id) { this.setState(s => { const sel = Object.assign({}, s.lunchSel); if (sel[day] === id) delete sel[day]; else sel[day] = id; return { lunchSel: sel }; }); }
  removeMeal(day) { this.setState(s => { const sel = Object.assign({}, s.lunchSel); delete sel[day]; return { lunchSel: sel }; }); }
  saveLunch() { const n = Object.keys(this.state.lunchSel).filter(k=>this.state.lunchSel[k]).length; this.setState({ screen:'home', lunchOrdered: n>0 }); this.flash(n>0 ? ('Lunch ordered for ' + n + (n===1?' day':' days') + ' next week. Change it any time before Friday 10:00.') : 'Pick at least one day before ordering.'); }
  toggleExpand(day) { this.setState(s => ({ expandedDay: s.expandedDay===day ? null : day })); }
  editDay(day) { this.setState({ lunchDay:day, expandedDay:null, lunchTab:'menu' }); setTimeout(() => { const el = document.querySelector('.fl-scroll'); if (el) el.scrollTo({ top:0, behavior:'smooth' }); }, 30); }

  buildKbRows() {
    const s = this.state;
    const shift = s.kbShift, layer = s.kbLayer || 'abc';
    const LIGHT = '#F8F8F8', DARK = '#D1D1D1';
    const ck = (c) => ({ k: c, label: c, txt: true, flex: 1, bg: LIGHT, size: '21px' });
    const bottom = (modeK) => ({ keys: [
      { k: modeK, label: (modeK === '123' ? '123' : 'ABC'), txt: true, flex: 1.45, bg: DARK, size: '15px' },
      { k: 'emoji', emoji: true, flex: 1.05, bg: LIGHT, size: '0' },
      { k: 'space', label: 'space', txt: true, flex: 5, bg: LIGHT, size: '14px' },
      { k: '.', label: '.', txt: true, flex: 1.05, bg: LIGHT, size: '21px' },
      { k: 'ret', ret: true, flex: 1.6, bg: DARK, size: '0' },
    ] });
    const del = { k: 'del', del: true, flex: 1.5, bg: DARK, size: '0' };
    if (layer === '123' || layer === 'sym') {
      const r1 = (layer === '123' ? '1234567890' : '[]{}#%^*+=').split('').map(ck);
      const r2 = (layer === '123' ? '-/:;()$&@"' : '_\\|~<>\u20AC\u00A3\u00A5\u2022').split('').map(ck);
      const leftK = layer === '123'
        ? { k: 'sym', label: '#+=', txt: true, flex: 1.5, bg: DARK, size: '15px' }
        : { k: '123', label: '123', txt: true, flex: 1.5, bg: DARK, size: '15px' };
      const r3 = [leftK].concat('.,?!\''.split('').map(ck)).concat([del]);
      return [{ keys: r1 }, { keys: r2 }, { keys: r3 }, bottom('abc')];
    }
    const tx = (c) => shift ? c.toUpperCase() : c;
    const r1 = 'qwertyuiop'.split('').map(c => ck(tx(c)));
    const r2 = 'asdfghjkl'.split('').map(c => ck(tx(c)));
    const shiftK = { k: 'shift', shift: true, flex: 1.5, bg: shift ? '#FFFFFF' : DARK, size: '0' };
    const r3 = [shiftK].concat('zxcvbnm'.split('').map(c => ck(tx(c)))).concat([del]);
    return [{ keys: r1 }, { keys: r2 }, { keys: r3 }, bottom('123')];
  }

  // Category icon assets are colour-baked SVGs (e.g. cat-transact.svg is already red).
  // A CSS filter (grayscale/opacity) can only desaturate each icon's OWN colour, so every
  // "not earned" icon ends up a slightly different, inconsistent shade of grey. Using the
  // icon as a CSS mask instead paints a flat, exact #A4A4A4 through its silhouette on an
  // #F0F0F0 tile — identical across every category regardless of its earned colour.
  renderCatIcon(iconSrc, size, active) {
    if (!iconSrc) return null;
    if (active) return React.createElement('img', { src: iconSrc, alt: '', style: { width: size, height: size } });
    const maskStyle = {
      width: size, height: size, backgroundColor: '#A4A4A4',
      WebkitMaskImage: `url(${iconSrc})`, maskImage: `url(${iconSrc})`,
      WebkitMaskSize: 'contain', maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center', maskPosition: 'center',
    };
    return React.createElement('div', { style: maskStyle });
  }

  renderVals() {
    const s = this.state;
    const done = s.done;
    const points = Math.min(20, this.CATS.filter(c => done[c.id]).reduce((a,c) => a + c.pts, 0));
    const pct = Math.round((points / 20) * 100);
    const toGo = 20 - points;
    // barPoints lags `points` so the club progress bar/badge only animate when Progress is viewed
    const barPoints = (s.barPoints == null) ? points : s.barPoints;
    const barPct = Math.round((barPoints / 20) * 100);
    const barToGo = 20 - barPoints;
    const navc = (active) => active ? '#10C504' : '#A4A4A4';
    const grp = s.screen;

    // ---- business directory ----
    const initialsOf = (n) => n.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase();
    const flatMembers = [];
    this.DIRECTORY.forEach(dep => dep.members.forEach(m => flatMembers.push(Object.assign({}, m, { deptId: dep.id, deptName: dep.name, tint: dep.tint, fg: dep.fg }))));
    const birthdayCards = this.BIRTHDAYS.map(b => {
      const m = flatMembers.find(x => (x.deptId + ':' + x.name) === b.ref) || flatMembers[0];
      return { name: m.name, role: m.role, initials: initialsOf(m.name), tint: m.tint, fg: m.fg, date: b.date, open: () => this.openMember(m.deptId + ':' + m.name) };
    });
    const birthdaysToday = birthdayCards.filter(b => b.date === 'Today');
    const birthdaysSoon = birthdayCards.filter(b => b.date !== 'Today');
    // ---- notifications ----
    const notifRead = s.notifRead || {};
    const notifItems = this.NOTIFS.map(n => ({
      icon: n.icon, iconBg: n.iconBg, iconColor: n.iconColor, time: n.time,
      title: n.title, body: n.body, cta: n.cta, group: n.group,
      unread: !notifRead[n.id],
      bg: notifRead[n.id] ? '#fff' : '#F7FBF7',
      open: () => this.openNotif(n),
    }));
    const notifsToday = notifItems.filter(n => n.group === 'today');
    const notifsEarlier = notifItems.filter(n => n.group === 'earlier');
    const unreadCount = notifItems.filter(n => n.unread).length;
    // ---- survey ----
    const streakWeeks = s.surveyStatus === 'done' ? this.SURVEY.streak + 1 : this.SURVEY.streak;
    const streakDots = Array.from({ length: 4 }).map((_, i) => {
      const on = s.surveyStatus === 'done' ? true : i < this.SURVEY.streak;
      const cur = s.surveyStatus !== 'done' && i === this.SURVEY.streak;
      return { bg: on ? 'linear-gradient(135deg,#0C9A3C,#24E80F)' : (cur ? '#fff' : '#E3E8E5'), border: cur ? '2px dashed #10C504' : '0px solid transparent' };
    });
    // ---- survey question flow ----
    const sqs = this.SURVEY_QS;
    const sStep = Math.min(s.surveyStep || 0, sqs.length - 1);
    const sQ = sqs[sStep];
    const sAns = s.surveyAnswers || {};
    const sCurAns = sAns[sQ.id];
    const sAnsweredLive = this._surveyAnsweredCount(sAns);
    const sChoiceOptions = (sQ.type === 'choice' ? sQ.options : []).map(opt => {
      const sel = sCurAns === opt;
      return {
        label: opt, sel,
        onClick: () => this.setSurveyChoice(sQ.id, opt),
        style: 'display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;text-align:left;padding:15px 16px;border-radius:14px;cursor:pointer;transition:all .15s cubic-bezier(.2,.8,.2,1);border:' + (sel ? '1.5px solid #0C8B43' : '1.5px solid #E7ECE8') + ';background:' + (sel ? '#F1FBF3' : '#fff') + ';',
        dot: 'width:20px;height:20px;border-radius:50%;flex:none;box-sizing:border-box;transition:all .15s;border:' + (sel ? '6px solid #0C8B43' : '2px solid #CBD3CF') + ';background:#fff;',
        labelStyle: 'flex:1;font-size:15px;font-weight:800;color:' + (sel ? '#0A3D1F' : '#1A1A1A') + ';'
      };
    });
    const sMultiOptions = (sQ.type === 'multi' ? sQ.options : []).map(opt => {
      const sel = Array.isArray(sCurAns) && sCurAns.indexOf(opt) >= 0;
      return {
        label: opt, sel,
        onClick: () => this.toggleSurveyMulti(sQ.id, opt),
        style: 'display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;text-align:left;padding:14px 16px;border-radius:14px;cursor:pointer;transition:all .15s cubic-bezier(.2,.8,.2,1);border:' + (sel ? '1.5px solid #0C8B43' : '1.5px solid #E7ECE8') + ';background:' + (sel ? '#F1FBF3' : '#fff') + ';',
        box: 'width:22px;height:22px;border-radius:7px;flex:none;display:flex;align-items:center;justify-content:center;box-sizing:border-box;transition:all .15s;border:' + (sel ? '0' : '2px solid #CBD3CF') + ';background:' + (sel ? '#0C8B43' : '#fff') + ';',
        labelStyle: 'flex:1;font-size:15px;font-weight:800;color:' + (sel ? '#0A3D1F' : '#1A1A1A') + ';'
      };
    });
    const sRating = (sQ.type === 'rating' ? [1,2,3,4,5] : []).map(n => {
      const sel = sCurAns === n;
      return {
        n, sel,
        onClick: () => this.setSurveyChoice(sQ.id, n),
        style: 'flex:1;aspect-ratio:1;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:900;cursor:pointer;transition:all .15s cubic-bezier(.2,.8,.2,1);border:' + (sel ? '0' : '1.5px solid #E7ECE8') + ';background:' + (sel ? 'linear-gradient(135deg,#0C9A3C,#16C40C)' : '#fff') + ';color:' + (sel ? '#fff' : '#7C8682') + ';box-shadow:' + (sel ? '0 6px 16px rgba(12,138,67,.28)' : 'none') + ';'
      };
    });
    const sAnswered = sQ.type === 'multi' ? (Array.isArray(sCurAns) && sCurAns.length > 0)
      : sQ.type === 'text' ? true
      : (sCurAns !== undefined && sCurAns !== null && String(sCurAns).trim() !== '');
    const sIsLast = sStep === sqs.length - 1;
    const directoryDepts = this.DIRECTORY.map(dep => ({
      id: dep.id, name: dep.name,
      count: dep.members.length + (dep.members.length === 1 ? ' person' : ' people'),
      members: dep.members.map((m) => ({
        name: m.name, role: m.role, initials: initialsOf(m.name), tint: dep.tint, fg: dep.fg,
        open: () => this.openMember(dep.id + ':' + m.name),
      })),
    }));
    const dq = (s.dirSearch || '').trim().toLowerCase();
    const searching = dq.length > 0;
    const searchResults = !searching ? [] : flatMembers
      .filter(m => (m.name + ' ' + m.role + ' ' + m.deptName).toLowerCase().includes(dq))
      .map(m => ({ name: m.name, role: m.role, deptName: m.deptName, initials: initialsOf(m.name), tint: m.tint, fg: m.fg, open: () => this.openMember(m.deptId + ':' + m.name) }));
    const curMember = flatMembers.find(m => (m.deptId + ':' + m.name) === s.activeMember) || flatMembers[0];
    const personDetails = [
      { label:'Department', value: curMember.deptName, border:'1px solid #F0F0F0' },
      { label:'Location', value: curMember.location, border:'1px solid #F0F0F0' },
      { label:'Email', value: curMember.email, border:'1px solid #F0F0F0', copy: () => this.copyEmail(curMember.email) },
      { label:'Phone', value: curMember.phone, border:'none' },
    ];

    // ---- auth / dev ----
    const AUTH = ['splash','welcome','auth-email','auth-otp','auth-pw','auth-success'];
    const isAuth = AUTH.indexOf(grp) !== -1;
    const isLoginMode = s.authMode === 'login';
    const darkAuth = grp === 'splash' || grp === 'welcome' || grp === 'auth-success';
    const authBgMap = { splash:'#0C8B43', welcome:'#10C504', 'auth-success':'#0C8B43' };
    const emailValid = /.+@.+\..+/.test(s.authEmail);
    const otpFull = s.authOtp.length === 6;
    const pwValid = s.authPw.length >= 6;
    const otpBoxes = [0,1,2,3,4,5].map(i => ({
      char: s.authOtp[i] || '',
      border: (i === s.authOtp.length) ? '#0C8B43' : (s.authOtp[i] ? '#0a0a0a' : '#DDDDDD'),
    }));
    const devItem = (screen, label) => ({ label, go: () => this.goDev(screen),
      bg: grp === screen ? '#1DFA0F' : 'rgba(255,255,255,.07)',
      col: grp === screen ? '#0a0a0a' : '#d4d4d8' });
    const devAuthItem = (screen, label) => ({ label, go: () => this.setState({ screen, devOpen:false }),
      bg: grp === screen ? '#1DFA0F' : 'rgba(255,255,255,.07)',
      col: grp === screen ? '#0a0a0a' : '#d4d4d8' });

    // Category cards carry two independent signals: `yearlyDone` (has this category
    // EVER been earned this yearly cycle — sticky, drives icon colour + the tick pill +
    // the "Category earned" text) and `done` (earned THIS MONTH — resets monthly, drives
    // nothing on this card directly, but feeds the category detail screen's points pill).
    const cats = this.CATS.map(c => {
      const yearlyDone = !!s.yearlyDone[c.id];
      return {
        id:c.id, name:c.name, pts:c.pts, iconSrc:c.iconSrc,
        iconEl: this.renderCatIcon(c.iconSrc, 24, yearlyDone),
        iconElSmall: this.renderCatIcon(c.iconSrc, 14, yearlyDone),
        iconElBig: this.renderCatIcon(c.iconSrc, 28, yearlyDone),
        iconTint: yearlyDone ? c.tint : '#F0F0F0',
        done: !!done[c.id], yearlyDone,
        statusLabel: yearlyDone ? 'Category earned' : 'Not earned yet',
        statusColor: yearlyDone ? '#10C504' : '#A4A4A4',
        cardBg: '#fff',
        open: () => this.openCategory(c.id),
      };
    });

    const cats10 = cats.filter(c => c.pts === 10);
    const cats5 = cats.filter(c => c.pts === 5);
    // Yearly Category Progress card — count + colour threshold (0–4 red, 5–7 orange, 8/8 green).
    // Pill is a tinted chip: light rgba background with a matching solid-colour label.
    const yearlyCatCount = cats.filter(c => c.yearlyDone).length;
    const yearlyCatLabel = yearlyCatCount + '/' + cats.length;
    const yearlyCatBg = 'rgba(16,197,4,0.12)';
    const yearlyCatText = '#0C8B43';
    // Categories Earned grid — chip per category, earned = brand tint + full-colour icon,
    // unearned = flat #F4F4F4 tile with the unified muted icon (renderCatIcon's mask treatment).
    const catsEarnedGrid = cats.map(c => ({
      id: c.id,
      chipBg: c.yearlyDone ? c.tint : '#F4F4F4',
      iconEl: this.renderCatIcon(c.iconSrc, 28, c.yearlyDone),
    }));
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const curMonth = 6; // July — the live/current month
    const BREAK = 9;    // October — cycle break, no cow
    const GRAD = 'linear-gradient(135deg,#0C9A3C 0%,#24E80F 100%)';

    // ===== Flash Club business rules — one coherent scenario per leave state =====
    // Members of six months or more get ONE grace month: a missed monthly target is
    // forgiven provided the points are made up the following month. Miss again after
    // that and they become ineligible for additional leave. Members of less than six
    // months get no grace month and must hit 20 points every month. The yearly category
    // requirement is all 8 categories for 6mo+ members, any 4 categories for members of
    // less than six months. Every state below keeps the tracker, herd, monthly history
    // and copy telling the same story.
    const leaveState = String(this.props.leaveState || '1');
    const SCEN = {
      // 1 — 6mo+ member, spotless streak, grace still in hand
      '1': { longTenure:true,  joinIdx:-1, graceIdx:-1, graceMadeUp:false, hardMiss:[],
             earned:[0,1,2,3,4,5], goalCows:11, leaveDays:5, eligible:true },
      // 2 — 6mo+ member, missed one month, grace covered it and points were made up next month
      '2': { longTenure:true,  joinIdx:-1, graceIdx:3,  graceMadeUp:true,  hardMiss:[],
             earned:[0,1,2,4,5], goalCows:11, leaveDays:5, eligible:true },
      // 3 — new starter (joined April), less than six months, no grace month, spotless so far
      '3': { longTenure:false, joinIdx:3,  graceIdx:-1, graceMadeUp:false, hardMiss:[],
             earned:[3,4,5], goalCows:6,  leaveDays:2, eligible:true },
      // 4 — 6mo+ member, used the grace month then missed again → streak ended, ineligible
      '4': { longTenure:true,  joinIdx:-1, graceIdx:3,  graceMadeUp:false, hardMiss:[4,5],
             earned:[0,1,2], goalCows:11, leaveDays:0, eligible:false },
    };
    const scen = SCEN[leaveState] || SCEN['1'];

    // yearly cow tally: months a cow was earned + a made-up grace month + the current month if hit
    const curEarned = points >= 20;
    const julyEarnedShown = curEarned && (!s.rewarding || s.monthEarned);
    const badgeMuted = !(curEarned && (!s.rewarding || s.badgeEarned));
    const yearCows = scen.earned.length + (scen.graceIdx >= 0 && scen.graceMadeUp ? 1 : 0) + (julyEarnedShown ? 1 : 0);
    const herd = Array.from({length:12}).map((_,i) => ({ bg: i < yearCows ? 'linear-gradient(135deg,#0C9A3C 0%,#24E80F 100%)' : '#EDEDED', op: i < yearCows ? '1' : '0.2' }));

    const monthsGrid = MONTHS.map((m,i) => {
      if (i === BREAK) // October — cycle break, no cow earned
        return { label:m, bg:'#F4F4F4', border:'1.5px dashed #D0D0D0', op:'1', filter:'none', labelCol:'#A4A4A4', isCow:false, isBreak:true, missed:false, current:false, cursor:'default', open:()=>{} };
      const open = () => this.openMonthSheet(i);
      const preMember = scen.joinIdx >= 0 && i < scen.joinIdx;
      let st;
      if (preMember) st = 'pre';
      else if (i === curMonth) st = julyEarnedShown ? 'earned' : 'current';
      else if (scen.earned.includes(i)) st = 'earned';
      else if (i === scen.graceIdx) st = 'grace';
      else if (scen.hardMiss.includes(i)) st = 'missed';
      else st = 'upcoming';
      if (st === 'earned')  return { label:m, bg:GRAD,      border:'none',                 op:'1',    filter:'none',        labelCol:'#252525', isCow:true,  isBreak:false, missed:false, current:false, cursor:'pointer', open };
      if (st === 'current') return { label:m, bg:'#FFFFFF',  border:'2px dashed #10C504',   op:'0.3',  filter:'none',        labelCol:'#10C504', isCow:true,  isBreak:false, missed:false, current:true,  cursor:'pointer', open };
      if (st === 'grace')   return { label:m, bg:'#FEEFD2',  border:'1.5px dashed #E0A12B', op:'0.5',  filter:'none',        labelCol:'#C77E12', isCow:true,  isBreak:false, missed:false, current:false, cursor:'pointer', open };
      if (st === 'missed')  return { label:m, bg:'#FCE5EA',  border:'1px solid #D80027',    op:'0.28', filter:'none',        labelCol:'#D80027', isCow:true,  isBreak:false, missed:true,  current:false, cursor:'pointer', open };
      if (st === 'pre')     return { label:m, bg:'#F4F4F4',  border:'none',                 op:'0',    filter:'none',        labelCol:'#C4C4C4', isCow:false, isBreak:false, missed:false, current:false, cursor:'pointer', open };
      return                       { label:m, bg:'#F4F4F4',  border:'none',                 op:'0.28', filter:'grayscale(1)', labelCol:'#A4A4A4', isCow:true,  isBreak:false, missed:false, current:false, cursor:'pointer', open };
    });
    monthsGrid.forEach((mg, i) => { mg.idx = i; });
    const GOAL = scen.goalCows;
    const yearCowsLabel = yearCows + ' / ' + GOAL;
    const cowsToGoLabel = !scen.eligible
      ? 'Streak ended \u2014 no leave this cycle'
      : (yearCows >= GOAL ? (scen.leaveDays + ' days leave unlocked!') : ((GOAL - yearCows) + ' more cows \u2192 ' + scen.leaveDays + ' days leave'));

    // per-month category history, kept consistent with each month's herd outcome
    const FULL_COMBOS = [
      ['transact','wellness','values-given'],
      ['market','learn'],
      ['transact','values-recv'],
      ['learn','wellness','vacancy'],
      ['transact','csi','values-given'],
      ['market','values-recv'],
    ];
    const PARTIAL_LOG = ['wellness','values-given']; // 10 pts — a missed / grace month
    const monthLog = {};
    let fcIdx = 0;
    for (let i = 0; i < 12; i++) {
      if (i === BREAK || i === curMonth) continue;
      if (scen.joinIdx >= 0 && i < scen.joinIdx) { monthLog[i] = []; continue; }
      if (scen.earned.includes(i)) { monthLog[i] = FULL_COMBOS[fcIdx % FULL_COMBOS.length]; fcIdx++; }
      else if (i === scen.graceIdx || scen.hardMiss.includes(i)) monthLog[i] = PARTIAL_LOG;
      else monthLog[i] = [];
    }

    // how-it-works steps — reflect whether this member has a grace month yet
    const herdSteps = scen.longTenure ? [
      { n: '1', text: 'Each month, complete activities worth 20 points across the Flash Club categories.' },
      { n: '2', text: 'Hit 20 points and you earn that month\u2019s cow. Miss it and your streak breaks.' },
      { n: '3', text: 'You\u2019ve been a member for six months or more, so your first miss each cycle is forgiven \u2014 make up the points the next month and your grace month keeps your streak alive.' },
      { n: '4', text: 'Take part in all 8 categories across the year, and collect 11 cows from November through September, to unlock 5 days of paid leave.' },
      { n: '5', text: 'October is the cycle break \u2014 no cow needed before the new cycle starts in November.' },
    ] : [
      { n: '1', text: 'Each month, complete activities worth 20 points across the Flash Club categories.' },
      { n: '2', text: 'Hit 20 points and you earn that month\u2019s cow. Miss it and your streak breaks.' },
      { n: '3', text: 'You\u2019ve been a member for less than six months, so there\u2019s no grace month yet \u2014 you need 20 points every month to stay eligible.' },
      { n: '4', text: 'Take part in any 4 of the 8 categories across the year to meet your yearly requirement.' },
      { n: '5', text: 'October is the cycle break \u2014 no cow needed before the new cycle starts in November.' },
    ];

    // month summary drawer
    const FULL_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let monthSheet = null;
    if (s.sheetMonth !== null) {
      const mi = s.sheetMonth;
      const earnedIds = (mi === curMonth) ? this.CATS.filter(c => done[c.id]).map(c => c.id) : (monthLog[mi] || []);
      const rows = this.CATS.map(c => ({
        name: c.name, pts: c.pts,
        earned: earnedIds.includes(c.id),
        valLabel: earnedIds.includes(c.id) ? ('+' + c.pts) : '—',
        valCol: earnedIds.includes(c.id) ? '#10C504' : '#C1C1C1',
        rowBg: earnedIds.includes(c.id) ? '#F1FBF0' : '#FFFFFF',
        nameCol: earnedIds.includes(c.id) ? '#252525' : '#A4A4A4',
      }));
      const total = Math.min(20, this.CATS.filter(c => earnedIds.includes(c.id)).reduce((a,c) => a + c.pts, 0));
      const isCurrent = mi === curMonth;
      const preMember = scen.joinIdx >= 0 && mi < scen.joinIdx;
      const cowEarned = total >= 20;
      const isGrace = !isCurrent && mi === scen.graceIdx;
      const missedMonth = !isCurrent && !preMember && !isGrace && !cowEarned && mi < curMonth;
      let statusLabel, statusBg, statusCol;
      if (preMember) { statusLabel = 'Before you joined'; statusBg = '#F0F0F0'; statusCol = '#A4A4A4'; }
      else if (isCurrent && !cowEarned) { statusLabel = 'In progress'; statusBg = '#FEEFD2'; statusCol = '#C77E12'; }
      else if (cowEarned) { statusLabel = 'Cow earned'; statusBg = '#10C504'; statusCol = '#FFFFFF'; }
      else if (mi > curMonth) { statusLabel = 'Upcoming'; statusBg = '#F0F0F0'; statusCol = '#A4A4A4'; }
      else if (isGrace) { statusLabel = 'Grace month used'; statusBg = '#FEEFD2'; statusCol = '#C77E12'; }
      else { statusLabel = 'Missed'; statusBg = '#FCE5EA'; statusCol = '#D80027'; }
      monthSheet = {
        title: FULL_MONTHS[mi] + ' 2026', rows, total, totalLabel: total + ' / 20',
        totalBg: missedMonth ? '#D80027' : '#0E3A1E', totalValCol: missedMonth ? '#FFFFFF' : '#10C504',
        statusLabel, statusBg, statusCol,
        hasPrev: mi > 0, hasNext: mi < 11,
        prevOpacity: mi > 0 ? '1' : '0.3', nextOpacity: mi < 11 ? '1' : '0.3',
        prev: () => this.stepMonth(-1), next: () => this.stepMonth(1),
        footnote: preMember ? ('You joined Flash Club in ' + FULL_MONTHS[scen.joinIdx] + ' 2026, so this month is before your membership started.') : (cowEarned ? 'You hit 20 points and earned this month\u2019s cow.' : (isCurrent ? (toGo + ' more points to earn this month\u2019s cow.') : (mi > curMonth ? 'This month hasn\u2019t started yet.' : (isGrace ? 'You didn\u2019t reach 20 points, but your grace month covered it \u2014 your streak continues. Each cycle includes one grace month.' : 'You didn\u2019t reach 20 points, so no cow this month and your streak was broken.')))),
      };
    }

    // category screen
    const catDef = this.CATS.find(c => c.id === s.activeCat) || this.CATS[0];
    const checklistItems = (this.CHECKS[s.activeCat] || []).map((label,i) => ({ label, box: s.checklist[i] ? '#10C504' : '#fff', boxBorder: s.checklist[i] ? '#10C504' : '#DDD', tick: s.checklist[i] ? '#fff' : 'transparent', toggle: () => this.toggleCheck(i) }));
    const isLearnCat = catDef.id === 'learn';
    const isVG = catDef.id === 'values-given';
    const isVR = catDef.id === 'values-recv';
    const isMarket = catDef.ev === 'market';
    const isVacancy = catDef.ev === 'vacancy';
    const isWellness = catDef.ev === 'wellness';
    const isCsi = catDef.ev === 'csi';
    let canSubmit = false;
    if (isVG) canSubmit = !!s.nomEmp && !!s.nomVal && !!s.nomBeh && s.nomSituation.trim().length > 0 && s.nomImpact.trim().length > 0;
    else if (isVacancy) canSubmit = s.vacWhat.trim().length > 0 && !!s.vacDate && !!s.vacPlatform && s.vacPhoto;
    else if (isMarket) {
      canSubmit = s.mvReason.trim().length > 0 && s.mvArea.trim().length > 0 && s.mvStoreName.trim().length > 0 && !!s.mvDate && s.mvPhoto && s.mvInsights.trim().length > 0;
    }
    else if (isWellness) canSubmit = !!s.wellType && s.wellDesc.trim().length > 0 && s.wellImpact.trim().length > 0 && !!s.wellDate && s.wellPhoto;
    else if (isCsi) canSubmit = !!s.csiActivity && s.csiDesc.trim().length > 0 && !!s.csiDate && s.csiPhoto;
    else if (catDef.ev === 'photo') canSubmit = s.photoAdded;
    else if (catDef.ev === 'note') canSubmit = s.note.trim().length > 3;
    else if (catDef.ev === 'checklist') canSubmit = checklistItems.length > 0 && this.state.checklist.slice(0, checklistItems.length).every(Boolean);

    // values: given view-model
    const vgValDef = this.VALUES.find(v => v.id === s.nomVal) || null;
    const vgEmpFilter = s.empSearch.trim().toLowerCase();
    const vgEmployees = this.EMPLOYEES
      .filter(n => !vgEmpFilter || n.toLowerCase().includes(vgEmpFilter))
      .map(n => ({ name:n, initials:n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(), pick:()=>this.pickEmp(n) }));
    const vgValueCards = this.VALUES.map(v => {
      const active = s.nomVal === v.id;
      return { id:v.id, label:v.label, icon:v.icon,
        cardBg: active ? 'rgba(16,197,4,0.12)' : '#F4F4F4',
        cardBorder: active ? '#10C504' : 'transparent',
        labelCol: active ? '#0A0A0A' : '#414141',
        pick: () => this.pickNomVal(v.id) };
    });
    const vgBehaviours = (vgValDef ? vgValDef.behaviours : []).map(b => ({ label:b, pick:()=>this.pickBeh(b) }));

    // values: received view-model
    const initialsFrom = (n) => n.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const vrNominations = this.NOMINATIONS_RECV.map(nm => {
      const meta = this.VAL_META[nm.val];
      const expanded = s.expandedNom === nm.id;
      return {
        id: nm.id, valLabel: meta.label, valIcon: meta.icon, valColor: meta.color, valTint: meta.tint,
        nominator: nm.nominator, initials: initialsFrom(nm.nominator), avTint: nm.avTint, avFg: nm.avFg,
        dateLabel: nm.date,
        behaviour: nm.behaviour, situation: nm.situation, impact: nm.impact,
        expanded, rows: expanded ? '1fr' : '0fr', maxH: expanded ? '640px' : '0px',
        chevRot: expanded ? 'rotate(90deg)' : 'rotate(-90deg)',
        cardBorder: expanded ? meta.color : '#EDEDED',
        toggle: () => this.toggleNom(nm.id),
      };
    });
    const vrCount = this.NOMINATIONS_RECV.length;

    // values: given history view-model
    const vgGiven = this.NOMINATIONS_GIVEN.map(g => {
      const meta = this.VAL_META[g.val];
      const expanded = s.expandedGiven === g.id;
      return {
        id: g.id, valLabel: meta.label, valIcon: meta.icon, valColor: meta.color, valTint: meta.tint,
        nominee: g.nominee, position: g.position, dateLabel: g.date,
        preview: g.situation,
        behaviour: g.behaviour, situation: g.situation, impact: g.impact,
        expanded, collapsed: !expanded, maxH: expanded ? '640px' : '0px',
        chevRot: expanded ? 'rotate(90deg)' : 'rotate(-90deg)',
        toggle: () => this.toggleGiven(g.id),
      };
    });

    // news
    const tabs = ['All','latest','culture','events','new starters'];
    const tabLabels = { All:'All', latest:'Latest', culture:'Culture', events:'Events', 'new starters':'New Starters' };
    const tabMap = { latest:'Recent', culture:'Culture', events:'Events', 'new starters':'New people' };
    const newsTabs = tabs.map(t => { const active = s.newsTab===t; return { label: tabLabels[t], bg: active ? '#000':'#fff', col: active ? '#fff':'#252525', border: active ? '#000':'#EDEDED', select: () => this.setNewsTab(t) }; });
    const newsFiltered = (s.newsTab==='All' ? this.NEWS : this.NEWS.filter(n => n.tag === tabMap[s.newsTab])).map(n => ({ tag:n.tag, title:n.title, img:n.img, slotId:'news-'+n.id, open:()=>this.openArticle(n.id) }));
    const article = this.NEWS.find(n => n.id === s.activeArticle) || this.NEWS[0];

    // lunch
    const lunchDays = this.DAYS.map(d => {
      const sel = s.lunchSel[d.key];
      const active = s.lunchDay === d.key;
      return { key:d.key, label:d.label, date:d.date, dotShow: !!sel,
        bg: active ? '#000':'#fff', col: active ? '#fff':'#252525', border: active ? '#000':'#EDEDED',
        dotBg: active ? '#1DFA0F':'#10C504', pick: () => this.setLunchDay(d.key) };
    });
    const activeDayDef = this.DAYS.find(d => d.key === s.lunchDay) || this.DAYS[0];
    const catererStyle = (c) => {
      if (c === 'Halaal') return { bg:'#FBEBDD', col:'#B4690C' };
      if (c === 'Mill & Press') return { bg:'#E4EFF7', col:'#0A6CA6' };
      return { bg:'#F0F0F0', col:'#414141' };
    };
    const activeMenu = (this.WEEK_MENU[s.lunchDay] || []).map(m => {
      const seld = s.lunchSel[s.lunchDay] === m.id;
      const cs = catererStyle(m.caterer);
      return { id:m.id, name:m.name, desc:m.desc, caterer:m.caterer, slotId:'lunch-'+m.id,
        catBg: cs.bg, catCol: cs.col, veg: !!m.veg,
        bg: '#fff', border: seld ? '#000':'#EDEDED',
        dot: seld ? '#10C504':'#fff', dotBorder: seld ? '#10C504':'#DDD', dotTick: seld ? '#fff':'transparent',
        select: () => this.selectMeal(s.lunchDay, m.id) };
    });
    const weekRecap = this.DAYS.map(d => {
      const sel = s.lunchSel[d.key];
      const meal = sel ? this.WEEK_MENU[d.key].find(m=>m.id===sel) : null;
      const expanded = s.expandedDay === d.key;
      return { key:d.key, label:d.label, date:d.date, long:d.long,
        hasMeal: !!meal, noMeal: !meal,
        mealName: meal ? meal.name : 'Not selected yet', mealDesc: meal ? meal.desc : '', mealCaterer: meal ? meal.caterer : '',
        catBg: meal ? catererStyle(meal.caterer).bg : '#F0F0F0', catCol: meal ? catererStyle(meal.caterer).col : '#414141', veg: !!(meal && meal.veg),
        mealCol: meal ? '#252525':'#A4A4A4',
        statusBg: meal ? '#E8F5EC':'#F4F4F4', statusCol: meal ? '#10C504':'#A4A4A4', statusLabel: meal ? 'Ordered':'Add',
        expanded, chevRot: expanded ? 'rotate(90deg)':'rotate(-90deg)',
        toggle: () => this.toggleExpand(d.key), edit: () => this.editDay(d.key), remove: () => this.removeMeal(d.key) };
    });
    const lunchCount = Object.keys(s.lunchSel).filter(k=>s.lunchSel[k]).length;

    const thisWeek = this.THIS_WEEK.filter(d => d.meal).map(d => {
      const meal = d.meal;
      return { key:d.key, label:d.label, date:d.date,
        hasMeal: true,
        mealName: meal.name, mealCaterer: meal.caterer,
        catBg: catererStyle(meal.caterer).bg, catCol: catererStyle(meal.caterer).col,
        veg: !!meal.veg,
        mealCol: '#252525',
        statusBg: '#E8F5EC', statusCol: '#10C504', statusLabel: 'Ordered' };
    });

    // learn
    const courseList = this.COURSES.map(c => ({ id:c.id, tag:c.tag, mins:c.mins+' min read', pts:'+'+c.pts+' pts', title:c.title, statusLabel: s.courseDone[c.id] ? 'Completed' : 'Not started', statusCol: s.courseDone[c.id] ? '#19A70D' : '#A4A4A4', open: () => this.openCourse(c.id), btnBg: s.courseDone[c.id] ? '#E8F5EC':'#000', btnCol: s.courseDone[c.id] ? '#10C504':'#fff', btnLabel: s.courseDone[c.id] ? 'Review' : 'Start' }));

    // course / quiz
    const course = this.COURSES.find(c => c.id === s.activeCourse) || this.COURSES[0];
    const quizQs = course.q.map((q,qi) => ({
      q: q.q,
      opts: q.a.map((label,oi) => {
        const sel = s.quizAnswers[qi] === oi;
        let bg = '#fff', bd = '#DDD', col = '#252525';
        // checkmark state indicator
        let markBg = '#fff', markBorder = '#D6D6D6', markCol = 'transparent', markIcon = 'ic-check';
        if (!s.quizSubmitted) {
          if (sel) { bg='#E8F5EC'; bd='#10C504'; markBg='#10C504'; markBorder='#10C504'; markCol='#fff'; }
        } else {
          if (oi===q.correct) { bg='#E6F6E5'; bd='#10C504'; col='#10C504'; markBg='#10C504'; markBorder='#10C504'; markCol='#fff'; markIcon='ic-check'; }
          else if (sel) { bg='#FCE5EA'; bd='#D80027'; col='#D80027'; markBg='#D80027'; markBorder='#D80027'; markCol='#fff'; markIcon='ic-x'; }
          else { markBorder='#E6E6E6'; }
        }
        return { label, bg, bd, col, markBg, markBorder, markCol, markIcon, pick: () => this.answerQuiz(qi,oi) };
      })
    }));
    const allAnswered = course.q.every((q,i) => s.quizAnswers[i] !== undefined);
    const quizPassed = s.quizSubmitted && course.q.every((q,i) => s.quizAnswers[i] === q.correct);
    const courseAlreadyDone = !!s.courseDone[course.id];

    return {
      isApp: !isAuth,
      isAuth,
      isSplash: grp==='splash', isWelcome: grp==='welcome',
      isAuthEmail: grp==='auth-email', isAuthOtp: grp==='auth-otp',
      isAuthPw: grp==='auth-pw', isAuthSuccess: grp==='auth-success',
      authBg: authBgMap[grp] || '#fff',
      authStatusColor: darkAuth ? '#fff' : '#0a0a0a',
      isLoginMode,
      // auth handlers
      skipSplash: this.skipSplash, startLogin: this.startLogin, startSignup: this.startSignup,
      authBack: this.authBack, setAuthEmail: this.setAuthEmail, setAuthPw: this.setAuthPw,
      focusEmail: this.focusEmail, focusPw: this.focusPw, blurField: this.blurField,
      emailBorder: s.focusedField==='email' ? '#0a0a0a' : (emailValid ? '#10C504' : '#DDDDDD'),
      emailShowCheck: emailValid,
      pwBorder: s.focusedField==='pw' ? '#0a0a0a' : (pwValid ? '#10C504' : '#DDDDDD'),
      pwShowCheck: pwValid,
      setAuthOtp: this.setAuthOtp, togglePw: this.togglePw, resendOtp: this.resendOtp,
      authEmailNext: this.authEmailNext, authOtpNext: this.authOtpNext,
      authPwSubmit: this.authPwSubmit, useFaceId: this.useFaceId,
      // auth fields
      authEmail: s.authEmail, authPw: s.authPw, authOtp: s.authOtp,
      authEmailDisplay: s.authEmail || 'your email',
      authEmailTitle: isLoginMode ? 'Welcome back' : 'Create your account',
      authEmailSub: isLoginMode ? 'Log in with your Flash work email.' : 'Use your Flash work email to get started.',
      authEmailBtnBg: emailValid ? '#000' : '#E0E0E0', authEmailBtnCol: emailValid ? '#fff' : '#A4A4A4',
      otpBoxes,
      authOtpBtnBg: otpFull ? '#000' : '#E0E0E0', authOtpBtnCol: otpFull ? '#fff' : '#A4A4A4',
      authPwTitle: isLoginMode ? 'Enter your password' : 'Create a password',
      authPwSub: isLoginMode ? 'Logging in as ' + (s.authEmail || 'your account') + '.' : 'Choose a password to secure your account.',
      authPwLabel: isLoginMode ? 'Password' : 'New password',
      pwInputType: s.pwVisible ? 'text' : 'password',
      showBiometric: isLoginMode,
      authPwBtnBg: pwValid ? '#000' : '#E0E0E0', authPwBtnCol: pwValid ? '#fff' : '#A4A4A4',
      authPwBtnLabel: isLoginMode ? 'Log in' : 'Create account',
      // dev index
      devOpen: s.devOpen, toggleDev: this.toggleDev, startNewMonth: this.startNewMonth,
      // comments review panel
      commentsOpen: s.commentsOpen, toggleComments: this.toggleComments, closeComments: this.closeComments,
      commentCount: this.COMMENTS.length,
      commentGroups: this.buildCommentGroups(), commentFilters: this.buildCommentFilters(),
      panelTransform: s.commentsOpen ? 'translateX(0)' : 'translateX(100%)',
      wrapPadRight: s.commentsOpen ? '404px' : '0px',
      devAuth: [ devAuthItem('splash','Splash'), devAuthItem('welcome','Welcome'), devAuthItem('auth-email','Email'), devAuthItem('auth-otp','OTP'), devAuthItem('auth-pw','Password'), devAuthItem('auth-success','Success') ],
      devApp: [ devItem('home','Home'), devItem('club','Club'), devItem('category','Evidence'), devItem('lunch','Lunch'), devItem('learn','Learn'), devItem('course','Course'), devItem('news','News'), devItem('article','Article'), devItem('menu','Menu'), devItem('profile','Profile'), devItem('support','Support'), devItem('links','Links'), devItem('directory','Directory'), devItem('person','Person') ],
      isHome: s.screen==='home', isClub: s.screen==='club', isCategory: s.screen==='category',
      isNews: s.screen==='news', isArticle: s.screen==='article', isLunch: s.screen==='lunch',
      isLearn: s.screen==='learn', isCourse: s.screen==='course', isMenu: s.screen==='menu',
      isProfile: s.screen==='profile',
      isSupport: s.screen==='support',
      supportType: s.supportType, supportMsg: s.supportMsg, supportFile: s.supportFile,
      hasSupportFile: !!s.supportFile, noSupportFile: !s.supportFile,
      supportSendBg: s.supportMsg.trim() ? '#000' : '#E0E0E0',
      supportSendCol: s.supportMsg.trim() ? '#fff' : '#A4A4A4',
      goSupport: this.goSupport, setSupportType: this.setSupportType, setSupportMsg: this.setSupportMsg,
      pickSupportFile: this.pickSupportFile, clearSupportFile: this.clearSupportFile, submitSupport: this.submitSupport,
      profileName: this.PROFILE.name,
      profileInitials: this.PROFILE.initials,
      profileRoleLine: this.PROFILE.role + ' · ' + this.PROFILE.location,
      goProfile: this.goProfile,
      goDirectory: this.goDirectory,
      isDirectory: s.screen === 'directory', isPerson: s.screen === 'person',
      directoryDepts,
      dirSearch: s.dirSearch, hasDirSearch: searching,
      setDirSearch: this.setDirSearch, clearDirSearch: this.clearDirSearch,
      searching, notSearching: !searching,
      searchResults, noSearchResults: searching && searchResults.length === 0,
      searchCountLabel: searchResults.length + (searchResults.length === 1 ? ' result' : ' results'),
      personName: curMember.name,
      personInitials: initialsOf(curMember.name),
      personRoleLine: curMember.role + ' · ' + curMember.deptName,
      personTint: curMember.tint, personFg: curMember.fg,
      personDetails,
      personTeamsUrl: 'https://teams.microsoft.com/l/chat/0/0?users=' + encodeURIComponent(curMember.email),
      goLinks: this.goLinks,
      isLinks: s.screen==='links',
      linkGroups: this.LINKS,
      bioText: s.bio ? s.bio : 'No bio yet — tap Edit to add one.',
      bioColor: s.bio ? '#414141' : '#A4A4A4',
      bioIdle: !s.editingBio,
      editingBio: s.editingBio,
      bioDraft: s.bioDraft,
      bioCount: s.bioDraft.length,
      editBio: this.editBio, cancelBio: this.cancelBio, saveBio: this.saveBio, setBioDraft: this.setBioDraft,
      profileStats: [
        { value: points + '/20', label: 'Points this month' },
        { value: String(yearCows), label: 'Cows this year' },
        { value: String(Object.keys(s.courseDone).filter(k=>s.courseDone[k]).length), label: 'Courses done' },
      ],
      profileDetails: [
        { label: 'Team', value: this.PROFILE.team, border: '1px solid #F0F0F0' },
        { label: 'Location', value: this.PROFILE.location, border: '1px solid #F0F0F0' },
        { label: 'Email', value: this.PROFILE.email, border: '1px solid #F0F0F0' },
        { label: 'At Flash since', value: this.PROFILE.started, border: 'none' },
      ],
      statusColor: '#000',
      statusBg: s.screen==='category' ? '#fff' : 'transparent',
      points, pointsPctStr: pct + '%',
      clubBarPoints: barPoints, clubBarPct: barPct + '%',
      clubToGoLabel: barToGo > 0 ? (barToGo + ' points to earn July’s cow') : 'July’s cow earned 🎉',
      badgeBg: badgeMuted ? '#EDEDED' : '#1DFA0F',
      badgeCowOp: badgeMuted ? '0.5' : '1',
      badgeShadow: badgeMuted ? '0 1px 3px rgba(0,0,0,.10)' : '0 2px 6px rgba(0,0,0,.22)',
      ptsToGoLabel: toGo > 0 ? (toGo + ' points to earn July\u2019s cow') : 'July\u2019s cow earned \uD83C\uDF89',
      yearCows, yearCowsLabel, monthsGrid, cowsToGoLabel,
      herdInfo: s.herdInfo,
      herdSteps,
      openHerdInfo: () => this.setState({ herdInfo: true }),
      closeHerdInfo: () => this.setState({ herdInfo: false }),
      monthSheet, closeMonthSheet: () => this.closeMonthSheet(), stop: (e) => e.stopPropagation(),
      toast: s.toast,
      goHome:this.goHome, goClub:this.goClub, goLunch:this.goLunch, goLearn:this.goLearn, goMenu:this.goMenu, goNews:this.goNews,
      navHomeColor: navc(grp==='home'),
      navNewsColor: navc(grp==='news'||grp==='article'),
      navLunchColor: navc(grp==='lunch'),
      navClubColor: navc(grp==='club'||grp==='category'),
      navLearnColor: navc(grp==='learn'||grp==='course'),
      navMenuColor: navc(grp==='menu'||grp==='profile'||grp==='support'||grp==='links'||grp==='directory'||grp==='person'),
      birthdays: birthdayCards,
      // notifications + survey
      isNotifications: s.screen==='notifications', isBirthdays: s.screen==='birthdays', isSurvey: s.screen==='survey',
      goNotifications: this.goNotifications, goBirthdays: this.goBirthdays, markAllRead: this.markAllRead,
      hasUnread: unreadCount > 0, unreadCount,
      notifSummary: unreadCount > 0 ? (unreadCount + (unreadCount === 1 ? ' new notification' : ' new notifications')) : 'You\u2019re all caught up',
      notifsToday, notifsEarlier, birthdaysToday, birthdaysSoon,
      surveyAvailable: s.surveyStatus === 'available',
      surveyInProgress: s.surveyStatus === 'progress',
      surveyDoneState: s.surveyStatus === 'done',
      surveyTopic: this.SURVEY.topic,
      surveyProgressLabel: s.surveyAnswered + ' of ' + this.SURVEY.total + ' answered',
      surveyProgressPct: Math.round(s.surveyAnswered / this.SURVEY.total * 100) + '%',
      surveyStreakText: s.surveyStatus === 'done' ? (streakWeeks + '-week streak') : (this.SURVEY.streak + '-week streak \u2014 keep it going'),
      streakDots,
      openSurveyCard: this.openSurveyCard, submitSurvey: this.submitSurvey, saveSurvey: this.saveSurvey,
      surveyBack: this.surveyBack, surveyNext: this.surveyNext, setSurveyText: this.setSurveyText,
      surveyQ: sQ.q, surveyHelp: sQ.help,
      surveyStepLabel: 'Question ' + (sStep + 1) + ' of ' + sqs.length,
      surveyFlowPct: Math.round((sStep + 1) / sqs.length * 100) + '%',
      surveyAnsweredLive: sAnsweredLive + ' of ' + sqs.length + ' answered',
      sqIsChoice: sQ.type === 'choice', sqIsMulti: sQ.type === 'multi', sqIsRating: sQ.type === 'rating', sqIsText: sQ.type === 'text',
      sChoiceOptions, sMultiOptions, sRating,
      sRatingLow: sQ.lowLabel || '', sRatingHigh: sQ.highLabel || '',
      sTextValue: (sQ.type === 'text' ? (sCurAns || '') : ''), sTextPlaceholder: sQ.placeholder || '',
      surveyNextLabel: sIsLast ? 'Submit survey' : 'Next',
      surveyNextBg: sAnswered ? '#0a0a0a' : '#E0E0E0', surveyNextCol: sAnswered ? '#fff' : '#A4A4A4',
      surveyCanNext: sAnswered, surveyIsLast: sIsLast,
      newsPreview: this.NEWS.slice(0,8).map(n => ({ tag:n.tag, title:n.title, img:n.img, slotId:'news-'+n.id, open:()=>this.openArticle(n.id) })),
      // club
      cats10, cats5, herd, yearCows,
      earnPointsSub: toGo > 0 ? ('You are ' + toGo + (toGo === 1 ? ' point' : ' points') + ' away from earning July’s cow') : 'You’ve earned July’s cow! 🎉',
      yearlyCatIcons: cats, yearlyCatLabel, yearlyCatBg, yearlyCatText, catsEarnedGrid,
      goEarnPoints: () => this.setState({ clubTab:'earn' }),
      // category
      // catYearlyDone: has this category EVER been earned this yearly cycle (sticky —
      // drives icon colour + the "+1 Category"→"Category Earned" pill). catDone stays
      // the MONTHLY signal (drives the points pill + "Done/Not done this month" text).
      catYearlyDone: !!s.yearlyDone[catDef.id],
      catName: catDef.name, catBlurb: catDef.blurb, catPtsLabel: '+' + catDef.pts + ' points',
      catIconSrc: catDef.iconSrc,
      catIconEl: this.renderCatIcon(catDef.iconSrc, 26, s.yearlyDone[catDef.id]),
      catTint: s.yearlyDone[catDef.id] ? catDef.tint : '#F0F0F0',
      catPtsShort: catDef.pts + ' Points',
      catPtsPillBg: s.done[catDef.id] ? 'rgba(16,197,4,0.12)' : '#F0F0F0',
      catPtsPillCol: s.done[catDef.id] ? '#10C504' : '#A4A4A4',
      catCatPillBg: s.yearlyDone[catDef.id] ? 'rgba(16,197,4,0.12)' : '#F0F0F0',
      catCatPillCol: s.yearlyDone[catDef.id] ? '#10C504' : '#A4A4A4',
      catCatPillLabel: s.yearlyDone[catDef.id] ? 'Category Earned' : '+1 Category',
      catDone: !!s.done[catDef.id],
      catStatusLabel: isVR ? (vrCount + (vrCount===1 ? ' nomination received' : ' nominations received')) : (s.done[catDef.id] ? 'Done this month' : 'Not done this month'),
      catStatusColor: isVR ? '#10C504' : (s.done[catDef.id] ? '#10C504' : '#A4A4A4'),
      catStatusBg: s.done[catDef.id] ? 'rgba(16,197,4,0.12)' : '#F4F4F4',
      catNotDone: !s.done[catDef.id],
      catInformational: catDef.ev==='info',
      catShowEvidence: catDef.ev!=='info' && !s.done[catDef.id] && !isVG && !isVR && !isMarket && !isVacancy && !isWellness && !isCsi,
      catHasAction: !isVR && !(isVG && s.vgTab==='history'),
      // values: received
      valuesRecvActive: isVR, vrNominations,
      catIsVG: isVG, vgActive: isVG && !s.done[catDef.id] && s.vgTab==='nominate',
      vgHistoryActive: isVG && s.vgTab==='history', vgGiven,
      vgTabNominate: () => this.setVgTab('nominate'), vgTabHistory: () => this.setVgTab('history'),
      vgToggleX: s.vgTab==='history' ? 'translateX(100%)' : 'translateX(0)',
      vgNomTabCol: s.vgTab==='nominate' ? '#fff' : '#1A1A1A',
      vgHistTabCol: s.vgTab==='history' ? '#fff' : '#1A1A1A',
      vgEmpChosen: !!s.nomEmp, vgNoEmp: !s.nomEmp,
      vgEmpLabel: s.nomEmp || 'Select employee', vgEmpLabelCol: s.nomEmp ? '#0A0A0A' : '#87898E',
      vgEmpInitials: s.nomEmp ? s.nomEmp.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : '',
      empDropOpen: s.empDropOpen, empSearch: s.empSearch, vgEmployees,
      openEmpDrop: this.openEmpDrop, closeEmpDrop: this.closeEmpDrop, setEmpSearch: this.setEmpSearch,
      vgValueCards,
      vgBehChosen: !!s.nomVal, vgBehLabel: s.nomBeh || 'Select behaviour', vgBehLabelCol: s.nomBeh ? '#0A0A0A' : '#87898E',
      behDropOpen: s.behDropOpen, vgBehaviours, toggleBehDrop: this.toggleBehDrop,
      behChevRot: s.behDropOpen ? 'rotate(-90deg)' : 'rotate(90deg)',
      nomSituation: s.nomSituation, nomImpact: s.nomImpact,
      nomSitCount: s.nomSituation.length + '/500', nomImpCount: s.nomImpact.length + '/500',
      setNomSituation: this.setNomSituation, setNomImpact: this.setNomImpact,
      nomPhoto: s.nomPhoto, nomNoPhoto: !s.nomPhoto, addNomPhoto: this.addNomPhoto,
      actionIsClose: !isLearnCat && (catDef.ev==='info' || !!s.done[catDef.id]),
      actionLabel: isLearnCat ? 'Learn' : ((catDef.ev==='info' || !!s.done[catDef.id]) ? 'Close' : 'Submit'),
      actionShowArrow: isLearnCat || !(catDef.ev==='info' || !!s.done[catDef.id]),
      actionArrowColor: (isLearnCat || canSubmit) ? '#1DFA0F' : '#A4A4A4',
      actionClick: isLearnCat ? this.goLearn : ((catDef.ev==='info' || !!s.done[catDef.id]) ? this.closeCategory : (() => this.submitCategory())),
      actionBg: isLearnCat ? '#000' : ((catDef.ev==='info' || !!s.done[catDef.id]) ? '#000' : (canSubmit ? '#000' : '#E0E0E0')),
      actionCol: isLearnCat ? '#fff' : ((catDef.ev==='info' || !!s.done[catDef.id]) ? '#fff' : (canSubmit ? '#fff' : '#A4A4A4')),
      actionIsCloseLabel: !isLearnCat && (catDef.ev==='info' || !!s.done[catDef.id]),
      closeCategory: this.closeCategory,
      evIsPhoto: catDef.ev==='photo', evIsNote: catDef.ev==='note', evIsChecklist: catDef.ev==='checklist',
      // market visit
      marketActive: isMarket && !s.done[catDef.id],
      mvReason: s.mvReason, setMvReason: this.setMvReason, mvReasonCount: s.mvReason.length + '/500',
      mvArea: s.mvArea, setMvArea: this.setMvArea,
      mvStoreName: s.mvStoreName, setMvStoreName: this.setMvStoreName,
      mvDateLabel: s.mvDate || 'Select a date', mvDateLabelCol: s.mvDate ? '#0A0A0A' : '#87898E',
      openMvDate: this.openMvDate, mvDateOpen: s.mvDateOpen, mvDateValue: s.mvDate, mvMinYear: 2020, mvMaxYear: 2027,
      onMvDatePick: this.onMvDatePick, closeMvDate: this.closeMvDate, cancelMvDate: this.cancelMvDate,
      mvPhoto: s.mvPhoto, mvNoPhoto: !s.mvPhoto, addMvPhoto: this.addMvPhoto,
      mvPhotoLabel: s.mvPhoto ? 'Photo attached' : 'Upload photo from visit', mvPhotoLabelCol: s.mvPhoto ? '#0A0A0A' : '#87898E',
      mvInsights: s.mvInsights, setMvInsights: this.setMvInsights, mvInsightsCount: s.mvInsights.length + '/500',
      // vacancy share
      vacancyActive: isVacancy && !s.done[catDef.id],
      vacWhat: s.vacWhat, setVacWhat: this.setVacWhat,
      vacDateLabel: s.vacDate || 'Select a date', vacDateLabelCol: s.vacDate ? '#0A0A0A' : '#87898E',
      openVacDate: this.openVacDate, vacDateOpen: s.vacDateOpen, vacDateValue: s.vacDate, vacMinYear: 2020, vacMaxYear: 2027,
      onVacDatePick: this.onVacDatePick, closeVacDate: this.closeVacDate, cancelVacDate: this.cancelVacDate,
      vacPlatforms: ['LinkedIn','WhatsApp','Facebook','Instagram','Email','Word of mouth','Other'].map(p => ({ label: p, pick: () => this.pickVacPlatform(p) })),
      vacPlatformOpen: s.vacPlatformOpen, toggleVacPlatform: this.toggleVacPlatform,
      vacPlatformLabel: s.vacPlatform || 'Select platform', vacPlatformLabelCol: s.vacPlatform ? '#0A0A0A' : '#87898E',
      vacPlatformChevRot: s.vacPlatformOpen ? 'rotate(-90deg)' : 'rotate(90deg)',
      vacPhoto: s.vacPhoto, vacPhotoLabel: s.vacPhoto ? 'Photo attached' : 'Upload photo', vacPhotoLabelCol: s.vacPhoto ? '#0A0A0A' : '#87898E',
      addVacPhoto: this.addVacPhoto,
      // wellness
      wellnessActive: isWellness && !s.done[catDef.id],
      wellTypes: ['Exercise / Fitness','Medical Check-up','Mindfulness Check'].map(t => ({ label: t, pick: () => this.pickWellType(t) })),
      wellTypeChosen: !!s.wellType,
      wellDescPlaceholder: s.wellType==='Medical Check-up' ? 'e.g. Went for a health scan' : (s.wellType==='Mindfulness Check' ? 'e.g. 30 minute meditation' : 'e.g. 5km run'),
      wellTypeOpen: s.wellTypeOpen, toggleWellType: this.toggleWellType,
      wellTypeLabel: s.wellType || 'Select activity type', wellTypeLabelCol: s.wellType ? '#0A0A0A' : '#87898E',
      wellTypeChevRot: s.wellTypeOpen ? 'rotate(-90deg)' : 'rotate(90deg)',
      wellDesc: s.wellDesc, setWellDesc: this.setWellDesc,
      wellImpact: s.wellImpact, setWellImpact: this.setWellImpact, wellImpactCount: s.wellImpact.length + '/500',
      wellDateLabel: s.wellDate || 'Select a date', wellDateLabelCol: s.wellDate ? '#0A0A0A' : '#87898E',
      openWellDate: this.openWellDate, wellDateOpen: s.wellDateOpen, wellDateValue: s.wellDate, wellMinYear: 2020, wellMaxYear: 2027,
      onWellDatePick: this.onWellDatePick, closeWellDate: this.closeWellDate, cancelWellDate: this.cancelWellDate,
      wellPhoto: s.wellPhoto, addWellPhoto: this.addWellPhoto,
      wellPhotoLabel: s.wellPhoto ? 'Photo attached' : 'Select photo', wellPhotoLabelCol: s.wellPhoto ? '#0A0A0A' : '#87898E',
      // CSI
      csiActive: isCsi && !s.done[catDef.id],
      csiActivities: ['Donated Blood','Donated Goods','Community Clean-Up','Prepared Goods for a Cause','Professional Skills Support','Volunteering','Animal Welfare Support'].map(a => ({ label: a, pick: () => this.pickCsiActivity(a) })),
      csiActivityChosen: !!s.csiActivity,
      csiActivityOpen: s.csiActivityOpen, toggleCsiActivity: this.toggleCsiActivity,
      csiActivityLabel: s.csiActivity || 'Select activity', csiActivityLabelCol: s.csiActivity ? '#0A0A0A' : '#87898E',
      csiActivityChevRot: s.csiActivityOpen ? 'rotate(-90deg)' : 'rotate(90deg)',
      csiDesc: s.csiDesc, setCsiDesc: this.setCsiDesc,
      csiDateLabel: s.csiDate || 'Select a date', csiDateLabelCol: s.csiDate ? '#0A0A0A' : '#87898E',
      openCsiDate: this.openCsiDate, csiDateOpen: s.csiDateOpen, csiDateValue: s.csiDate, csiMinYear: 2020, csiMaxYear: 2027,
      onCsiDatePick: this.onCsiDatePick, closeCsiDate: this.closeCsiDate, cancelCsiDate: this.cancelCsiDate,
      csiPhoto: s.csiPhoto, addCsiPhoto: this.addCsiPhoto,
      csiPhotoLabel: s.csiPhoto ? 'Photo attached' : 'Upload photo', csiPhotoLabelCol: s.csiPhoto ? '#0A0A0A' : '#87898E',
      note: s.note, photoAdded: s.photoAdded, noPhoto: !s.photoAdded, checklistItems, canSubmit,
      setNote: this.setNote, addPhoto: this.addPhoto,
      submitCat: () => this.submitCategory(), submitBg: canSubmit?'#000':'#E0E0E0', submitCol: canSubmit?'#fff':'#A4A4A4',
      backClub: this.goClub,
      clubProgress: (s.clubTab||'progress')==='progress',
      clubEarn: s.clubTab==='earn',
      setClubProgress: () => this.setState({ clubTab:'progress' }, () => this.playClubAnim()),
      setClubEarn: () => this.setState({ clubTab:'earn' }),
      clubProgBg: (s.clubTab||'progress')==='progress' ? '#000' : 'transparent',
      clubProgCol: (s.clubTab||'progress')==='progress' ? '#fff' : '#111',
      clubProgSh: (s.clubTab||'progress')==='progress' ? '0 1px 3px rgba(0,0,0,.22)' : 'none',
      clubEarnBg: s.clubTab==='earn' ? '#000' : 'transparent',
      clubEarnCol: s.clubTab==='earn' ? '#fff' : '#111',
      clubEarnSh: s.clubTab==='earn' ? '0 1px 3px rgba(0,0,0,.22)' : 'none',
      // news
      newsTabs, newsFiltered, backHome: this.goHome,
      isNewsCard: s.newsView==='card', isNewsList: s.newsView==='list',
      newsCardActive: s.newsView==='card', newsListActive: s.newsView==='list',
      newsCardBg: s.newsView==='card' ? '#000':'transparent', newsCardCol: s.newsView==='card' ? '#fff':'#A4A4A4',
      newsListBg: s.newsView==='list' ? '#000':'transparent', newsListCol: s.newsView==='list' ? '#fff':'#A4A4A4',
      setNewsCard: () => this.setNewsView('card'), setNewsList: () => this.setNewsView('list'),
      // article
      artTag: article.tag, artTitle: article.title, artImg: article.img, artSlot: 'news-'+article.id, artBody: article.body, backNews: () => this.go('news'),
      // lunch
      lunchDays, activeDayLong: activeDayDef.long, activeMenu, weekRecap, thisWeek,
      isLunchMenu: (s.lunchTab||'menu')==='menu', isLunchOrder: (s.lunchTab||'menu')==='order',
      goLunchMenu: this.goLunchMenu, goLunchOrder: this.goLunchOrder,
      tabMenuBg: (s.lunchTab||'menu')==='menu' ? '#fff' : 'transparent',
      tabSlideX: (s.lunchTab||'menu')==='order' ? 'calc(100% + 4px)' : '0px',
      tabMenuCol: (s.lunchTab||'menu')==='menu' ? '#0A0A0A' : '#7C7C7C',
      tabMenuShadow: (s.lunchTab||'menu')==='menu' ? '0 1px 3px rgba(0,0,0,.12)' : 'none',
      tabOrderBg: (s.lunchTab||'menu')==='order' ? '#fff' : 'transparent',
      tabOrderCol: (s.lunchTab||'menu')==='order' ? '#0A0A0A' : '#7C7C7C',
      tabOrderShadow: (s.lunchTab||'menu')==='order' ? '0 1px 3px rgba(0,0,0,.12)' : 'none',
      lunchOrdered: s.lunchOrdered,
      lunchHasOrder: lunchCount>0,
      lunchNoOrder: lunchCount===0,
      lunchCount,
      lunchStatusLabel: lunchCount>0 ? ('Ordered (' + lunchCount + ')') : 'Order now',
      lunchStatusBg: lunchCount>0 ? '#10C504' : '#FEEFD2',
      lunchStatusColor: lunchCount>0 ? '#FFFFFF' : '#C77E12',
      saveLabel: (s.lunchOrdered ? 'Update order · ' : 'Place order · ') + lunchCount + ' of 4 days',
      saveLunch: () => this.saveLunch(), saveBg: lunchCount>0 ? '#000':'#E0E0E0', saveCol: lunchCount>0 ? '#fff':'#A4A4A4',
      // learn
      courseList,
      // course
      courseTag: course.tag, courseTitle: course.title, courseBody: course.body, courseMins: course.mins+' min read', coursePts: '+'+course.pts+' points',
      quizQs, allAnswered, quizSubmitted: s.quizSubmitted, quizNotSubmitted: !s.quizSubmitted, quizPassed, quizFailed: s.quizSubmitted && !quizPassed, courseAlreadyDone,
      submitQuiz: () => this.submitQuiz(), claimCourse: () => this.claimCourse(), backLearn: () => this.go('learn'), retryQuiz: () => this.openCourse(course.id),
      quizBtnBg: allAnswered?'#000':'#E0E0E0', quizBtnCol: allAnswered?'#fff':'#A4A4A4',
      // on-screen keyboard
      kbRows: this.buildKbRows(),
      kbTransform: s.kbOpen ? 'translateY(0)' : 'translateY(110%)',
    };
  }

  render() {
    const v = { ...this.props, ...this.renderVals() };
    const I = ({ n, w = 22, h, style }) => (
      <svg width={w} height={h || w} style={style}><use href={'#' + n} /></svg>
    );
    return (
      <div style={css`min-height:100vh;min-height:100dvh;width:100%;display:flex;justify-content:center;background:#D8DEDC;`}>
        <Sprite />

        {/* ============ SCREEN NAVIGATOR (dev tool — fixed to the viewport corner, never over the app UI) ============ */}
        <div style={css`position:fixed;top:16px;right:16px;z-index:999;font-family:'Satoshi',system-ui,sans-serif;`}>
          <div onClick={v.toggleDev} style={css`display:flex;align-items:center;gap:7px;height:34px;padding:0 13px;border-radius:999px;background:#0a0a0a;color:#fff;font-size:12px;font-weight:800;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25);user-select:none;white-space:nowrap;`}>
            <span style={css`width:7px;height:7px;border-radius:999px;background:#1DFA0F;flex:none;`}></span>Screens
          </div>
          {v.devOpen && (
            <div style={css`margin-top:8px;width:212px;background:#1a1a1d;border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:13px;box-shadow:0 18px 50px rgba(0,0,0,.4);max-height:80vh;overflow-y:auto;`}>
              <div style={css`font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#7a7a80;margin:2px 4px 8px;`}>Auth flow</div>
              <div style={css`display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;`}>
                {v.devAuth.map((d, i) => (
                  <div key={i} onClick={d.go} style={css`padding:7px 11px;border-radius:9px;background:${d.bg};color:${d.col};font-size:12px;font-weight:700;cursor:pointer;`}>{d.label}</div>
                ))}
              </div>
              <div style={css`font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#7a7a80;margin:2px 4px 8px;`}>App</div>
              <div style={css`display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;`}>
                {v.devApp.map((d, i) => (
                  <div key={i} onClick={d.go} style={css`padding:7px 11px;border-radius:9px;background:${d.bg};color:${d.col};font-size:12px;font-weight:700;cursor:pointer;`}>{d.label}</div>
                ))}
              </div>
              <div style={css`font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#7a7a80;margin:2px 4px 8px;`}>Flash Club simulation</div>
              <div onClick={v.startNewMonth} style={css`padding:7px 11px;border-radius:9px;background:rgba(255,255,255,.07);color:#d4d4d8;font-size:12px;font-weight:700;cursor:pointer;display:inline-block;`}>Start new month</div>
            </div>
          )}
        </div>

        {/* app surface: fills the viewport on phones, becomes a centered responsive column on wider screens */}
        <div id="fl-screen" style={css`position:relative;width:100%;max-width:600px;min-height:100vh;min-height:100dvh;background:#EDEDED;overflow:hidden;display:flex;flex-direction:column;`}>

            {/* app status bar */}
            <div style={css`position:relative;z-index:30;height:34px;flex:none;display:flex;align-items:center;justify-content:flex-end;gap:6px;padding:10px 22px 0;color:${v.statusColor};background:${v.statusBg};`}>
              <I n="ic-wifi" w={15} /><I n="ic-sig" w={15} /><I n="ic-bat" w={17} h={15} />
              <span style={css`font-size:12px;font-weight:800;margin-left:2px;`}>12:30</span>
            </div>

            {/* scroll host */}
            <div className="fl-scroll" style={css`flex:1;overflow-y:auto;overflow-x:hidden;position:relative;`}>
              {v.isHome && <Home v={v} />}
              {v.isNotifications && <Notifications v={v} />}
              {v.isBirthdays && <Birthdays v={v} />}
              {v.isSurvey && <Survey v={v} />}
              {v.isClub && <Club v={v} />}
              {v.isNews && <News v={v} />}
              {v.isArticle && <Article v={v} />}
              {v.isLunch && <Lunch v={v} />}
              {v.isLearn && <Learn v={v} />}
              {v.isCourse && <Course v={v} />}
              {v.isMenu && <Menu v={v} />}
              {v.isLinks && <Links v={v} />}
              {v.isSupport && <Support v={v} />}
              {v.isProfile && <Profile v={v} />}
              {v.isDirectory && <Directory v={v} />}
              {v.isPerson && <Person v={v} />}
            </div>

            {/* category page (full-screen, reusable across all categories) */}
            {v.isCategory && <Category v={v} />}

            {/* month points drawer */}
            {v.monthSheet && (
              <div onClick={v.closeMonthSheet} style={css`position:absolute;inset:0;z-index:60;background:rgba(10,10,10,.45);display:flex;align-items:flex-end;animation:flFade .2s ease;`}>
                <div onClick={v.stop} style={css`width:100%;background:#fff;border-radius:26px 26px 0 0;padding:10px 20px 26px;box-shadow:0 -10px 40px rgba(0,0,0,.2);animation:flFade .22s ease;max-height:88%;overflow-y:auto;box-sizing:border-box;`}>
                  <div style={css`width:38px;height:4px;border-radius:999px;background:#E0E0E0;margin:0 auto 16px;`}></div>
                  <div style={css`display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;`}>
                    <div onClick={v.monthSheet.prev} style={css`width:34px;height:34px;border-radius:50%;background:#F4F4F4;color:#252525;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none;opacity:${v.monthSheet.prevOpacity};`}><I n="ic-back" w={18} /></div>
                    <div style={css`flex:1;text-align:center;`}>
                      <div style={css`font-size:19px;font-weight:900;letter-spacing:-0.01em;`}>{v.monthSheet.title}</div>
                      <span style={css`display:inline-block;margin-top:5px;font-size:11px;font-weight:800;color:${v.monthSheet.statusCol};background:${v.monthSheet.statusBg};border-radius:999px;padding:4px 11px;`}>{v.monthSheet.statusLabel}</span>
                    </div>
                    <div onClick={v.monthSheet.next} style={css`width:34px;height:34px;border-radius:50%;background:#F4F4F4;color:#252525;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none;opacity:${v.monthSheet.nextOpacity};`}><I n="ic-chev" w={18} /></div>
                  </div>
                  <div style={css`font-size:13px;color:#7C7C7C;font-weight:600;text-align:center;margin-bottom:18px;`}>Points earned this month</div>
                  <div style={css`border:1px solid #EDEDED;border-radius:16px;overflow:hidden;`}>
                    <div style={css`display:flex;align-items:center;padding:11px 14px;background:#FAFAFA;border-bottom:1px solid #EDEDED;`}>
                      <span style={css`flex:1;font-size:11px;font-weight:800;color:#A4A4A4;text-transform:uppercase;letter-spacing:0.04em;`}>Category</span>
                      <span style={css`font-size:11px;font-weight:800;color:#A4A4A4;text-transform:uppercase;letter-spacing:0.04em;`}>Points</span>
                    </div>
                    {v.monthSheet.rows.map((r, i) => (
                      <div key={i} style={css`display:flex;align-items:center;padding:12px 14px;border-bottom:1px solid #F4F4F4;background:${r.rowBg};`}>
                        <span style={css`flex:1;font-size:14px;font-weight:700;color:${r.nameCol};`}>{r.name}</span>
                        <span style={css`font-size:14px;font-weight:800;color:${r.valCol};min-width:34px;text-align:right;`}>{r.valLabel}</span>
                      </div>
                    ))}
                    <div style={css`display:flex;align-items:center;padding:14px;background:${v.monthSheet.totalBg};`}>
                      <span style={css`flex:1;font-size:15px;font-weight:900;color:#fff;`}>Total this month</span>
                      <span style={css`font-size:15px;font-weight:900;color:${v.monthSheet.totalValCol};`}>{v.monthSheet.totalLabel}</span>
                    </div>
                  </div>
                  <div style={css`font-size:12px;color:#7C7C7C;font-weight:600;line-height:1.45;margin:14px 0 18px;text-wrap:pretty;`}>{v.monthSheet.footnote}</div>
                  <div onClick={v.closeMonthSheet} style={css`background:#0A0A0A;color:#fff;font-weight:800;font-size:15px;text-align:center;padding:15px;border-radius:999px;cursor:pointer;`}>Close</div>
                </div>
              </div>
            )}

            {/* herd / Flash Club info drawer */}
            {v.herdInfo && (
              <div onClick={v.closeHerdInfo} style={css`position:absolute;inset:0;z-index:60;background:rgba(10,10,10,.45);display:flex;align-items:flex-end;animation:flFade .2s ease;`}>
                <div onClick={v.stop} style={css`width:100%;background:#fff;border-radius:26px 26px 0 0;padding:10px 22px 26px;box-shadow:0 -10px 40px rgba(0,0,0,.2);animation:flSheetUp .28s cubic-bezier(.2,.8,.2,1);max-height:88%;overflow-y:auto;box-sizing:border-box;`}>
                  <div style={css`width:38px;height:4px;border-radius:999px;background:#E0E0E0;margin:0 auto 18px;`}></div>
                  <div style={css`display:flex;align-items:center;gap:11px;margin-bottom:6px;`}>
                    <div style={css`width:44px;height:44px;border-radius:50%;background:#1DFA0F;display:flex;align-items:center;justify-content:center;flex:none;filter:drop-shadow(0 2px 5px rgba(0,0,0,.15));`}><img src="assets/flash-cow.svg" alt="" style={css`width:28px;height:28px;display:block;`} /></div>
                    <div>
                      <div style={css`font-size:21px;font-weight:900;letter-spacing:-0.02em;line-height:1;`}>How Flash Club Works</div>
                      <div style={css`font-size:12px;font-weight:700;color:#10C504;margin-top:4px;`}>Earn cows · unlock leave</div>
                    </div>
                  </div>
                  <p style={css`font-size:14px;line-height:1.55;color:#414141;font-weight:600;margin:14px 0 0;text-wrap:pretty;`}>Earn 20 points each month to collect a cow. Build a herd of 11 cows across the year and you unlock 5 days of paid leave.</p>
                  <div style={css`background:#F6F8F6;border-radius:16px;padding:16px;margin-top:18px;`}>
                    <div style={css`font-size:11px;font-weight:900;color:#0E3A1E;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:12px;`}>The cycle</div>
                    {v.herdSteps.map((st, i) => (
                      <div key={i} style={css`display:flex;gap:12px;align-items:flex-start;margin-bottom:14px;`}>
                        <div style={css`width:24px;height:24px;border-radius:50%;background:#10C504;color:#fff;font-size:12px;font-weight:900;display:flex;align-items:center;justify-content:center;flex:none;`}>{st.n}</div>
                        <span style={css`font-size:13px;line-height:1.5;color:#414141;font-weight:600;text-wrap:pretty;`}>{st.text}</span>
                      </div>
                    ))}
                  </div>
                  <div style={css`display:flex;flex-direction:column;gap:11px;margin-top:18px;`}>
                    <div style={css`display:flex;align-items:center;gap:11px;`}><span style={css`width:18px;height:18px;border-radius:5px;background:linear-gradient(135deg,#0C9A3C,#24E80F);flex:none;`}></span><span style={css`font-size:13px;font-weight:700;color:#414141;`}>Earned — cow collected that month</span></div>
                    <div style={css`display:flex;align-items:center;gap:11px;`}><span style={css`width:18px;height:18px;border-radius:5px;background:#FCE5EA;border:1px solid #F3B5C0;box-sizing:border-box;flex:none;`}></span><span style={css`font-size:13px;font-weight:700;color:#414141;`}>Missed — points fell short, streak broken</span></div>
                    <div style={css`display:flex;align-items:center;gap:11px;`}><span style={css`width:18px;height:18px;border-radius:5px;background:#FEEFD2;border:1.5px dashed #E0A12B;box-sizing:border-box;flex:none;`}></span><span style={css`font-size:13px;font-weight:700;color:#414141;`}>Grace — first miss forgiven, streak kept</span></div>
                    <div style={css`display:flex;align-items:center;gap:11px;`}><span style={css`width:18px;height:18px;border-radius:5px;background-color:var(--flash-grey-150);flex:none;`}></span><span style={css`font-size:13px;font-weight:700;color:#414141;`}>Upcoming — still to come this year</span></div>
                    <div style={css`display:flex;align-items:center;gap:11px;`}><span style={css`width:18px;height:18px;border-radius:5px;background:#F4F4F4;border:1.5px dashed #D0D0D0;box-sizing:border-box;flex:none;`}></span><span style={css`font-size:13px;font-weight:700;color:#414141;`}>Break — October, no cow needed</span></div>
                  </div>
                  <div onClick={v.closeHerdInfo} style={css`background:#0A0A0A;color:#fff;font-weight:800;font-size:15px;text-align:center;padding:15px;border-radius:999px;cursor:pointer;margin-top:22px;`}>Got it</div>
                </div>
              </div>
            )}

            {/* toast */}
            {v.toast && (
              <div style={css`position:absolute;left:18px;right:18px;bottom:96px;z-index:50;background:#0E3A1E;color:#fff;border-radius:16px;padding:13px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 10px 30px rgba(0,0,0,.3);animation:flToastIn .3s ease;`}>
                <div style={css`width:38px;height:38px;border-radius:50%;background:#10C504;display:flex;align-items:center;justify-content:center;flex:none;`}><img src="assets/flash-cow.svg" alt="" style={css`width:24px;height:24px;display:block;`} /></div>
                <div style={css`font-size:13px;font-weight:700;line-height:1.3;`}>{v.toast}</div>
              </div>
            )}

            {/* auth / splash overlay */}
            {v.isAuth && (
              <div style={css`position:absolute;inset:0;z-index:50;display:flex;flex-direction:column;background:${v.authBg};overflow:hidden;`}>
                <div style={css`height:34px;flex:none;display:flex;align-items:center;justify-content:flex-end;gap:6px;padding:10px 22px 0;color:${v.authStatusColor};`}>
                  <I n="ic-wifi" w={15} /><I n="ic-sig" w={15} /><I n="ic-bat" w={17} h={15} />
                  <span style={css`font-size:12px;font-weight:800;margin-left:2px;`}>12:30</span>
                </div>

                {v.isSplash && (
                  <div onClick={v.skipSplash} style={css`position:absolute;inset:0;display:flex;align-items:center;justify-content:center;cursor:pointer;`}>
                    <div id="lottie-splash" style={css`position:absolute;inset:0;width:100%;height:100%;`}></div>
                  </div>
                )}

                {v.isWelcome && (
                  <div style={css`flex:1;display:flex;flex-direction:column;padding:30px 28px 34px;`}>
                    <div style={css`flex:1;display:flex;flex-direction:column;justify-content:center;`}>
                      <img src="assets/flash-life-logo.svg" alt="Flash Life" style={css`height:88px;width:101px;margin-bottom:30px;align-self:flex-start;`} />
                      <div style={css`font-size:38px;font-weight:900;letter-spacing:-0.03em;line-height:1.02;color:#fff;`}>Welcome to<br />Flash Life</div>
                      <div style={css`font-size:15px;font-weight:600;color:var(--flash-black);margin-top:16px;line-height:1.45;max-width:280px;`}>Your workday, rewards and team, all in one place. Earn points, order lunch and keep up with all things Flash.</div>
                    </div>
                    <div style={css`display:flex;flex-direction:column;gap:11px;`}>
                      <div onClick={v.startLogin} style={css`height:54px;border-radius:999px;color:var(--flash-white);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;cursor:pointer;background-color:var(--flash-black);`}>Log in</div>
                      <div onClick={v.startSignup} style={css`height:54px;border-radius:999px;background:transparent;border:2px solid var(--flash-black);color:var(--flash-black);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;cursor:pointer;`}>Create account</div>
                    </div>
                  </div>
                )}

                {v.isAuthEmail && (
                  <div style={css`flex:1;display:flex;flex-direction:column;padding:8px 26px 30px;`}>
                    <div onClick={v.authBack} style={css`width:42px;height:42px;border-radius:999px;background:#F3F3F3;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#0a0a0a;`}><I n="ic-back" w={20} /></div>
                    <div style={css`font-size:30px;font-weight:900;letter-spacing:-0.025em;line-height:1.05;margin:24px 0 8px;`}>{v.authEmailTitle}</div>
                    <div style={css`font-size:14px;font-weight:600;color:#646464;margin-bottom:28px;`}>{v.authEmailSub}</div>
                    <label style={css`font-size:13px;font-weight:800;color:#252525;margin-bottom:8px;`}>Work email</label>
                    <div style={css`position:relative;`}>
                      <input type="email" value={v.authEmail} onChange={v.setAuthEmail} onFocus={v.focusEmail} onBlur={v.blurField} placeholder="you@flash.co.za" style={css`height:54px;width:100%;border-radius:14px;border-width:1.5px;border-style:solid;border-color:${v.emailBorder};background:#fff;padding:0 50px 0 16px;font-size:16px;font-weight:600;font-family:inherit;outline:none;box-sizing:border-box;transition:border-color .15s ease;`} />
                      {v.emailShowCheck && <div style={css`position:absolute;right:16px;top:0;bottom:0;display:flex;align-items:center;color:#10C504;`}><I n="ic-check" w={22} /></div>}
                    </div>
                    <div style={css`flex:1;`}></div>
                    <div onClick={v.authEmailNext} style={css`height:54px;border-radius:999px;background:${v.authEmailBtnBg};color:${v.authEmailBtnCol};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;cursor:pointer;`}>Continue</div>
                  </div>
                )}

                {v.isAuthOtp && (
                  <div style={css`flex:1;display:flex;flex-direction:column;padding:8px 26px 30px;`}>
                    <div onClick={v.authBack} style={css`width:42px;height:42px;border-radius:999px;background:#F3F3F3;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#0a0a0a;`}><I n="ic-back" w={20} /></div>
                    <div style={css`font-size:30px;font-weight:900;letter-spacing:-0.025em;line-height:1.05;margin:24px 0 8px;`}>Verify your email</div>
                    <div style={css`font-size:14px;font-weight:600;color:#646464;margin-bottom:28px;`}>We sent a 6-digit code to {v.authEmailDisplay}.</div>
                    <div style={css`position:relative;`}>
                      <div style={css`display:flex;gap:9px;`}>
                        {v.otpBoxes.map((box, i) => (
                          <div key={i} style={css`flex:1;height:58px;border-radius:13px;border:2px solid ${box.border};background:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;color:#0a0a0a;`}>{box.char}</div>
                        ))}
                      </div>
                      <input inputMode="numeric" value={v.authOtp} onChange={v.setAuthOtp} style={css`position:absolute;inset:0;width:100%;height:100%;opacity:0;border:none;background:transparent;font-size:24px;letter-spacing:40px;cursor:pointer;`} autoFocus />
                    </div>
                    <div onClick={v.resendOtp} style={css`font-size:13px;font-weight:800;color:#0C8B43;margin-top:18px;cursor:pointer;`}>Resend code</div>
                    <div style={css`flex:1;`}></div>
                    <div onClick={v.authOtpNext} style={css`height:54px;border-radius:999px;background:${v.authOtpBtnBg};color:${v.authOtpBtnCol};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;cursor:pointer;`}>Verify</div>
                  </div>
                )}

                {v.isAuthPw && (
                  <div style={css`flex:1;display:flex;flex-direction:column;padding:8px 26px 30px;`}>
                    <div onClick={v.authBack} style={css`width:42px;height:42px;border-radius:999px;background:#F3F3F3;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#0a0a0a;`}><I n="ic-back" w={20} /></div>
                    <div style={css`font-size:30px;font-weight:900;letter-spacing:-0.025em;line-height:1.05;margin:24px 0 8px;`}>{v.authPwTitle}</div>
                    <div style={css`font-size:14px;font-weight:600;color:#646464;margin-bottom:28px;`}>{v.authPwSub}</div>
                    <label style={css`font-size:13px;font-weight:800;color:#252525;margin-bottom:8px;`}>{v.authPwLabel}</label>
                    <div style={css`position:relative;`}>
                      <input type={v.pwInputType} value={v.authPw} onChange={v.setAuthPw} onFocus={v.focusPw} onBlur={v.blurField} placeholder="••••••••" style={css`height:54px;width:100%;border-radius:14px;border-width:1.5px;border-style:solid;border-color:${v.pwBorder};background:#fff;padding:0 84px 0 16px;font-size:16px;font-weight:600;font-family:inherit;outline:none;box-sizing:border-box;transition:border-color .15s ease;`} />
                      <div style={css`position:absolute;right:14px;top:0;bottom:0;display:flex;align-items:center;gap:10px;`}>
                        {v.pwShowCheck && <div style={css`display:flex;align-items:center;color:#10C504;`}><I n="ic-check" w={22} /></div>}
                        <div onClick={v.togglePw} style={css`display:flex;align-items:center;cursor:pointer;color:#A4A4A4;`}><I n="ic-eye" w={22} /></div>
                      </div>
                    </div>
                    {v.isLoginMode && <div onClick={v.authBack} style={css`font-size:13px;font-weight:800;color:#0C8B43;margin-top:16px;cursor:pointer;`}>Forgot password?</div>}
                    <div style={css`flex:1;`}></div>
                    {v.showBiometric && <div onClick={v.useFaceId} style={css`display:flex;align-items:center;justify-content:center;gap:9px;height:52px;border-radius:999px;background:#F3F3F3;color:#0a0a0a;font-size:15px;font-weight:800;cursor:pointer;margin-bottom:11px;`}><I n="ic-face" w={22} />Use Face ID</div>}
                    <div onClick={v.authPwSubmit} style={css`height:54px;border-radius:999px;background:${v.authPwBtnBg};color:${v.authPwBtnCol};display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;cursor:pointer;`}>{v.authPwBtnLabel}</div>
                  </div>
                )}

                {v.isAuthSuccess && (
                  <div style={css`flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px 32px;text-align:center;`}>
                    <div style={css`width:74px;height:74px;border-radius:999px;background:#1DFA0F;display:flex;align-items:center;justify-content:center;color:#0a0a0a;animation:flPop .5s cubic-bezier(.2,.9,.3,1.2) both;`}><I n="ic-check" w={48} /></div>
                    <div style={css`font-size:30px;font-weight:900;letter-spacing:-0.025em;color:#fff;margin-top:26px;`}>You're all set</div>
                  </div>
                )}
              </div>
            )}

            {/* bottom nav */}
            {v.isApp && (
              <div style={css`position:absolute;left:14px;right:14px;bottom:12px;z-index:40;height:62px;background:#fff;border:1px solid #EDEDED;border-radius:26px;box-shadow:0 8px 24px rgba(0,0,0,.14);display:flex;align-items:center;justify-content:space-around;`}>
                <div onClick={v.goHome} style={css`display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;color:${v.navHomeColor};`}><I n="ic-home" /><span style={css`font-size:10px;font-weight:800;`}>Home</span></div>
                <div onClick={v.goNews} style={css`display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;color:${v.navNewsColor};`}><I n="ic-news" /><span style={css`font-size:10px;font-weight:800;`}>News</span></div>
                <div onClick={v.goClub} style={css`display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;color:${v.navClubColor};`}><I n="ic-club" /><span style={css`font-size:10px;font-weight:800;`}>Club</span></div>
                <div onClick={v.goLearn} style={css`display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;color:${v.navLearnColor};`}><I n="ic-learn" /><span style={css`font-size:10px;font-weight:800;`}>Learn</span></div>
                <div onClick={v.goMenu} style={css`display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;color:${v.navMenuColor};`}><I n="ic-menu" /><span style={css`font-size:10px;font-weight:800;`}>Menu</span></div>
              </div>
            )}

            {/* on-screen keyboard */}
            <div id="fl-kb" style={css`position:absolute;left:0;right:0;bottom:0;z-index:120;height:300px;background:#E2E2E2;box-shadow:0 -0.5px 0 rgba(0,0,0,.12);transform:${v.kbTransform};transition:transform .3s cubic-bezier(.2,.85,.25,1);will-change:transform;padding:9px 3px 0;box-sizing:border-box;display:flex;flex-direction:column;touch-action:none;user-select:none;-webkit-user-select:none;font-family:'Satoshi',system-ui,sans-serif;`}>
              {v.kbRows.map((row, ri) => (
                <div key={ri} style={css`display:flex;gap:6px;padding:0 4px;margin-bottom:11px;align-items:stretch;justify-content:center;`}>
                  {row.keys.map((k, ki) => (
                    <div key={ki} data-key={k.k} style={css`flex:${k.flex};flex-basis:0;min-width:0;height:46px;border-radius:6px;background:${k.bg};box-shadow:0 1px 0 rgba(0,0,0,.32);display:flex;align-items:center;justify-content:center;font-size:${k.size};font-weight:500;color:#0a0a0a;cursor:pointer;`}>
                      {k.txt && k.label}
                      {k.shift && <I n="ic-kb-shift" w={22} />}
                      {k.del && <I n="ic-kb-del" w={26} />}
                      {k.ret && <I n="ic-kb-ret" w={24} />}
                      {k.emoji && <I n="ic-kb-emoji" w={25} style={{ color: '#0a0a0a' }} />}
                    </div>
                  ))}
                </div>
              ))}
              <div style={css`flex:1;`}></div>
              <div style={css`width:138px;height:5px;border-radius:999px;background:#0a0a0a;opacity:.82;margin:0 auto 8px;`}></div>
            </div>

          </div>
      </div>
    );
  }
}

export default FlashApp;
