// 울릉트립 공용 스크립트

// ── 홈 히어로 사진 슬라이드 (5초 간격) ──
(function () {
  var slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  var dots = document.querySelectorAll('.hero-dots span'), i = 0;
  setInterval(function () {
    i = (i + 1) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('show', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
  }, 5000);
})();

// ── AI 비서 카드 ──
function aiAsk(q) {
  var input = document.getElementById('aiInput');
  if (!input) return;
  q = q || input.value.trim();
  if (!q) return;
  input.value = q;
  var box = document.getElementById('aiAnswer'), t = document.getElementById('aiAnswerText'), html;
  if (/코스|일정|여행지|어디/.test(q)) {
    html = '처음이시라면 <b>2박 3일 핵심 일주 코스</b>를 추천드려요. 모노레일·케이블카·관음도·나리분지까지 담겨 있어요. <a href="courses.html">추천 코스 보러 가기 →</a>';
  } else if (/배|뱃|선박|시간표|결항|출항|여객/.test(q)) {
    html = '포항·강릉·묵호·후포에서 울릉도행 여객선이 출발해요. 포항 쾌속선 기준 약 3시간 30분이에요. 운항 여부는 기상에 따라 달라지니 예매 전 선사 공지를 확인하세요. <a href="info.html">뱃길 안내 →</a>';
  } else if (/독도/.test(q)) {
    html = '독도 여객선은 울릉도(저동항)에서 출발해요. 기상 조건에 따라 접안이 어려울 수 있어 일정 중반 배치를 추천드려요. <a href="info.html">자세히 보기 →</a>';
  } else if (/맛집|먹|음식|식당|홍합|칼국수|특산/.test(q)) {
    html = '울릉도에 오셨다면 <b>홍합밥</b>, <b>따개비칼국수</b>, <b>약소불고기</b>는 꼭 드셔보세요. <a href="food.html">먹거리·특산물 →</a>';
  } else if (/숙소|호텔|펜션|민박|잘 곳/.test(q)) {
    html = '도동·저동 시가지 숙소는 이동이 편하고, 북면 오션뷰 펜션은 전망이 좋아요. <a href="stay.html">숙박 가이드 →</a>';
  } else if (/날씨|기상|파고/.test(q)) {
    html = '울릉도 날씨는 변덕이 심해요. 여행 전 기상청 해상예보와 선사 운항 공지를 함께 확인하는 걸 추천드려요. <a href="info.html">여행 정보 →</a>';
  } else {
    html = '지금은 프로토타입이라 간단한 안내만 가능해요. <b>코스·배편·독도·맛집·숙소</b>에 대해 물어봐 주세요!';
  }
  t.innerHTML = html;
  box.classList.add('show');
}
(function () {
  var input = document.getElementById('aiInput');
  if (!input) return;
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') aiAsk(); });
})();

// ── 액티비티 영상 슬라이더 ──
(function () {
  var v = document.getElementById('actPlayer');
  if (!v) return;
  var VIDEOS = [
    { src: 'videos/activity.mp4',  t: '여기가 울릉 국민 수영장', s: '바위에서 퐁당! 에메랄드 천연 풀장' },
    { src: 'videos/activity2.mp4', t: '튜브 하나면 준비 끝',     s: '발 아래가 다 보이는 유리알 바다' },
    { src: 'videos/activity3.mp4', t: '바닷속은 더 난리남',      s: '수경 쓰고 만나는 울릉 수중 세상' },
    { src: 'videos/activity4.mp4', t: '3초 망설이고, 풍덩',      s: '심장이 먼저 시원해지는 다이빙 포인트' },
    { src: 'videos/activity5.mp4', t: '오늘 일정: 둥둥 떠 있기', s: '파도에 맡기는 완벽한 물멍 타임' }
  ];
  var i = 0;
  var capT = document.getElementById('actCapT'), capS = document.getElementById('actCapS');
  var prog = document.getElementById('actProg'), tog = document.getElementById('actToggle');
  function setTog(playing) { tog.textContent = playing ? '❚❚' : '▶'; }
  function load(n) {
    i = (n + VIDEOS.length) % VIDEOS.length;
    v.src = VIDEOS[i].src;
    capT.textContent = VIDEOS[i].t;
    capS.textContent = VIDEOS[i].s;
    prog.style.width = '0%';
    v.play(); setTog(true);
  }
  v.addEventListener('timeupdate', function () {
    if (v.duration) prog.style.width = (v.currentTime / v.duration * 100) + '%';
  });
  v.addEventListener('ended', function () { load(i + 1); });
  document.getElementById('actPrev').addEventListener('click', function () { load(i - 1); });
  document.getElementById('actNext').addEventListener('click', function () { load(i + 1); });
  tog.addEventListener('click', function () {
    if (v.paused) { v.play(); setTog(true); } else { v.pause(); setTog(false); }
  });
  load(0);
})();

// ── 맛집차트 카테고리 필터 ──
(function () {
  var wrap = document.getElementById('mcChips');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    var cat = chip.dataset.cat;
    wrap.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === chip); });
    document.querySelectorAll('.mc-row').forEach(function (r) {
      r.style.display = (cat === '전체' || r.dataset.cat === cat) ? '' : 'none';
    });
  });
})();

