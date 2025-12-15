// ...existing code...

// ボタン要素
const stButton = document.querySelector('.stbutton');
const backButton_a = document.querySelector('.backbutton_a');
const prepButton = document.querySelector('.prepbutton');
const backButton_b = document.querySelector('.backbutton_b');
const pracButton = document.querySelector('.pracbutton');
const stopbutton = document.querySelector('.stopbutton');
const homebutton = document.querySelector('.homebutton');

// ページ要素
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const page5 = document.getElementById('page5');

// スライダー類
const tslider = document.querySelector('.tslider');
const tsliderLabel = document.getElementById('tsliderLabel');
const lslider = document.querySelector('.lslider');
const lsliderLabel = document.getElementById('lsliderLabel');

// 表示ラベル辞書
const timeLabels = {1:'1分',2:'2分',3:'3分',4:'4分',5:'5分'};
const levelLabels = {1:'1もじ',2:'みじかいことば',3:'ながいことば',4:'みじかい文',5:'ながい文'};

function updateSliderLabel(val) {
  if (tsliderLabel) tsliderLabel.textContent = `じかん: ${val} — ${timeLabels[val]||''}`;
}
function updateLevelLabel(val) {
  if (lsliderLabel) lsliderLabel.textContent = `レベル: ${val} — ${levelLabels[val]||''}`;
}
if (tslider) { updateSliderLabel(tslider.value); tslider.addEventListener('input', e=>updateSliderLabel(e.target.value)); }
if (lslider) { updateLevelLabel(lslider.value); lslider.addEventListener('input', e=>updateLevelLabel(e.target.value)); }

// wanakana 利用判定 + フォールバック
const useWanakana = typeof window !== 'undefined' && window.wanakana && typeof wanakana.toRomaji === 'function';
function hiraganaToRomaji(input) {
  if (useWanakana) return wanakana.toRomaji(input);
  // 最低限のフォールバック（簡易）
  const map = {'あ':'a','い':'i','う':'u','え':'e','お':'o',
    'か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
    'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so',
    'ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
    'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no',
    'は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
    'ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
    'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo',
    'や':'ya','ゆ':'yu','よ':'yo','ら':'ra','り':'ri',
    'る':'ru','れ':'re','ろ':'ro','わ':'wa','を':'o',
    'ん':'n',};
  const combos = {
    'きゃ':'kya','きゅ':'kyu','きょ':'kyo',
    'ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
    'しゃ':'sha','しゅ':'shu','しょ':'sho',
    'じゃ':'ja','じゅ':'ju','じょ':'jo',
    'ちゃ':'cha','ちゅ':'chu','ちょ':'cho',
    'にゃ':'nya','にゅ':'nyu','にょ':'nyo',
    'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo',
    'ふぁ':'fa','ふぃ':'fi','ふゅ':'fyu','ふぇ':'fe','ふぉ':'fo',
    'びゃ':'bya','びゅ':'byu','びょ':'byo',
    'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo',
    'みゃ':'mya','みゅ':'myu','みょ':'myo',
    'りゃ':'rya','りゅ':'ryu','りょ':'ryo',
    
  };
  let out = '';
  input = input || '';
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const next = input[i+1] || '';
    const pair = ch + next;
    // 促音（っ）：次の子音を重ねる
    if (ch === 'っ') {
      const next2 = input[i+2] || '';
      const nextPair = next + next2;
      const romNext = combos[nextPair] || combos[next] || map[next] || '';
      const consonant = romNext.charAt(0) || '';
      if (consonant.match(/[bcdfghjklmnpqrstvwxyz]/)) out += consonant;
      continue;
    }
    // 拗音（きゃ など）
    if (combos[pair]) { out += combos[pair]; i++; continue; }
    out += map[ch] || ch;
  }
  return out;
}

