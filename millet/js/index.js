
// $(document).ready(function(){});


$(function(){


  //购物车
  (function(){
    let $h_m_r_buy = $(".h_m_r_buy"),
      $hide = $h_m_r_buy.find(".hide");


    $h_m_r_buy.hover(function(){
      $hide.stop().slideDown(500);
    },function(){
      $hide.stop().slideUp(500);
    });
  })();

  //nav菜单
  (function(){
    let $nav_hide = $(".nav_hide");
    let $nav_hide_main_ul = $nav_hide.find(".n_h_main ul");
    let $nav_main_product = $(".n_main ul li.product");

    //导航移入显示下拉
    $nav_main_product.hover(function(){
      $nav_hide.stop().slideDown(500);

      //获取当前移入的li的序号
      let index = $(this).index();
      //让对应序号的ul显示
      $nav_hide_main_ul.eq(index).show().siblings().hide();

    },function(){
      $nav_hide.stop().slideUp(500);
    });

    //确保移入到下拉的时候，它自己也能保持显示
    $nav_hide.hover(function(){
      $nav_hide.stop().slideDown(500);
    },function(){
      $nav_hide.stop().slideUp(500);
    });

  })();

  //搜索框
  (function(){
    let $n_search = $(".n_search"),
      $n_s_input = $n_search.find(".n_s_input"),
      $input = $n_s_input.find("input"),
      $tip = $n_s_input.find(".tip"),
      $hide = $n_s_input.find(".hide");

    $input.focus(function(){
      $n_search.addClass("focus");
      $tip.fadeOut();
      $hide.fadeIn();
    });
    $input.blur(function(){
      $n_search.removeClass("focus");
      $tip.fadeIn();
      $hide.fadeOut();
    });

  })();

  //banner导航部分
  (function(){
    let $firstLi = $("#banner .b_nav .firstLi"),
      $info = $firstLi.find('.info');

    //设置一下info的宽度
    $info.each(function(){
      let $childLi = $(this).find("ul li");
      let len = $childLi.length;
      $(this).width( Math.ceil(len/6)*263 );
    });

    //移入li显示info
    $firstLi.hover(function(){
      $(this).find(".info").show();
    },function(){
      $(this).find(".info").hide();
    });

  })();

  //banner轮播图部分
  (function(){
    let $banner = $("#banner"),
      $b_m_pic = $banner.find(".b_m_pic ul li"),
      $b_m_tab = $banner.find(".b_m_tab ul li"),
      $btn = $banner.find(".b_m_btn .btn");

    let index = 0,
      len = $b_m_pic.length,
      timer = null;

    //初始样式显示
    $b_m_pic.eq(0).show()
    $b_m_tab.eq(0).addClass("on");

    //$b_m_tab点击
    $b_m_tab.click(function(){
      index = $(this).index();

      change();
    });

    //$btn的点击
    $btn.click(function(){
      //先判断是左按钮还是右按钮
      if ( $(this).index() ){
        //右
        index = (index+1)%len;
      }else{
        //左
        index = (index-1+len)%len;
      }

      change();
    });

    //添加与清除定时器
    auto();
    $banner.hover(function(){
      clearInterval(timer);
    },function(){
      auto();
    });

    //定时器
    function auto(){
      timer = setInterval(()=>{
        index = (index+1)%len;
        change();
      },3000)
    }

    //封装 -- 改变DOM样式
    function change(){
      //对应的按钮改变样式，其他按钮去掉样式
      $b_m_tab.eq(index).addClass("on").siblings().removeClass("on");
      //对应的pic显示，其他的pic隐藏
      $b_m_pic.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
    }

  })();

  //明星单品横幅轮播
  (function(){
    let $s_show = $("#star .s_show"),
      $showLi = $s_show.find(">ul >li")
      $btn = $("#star .s_btn span");

    let index = 0;
    let len = Math.ceil($showLi.length/5);
    let timer = null;

    //-1226

    $btn.click(function(){
      if ($(this).index()){
        //右
        if (index===len-1)return;
        index ++;
      }else{
        //左
        if(index === 0)return;
        index --;
      }

      change();
    });

    function change(){
      //检测index决定左右按钮的禁用样式
      $btn.eq(0)[index !== 0?"addClass":"removeClass"]("able");
      $btn.eq(1)[index !== len-1?"addClass":"removeClass"]("able");


      //改变show的marginleft
      $s_show.stop().animate({
        marginLeft : -1240*index
      },500);
    }

  })();

  //搭配 选项卡切换
  (function(){
    let $tabLi = $("#match .m_title ul li"),
      $contentLi = $("#match .m_content .m_c_right ul");

    $tabLi.eq(0).addClass("hover");

    $tabLi.mouseenter(function(){
      //给自己加样式
      $(this).addClass("hover").siblings().removeClass("hover");
      //改变对应的content
      $contentLi.eq($(this).index()).show().siblings().hide();
    });
  })();

  //回到顶部
  (function(){
    let $toTop = $("#toTop");
    let timer = null;

    //检测滚动高度
    $(window).scroll(function(){

      clearTimeout(timer);
      timer = setTimeout(()=>{

        let scrollTop = $(window).scrollTop();

        if ( scrollTop >= 500 ){
          $toTop.fadeIn();
        }else{
          $toTop.fadeOut();
        }

      },500);

    });

    //回到顶部的点击
    $toTop.click(function(){

      // $("html,body").scrollTop(0);
      $("html,body").stop().animate({
        scrollTop : 0
      },200);
    });
  })();


});






