// ── 숙소 지역 탭 필터 ──
(function () {
  var wrap = document.getElementById('stayChips');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip || !chip.dataset.stay) return;
    wrap.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === chip); });
    document.querySelectorAll('.stay-grid').forEach(function (g) {
      g.classList.toggle('on', g.dataset.stay === chip.dataset.stay);
    });
  });
})();

// ── 여행자 콘텐츠 큐레이션 캐러셀 ──
// 카드 추가/수정은 이 목록에서 하세요. yt: 유튜브ID / blog·insta: url
var CURATION = [
  { type: 'yt', id: 'cNJbW8zefxk', t: '울릉도 EP1. 울릉도민과 함께하는 울렁울렁 울릉도 여행!', a: '89헤르츠 89HERTZ' },
  { type: 'blog', url: 'https://blog.naver.com/hyang7845/224282528030', t: '울릉도 여행 후기', a: '@hyang7845' },
  { type: 'insta', url: 'https://www.instagram.com/p/DaSQV_TD91H/', t: '사진으로 보는 울릉의 순간', a: 'Instagram 포토' },
  { type: 'yt', id: 'Jr_ju4HWs0E', t: '올여름 최고의 여행지, 울릉도 백패킹·스노클링·맛집', a: '장쌤생 jangteacher' },
  { type: 'blog', url: 'https://blog.naver.com/younineagain/224367739268', t: '울릉도 여행 코스 기록', a: '@younineagain' },
  { type: 'insta', url: 'https://www.instagram.com/reel/C-DLPN4Rm22/', t: '릴스로 보는 울릉 바다', a: 'Instagram 릴스' },
  { type: 'yt', id: 'THpli2pRQ5E', t: '빛나는 울릉도 바닷속으로, 프리다이빙과 야생 돌고래', a: '촉촉한 초록칩' },
  { type: 'blog', url: 'https://blog.naver.com/goil2005/224366816550', t: '울릉도 먹고 보고 걷기', a: '@goil2005' },
  { type: 'insta', url: 'https://www.instagram.com/reel/DZuRMhYpor2/', t: '울릉 여행 하이라이트', a: 'Instagram 릴스' },
  { type: 'yt', id: 'KF7vFuuh1e8', t: '울릉도 여행 브이로그', a: 'YouTube' },
  { type: 'blog', url: 'https://blog.naver.com/all_kiki/224361105067', t: '울릉도 여행 일기', a: '@all_kiki' },
  { type: 'insta', url: 'https://www.instagram.com/p/DMezCjpv2Tv/', t: '울릉 감성 한 컷', a: 'Instagram 포토' },
  { type: 'yt', id: 'cJKmZb7EqUg', t: '오랜만에 울릉도를 다시 찾아간 두 남자 【울릉도 1】', a: '빠니보틀 Pani Bottle' },
  { type: 'insta', url: 'https://www.instagram.com/reel/DI_CiRxRbqR/', t: '울릉의 순간들', a: 'Instagram 릴스' }
];
(function () {
  var stage = document.getElementById('cvStage');
  if (!stage) return;
  var N = CURATION.length, active = 0;
  var dotsBox = document.getElementById('cvDots');
  CURATION.forEach(function (c, i) {
    var el = document.createElement('div');
    el.className = 'cv-slide cv-' + c.type;
    el.dataset.i = i;
    if (c.type === 'yt') {
      el.dataset.url = 'https://youtu.be/' + c.id;
      el.innerHTML = '<div class="cv-thumb"><img src="https://i.ytimg.com/vi/' + c.id + '/hqdefault.jpg" alt="" loading="lazy"><span class="cv-play">▶</span></div>'
        + '<div class="cv-info"><span class="cv-badge b-yt">▶ YouTube</span><b>' + c.t + '</b><span class="cv-author">' + c.a + '</span></div>';
    } else {
      el.dataset.url = c.url;
      el.innerHTML = '<div class="cv-quote">' + (c.type === 'blog' ? '“' : '📷') + '</div>'
        + '<div class="cv-fill"><span class="cv-badge ' + (c.type === 'blog' ? 'b-blog">✍️ 네이버 블로그' : 'b-insta">📷 Instagram') + '</span>'
        + '<b>' + c.t + '</b><span class="cv-author">' + c.a + '</span></div>'
        + '<span class="cv-go">보러 가기 →</span>';
    }
    el.addEventListener('click', function () {
      if (parseInt(el.dataset.i, 10) === active) window.open(el.dataset.url, '_blank');
      else { active = parseInt(el.dataset.i, 10); render(); }
    });
    stage.appendChild(el);
    var d = document.createElement('span');
    d.addEventListener('click', function () { active = i; render(); });
    dotsBox.appendChild(d);
  });
  function render() {
    var slides = stage.children;
    for (var i = 0; i < N; i++) {
      var d = i - active;
      if (d > N / 2) d -= N;
      if (d < -N / 2) d += N;
      var cls = 'cv-slide cv-' + CURATION[i].type + ' ';
      cls += (Math.abs(d) > 2) ? 'p-hide' : 'p' + (d < 0 ? 'm' : '') + Math.abs(d);
      slides[i].className = cls;
    }
    Array.prototype.forEach.call(dotsBox.children, function (dot, k) {
      dot.className = k === active ? 'on' : '';
    });
  }
  document.getElementById('cvPrev').addEventListener('click', function () { active = (active - 1 + N) % N; render(); });
  document.getElementById('cvNext').addEventListener('click', function () { active = (active + 1) % N; render(); });
  render();
})();