// レベル別語リスト（必要に応じて編集）
function getWordsForLevel(level) {
  const lists = {
    1: ['a','b','c','d','e','f','g','h','i','j',
      'k','l','m','n','o','p','q','r','s','t',
      'u','v','w','x','y','z'],
      //アルファベット1文字
    2: ['ねずみ','うし','とら','うさぎ','りゅう',
      'へび','うま','ひつじ','さる','とり',
      'いぬ','いのしし','ねこ','おおかみ','ぶた',
      'きつね','たぬき','ぱんだ','くま','きりん',
      'かめ','ぞう','おうむ','しまうま','こあら',
      'しか','りす','もぐら','ひよこ','ふくろう',
      'にわとり','かえる','やもり','うずら','とかげ',
      'さめ','たこ','いか','さかな','ふぐ',
      'さば','さけ','くらげ','あじ','えび',
      'たい','うなぎ','かに','いるか','くじら', //50
      'りんご','なし','ばなな','めろん','ぶどう',
      'くるみ','かき','すいか','くり','もも',
      'いちご','れもん','まんごー','すだち','きうい',
      'きゃべつ','もやし','れたす','はくさい','にんじん',
      'とまと','だいこん','かぶ','きのこ','なす',
      'ぴーまん','ごーや','ぱぷりか','しめじ','たまねぎ',
      'くるま','ばいく','でんしゃ','ふね','ばす',
      'め','はな','くち','みみ','あたま',
      'むね','うで','かた','くび','こし',
      'おなか','て','ゆび','あし','くるぶし',],
    //十二支、動物、海の生き物、果物、野菜、乗り物、からだの部位
    //4文字まで
    3: [
      'カレーライス','バターロール','カレーパン','マーガリン','おみそしる',
      'ハンバーガー','チキンカツ','フライドポテト','オムライス','スパゲッティ',
      'ミートソース','サンドイッチ','ポテトサラダ','シーザーサラダ','ポタージュ',
      'コーンスープ','コーヒーゼリー','プリンアラモード','チョコレート','アイスクリーム',
      'たんじょうび','クリスマス','おしょうがつ','ハロウィン','こどものひ','せいじんのひ',
      'けんこうしんだん','うんどうかい','けっこんしき','にゅうがくしき','そつぎょうしき',
      'でんわばんごう','メールアドレス','インターネット','スマートフォン','コンピュータ',
      'テレビゲーム','ソーシャルメディア','オンラインショッピング','デジタルカメラ','ビデオカメラ',
      'バスケットボール','テニスラケット','サッカーボール','ゴールポスト','ゴルフクラブ',
      'スイミングプール','ランニングシューズ','サーフボード','スケートボード','スノーボード', //50
      'たけやぶやけた','わたしまけましたわ','','','',
    ],
    //料理、イベント・式典、IT用語、スポーツ用品、回文
    //5文字以上
    4: ['いぬがあるいている。',    'ねこがねている 。',
    'あめがふってきた。',    'きょうはいいてんき。',
    'ごはんをたこう。',    'えんぴつでかこう。',
    'みんなであそぶ。',    'くつをはいてでる。',
    'すいかがあまい。',    'ともだちとわらう。',
    'ほんをよむ。',    'ボールをなげる。',
    'サッカーをしてあそぶ。',    'やまにのぼる。',
    'うんどうかいにでる。',    'しあいでまける。',
    'あさのゆうがなめざめ。',    'ごはんをたくさんたべる。',
    'そらにくもがある。',    'はなをつみにいく。',
    'かぜがふいている。',    'つきがでてきた。',
    'でんしゃがはしる。',    'かさをひろげよう。',
    'りんごをたべたい。',    'うみでおよいだ。',
    'ことりがなく。',    'やまにのぼろう。',
    'がっこうをやすむ。',    'さつまいもをほる。',
    'さかながおよいでいる。',    'あかいいちごをさがす。',
    'くるまがはしっている。',    'ひこうきがとんでいる。',
    'おにぎりをたべた。',    'かみをきってみた。',
    'いすにすわろう。',    'でんきをつけよう。',
    'ふうせんがうかんでいる。',    'かばんをもっていく。',
    'あめがふっている。',    'ゆきがふっている。',
    'きょうかしょをあける。',    'たいようがてっている。',
    'くもがうごいている。',    'そらがあおい。',
    'つきがみえる。',    'ほしがひかっている。',
    'かぜがやんでいる。',    'あさがきている。', //50
    'そらにとりがとんでいる。',    'はながさいている。',
    'つきがかがやいている。',    'たいようがのぼっている。',
    'おはしをもつ。',    'いけにさかながいる。',
    'でんしゃがはしっている。',    'じてんしゃにのる。',
    'おはなみにいく。',    'ふねがうみにうかんでいる。',
    'りんごをたべる。',    'みかんをたべる。',
    'ぶどうをたべる。',    'なしをたべる。',
    'ももをたべる。',    'すいかをたべる。',
    'いちごをたべる。',    'ばななをたべる。',
    'さくらんぼをたべる。',    'かきをたべる。',
    'いぬとあそんでいる。',    'ねことあそんでいる。',
    'とりがなく。',    'うさぎがはねている。',
    'ぞうがあるいている。',    'きりんがみている。',
    'さるがのぼっている。',    'くまがあるいている。',
    'かめがあるいている。',    'いんこがなく。',
    'えんぴつでかいてある。',    'けしごむでなおす。',
    'ほんをよんでいる。',    'ノートにかいている。',
    'じをならっている。',    'すうじをかぞえている。',
    'えをかいている。',    'うたをうたっている。',
    'ピアノをひいた。',    'たいこをたたいている。',
    'こうえんにいく。',    'やまにのぼる。',
    'うみにいく。',    'かわであそぶ。',
    'みちをあるく。',    'いえにかえる。',
    'がっこうにいく。',    'きょうしつにすわる。',
    'じゅぎょうをうける。',    'せんせいにはなす。', //100
],
    5: ['むずかしいぶんしょうをよむれんしゅうです','いろいろなことをくわしくせつめいする']
  };
  return lists[level] || lists[1];
}

