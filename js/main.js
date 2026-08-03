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
  } else if (/맛집|먹|음식|식당|홍합|칼국수/.test(q)) {
    html = '울릉도에 오셨다면 <b>홍합밥</b>, <b>따개비칼국수</b>, <b>약소불고기</b>는 꼭 드셔보세요. <a href="places.html#food">맛집 리스트 →</a>';
  } else if (/숙소|호텔|펜션|민박|잘 곳/.test(q)) {
    html = '도동·저동 시가지 숙소는 이동이 편하고, 북면 오션뷰 펜션은 전망이 좋아요. <a href="places.html">플레이스 보러 가기 →</a>';
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