// ── 여행 준비 체크리스트 (브라우저 저장) ──
(function () {
  var items = document.querySelectorAll('.prep-item input');
  if (!items.length) return;
  var KEY = 'ulleung_prep';
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  items.forEach(function (c) {
    if (saved[c.dataset.prep]) c.checked = true;
    c.addEventListener('change', function () {
      saved[c.dataset.prep] = c.checked;
      try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
    });
  });
})();

// ── 울릉 여행 유형 테스트 ──
(function () {
  var card = document.getElementById('quizCard');
  if (!card) return;
  var QS = [
    { q: '울릉에 도착하면 제일 먼저 하고 싶은 건?', o: [['🌊 바다로 풍덩! 물놀이부터', 'active'], ['☕ 전망 좋은 곳에서 커피 한 잔', 'heal'], ['🍢 시장 구경하며 주전부리', 'food']] },
    { q: '여행 사진첩에 제일 많은 건?', o: [['💪 땀나는 액티비티 인증샷', 'active'], ['🌅 하늘·바다·풍경 사진', 'heal'], ['🍽️ 오늘 먹은 음식 사진', 'food']] },
    { q: '나의 여행 일정 스타일은?', o: [['⏰ 아침부터 꽉 채운 알찬 일정', 'active'], ['🐢 발길 닿는 대로 느긋하게', 'heal'], ['🗺️ 맛집 중심으로 동선 짜기', 'food']] }
  ];
  var RESULTS = {
    active: { e: '🔥', name: '에너지 폭발 액티브 탐험가', desc: '가만히 있으면 좀이 쑤시는 타입! 케이블카·모노레일·해양 체험까지 몸으로 즐기는 울릉이 딱이에요.', course: '액티브 울릉' },
    heal: { e: '🌿', name: '느긋한 물멍 힐링러', desc: '바다 보며 멍때리는 게 최고의 일정. 행남산책로를 걷고 오션뷰 카페에서 마무리하는 하루를 추천해요.', course: '뚜벅이 힐링 코스' },
    food: { e: '🍚', name: '맛따라 길따라 미식가', desc: '여행의 기억은 혀끝에 남는 법. 홍합밥부터 저동항 회센터까지, 맛으로 도는 울릉을 추천해요.', course: '미식 탐방 코스' },
    photo: { e: '📸', name: '인생샷 감성 수집가', desc: '취향이 골고루 균형 잡힌 타입! 어딜 가든 그림이 되는 대풍감·삼선암 사진 코스로 다 담아가세요.', course: '인생샷 사진 코스' }
  };
  var step, score;
  function start() { step = 0; score = { active: 0, heal: 0, food: 0 }; render(); }
  function render() {
    if (step < QS.length) {
      var q = QS[step];
      var html = '<div class="qz-step">Q' + (step + 1) + ' <span>/ ' + QS.length + '</span></div><h3 class="qz-q">' + q.q + '</h3><div class="qz-opts">';
      q.o.forEach(function (o, k) { html += '<button type="button" class="qz-opt" data-k="' + k + '">' + o[0] + '</button>'; });
      html += '</div><div class="qz-dots">' + QS.map(function (_, k) { return '<span class="' + (k <= step ? 'on' : '') + '"></span>'; }).join('') + '</div>';
      card.innerHTML = html;
      card.querySelectorAll('.qz-opt').forEach(function (b) {
        b.addEventListener('click', function () {
          score[QS[step].o[b.dataset.k][1]]++;
          step++; render();
        });
      });
    } else {
      var win = 'photo';
      if (score.active > score.heal && score.active > score.food) win = 'active';
      else if (score.heal > score.active && score.heal > score.food) win = 'heal';
      else if (score.food > score.active && score.food > score.heal) win = 'food';
      var r = RESULTS[win];
      card.innerHTML = '<div class="qz-result"><div class="qz-emoji">' + r.e + '</div>'
        + '<span class="qz-badge">AI 진단 결과</span><h3>' + r.name + '</h3><p>' + r.desc + '</p>'
        + '<div class="qz-course">추천 테마 · <b>' + r.course + '</b></div>'
        + '<div class="qz-btns"><a class="btn btn-primary" href="planner.html">AI 플래너로 내 코스 만들기 →</a>'
        + '<button type="button" class="btn btn-ghost" id="qzRetry">다시 하기</button></div></div>';
      document.getElementById('qzRetry').addEventListener('click', start);
    }
  }
  start();
})();

// ── 독도 접안정보 위젯 ──
// 매일 전망을 여기서 수정하세요: 'good'(가능성 높음) / 'mid'(보통) / 'bad'(접안 어려움)
var DOKDO_FORECAST = [['09', 'good'], ['15', 'mid']];
(function () {
  var box = document.getElementById('dokdoSlots');
  if (!box) return;
  var LABEL = {
    good: ['😊', '접안 가능성 높음'],
    mid:  ['😐', '상황에 따라 가능'],
    bad:  ['☹️', '접안 어려움'],
    done: ['🕐', '오늘의 전망 종료']
  };
  var nowHour = new Date().getHours();
  var html = '';
  DOKDO_FORECAST.forEach(function (pair) {
    var t = pair[0], state = nowHour >= parseInt(t, 10) + 1 ? 'done' : pair[1];
    var l = LABEL[state] || LABEL.done;
    html += '<div class="dl-slot"><b>' + t + '시</b><span class="dl-face">' + l[0] + '</span><span>' + l[1] + '</span></div>';
  });
  box.innerHTML = html;
})();

