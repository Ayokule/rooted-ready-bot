// ═══════════════════════════════════════════════
// ROOTED & READY — TELEGRAM BOT
// Interactive + Scheduled Alarms + KJV Bible
// ═══════════════════════════════════════════════
const TelegramBot = require('node-telegram-bot-api');
const express     = require('express');

const TOKEN   = process.env.BOT_TOKEN || '';
const MY_ID  = process.env.CHAT_ID   || '';
const TZ     = 'Africa/Lagos';

const bot    = new TelegramBot(TOKEN, { polling: true });
const app    = express();
console.log('✝️ Rooted & Ready Bot is running...');

// ── KJV VERSES ──────────────────────────────────
const ENC = [
  { tx: 'I can do all things through Christ which strengtheneth me.',                                          rf: 'Philippians 4:13 KJV' },
  { tx: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee.',       rf: 'Isaiah 41:10 KJV' },
  { tx: 'Greater is he that is in you, than he that is in the world.',                                         rf: '1 John 4:4 KJV' },
  { tx: 'No weapon that is formed against thee shall prosper.',                                               rf: 'Isaiah 54:17 KJV' },
  { tx: 'The LORD is my shepherd; I shall not want.',                                                         rf: 'Psalm 23:1 KJV' },
  { tx: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',       rf: '2 Timothy 1:7 KJV' },
  { tx: 'The joy of the LORD is your strength.',                                                              rf: 'Nehemiah 8:10 KJV' },
  { tx: 'Submit yourselves therefore to God. Resist the devil, and he will flee from you.',                    rf: 'James 4:7 KJV' },
  { tx: 'They that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.',   rf: 'Isaiah 40:31 KJV' },
  { tx: 'Nay, in all these things we are more than conquerors through him that loved us.',                      rf: 'Romans 8:37 KJV' },
  { tx: 'Be thou faithful unto death, and I will give thee a crown of life.',                                 rf: 'Revelation 2:10 KJV' },
  { tx: 'I will never leave thee, nor forsake thee.',                                                         rf: 'Hebrews 13:5 KJV' },
  { tx: 'Being confident of this very thing, that he which hath begun a good work in you will perform it.',    rf: 'Philippians 1:6 KJV' },
  { tx: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.',     rf: 'Isaiah 26:3 KJV' },
  { tx: 'God is our refuge and strength, a very present help in trouble.',                                    rf: 'Psalm 46:1 KJV' },
  { tx: 'Cast thy burden upon the LORD, and he shall sustain thee.',                                          rf: 'Psalm 55:22 KJV' },
  { tx: 'Blessed is the man that endureth temptation: for when he is tried, he shall receive the crown of life.', rf: 'James 1:12 KJV' },
  { tx: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',                 rf: 'Proverbs 3:5 KJV' },
];
const DAILY = [
  { th:'The Foundation of Faith',   rf:'Hebrews 11:1 KJV',         tx:'Now faith is the substance of things hoped for, the evidence of things not seen.',                                                                    re:'Your faith is real substance. Stand firm on it today.' },
  { th:'His Constant Presence',      rf:'Psalm 139:7 KJV',          tx:'Whither shall I go from thy spirit? or whither shall I flee from thy presence?',                                                                       re:'God is in that hostel room with you tonight. Never alone.' },
  { th:'A Clean Heart',             rf:'Psalm 51:10 KJV',          tx:'Create in me a clean heart, O God; and renew a right spirit within me.',                                                                             re:'Holiness is received daily as a gift. Pray this verse every morning.' },
  { th:'His Grace Is Enough',        rf:'2 Corinthians 12:9 KJV',   tx:'My grace is sufficient for thee: for my strength is made perfect in weakness.',                                                                       re:'Your exhaustion is the exact place His power shows up strongest.' },
  { th:'The Way of Escape',          rf:'1 Corinthians 10:13 KJV',  tx:'God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape.',              re:'The way out is always there. Look for it immediately.' },
  { th:'Renewing the Mind',          rf:'Romans 12:2 KJV',          tx:'Be not conformed to this world: but be ye transformed by the renewing of your mind.',                                                               re:'Guard your eye gates and ear gates. This is daily warfare.' },
  { th:'The Sword of the Spirit',     rf:'Ephesians 6:17 KJV',       tx:'Take the sword of the Spirit, which is the word of God.',                                                                                           re:'The KJV verse you memorised is a real weapon. Speak it aloud.' },
  { th:'Reaping in Due Season',      rf:'Galatians 6:9 KJV',         tx:'Let us not be weary in well doing: for in due season we shall reap, if we faint not.',                                                               re:'Your harvest is coming. Do not faint. Do not stop.' },
  { th:'Peace of God',              rf:'Philippians 4:6-7 KJV',    tx:'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.',                  re:'Pray before the day can touch you. Let His peace guard you first.' },
  { th:'Plans of Peace',            rf:'Jeremiah 29:11 KJV',        tx:'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',               re:'This JAMB season is part of God\'s greater plan for your life.' },
];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function todayVerse() { return DAILY[(new Date().getDate() - 1) % DAILY.length]; }
function send(id, txt) { bot.sendMessage(id, txt, { parse_mode: 'Markdown' }); }

// ── COMMANDS ────────────────────────────────────
bot.onText(/\/start/, msg => send(msg.chat.id,
  '✝️ *Rooted & Ready — Spiritual Bot*\n\n' +
  'Peace be unto you, brother. I am your daily spiritual companion.\n\n' +
  '📖 /verse — Today\'s KJV scripture\n' +
  '⚡ /encourage — Random powerful verse\n' +
  '🙏 /pray — ACTS prayer guide\n' +
  '⚔️ /armour — Ephesians 6 declaration\n' +
  '🛡️ /hostel — Purity reminder\n' +
  '🌅 /morning — Morning routine\n' +
  '🌙 /night — Night declaration\n' +
  '🕊️ /fast — Fasting guidance\n\n' +
  '_Type naturally too: "tempted", "tired", "I failed" — I understand you._\n\n' +
  '🔥 *"Be thou faithful unto death, and I will give thee a crown of life."*\n— Revelation 2:10 KJV'
));

bot.onText(/\/verse/, msg => {
  const v = todayVerse();
  send(msg.chat.id,
    '📖 *Today\'s KJV Scripture*\n\n_"' + v.tx + '"_\n— *' + v.rf + '*\n\n' +
    '✦ Theme: ' + v.th + '\n\n💭 _' + v.re + '_');
});

bot.onText(/\/encourage/, msg => {
  const v = rand(ENC);
  send(msg.chat.id,
    '⚡ *God Says To You Right Now*\n\n_"' + v.tx + '"_\n— *' + v.rf + '*\n\n🔥 You are not alone. Keep pressing in. Heaven is watching.');
});

bot.onText(/\/pray/, msg => send(msg.chat.id,
  '🙏 *ACTS Prayer Guide*\n\n' +
  '*A — Adoration* (2 min)\nPraise God for who He is, not what He gives.\n_"Thou art holy, O thou that inhabitest the praises of Israel." — Psalm 22:3 KJV_\n\n' +
  '*C — Confession* (2 min)\nBe completely honest. Honesty brings freedom.\n_"If we confess our sins, he is faithful and just to forgive us." — 1 John 1:9 KJV_\n\n' +
  '*T — Thanksgiving* (2 min)\nName 3 specific blessings. Never be generic with God.\n_"In every thing give thanks." — 1 Thessalonians 5:18 KJV_\n\n' +
  '*S — Supplication* (5 min)\nAsk boldly and specifically.\n_"Ask, and it shall be given you." — Matthew 7:7 KJV_\n\n⏱️ Total: ~11 minutes. Start right now. 🙏'
));

bot.onText(/\/armour/, msg => send(msg.chat.id,
  '⚔️ *Armour of God — Ephesians 6:14-18 KJV*\n\n' +
  '_"Stand therefore, having your loins girt about with *truth*, and having on the *breastplate of righteousness*;\n\nAnd your feet shod with the preparation of the *gospel of peace*;\n\nAbove all, taking the *shield of faith*, wherewith ye shall be able to quench all the fiery darts of the wicked.\n\nAnd take the *helmet of salvation*, and the *sword of the Spirit*, which is the word of God:\n\nPraying always with all prayer and supplication in the Spirit."_\n\n🗣️ *Speak this aloud right now. You are dressing for real war.* ✝️'
));

bot.onText(/\/hostel/, msg => send(msg.chat.id,
  '🛡️ *Purity Shield — Tonight*\n\n_"Flee also youthful lusts: but follow righteousness, faith, charity, peace, with them that call on the Lord out of a pure heart."_\n— 2 Timothy 2:22 KJV\n\n✅ Earphones in before sleeping — worship or sermon\n✅ Bible app open, not social media\n✅ Speak your declaration aloud\n✅ If temptation comes — FLEE immediately. No debate, no negotiation.\n\n_"Keep thy heart with all diligence; for out of it are the issues of life."_\n— Proverbs 4:23 KJV'
));

bot.onText(/\/morning/, msg => send(msg.chat.id,
  '🌅 *35-Minute Morning Routine*\n\n*Min 1-3 — Wake & Surrender*\nBefore feet touch floor: "Lord, this day is Thine."\n\n*Min 4-15 — Read & Receive*\nSend /verse — read 3 times slowly. What is God saying to you?\n\n*Min 16-25 — Worship & Pray*\nOne worship song. Then pray through /pray\n\n*Min 26-35 — Declare & Go*\nSpeak /armour aloud. Walk out ready for war.\n\n_"My voice shalt thou hear in the morning, O LORD."_\n— Psalm 5:3 KJV 🌅'
));

bot.onText(/\/night/, msg => send(msg.chat.id,
  '🌙 *Night Consecration — Speak This Aloud*\n\n_"I am not my own; I am bought with a price. I yield my body, my mind, and my spirit to the Lord Jesus Christ this night. No weapon formed against me shall prosper. Cover me with Thy blood. I choose holiness. In Jesus\' mighty name. Amen."_\n\n✅ Write 3 thanksgivings in a notebook\n✅ Earphones in — worship till you sleep\n\n_"He giveth his beloved sleep."_\n— Psalm 127:2 KJV 🙏'
));

bot.onText(/\/fast/, msg => {
  const fasts = [
    '🕊️ *Thought Fast*\nEvery impure thought — replace with a KJV verse immediately.\n\n_"Casting down imaginations...and bringing into captivity every thought to the obedience of Christ."_\n— 2 Corinthians 10:5 KJV',
    '🕊️ *Media Fast (Night)*\nNo screen after 9pm. Replace scrolling with the Word or worship.\n\n_"Is not this the fast that I have chosen?"_\n— Isaiah 58:6 KJV\n\nOne of the most powerful fasts you can practice.',
    '🕊️ *Skip Breakfast Fast*\nPray through breakfast time instead of eating. Take lunch normally.\n\n_"Man shall not live by bread alone, but by every word of God."_\n— Luke 4:4 KJV',
    '🕊️ *Daniel Fast*\nEat only simple food today. No treats, no excess.\n\n_"But Daniel purposed in his heart that he would not defile himself."_\n— Daniel 1:8 KJV',
  ];
  send(msg.chat.id, fasts[new Date().getDay() % fasts.length]);
});

// ── KEYWORD DETECTION ───────────────────────────
bot.on('message', msg => {
  const t = (msg.text || '').toLowerCase();
  if (t.startsWith('/')) return; // already handled above
  const id = msg.chat.id;

  if      (t.match(/tempt|lust|urge|desire/))
    send(id, '🛡️ *HOLD FIRM — Emergency Response*\n\n_"There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it."_\n— 1 Corinthians 10:13 KJV\n\n⚡ *DO THIS NOW:*\n1. Close the app / move away physically\n2. Say aloud: "I am bought with a price. I choose holiness."\n3. Open a worship song immediately\n4. Text your sister in faith\n\nYou have the victory in Jesus\' name! ✝️🔥');

  else if (t.match(/tired|weak|exhaust|worn|drain/))
    send(id, '💪 *God Sees Your Weariness*\n\n_"He giveth power to the faint; and to them that have no might he increaseth strength. Even the youths shall faint and be weary...but they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles."_\n— Isaiah 40:29-31 KJV\n\nThe JAMB days are long. The hostel is hard. But you are not running on your own strength — God\'s strength is perfected in exactly this weakness.\n\nRest in Him tonight. Tomorrow He renews. 🙏');

  else if (t.match(/fail|sin|fell|mess|wrong|mistake/))
    send(id, '❤️ *His Mercies Are New — Right Now*\n\n_"If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."_\n— 1 John 1:9 KJV\n\n_"It is of the LORD\'s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness."_\n— Lamentations 3:22-23 KJV\n\nConfess it. Receive forgiveness. Get up. Walk forward. God has not written you off. He never will. Come back to Him right now. ✝️');

  else if (t.match(/afraid|fear|scared|anxious|worry/))
    send(id, '🔥 *Be Not Afraid*\n\n_"Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness."_\n— Isaiah 41:10 KJV\n\n_"For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind."_\n— 2 Timothy 1:7 KJV\n\nGod is with you in this moment specifically. Right here. Right now. 🙏');

  else if (t.match(/lonely|alone|nobody/))
    send(id, '🤗 *You Are Never Alone*\n\n_"I will never leave thee, nor forsake thee. So that we may boldly say, The Lord is my helper, and I will not fear what man shall do unto me."_\n— Hebrews 13:5-6 KJV\n\n_"The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy."_\n— Zephaniah 3:17 KJV\n\nIn that hostel room, in that JAMB centre — God is sitting right next to you. Closer than the air you breathe. ✝️');

  else {
    const v = rand(ENC);
    send(id, '✝️ *A Word For You*\n\n_"' + v.tx + '"_\n— *' + v.rf + '*\n\nType /start to see all commands I understand. 🙏');
  }
});

// ── SCHEDULED ALARMS ────────────────────────────
const SCHEDULE = [
  { time: '05:30', fn: id => bot.onText(/x/, () => {}) || send(id, '🌅 *Morning Prayer Time!*\n\nRise and seek His face before the world claims your morning. Open your 35-minute routine: /morning\n\n_"My voice shalt thou hear in the morning, O LORD."_\n— Psalm 5:3 KJV')   },
  { time: '06:00', fn: id => { const v=todayVerse(); send(id,'📖 *Today\'s KJV Verse*\n\n_"'+v.tx+'"_\n— *'+v.rf+'*\n\n💭 _'+v.re+'_'); }                                                                        },
  { time: '06:30', fn: id => send(id, '⚔️ *Put on the Armour!*\n\nSpeak Ephesians 6:14-18 aloud before you leave for work. You walk into a battlefield today — be dressed for war.\n\nSend /armour to read it now.')                            },
  { time: '12:00', fn: id => send(id, '🙏 *Midday Prayer*\n\nOne silent minute between students: "Lord, I am still Thine. Strengthen me right now." Pray for the next person who walks to your desk.\n\n_"Pray without ceasing."_\n— 1 Thess 5:17 KJV')},
  { time: '17:00', fn: id => send(id, '👫 *Sister in Faith Check-in*\n\nReach out to your accountability partner today. Even a 5-minute prayer call is powerful armour against tonight.\n\n_"The effectual fervent prayer of a righteous man availeth much."_\n— James 5:16 KJV') },
  { time: '19:00', fn: id => send(id, '🎵 *Evening Worship Time*\n\nBefore the hostel noise begins — worship first. Put on one song and give God 10 minutes. Claim your space for the Spirit.\n\n_"Thou art holy, O thou that inhabitest the praises of Israel."_\n— Psalm 22:3 KJV')  },
  { time: '21:30', fn: id => send(id, '🌙 *Night Consecration*\n\nTime to end the day with God. Write 3 thanksgivings. Then speak your night declaration aloud.\n\nSend /night to get the full declaration.')                                                               },
  { time: '22:00', fn: id => send(id, '💤 *Sleep Guard*\n\nEarphones in now — worship music or sermon. Guard what your mind hears last tonight. Sleep holy, brother.\n\n_"He giveth his beloved sleep."_\n— Psalm 127:2 KJV')                             },
];
let lastFired = {};
setInterval(() => {
  const now   = new Date();
  const hhmm  = now.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TZ });
  const today = now.toDateString();
  SCHEDULE.forEach(a => {
    if (a.time === hhmm && lastFired[a.time] !== today) {
      lastFired[a.time] = today;
      a.fn(MY_ID);
    }
  });
}, 60000);

// ── EXPRESS SERVER (required by Koyeb) ──────────
// Koyeb needs an HTTP server. This also lets UptimeRobot ping it.
const PORT = process.env.PORT || 3000;
app.get('/',     (req, res) => res.send('✝️ Rooted & Ready Bot is alive and running!'));
app.get('/ping', (req, res) => res.send('pong'));
app.listen(PORT, () => console.log('Server on port ' + PORT));