// 単語表示管理
let wordList = [];
let currentWordIndex = 0;
function shuffleArray(arr){ for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]];} return arr; }

function loadWords(list){
  // list: ["ねこ", {kana:"りんご", romaji:"ringo"}, ...]
  wordList = shuffleArray(Array.from(list||[]));
  currentWordIndex = 0;
  showCurrentWord();
}

function showCurrentWord(){
  const kanaEl = document.getElementById('wordLabel') || document.querySelector('.wordLabel');
  const romaEl = document.getElementById('romajiLabel') || document.querySelector('.romajiLabel');
  const item = (wordList && wordList.length) ? wordList[currentWordIndex] : null;
  if (!kanaEl) return;
  if (!item) { kanaEl.textContent=''; if (romaEl) romaEl.textContent=''; return; }
  let kana, roma;
  if (typeof item === 'string') { kana = item; roma = hiraganaToRomaji(item); }
  else { kana = item.kana || ''; roma = item.romaji || (kana ? hiraganaToRomaji(kana) : ''); }
  kanaEl.textContent = kana;
  if (romaEl) romaEl.textContent = roma;
}

function nextWord(){
  if (!wordList || wordList.length===0) return;
  currentWordIndex++;
  if (currentWordIndex >= wordList.length) { wordList = shuffleArray(wordList); currentWordIndex = 0; }
  showCurrentWord();
}

// キー操作: Z で次へ（page4 表示時のみ）
document.addEventListener('keydown', e=>{
  if (!e.key) return;
  if (e.key.toLowerCase() === 'z') {
    if (page4 && page4.style.display === 'flex') nextWord();
  }
});

// タイマー
let timer = null;
let timeRemaining = 0;
function updateTimerDisplay(){
  const el = document.getElementById('timerLabel') || document.querySelector('.timerLabel');
  if (!el) return;
  const m = Math.floor(timeRemaining/60), s = timeRemaining%60;
  el.textContent = `${m}:${String(s).padStart(2,'0')}`;
}
function stopTimer(){ if (timer){ clearInterval(timer); timer=null; } }

function startTimer(durationMinutes){
  stopTimer();
  const mins = Math.max(0, Math.floor(Number(durationMinutes)||0));
  timeRemaining = mins * 60;
  updateTimerDisplay();
  timer = setInterval(()=>{
    if (timeRemaining <= 0){
      stopTimer();
      // 時間切れで page5 へ
      if (page4) page4.style.display = 'none';
      if (page5) page5.style.display = 'flex';
      return;
    }
    timeRemaining--;
    updateTimerDisplay();
  }, 1000);
}

// ページ遷移ハンドラ（要素存在チェック）
if (stButton) stButton.addEventListener('click', ()=>{ if (page1) page1.style.display='none'; if (page2) page2.style.display='flex'; });
if (backButton_a) backButton_a.addEventListener('click', ()=>{ if (page2) page2.style.display='none'; if (page1) page1.style.display='flex'; });
if (prepButton) prepButton.addEventListener('click', ()=>{ if (page2) page2.style.display='none'; if (page3) { page3.style.display='flex'; startMediapipeHands(); } });
if (backButton_b) backButton_b.addEventListener('click', ()=>{ if (page3) { page3.style.display='none'; stopMediapipeHands(); } if (page2) page2.style.display='flex'; });