// ── 독도 접안정보 플로팅 버튼 ──
(function () {
  var fab = document.getElementById('dokdoFab'), pop = document.getElementById('dokdoPop');
  if (!fab || !pop) return;
  fab.addEventListener('click', function (e) {
    e.stopPropagation();
    pop.classList.toggle('open');
  });
  document.addEventListener('click', function (e) {
    if (!pop.contains(e.target)) pop.classList.remove('open');
  });
})();

// ── 테마 배너 커스텀 드롭다운 & 달력 ──
(function () {
  var dds = document.querySelectorAll('.ux-dd');
  if (!dds.length) return;
  function closeAll(except) { dds.forEach(function (d) { if (d !== except) d.classList.remove('open'); }); }
  document.addEventListener('click', function (e) { if (!e.target.closest('.ux-dd')) closeAll(); });
  dds.forEach(function (dd) {
    dd.querySelector('.ux-value').addEventListener('click', function (e) {
      e.stopPropagation(); closeAll(dd); dd.classList.toggle('open');
    });
  });
  // 옵션형 드롭다운 (테마, 인원)
  document.querySelectorAll('.ux-panel .ux-opt').forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = opt.closest('.ux-dd');
      dd.querySelectorAll('.ux-opt').forEach(function (o) { o.classList.toggle('on', o === opt); });
      dd.querySelector('.ux-value span').textContent = opt.textContent;
      dd.classList.remove('open');
    });
  });
  // 달력 (출발, 도착)
  var sel = { dep: null, ret: null };
  function fmt(d) { return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0'); }
  function buildCal(key) {
    var dd = document.querySelector('.ux-dd[data-dd=' + key + ']');
    if (!dd) return;
    var panel = dd.querySelector('.ux-cal');
    var view = new Date(); view.setDate(1);
    function minDate() {
      var t = new Date(); t.setHours(0, 0, 0, 0);
      return (key === 'ret' && sel.dep && sel.dep > t) ? sel.dep : t;
    }
    function render() {
      var y = view.getFullYear(), m = view.getMonth();
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var html = '<div class="cal-head"><button type="button" class="cal-nav" data-n="-1">‹</button><b>' + y + '년 ' + (m + 1) + '월</b><button type="button" class="cal-nav" data-n="1">›</button></div><div class="cal-grid">';
      ['일', '월', '화', '수', '목', '금', '토'].forEach(function (w) { html += '<span class="cal-dow">' + w + '</span>'; });
      var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), mn = minDate();
      for (var i = 0; i < first; i++) html += '<span></span>';
      for (var d = 1; d <= days; d++) {
        var dt = new Date(y, m, d);
        var dis = dt < mn;
        var isSel = sel[key] && dt.getTime() === sel[key].getTime();
        var isToday = dt.getTime() === today.getTime();
        html += '<button type="button" class="cal-day' + (dis ? ' dis' : '') + (isSel ? ' sel' : '') + (isToday ? ' today' : '') + '" data-d="' + d + '"' + (dis ? ' disabled' : '') + '>' + d + '</button>';
      }
      panel.innerHTML = html + '</div>';
      panel.querySelectorAll('.cal-nav').forEach(function (b) {
        b.addEventListener('click', function (e) { e.stopPropagation(); view.setMonth(view.getMonth() + parseInt(b.dataset.n, 10)); render(); });
      });
      panel.querySelectorAll('.cal-day:not(.dis)').forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          sel[key] = new Date(y, m, parseInt(b.dataset.d, 10));
          dd.querySelector('.ux-value span').textContent = fmt(sel[key]);
          if (key === 'dep' && sel.ret && sel.ret < sel.dep) {
            sel.ret = null;
            var rv = document.querySelector('.ux-dd[data-dd=ret] .ux-value span');
            if (rv) rv.textContent = '날짜 선택';
          }
          dd.classList.remove('open');
        });
      });
    }
    dd.querySelector('.ux-value').addEventListener('click', render);
    render();
  }
  buildCal('dep'); buildCal('ret');
})();

