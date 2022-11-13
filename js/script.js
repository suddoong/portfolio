// 리소스 다운로드 
window.onload = function() {
    AOS.init();
}
// 코드 다운로드
$(document).ready(function() {
            // 위로가기
            $('.gotop').click(function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 800);
            });

            //마우스 휠을 위한 처리
            //div id 모음
            var pageId = ['#visual', '#profile', '#redesign', '#story', '#about', '#contact']
            //div의 위치값
            var pagePosY = [];
            //위치값계산
            for (var i = 0; i < pageId.length; i++) {
                pagePosY[i] = $(pageId[i]).offset().top;
            }
            console.log(pagePosY);
            //현재 보이는 페이지
            var pageIndex = 0;
            //현재 페이지 수
            var pageTotal = pageId.lenth;
            //연속된 휠 신호를 막는다.
            var pageActive = true;
            // 마우스 휠 코드
            $(window).bind('mousewheel DOMMouseScroll', function(event) {

                var distance = event.originalEvent.wheelDelta;
                // distance 가 120 이면 위로 스크롤
                // distance 가 -120 이면 아래로 스크롤
                // 만약 distance가 없다면

                if (distance == null) {
                    distance = event.originalEvent.detail * -1;
                }
                if (pageActive == false) {
                    return;
                }
                pageActive = false;

                if (distance < 0) {
                    //page가 올라간다.
                    pageIndex++;
                    if (pageIndex >= pageTotal - 1) {
                        pageIndex = pageTotal - 1;
                    }
                } else {
                    //페이지가 내려간다.
                    pageIndex--;
                    if (pageIndex < 0) {
                        pageIndex = 0
                    }
                }
                function movePage() {
                    TweenMax.to($('html,body'), 0.6, {
                        scrollTop: pagePosY[pageIndex],
                        oncomplete: function() {
                            pageActive = true;
                        },
                        ease: "power4.out",
                    });
                }

                //hm메뉴
                var hm = $('.hm');
                hm.click(function(e) {
                    e.preventDefault();
                    $('.hm_wrap').toggleClass('hm_wrap_focus');
                });
                //mainmenu a 클릭시 hm_wrap를 닫음.
                var mainMenu = $('.mainmenu a')
                $.each(mainmenu, function(index, item) {
                    $(this).click(function(e) {
                        $('.hm_wrap').removeClass('hm_wrap_focus')
                        pageIndex = index
                        movePage();
                    });
                });
            });