// pracButton: page3 -> page4、タイマ開始、語リストセット
if (pracButton) pracButton.addEventListener('click', ()=>{
  // 開始前の準備ページから移るので Mediapipe を止める
  stopMediapipeHands();
  if (page3) page3.style.display='none';
  if (page4) page4.style.display='flex';
  const mins = tslider ? tslider.value : 1;
  startTimer(mins);
  const level = lslider ? Number(lslider.value) : 1;
  const words = getWordsForLevel(level);
  loadWords(words);
});

// stopbutton: タイマー停止してホームへ
if (stopbutton) stopbutton.addEventListener('click', ()=>{
  stopTimer();
  if (page4) page4.style.display='none';
  if (page1) page1.style.display='flex';
});

// homebutton: page5 -> page1（タイマー停止）
if (homebutton) homebutton.addEventListener('click', ()=>{
  stopTimer();
  if (page5) page5.style.display='none';
  if (page1) page1.style.display='flex';
});

// 初期表示: hide all except page1 (必要なら調整)
function initPages(){
  if (page1) page1.style.display='flex';
  if (page2) page2.style.display='none';
  if (page3) page3.style.display='none';
  if (page4) page4.style.display='none';
  if (page5) page5.style.display='none';
}
initPages();

// --- Mediapipe Hands (page3 用) ---
let mpCamera = null;
let mpHands = null;
function onHandsResults(results){
  const canvas = document.getElementById('mp_output_canvas');
  const status = document.getElementById('mp_status');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.save();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (results.image) ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
  if (results.multiHandLandmarks && results.multiHandLandmarks.length>0){
    for (const landmarks of results.multiHandLandmarks){
      if (typeof drawConnectors === 'function') drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {color:'#00FF00', lineWidth:2});
      if (typeof drawLandmarks === 'function') drawLandmarks(ctx, landmarks, {color:'#FF0000', lineWidth:1});
      // 指先ランドマークを強調: 4,8,12,16,20
      [4,8,12,16,20].forEach(i=>{
        const lm = landmarks[i]; if (!lm) return;
        const x = lm.x * canvas.width; const y = lm.y * canvas.height;
        ctx.fillStyle = 'yellow'; ctx.beginPath(); ctx.arc(x, y, 6, 0, 2*Math.PI); ctx.fill();
        ctx.fillStyle = 'black'; ctx.font='12px sans-serif'; ctx.fillText(String(i), x+6, y-6);
      });
    }
    if (status) status.textContent = '手検出: OK';
  } else {
    if (status) status.textContent = '手が見つかりません';
  }
  ctx.restore();
}

function startMediapipeHands(){
  if (mpCamera) return; // 既に開始済み
  const video = document.getElementById('mp_input_video');
  const canvas = document.getElementById('mp_output_canvas');
  const status = document.getElementById('mp_status');
  if (!video || !canvas) {
    if (status) status.textContent = 'カメラ要素が見つかりません';
    return;
  }
  mpHands = new Hands({locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`});
  mpHands.setOptions({maxNumHands:1, minDetectionConfidence:0.6, minTrackingConfidence:0.5});
  mpHands.onResults(onHandsResults);
  mpCamera = new Camera(video, {
    onFrame: async () => { await mpHands.send({image: video}); },
    width: 640,
    height: 480
  });
  mpCamera.start().then(()=>{ if (status) status.textContent = 'カメラ接続中'; }).catch(err=>{ if (status) status.textContent = 'カメラ開始失敗'; console.error(err); });
}

function stopMediapipeHands(){
  try{ if (mpCamera && typeof mpCamera.stop === 'function') mpCamera.stop(); }catch(e){}
  mpCamera = null;
  try{ if (mpHands && typeof mpHands.close === 'function') mpHands.close(); }catch(e){}
  mpHands = null;
  const canvas = document.getElementById('mp_output_canvas');
  const status = document.getElementById('mp_status');
  if (canvas){ const ctx = canvas.getContext('2d'); ctx.clearRect(0,0,canvas.width,canvas.height); }
  if (status) status.textContent = 'カメラ停止';
}

// ...existing code...