// ── AI 추천 받기 (테마 배너) ──
// 실시간 현황 값과 추천 문구는 여기서 수정하세요.
var AI_RECO = {
  '자연 생태 코스': '나리분지 → 성인봉 초입 숲길 → 예림원 동선을 추천해요. 지금 북면 혼잡도가 낮아 여유롭게 둘러보기 좋아요.',
  '액티브 울릉': '케이블카 → 행남해안산책로 → 해양 체험 순서를 추천해요. 오후 바람 예보가 있어 해양 체험은 오전에 배치했어요.',
  '독도 뱃길 코스': '오늘 파고 기준 독도 접안 가능성이 양호해요. 오전 독도 왕복 후 오후 봉래폭포 일정을 추천해요.',
  '뚜벅이 힐링 코스': '행남해안산책로 → 도동 골목 → 오션뷰 카페 동선이에요. 혼잡도 45%, 걷기 딱 좋은 날이에요.',
  '미식 탐방 코스': '점심 홍합밥 → 저녁 저동항 회센터 동선을 추천해요. 나리분지 산채식당은 재료 소진 전 이른 방문 추천!',
  '인생샷 사진 코스': '역광을 피해 오전 대풍감 → 오후 삼선암·거북바위 순서로 추천해요. 흐린 날엔 파스텔톤 사진이 잘 나와요.'
};
(function () {
  var btn = document.getElementById('aiRecBtn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var get = function (dd) { var el = document.querySelector('.ux-dd[data-dd=' + dd + '] .ux-value span'); return el ? el.textContent : ''; };
    var theme = get('theme'), dep = get('dep'), ret = get('ret'), pax = get('pax');
    var box = document.getElementById('tbResult');
    var title = document.getElementById('tbrTitle'), text = document.getElementById('tbrText');
    box.classList.add('show');
    title.textContent = 'AI가 실시간 변수를 분석하고 있어요...';
    text.textContent = '날씨 · 혼잡도 · 선박 운항 정보를 확인하는 중';
    setTimeout(function () {
      var when = (dep !== '날짜 선택') ? dep + ' 출발 · ' : '';
      title.textContent = '「' + theme + '」 ' + when + pax + ' 기준 추천 동선';
      text.textContent = AI_RECO[theme] || AI_RECO['자연 생태 코스'];
    }, 900);
  });
})();

// ── 권역별 절경 탭 (지도 연동) ──
(function () {
  var tabs = document.querySelectorAll('.rg-tab');
  if (!tabs.length) return;
  function apply(region) {
    tabs.forEach(function (t) { t.classList.toggle('on', t.dataset.region === region); });
    document.querySelectorAll('.rg-grid').forEach(function (g) { g.classList.toggle('on', g.dataset.region === region); });
    document.querySelectorAll('.map-pin').forEach(function (p) { p.classList.toggle('dim', p.dataset.region !== region); });
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { apply(t.dataset.region); }); });
  apply('eup');

  // 핀 호버 → 레이어 팝업
  var tip = document.getElementById('mapTip');
  document.querySelectorAll('.map-pin').forEach(function (p) {
    function show() {
      tip.innerHTML = '<img src="' + p.dataset.img + '" alt=""><div><span class="rg-chip">' + p.dataset.rname + '</span><b>' + p.dataset.name + '</b></div>';
      tip.style.left = p.style.left;
      tip.style.top = p.style.top;
      tip.classList.add('show');
    }
    p.addEventListener('mouseenter', show);
    p.addEventListener('focus', show);
    p.addEventListener('click', function (e) { e.stopPropagation(); show(); apply(p.dataset.region); });
    p.addEventListener('mouseleave', function () { tip.classList.remove('show'); });
    p.addEventListener('blur', function () { tip.classList.remove('show'); });
  });
})();

// ── '지금 뜨는 울릉 명소' 태그 필터 ──
(function () {
  var wrap = document.getElementById('destChips');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip || !chip.dataset.tag) return;
    var tag = chip.dataset.tag;
    wrap.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === chip); });
    document.querySelectorAll('.dest-grid').forEach(function (g) {
      g.classList.toggle('on', g.dataset.tag === tag);
    });
  });
})();

