$(function(){
    //购物车
    (function () {
       let $h_m_r_buy=$(".h_m_r_buy");
       let $n_search = $(".n_search");
       let $hide = $h_m_r_buy.find(".hide")
       $h_m_r_buy.hover(function () {
           $n_search.hide();
           $hide.show()
       },function () {
           $n_search.show();
           $hide.hide()
       })
    })();
    //下拉显示
    (function () {
        let $product = $(".n_main ul li.product ");
        let $nav_hide = $(".nav_hide");
        let $n_h_main_ul = $nav_hide.find(".n_h_main ul")
        $product.hover(function () {
            $nav_hide.stop().slideDown(1000);
            //通过index来显示对应的图片
            let index = $(this).index();
            $n_h_main_ul.eq(index).show().siblings().hide()
        },function () {
            $nav_hide.stop().slideUp(1000);
        })
        $nav_hide.hover(function () {
            $nav_hide.stop().slideDown(1000);
        },function () {
            $nav_hide.stop().slideUp(1000);
        })
    })();
    //搜索框
    (function () {
        let $n_search = $(".n_search");
        let $n_s_input = $n_search.find(".n_s_input");
        let $n_s_tip = $n_s_input.find(".tip")
        let $n_s_input_input = $n_s_input.find("input");
        let $hide = $n_s_input.find(".hide");
        $n_s_input_input.focus(function () {
                $n_search.addClass("focus");
                $n_s_tip.fadeOut();
                $hide.fadeIn();
            });
        $n_s_input_input.blur(function () {
            $n_search.removeClass("focus");
            $n_s_tip.fadeIn();
            $hide.fadeOut();
        })

    })();
    //banner侧边nav
    (function () {
      let $firstLi = $(".b_nav .firstLi");
      let $info = $firstLi.find(".info");
      //设置info的宽度
        $info.each(function () {
             let $childLi = $(this).find("ul li");
             let len = $childLi.length;
             $(this).width(Math.ceil(len/6)*263);
        })
      $firstLi.hover(function () {
           $(this).find(".info").show();
      },function () {
          $(this).find(".info").hide();
      });
    })();
    //banner轮播图
    (function () {
       let $pic = $("#banner .b_m_pic ul li")
           ,$tab = $("#banner .b_m_tab ul li")
           ,$btn = $("#banner .b_m_btn .btn")
           ,index = 0
           ,length = $pic.length
           ,timer = null;
       //初始样式 第一张照片显示，tab第一个显示
        $pic.eq(0).show();
        $tab.eq(0).addClass("on")
       //tab点击
        $tab.click(function () {
           let index = $(this).index();
           // //让自己样式显示
           //  $(this).addClass("on").siblings().removeClass("on");
           // //让照片样式显示
           //  $pic.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
            change()
        })
        //左右按钮的点击
        $btn.click(function () {
          let i = $(this).index;
          //通过判断左右按钮从而执行不同的操作
          if(i){
              //右按钮
              index = (index+1)%length;
          }else{
              //左按钮
              index = (index-1+length)%length;
          }
         change()
        });
        function change() {
            //改变dom样式
            $tab.eq(index).addClass("on").siblings().removeClass("on");
            $pic.eq(index).stop().fadeIn(500).siblings().stop().fadeOut(500);
        }
       //定时轮播
        function foo(){
            timer = setInterval(()=>{
                index = (index+1)%length;
                change()
            },2000);
        }
        foo();
        //鼠标移入到照片，停止轮播
        $pic.hover(function () {
          clearInterval(timer);
        },function () {
           foo()
        })
    })();
    //明星单品
    (function () {
        let $s_show = $("#star .s_show")
            ,$s_btn = $("#star .s_btn span")
            ,$s_show_li = $s_show.find("ul li");
        let length = Math.ceil($s_show_li.length/5);
        let index = 0;
        $s_btn.click(function () {
            if($(this).index()){
                //右按钮
                if(index === length-1) return;
                index++
            }else{
                //左按钮
                if(index === 0) return
                index--
            }
            change();
        });
        function change() {
            //检测index决定左右按钮的禁用样式
            //右按钮
            // if(index !== length-1){
            //          //     $s_btn.eq(1).addClass("able")
            //          // }else{
            //          //     $s_btn.eq(1).removeClass("able")
            //          // }
            //          // //左按钮
            //          // if(index !== 0){
            //          //     $s_btn.eq(0).addClass("able")
            //          // }else{
            //          //     $s_btn.eq(0).removeClass("able")
            //          // }
            $s_btn.eq(0)[index !== 0?"addClass":"removeClass"]("able");
            $s_btn.eq(1)[index !== length-1?"addClass":"removeClass"]("able");
            //改变show的margeLeft
            $s_show.stop().animate({
                marginLeft:-1240*index
            },1000)
        }
    })();
    //搭配
    (function () {
      let $match_li = $("#match .m_title ul li")
          ,$m_c_right = $(".m_content .m_c_right ul");
      $match_li.mouseenter(function () {
          //给自己添加类名
         $(this).addClass("hover").siblings().removeClass("hover");
         //给content添加样式
         $m_c_right.eq($(this).index()).show().siblings().hide();
      })
    })();
    //回到顶部
    (function () {
        let $toTop = $("#toTop");
        //获取滚动的高度
        $(window).scroll(function () {
            let timer = null;
            clearInterval(timer);
            timer = setInterval(()=>{
                let $height = $(window).scrollTop();
                if($height>500){
                    $toTop.fadeIn()
                }else{
                    $toTop.fadeOut()
                }
            },200)
        });
        $toTop.click(function () {
            //瞬间回
            //$("html,body").scrollTop(0)
            //动画回
            console.log(1);
            $("html,body").animate({
                scrollTop:0
            },500)
        })
    })();
})