// ── AI 동선 플래너 ──
(function () {
  var body = document.getElementById('plBody');
  if (!body) return;
  var stepsEl = document.getElementById('plSteps'), prevBtn = document.getElementById('plPrev'), nextBtn = document.getElementById('plNext');
  var card = document.getElementById('plCard'), resultEl = document.getElementById('plResult');

  var DUR = [{ t: '1박 2일', n: 1, e: '🗓️' }, { t: '2박 3일', n: 2, e: '📅', hot: true }, { t: '3박 4일', n: 3, e: '🗓️' }];
  var COMP = [{ k: 'solo', t: '혼자', e: '🧍' }, { k: 'couple', t: '둘이서', e: '💑' }, { k: 'family', t: '아이와 가족', e: '👨‍👩‍👧' }, { k: 'friends', t: '친구들과', e: '🎒' }];
  var THEMES = [
    { k: '산', t: '산·자연', img: 'images/spot-nari.jpg' },
    { k: '바다', t: '바다·해안', img: 'images/walk-haengnam.jpg' },
    { k: '액티비티', t: '액티비티', img: 'images/hero3.jpg' },
    { k: '미식', t: '미식', img: 'images/food-honghap.jpg' },
    { k: '카페', t: '카페', img: 'images/kids-yerimwon.jpg' },
    { k: '사진', t: '사진 스팟', img: 'images/drive-samseonam.jpg' },
    { k: '섬', t: '섬 속의 섬', img: 'images/hero2.jpg' },
    { k: '가족', t: '가족 체험', img: 'images/kids-cablecar.jpg' }
  ];
  var POIS = [
    { n: '태하향목 모노레일 · 대풍감', type: 'spot', area: '서면', x: 20, y: 41.5, th: ['사진', '바다', '산'], img: 'images/spot-monorail.jpg', fam: 1 },
    { n: '독도전망대 케이블카', type: 'spot', area: '울릉읍 도동', x: 62, y: 64.5, th: ['액티비티', '사진', '가족'], img: 'images/spot-cablecar.jpg', fam: 1 },
    { n: '행남해안산책로', type: 'spot', area: '도동 ↔ 저동', x: 79, y: 61, th: ['바다', '산', '사진'], img: 'images/walk-haengnam.jpg' },
    { n: '관음도', type: 'spot', area: '북면', x: 84.5, y: 19, th: ['섬', '바다', '가족'], img: 'images/spot-gwaneumdo.jpg', fam: 1 },
    { n: '나리분지', type: 'spot', area: '북면', x: 53, y: 41, th: ['산', '가족'], img: 'images/spot-nari.jpg' },
    { n: '성인봉 등반', type: 'spot', area: '나리분지 출발', x: 50, y: 50, th: ['산', '액티비티'], img: 'images/walk-seonginbong.jpg' },
    { n: '봉래폭포', type: 'spot', area: '울릉읍 사동', x: 57.5, y: 52, th: ['산', '가족'], img: 'images/kids-bongnae.jpg', fam: 1 },
    { n: '예림원', type: 'spot', area: '북면', x: 36, y: 36, th: ['사진', '가족'], img: 'images/kids-yerimwon.jpg', fam: 1 },
    { n: '삼선암', type: 'spot', area: '북면', x: 60.5, y: 20.5, th: ['사진', '바다'], img: 'images/drive-samseonam.jpg' },
    { n: '통구미 거북바위', type: 'spot', area: '서면', x: 46.5, y: 79.5, th: ['사진', '바다'], img: 'images/drive-geobuk.jpg' },
    { n: '해양 체험 (스노클링·카약)', type: 'spot', area: '저동 · 천부', x: 72, y: 40, th: ['액티비티', '바다'], img: 'images/hero3.jpg' },
    { n: '독도 (여객선 왕복)', type: 'spot', area: '저동항 출발', x: 87.5, y: 84.5, th: ['섬', '바다'], img: 'images/hero2.jpg', dokdo: 1 },
    { n: '홍합밥 골목', type: 'food', area: '도동', x: 63, y: 66, th: ['미식'], img: 'images/food-honghap.jpg' },
    { n: '따개비칼국수집', type: 'food', area: '저동', x: 74, y: 57, th: ['미식'], img: 'images/food-ttagaebi.jpg' },
    { n: '울릉 약소불고기', type: 'food', area: '도동', x: 61, y: 68, th: ['미식'], img: 'images/food-yakso.jpg' },
    { n: '나리분지 산채식당', type: 'food', area: '나리', x: 52, y: 43, th: ['미식', '산'], img: 'images/food-sanchae.jpg' },
    { n: '저동항 회센터', type: 'food', area: '저동', x: 75.5, y: 58.5, th: ['미식', '바다'] },
    { n: '오션뷰 카페', type: 'cafe', area: '북면 해안', x: 40, y: 24, th: ['카페', '바다', '사진'] },
    { n: '도동 골목 카페', type: 'cafe', area: '도동', x: 62.5, y: 66.5, th: ['카페'] }
  ];
  var STAY_BY = {
    solo: { n: '살로메스테이', type: 'stay', area: '도동', x: 63, y: 65 },
    couple: { n: '코스모스 울릉도', type: 'stay', area: '북면', x: 33, y: 22 },
    family: { n: '울릉 대아리조트', type: 'stay', area: '사동', x: 55, y: 72 },
    friends: { n: '상일펜션', type: 'stay', area: '사동', x: 56, y: 70 }
  };
  var DAY_COLORS = ['#00aebd', '#1c2554', '#f5a623', '#18a558'];
  var TYPE_LABEL = { spot: '여행지', food: '음식점', cafe: '카페', stay: '숙소', port: '항구' };

  var step = 0, sel = { dur: 1, comp: 'couple', themes: [] };

  function renderSteps() {
    stepsEl.innerHTML = [0, 1, 2].map(function (i) {
      return '<b class="' + (i === step ? 'on' : (i < step ? 'done' : '')) + '">0' + (i + 1) + '</b>' + (i < 2 ? '<i></i>' : '');
    }).join('');
  }
  function render() {
    renderSteps();
    prevBtn.style.visibility = step === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = step === 2 ? '완료' : '다음';
    var html = '';
    if (step === 0) {
      html = '<p class="pl-sub">일정이 길수록 섬을 더 깊게 볼 수 있어요.</p><h3 class="pl-q">여행 기간을<br>선택해 주세요.</h3><div class="pl-opts">'
        + DUR.map(function (d, i) {
          return '<button type="button" class="pl-opt' + (sel.dur === i ? ' on' : '') + '" data-i="' + i + '"><span>' + d.e + '</span><b>' + d.t + '</b>' + (d.hot ? '<em>인기</em>' : '') + '</button>';
        }).join('') + '</div>';
    } else if (step === 1) {
      html = '<p class="pl-sub">동행에 따라 동선과 숙소가 달라져요.</p><h3 class="pl-q">누구와 함께<br>떠나시나요?</h3><div class="pl-opts">'
        + COMP.map(function (c) {
          return '<button type="button" class="pl-opt' + (sel.comp === c.k ? ' on' : '') + '" data-k="' + c.k + '"><span>' + c.e + '</span><b>' + c.t + '</b></button>';
        }).join('') + '</div>';
    } else {
      html = '<p class="pl-sub">마지막으로 이번 여행의 테마를 정해볼까요?</p><h3 class="pl-q">원하는 여행 테마를 2개 이상<br>선택해 주세요. (최대 4개)</h3><div class="pl-themes">'
        + THEMES.map(function (t) {
          return '<button type="button" class="pl-theme' + (sel.themes.indexOf(t.k) >= 0 ? ' on' : '') + '" data-k="' + t.k + '"><img src="' + t.img + '" alt="" loading="lazy"><b>' + t.t + '</b></button>';
        }).join('') + '</div>';
    }
    body.innerHTML = html;
    body.querySelectorAll('.pl-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        if (step === 0) sel.dur = parseInt(b.dataset.i, 10);
        else sel.comp = b.dataset.k;
        render();
      });
    });
    body.querySelectorAll('.pl-theme').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.k, idx = sel.themes.indexOf(k);
        if (idx >= 0) sel.themes.splice(idx, 1);
        else if (sel.themes.length < 4) sel.themes.push(k);
        render();
      });
    });
  }
  prevBtn.addEventListener('click', function () { if (step > 0) { step--; render(); } });
  nextBtn.addEventListener('click', function () {
    if (step < 2) { step++; render(); return; }
    if (sel.themes.length < 2) { alertMsg(); return; }
    showResult();
  });
  function alertMsg() {
    var q = body.querySelector('.pl-q');
    q.innerHTML = '테마를 <em style="color:#e0685f;font-style:normal">2개 이상</em> 선택해 주세요! (최대 4개)';
  }

  function buildCourse() {
    var nights = DUR[sel.dur].n, days = nights + 1, themes = sel.themes, comp = sel.comp;
    var used = {};
    function score(p) {
      var s = 0;
      p.th.forEach(function (t) { if (themes.indexOf(t) >= 0) s += 2; });
      if (comp === 'family' && p.fam) s += 2;
      if (comp === 'couple' && p.th.indexOf('사진') >= 0) s += 1;
      if (comp === 'friends' && p.th.indexOf('액티비티') >= 0) s += 1;
      if (comp === 'solo' && p.th.indexOf('산') >= 0) s += 1;
      return s;
    }
    function pick(type) {
      var c = POIS.filter(function (p) { return p.type === type && !used[p.n] && !p.dokdo; })
        .sort(function (a, b) { return score(b) - score(a); });
      if (c.length) { used[c[0].n] = 1; return c[0]; }
      return null;
    }
    var stay = STAY_BY[comp], plan = [];
    for (var d = 1; d <= days; d++) {
      var items = [];
      if (d === 1) items.push({ n: '도동항 · 사동항 도착', type: 'port', area: '울릉도 입도' });
      if (d === 2 && themes.indexOf('섬') >= 0) {
        var dk = POIS.filter(function (p) { return p.dokdo; })[0];
        used[dk.n] = 1; items.push(dk);
      } else {
        var s1 = pick('spot'); if (s1) items.push(s1);
      }
      var f = pick('food'); if (f) items.push(f);
      var s2 = pick('spot'); if (s2) items.push(s2);
      if (themes.indexOf('카페') >= 0) { var cf = pick('cafe'); if (cf) items.push(cf); }
      if (d <= nights) items.push(Object.assign({}, stay));
      if (d === days) items.push({ n: '도동항 · 사동항 출항', type: 'port', area: '여행 마무리' });
      plan.push(items);
    }
    return plan;
  }

  function showResult() {
    card.style.display = 'none';
    resultEl.innerHTML = '<div class="pl-loading">🤖 AI가 취향과 실시간 변수를 분석해 동선을 계산하고 있어요...</div>';
    setTimeout(function () {
      var plan = buildCourse();
      var compT = COMP.filter(function (c) { return c.k === sel.comp; })[0].t;
      var total = 0, dist = 0;
      plan.forEach(function (day) {
        var prev = null;
        day.forEach(function (it) {
          if (it.type !== 'port') total++;
          if (it.x != null && it.type !== 'port') {
            if (prev) dist += Math.sqrt(Math.pow(it.x - prev.x, 2) + Math.pow(it.y - prev.y, 2));
            prev = it;
          }
        });
      });
      var km = Math.max(10, Math.round(dist * 0.11 + plan.length * 3));
      // 예상 경비 비중 (데모)
      var ex = { t: 40, s: 35, f: 25 };
      if (sel.comp === 'family') { ex.s += 6; ex.t -= 3; ex.f -= 3; }
      if (sel.themes.indexOf('미식') >= 0) { ex.f += 8; ex.t -= 4; ex.s -= 4; }
      if (sel.themes.indexOf('액티비티') >= 0) { ex.t += 6; ex.s -= 3; ex.f -= 3; }

      var daysHtml = '', dayTabs = '';
      plan.forEach(function (day, di) {
        var color = DAY_COLORS[di % DAY_COLORS.length];
        dayTabs += '<button type="button" class="pl-daytab' + (di === 0 ? ' on' : '') + '" data-d="' + di + '" style="--dc:' + color + '"><i></i>Day ' + (di + 1) + '</button>';
        daysHtml += '<div class="pl-day" data-d="' + di + '"><h4><i style="background:' + color + '"></i>Day ' + (di + 1) + '</h4>';
        day.forEach(function (it) {
          var thumb = it.img ? '<img src="' + it.img + '" alt="">' : '<span class="pl-noimg">' + (it.type === 'port' ? '⛴️' : it.type === 'stay' ? '🛏️' : it.type === 'cafe' ? '☕' : '🍚') + '</span>';
          daysHtml += '<div class="pl-item">' + thumb + '<div><span class="pl-type t-' + it.type + '">' + TYPE_LABEL[it.type] + '</span><b>' + it.n + '</b><span class="pl-area">' + it.area + '</span></div></div>';
        });
        daysHtml += '</div>';
      });

      resultEl.innerHTML =
        '<div class="pl-sum"><div><span class="pl-sum-badge">' + DUR[sel.dur].t + '</span><h3>당신을 위한 울릉 여행코스</h3>'
        + '<p>' + compT + ' · 테마 ' + sel.themes.map(function (t) { return '#' + t; }).join(' ') + ' · 총 ' + total + '곳 추천</p></div>'
        + '<button class="btn btn-ghost" id="plRetry" type="button">다시 만들기</button></div>'
        + '<div class="pl-stats">'
        + '<div class="pl-stat"><span>여행 기간</span><b>' + DUR[sel.dur].t + '</b><small>여객선 일정에 맞춰 조정 가능</small></div>'
        + '<div class="pl-stat"><span>동행</span><b>' + compT + '</b><small>동행 맞춤 숙소 포함</small></div>'
        + '<div class="pl-stat"><span>총 이동 거리</span><b>약 ' + km + 'km</b><small>섬 내 이동 기준</small></div>'
        + '<div class="pl-stat pl-exp"><span>예상 경비 비중</span><div class="pl-bubbles">'
        + '<i class="bb1" style="width:' + (ex.t + 40) + 'px;height:' + (ex.t + 40) + 'px">' + ex.t + '%</i>'
        + '<i class="bb2" style="width:' + (ex.s + 40) + 'px;height:' + (ex.s + 40) + 'px">' + ex.s + '%</i>'
        + '<i class="bb3" style="width:' + (ex.f + 40) + 'px;height:' + (ex.f + 40) + 'px">' + ex.f + '%</i></div>'
        + '<small><em class="l1"></em>교통 <em class="l2"></em>숙박 <em class="l3"></em>식사</small></div>'
        + '</div>'
        + '<div class="pl-res"><div class="pl-days">' + daysHtml + '</div>'
        + '<div class="pl-mapwrap"><div class="pl-daytabs">' + dayTabs + '</div>'
        + '<div class="pl-map"><img src="images/map.jpg" alt="울릉도 지도"><svg class="pl-routes" viewBox="0 0 100 100" preserveAspectRatio="none"></svg><div id="plPins"></div></div>'
        + '<p class="pl-maphint">Day 탭을 누르면 그날의 이동 동선이 지도에 표시돼요.</p></div></div>'
        + '<div class="notice">본 동선은 프로토타입 데모입니다. 실제 서비스에서는 날씨·운항·혼잡도 실시간 데이터가 반영됩니다.</div>';

      // ── 지도: 선택한 Day의 동선 라인 + 화살표 ──
      var svg = resultEl.querySelector('.pl-routes'), pinBox = document.getElementById('plPins');
      function drawDay(di) {
        var color = DAY_COLORS[di % DAY_COLORS.length];
        var pts = plan[di].filter(function (it) { return it.x != null && it.type !== 'port'; });
        var lines = '', arrows = '';
        for (var i = 0; i < pts.length - 1; i++) {
          var a = pts[i], b = pts[i + 1];
          lines += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>';
          var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          var ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
          arrows += '<g transform="translate(' + mx + ',' + my + ') rotate(' + ang + ')"><path d="M-0.9,-0.7 L0.7,0 L-0.9,0.7" fill="none" stroke="' + color + '" stroke-width="0.38" stroke-linecap="round" stroke-linejoin="round"/></g>';
        }
        svg.innerHTML = '<g stroke="' + color + '" stroke-width="0.42" stroke-dasharray="1.3 1.1" opacity="0.85" fill="none" class="pl-routeline">' + lines + '</g>' + arrows;
        pinBox.innerHTML = pts.map(function (p, k) {
          return '<span class="pl-pin" style="left:' + p.x + '%;top:' + p.y + '%;background:' + color + '">' + (k + 1) + '</span>';
        }).join('');
        resultEl.querySelectorAll('.pl-daytab').forEach(function (t) { t.classList.toggle('on', parseInt(t.dataset.d, 10) === di); });
        resultEl.querySelectorAll('.pl-day').forEach(function (d) { d.classList.toggle('dim', parseInt(d.dataset.d, 10) !== di); });
      }
      resultEl.querySelectorAll('.pl-daytab').forEach(function (t) {
        t.addEventListener('click', function () { drawDay(parseInt(t.dataset.d, 10)); });
      });
      drawDay(0);

      document.getElementById('plRetry').addEventListener('click', function () {
        card.style.display = ''; resultEl.innerHTML = ''; step = 0; sel.themes = []; render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }, 1100);
  }
  render();
})();
