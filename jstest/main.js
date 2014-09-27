var mainJs = new MainJsClass();

function CardsAnimationClass() {
    var popupCard = $('.editor-popup .programs-app__item');
    var editor = $('.programs-app__item-edit');
    var editorWidth = editor.outerWidth();

    function show() {

        if($('.jsClickCartsOpenPopupActive').length){
          var cardEdit = $('.jsClickCartsOpenPopupActive');
          var cardEditTop = cardEdit.offset().top;
          var cardEditLeft = cardEdit.offset().left;
          var cardEditWidth = cardEdit.outerWidth();
			    var windowWidth = $(window).width();


          if (cardEditLeft - (editorWidth - cardEditWidth) < 0) {
            editor.addClass('programs-app__item-edit_center');
          } else {
            if ((editorWidth+cardEditLeft) > windowWidth) {
              editor.removeClass('programs-app__item-edit_center');
              editor.addClass('programs-app__item-edit_left-side');
            } else {
              editor.removeClass('programs-app__item-edit_left-side');
              editor.removeClass('programs-app__item-edit_center');
            }
          }

          popupCard.css({
            top: cardEditTop,
            left: cardEditLeft,
            width: cardEditWidth
          });

          var t1 = setTimeout(function () {
            popupCard.animate({
              opacity: 1
            }, 300, 'easeInOutSine', function () {
              editor.slideDown(300);
            });
          }, 300);

        } else {

          var cardEmpty = $('.vex .programs-app__item_empty');
          var cardEmptyTop = cardEmpty.offset().top;
          var cardEmptyLeft = cardEmpty.offset().left;
          var cardEmptyWidth = cardEmpty.outerWidth();

          popupCard.css({
            top: cardEmptyTop,
            left: cardEmptyLeft,
            width: cardEmptyWidth
          });

          var t2 = setTimeout(function () {
            popupCard.animate({
              opacity: 1
            }, 300, 'easeInOutSine', function () {
              editor.slideDown(300);
            });
          }, 300);
        }
    }

    function hide() {

        editor.slideUp(300);
        popupCard.animate({
            opacity: 0
        }, 300, 'easeInOutExpo', function(){
          $('.jsClickCartsOpenPopupActive').removeClass('jsClickCartsOpenPopupActive');
          editor.removeClass('programs-app__item-edit_left-side');
          $('.editor__right').removeClass('choice-visible');
          $('.editor__help').removeClass('editor__help_open');
          $('.editor__help-cnt').slideUp();
          editor.removeClass('programs-app__item-edit_left-side');
          editor.removeClass('programs-app__item-edit_center');
        });
    }

    return {
        show: show,
        hide: hide
    }
}

function ProgramCardsPopupClass(initFunc) {
    var popup = $('.editor-popup');
    var animation = new CardsAnimationClass();
    var cardSelectedClass = 'card-selected';

    if (typeof initFunc === "function") {
        initFunc(popup);
    }

    function open() {
        popup.show();
        var t = setTimeout(function () {
            popup.addClass('editor-popup_visible');
            animation.show();
        }, 200);

    }

    function close() {
        animation.hide();

        var cardSelected = $('.' + cardSelectedClass);
        var t1 = setTimeout(function () {
            popup.hide().removeClass('editor-popup_visible');
        }, 250);
        if (cardSelected.length) {
            var card = cardSelected.find('.programs-app__card');
            cardSelected.removeClass(cardSelectedClass);
            var t2 = setTimeout(function () {
                card.removeClass('anim-bounceOut');
            }, 250);
        }
    }

    function saveAndClose(callback) {
        animation.hide();

        var t = setTimeout(function () {
            popup.hide();
            var selectedCard = $('.card-selected');

            if (typeof callback === "function") {
                callback(selectedCard);
            }

            if (selectedCard.length) {
                selectedCard.remove();
            }
        }, 300);
    }

    return {
        open: open,
        close: close,
        saveAndClose: saveAndClose
    }
}


function MainJsClass() {
    var scope = this;

    this.initTabTrigger = function () {
		if($('.jsSignInLink').length){
			$('.jsSignInLink').click(function(e){
				$(".jsTabsetSignIn").click();
				e.preventDefault();
			});
		}
		if($('.jsRegisterLink').length){
			$('.jsRegisterLink').click(function(e){
				$(".jsTabsetRegister").click();
				e.preventDefault();
			});
		}
		if($('.jsEmailLink').length){
			$('.jsEmailLink').click(function(e){
				$(".jsTabsetEmail").click();
				e.preventDefault();
			});
		}
    if($('.jsBtnBack').length){
      $('.jsBtnBack').click(function(e){
        $(".jsTabsetSignIn").click();
        e.preventDefault();
      });
    }
    };

	this.initCastomCheckbox = function () {
		if($('.castomCheckbox').length){
			$('.castomCheckbox').iCheck({
				checkboxClass: 'icheckbox_minimal',
				radioClass: 'iradio_minimal',
				increaseArea: '20%' // optional
			});
		}
	};

  this.initStrategyList = function () {
    if($('.strategy-app__list').length){
      var winHeigth = $(window).height();
		  var strategyGoalHeight = $('.vex .strategy-app__holder_goal').outerHeight();
	    var strategyMyHeight = $('.vex .strategy-app__holder_mystrategy').outerHeight();
      var strategyList = $('.strategy-app__list');
      var strategyListHeigth = winHeigth - strategyGoalHeight - strategyMyHeight - 100;
      strategyList.css('height', strategyListHeigth);
    }
  };

  this.initCardsList = function () {
      var cardsList = $('.vex .programs-app__list');
      if (cardsList.length) {
			var winHeigth = $(window).height();
      var cardsListTop = parseFloat(cardsList.css('padding-top'));
      var cardsCntTop = parseFloat($('.vex .programs-app__cnt').css('padding-top'));
      var cardsListHeigth = winHeigth - cardsListTop - cardsCntTop + 20;
      cardsList.css('height', cardsListHeigth);

      }
	};

	this.initCustomSelect = function (container) {
		var select = $('select.custom-select', container);
		var selectWide = $('select.custom-select_wide', container);
		if (select.length) {
			function format(state) {
				var originalOption = state.element;
				return $(originalOption).data('foo') + state.text;
			}
			select.select2({
				formatResult: format,
				formatSelection: format,
				allowClear: true,
				placeholder: "Select a class",
				minimumResultsForSearch: -1,
				escapeMarkup: function (m) { return m; }
			});
		}
		if (selectWide.length) {
			selectWide.select2({
				allowClear: true,
				placeholder: "Status",
				minimumResultsForSearch: -1
			});
		}
	};

  this.initStepsSlider = function () {
    if($('.step-holder__slider').length){
      var initList = function () {
        var active = "step_active";
        var left = "step_left";
        var right = "step_right";
        var hidden = "step_hidden";

        var done = "step-holder__paging-item_done";
        var pagingActive = "step-holder__paging-item_active";

        var items = $(".step-holder__slide");
        var itemsCnt = $(".step__cnt");
        var pagingItems = $(".step-holder__paging-item");

        var goToStep = function (number) {

          var removeAllAndAdd = function (item, add1, add2) {
            //console.log(add1 + add2);
            var remove = function (cl2) {
              if (hidden != cl2)
                item.removeClass(hidden);
              if (active != cl2)
                item.removeClass(active);
              if (left != cl2)
                item.removeClass(left);
              if (right != cl2)
                item.removeClass(right);
            };

            var has2 = typeof (add2) != "undefined";

            remove(add1);
            if (has2) remove(add2);

            if (!item.hasClass(add1))
              item.addClass(add1);

            if (has2 && !item.hasClass(add2))
              item.addClass(add2)

          };

          items.each(function (index) {
            var iN = index + 1;
            var obj = $(this);
            if (iN == number)
              removeAllAndAdd(obj, active);
            else if (iN - 1 == number)
              removeAllAndAdd(obj, right);
            else if (iN < number)
              removeAllAndAdd(obj, left, hidden);
            else if (iN > number)
              removeAllAndAdd(obj, right, hidden);
          });

          var pa = pagingItems.filter("[data-step=" + number + "]");
          pagingItems.removeClass(pagingActive);
          pa/*.addClass(done)*/.addClass(pagingActive);

          pagingItems.removeClass(done).each(function () {
            var obj = $(this);
            if (obj.attr("data-step") < number)
              obj.addClass(done);
          });
        };

        $(".jsNextStep").click(function (e) {
          e.preventDefault();
          goToStep($(this).attr("nextstep"));
        });


        pagingItems.click(function (e) {
          e.preventDefault();
          var obj = $(this);
          goToStep(obj.attr("data-step"));
        });

        itemsCnt.swipe({
          swipe: function (event, direction, distance, duration, fingerCount) {

            var step = parseInt(items.filter("." + active).attr("data-step"));

            var nextStep = direction == "left" ? (step + 1) : (step - 1);

            if (nextStep >= 1 && nextStep <= items.length)
              goToStep(nextStep);
          }
        });
      };

      $(function () {
        initList();
      });
    }
  };

  this.initRegPageSlider = function () {

      var items = $(".step-holder__slide");
      if (items.length) {

          var itemsCnt = $(".step__cnt");
          var pagingItems = $(".step-holder__paging-item");

          var newNavTemplate = $("#jsNewNavItemTemplate").html();
          var navItemsBlock = $(".step__nav-list");

          var active = "step_active";
          var left = "step_left";
          var right = "step_right";
          var hidden = "step_hidden";
          var newNaw = "step__nav-item_animation";

          var done = "step-holder__paging-item_done";
          var pagingActive = "step-holder__paging-item_active";



          var goToStep = function (number, navNameStr) {

              var removeAllAndAdd = function (item, add1, add2) {
                  //console.log(add1 + add2);
                  var remove = function (cl2) {
                      if (hidden != cl2)
                          item.removeClass(hidden);
                      if (active != cl2)
                          item.removeClass(active);
                      if (left != cl2)
                          item.removeClass(left);
                      if (right != cl2)
                          item.removeClass(right);
                  };

                  var has2 = typeof (add2) != "undefined";

                  remove(add1);
                  if (has2) remove(add2);

                  if (!item.hasClass(add1))
                      item.addClass(add1);

                  if (has2 && !item.hasClass(add2))
                      item.addClass(add2)

              };

              items.each(function (index) {
                  var iN = index + 1;
                  var obj = $(this);
                  if (iN == number)
                      removeAllAndAdd(obj, active);
                  else if (iN - 1 == number)
                      removeAllAndAdd(obj, right);
                  else if (iN < number)
                      removeAllAndAdd(obj, left, hidden);
                  else if (iN > number)
                      removeAllAndAdd(obj, right, hidden);
              });

              var pa = pagingItems.filter("[data-step=" + number + "]");
              //pagingItems.removeClass(pagingActive);
              //pa.addClass(pagingActive);
              pa.remove();

              pagingItems.removeClass(done).each(function () {
                  var obj = $(this);
                  if (obj.attr("data-step") < number)
                      obj.addClass(done);
              });

              var newNavItem = $(newNavTemplate);
              newNavItem.find(".step__nav-txt").html(navNameStr)
              navItemsBlock.prepend(newNavItem);
              setTimeout(function () { newNavItem.addClass(newNaw); }, 0);
          };


          $(".jsGotoStepLink").click(function (e) {
              e.preventDefault();
              goToStep($(this).data("step"), $(this).data("pastetext"));
          });
      }

  }

  this.initRangeSlider = function () {
    if($('#jsSliderRange').length){
      var slider = $("#jsSliderRange");
      var initSomeBlock = function () {
        var lowClass = "price-slider__container_low";
        var balanceClass = "price-slider__container_balance";
        var descActive = "price-slider__desc-item_active";
        var ma = "price-slider__visual-item_active";
        var mh = "price-slider__visual-item_up";

        var points = $(".jsStep");
        var stepDescItems = $(".price-slider__desc-item");
        var monthsItems = $(".price-slider__visual-item");

        var stepMark = $("#jsStepMark");

        var lastStep = 1;

        slider.slider({
          min: 0,
          max: 20000,
          values: [500],
          slide: function (event, ui) {
            var left = parseFloat(ui.handle.style.left);
            var curStep = null;

            points.each(function (index) {
              var obj = $(this);
              var objLeft = parseFloat(obj.context.style.left);
              if (parseFloat(obj.context.style.left) <= left)
                curStep = index + 2;
            });
            stepMark.html( "$" + slider.slider( "values", 0 ));

            if (curStep == null)
              curStep = 1;

            var change = function () {

//            stepMark.html("$" + stepMark.attr("step" + curStep));
              stepDescItems.removeClass(descActive);
              stepDescItems.filter("[step=" + curStep + "]").addClass(descActive);

              var a = monthsItems.filter("." + ma);
              a.removeClass(ma).addClass(mh);
              monthsItems.filter("[step=" + curStep + "]").removeClass(mh).addClass(ma);
              a.removeClass(mh);

              if (curStep == 1) {
                slider.addClass(lowClass);
              }
              else {
                slider.removeClass(lowClass);
                if (curStep == 2) {
                  slider.removeClass(balanceClass);
                }
                else if (curStep == 3) {
                  slider.addClass(balanceClass);
                }
                else if (curStep == 4) {
                  slider.removeClass(balanceClass);
                }
              }
            };

            if (lastStep != curStep) {
              lastStep = curStep;
              change();
            }
          }
        });
      };

      var initValue = function () {
        var valueInput = $("#stepValueInput");
        var valueInputParent = valueInput.parent('.input-i');
        var valueInputClear = $('#jsStepValueClear');
        var valueInputSubmit = $('#jsValueChecked');
        var stepMark = $("#jsStepMark");
        var valueOpener = $('#jsStepMark');

        valueInput.keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
              // Allow: Ctrl+A
              (e.keyCode == 65 && e.ctrlKey === true) ||
              // Allow: home, end, left, right
              (e.keyCode >= 35 && e.keyCode <= 39)) {
              // let it happen, don't do anything

              if (valueInput.val()=='') {
                valueInputClear.hide(300);
              }

              valueInputParent.removeClass('value-error');
              return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
              valueInputParent.addClass('value-error');
            } else {
              valueInputParent.removeClass('value-error');
              valueInputClear.show(300);
            }
          });

        $('#jsStepValueClear').click(function(e){
          valueInput.val('');
          $(this).hide(300);
          e.preventDefault();
        });

        valueInputSubmit.click(function(e){
          var newValue = parseInt(valueInput.val());
          if (valueInput.val()=='') {
            newValue=0;
          }
          if (newValue < slider.slider( "option","min" )){
              newValue = slider.slider( "option","min" );
              valueInput.val(newValue);
            }
          if (newValue > slider.slider( "option","max" )){
              newValue = slider.slider( "option","max" );
              valueInput.val(newValue);
            }

          stepMark.html("$" + newValue);
          slider.slider("values", [newValue]);
          //var leftStyle = "" + (newValue / slider.slider( "option","max" ) * 100) + "%";
          slider.slider('option', 'slide')(null, { values: slider.slider('values'), handle: $(".ui-slider-handle")[0]});

          $('#jsStepValueTooltip').fadeOut(300);
          e.preventDefault();
        });

        valueOpener.click(function(e){
          $('#jsStepValueTooltip').fadeIn(300);
          e.preventDefault();
        });
      };

      $(function () {
        initSomeBlock();
        initValue();
      });
    }
  };



  this.initPanelMove = function () {
    if($('.panel').length){
      var $opener = $('#jsPanelOpener');
      var $panel = $('#jsPanelBar');
      var $stepBlock = $('#jsStepsBlock');
	    var t=0;

      $opener.click(function(e){
        if ($panel.hasClass('panel_close')){
          $panel.animate({
            left:0
          }, 300, 'easeInOutExpo');
          $stepBlock.animate({
            paddingLeft:100
          },300, 'easeInOutExpo');
          e.preventDefault();
          $panel.toggleClass('panel_close');
        } else {
          $panel.animate({
            left:-70
          }, 300, 'easeInOutExpo');
          $stepBlock.animate({
            paddingLeft:30
          },300, 'easeInOutExpo');
          e.preventDefault();
          $panel.toggleClass('panel_close');
        }
      });

//      t = setTimeout(function () {
//        $panel.animate({
//          left:-70
//        }, 300, 'easeInOutExpo');
//        $stepBlock.animate({
//          paddingLeft:30
//        },300, 'easeInOutExpo');
//        $panel.toggleClass('panel_close');
//      }, 4000);
    }
  };


	this.initVexPopup = function () {
		if ($('.vex_container').length) {
			$('.step__link_loyalty').click(function () {
				vex.open({
					content: $('.vex-popup_loyalty').html(),
					className: 'vex_rewardexpert_small',
					afterOpen: function () {
						$('.vex-close').append('<span class="icon-font icon-close"></span>');
						scope.initVexPopupPosition();
					}
				});
			});


			$('.step__link_include').click(function () {
				vex.open({
					content: $('.vex-popup_include').html(),
					className: 'vex_rewardexpert_small',
					afterOpen: function () {
						$('.vex-close').append('<span class="icon-font icon-close"></span>');
						scope.initVexPopupPosition();
					}
				});
			});

			$('.open-programs').click(function () {
				vex.open({
					content: $('.vex-popup_programs').html(),
					className: 'vex_rewardexpert',
					afterOpen: function () {
						var popup = $(this)[0].$vex;
						$('.vex-close').append('<span class="icon-font icon-close"></span> <span class="vex-close-txt"> Cancel</span>');
						scope.initChooseProgram();
						scope.initCustomSelect(popup);

            var autoselectBig = $(".autocomplete-big");
            autoselectBig.select2({
              placeholder: "Select a State",
              allowClear: true,
              dropdownCssClass: "autocomplete-search_big",
              minimumInputLength: 1
            });

            scope.initStrategyList();
            scope.initFixedStrategyApp();


					}
				});
			});

			$('.open-milespoints').click(function () {
				vex.open({
					content: $('.vex-popup_milespoints').html(),
					className: 'vex_rewardexpert_short',
					afterOpen: function () {
						$('.vex-close').append('<span class="icon-font icon-close"></span>');
						scope.initVexPopupPosition();
					}
				});
			});

			$('.open-prog-include').click(function () {
				vex.open({
					content: $('.vex-popup_prog-include').html(),
					className: 'vex_rewardexpert_small',
					afterOpen: function () {
						$('.vex-close').append('<span class="icon-font icon-close"></span>');
						scope.initVexPopupPosition();
					}
				});
			});

			$('.open-cards').click(function () {
				vex.open({
					content: $('.vex-popup_cards').html(),
					className: 'vex_rewardexpert',
					afterOpen: function () {
						$('.vex-close').append('<span class="icon-font icon-close"></span> <span class="vex-close-txt"> Cancel</span>');
						
						var pageCartsJs = new PageCartsJsClass('.jsListPrograms');
						$(window).resize(function () {
						    pageCartsJs.reInit();
						});
						pageCartsJs.reInit();

						scope.initFixedProgApp(pageCartsJs);
						scope.initCardsList();
						scope.initEditor(pageCartsJs);
            			scope.initSimplePopup();

						var popupEditor = $('.editor-popup');
						scope.initCustomSelect(popupEditor);

						scope.initCheckEditCards();
					}
				});
			});

		  $('.open-active-budget').click(function () {
				vex.open({
				  content: $('.vex-popup_budget').html(),
				  className: 'vex_rewardexpert_wide',
				  afterOpen: function () {
					$('.vex-close').append('<span class="icon-font icon-close"></span>');
					  var popup = $(this)[0].$vex;
					  scope.initVexPopupPosition();
						scope.initDigitDisplay(popup);
            scope.initTooltip();
				  }
				});
			});

			$('.open-active-programm').click(function () {
				vex.open({
					content: $('.vex-popup_active-programm').html(),
					className: 'vex_rewardexpert_wide',
					afterOpen: function () {
						$('.vex-close').append('<span class="icon-font icon-close"></span>');
						var popup = $(this)[0].$vex;
						scope.initVexPopupPosition();
						scope.initSwitcher(popup);
						scope.initDigitDisplay(popup);

            /* mega hack !!!!! */
            // var toggleFirst = popup.find('.tog:first');
            // console.log(toggleFirst);
            // toggleFirst.css({
              // position:'relative',
              // left: 0
            // })
					}
				});
			});

			$('.open-active-card').click(function () {
				vex.open({
					content: $('.vex-popup_active-card').html(),
					className: 'vex_rewardexpert_wide',
					afterOpen: function () {
						$('.vex-close').append('<span class="icon-font icon-close"></span>');
						var popup = $(this)[0].$vex;
						scope.initVexPopupPosition();
						scope.initDigitDisplay(popup);
					}
				});
			});
		}
	};

	this.initVexPopupPosition = function () {
		if($('.vex_rewardexpert_small').length){
			var $popup =  $('.vex-content');
			var $popupHeight =  $popup.outerHeight();
			var $windowHeight =  $(window).height();
			var top = $(window).scrollTop();
			var pos = 0;
			$popup.css("top", '50%');
			$popup.css("margin-top", -$popupHeight/2);
		}
		if($('.vex_rewardexpert_short').length){
			var $popup =  $('.vex-content');
			var $popupHeight =  $popup.outerHeight();
			var $windowHeight =  $(window).height();
			var top = $(window).scrollTop();
			var pos = 0;
			$popup.css("top", '50%');
			$popup.css("margin-top", -$popupHeight/2);
		}

    if($('.vex_rewardexpert_wide').length){
      var $popup =  $('.vex-content');
      var $popupHeight =  $popup.outerHeight();
      var $windowHeight =  $(window).height();
      var top = $(window).scrollTop();
      var pos = 0;
      $popup.css("top", '50%');
      $popup.css("margin-top", -$popupHeight/2);
    }
	};


  this.initChooseProgram = function () {
    if($('.strategy-app').length){
      var $itemsList = $('.vex .strategy-app__list');
      var $item = $itemsList.find('.strategy-item');
      var itemStartegyBox = $('.vex .jsStartegyBox');
      var $thisW =  $item.width();
      var $thisH =  $item.height();
      var btnClear = $('.vex .btn_basket');

      $item.each(function(){
        var $this = $(this);
        var $btn = $this.find('.btn');
        $btn.on('click',function(){
          var boxLeft = $itemsList.offset.left;
          var boxTop = $itemsList.offset.top;
          var itemStartegyBoxOffset = itemStartegyBox.offset();
          var itemStartegyBoxTop = itemStartegyBoxOffset.top;

              var itemclone = $this.clone();
                itemStartegyBox.removeClass('strategy-app__box_empty');
                t = setTimeout(function () {
                  itemclone.offset({
                    top: $this.offset().top,
                    left: $this.offset().left
                  }).css({
                      'opacity': '1',
                      'position': 'absolute',
                      'height': $thisH,
                      'width': $thisW,
                      'z-index': '9999'
                    })
                    .appendTo($('body'))
                    .animate({
                      'opacity': '0.2',
                      'top': itemStartegyBoxTop,
                      'height': $thisH/1.2
                    }, 1000, 'easeInOutElastic', function(){
                      itemclone.hide();
                      itemStartegyBox.addClass('strategy-app__box_show');
                      t = setTimeout(function () {
                        scope.initStrategyList();
                      }, 350);
                    });
                }, 150);

              })
          });
//      scope.initStrategyList();
      	btnClear.click(function(e){
        itemStartegyBox.removeClass('strategy-app__box_show').addClass('strategy-app__box_empty');
        t = setTimeout(function () {
          scope.initStrategyList();
        }, 350);
        e.preventDefault();
      });
    }
  };

  this.initFixedProgApp = function (pageCartsJs) {
    if($('.programs-app').length){
      var progApp = $('.vex .programs-app');
      var progList = $('.vex .programs-app__listing');
       $('.vex').on({
          mousewheel: function(event, delta, deltaX, deltaY) {
            var t;
              // requires jquery.mousewheel plugin
            if (delta < 0 && !pageCartsJs.IsActiveShowMore) {
                  progApp.addClass('programs-app_half-row').addClass('programs-app_down').removeClass('programs-app_up');
                t = setTimeout(function () {
                  scope.initCardsList();
                }, 350);
              }
              if (delta > 0){
                if (progApp.hasClass('programs-app_half-row')) {
                  progApp.addClass('programs-app_up').removeClass('programs-app_down');
                  t = setTimeout(function () {
                    scope.initCardsList();
                  }, 350);
                } else {
                  return
                }
              }
              if (delta > 0 && progList.position().top > 0) {
                progApp.removeClass('programs-app_half-row');
                t = setTimeout(function () {
                  scope.initCardsList();
                }, 350);
              }
          }
      });
    }
  };

	this.initEditor = function (pageCartsJs) {
    if($('.editor-popup').length){
      var opener = $('.programs-app__card');
      var close = $('.editor__close');
      var popupObj = new ProgramCardsPopupClass(function (popup) { mainJs.initCustomSelect(popup); });

      pageCartsJs.onPopupOpen(popupObj.open);
      
      $('.jsEditorSave').click(function (e) {
            e.preventDefault();
            popupObj.saveAndClose(function(selectedCard) {
                pageCartsJs.AddElement($("#jsNewElementCartTemplate").clone().removeAttr("id").wrap('<div></div>').parent().html(), selectedCard.length == 0);
            });
        });

      opener.click(function(e){
        var thisopener = $(this);
        if (thisopener.hasClass('programs-app__card_empty')) {
          return false;
        } else {
          $(this).addClass('anim-bounceOut');
          var t = setTimeout(function () {
            thisopener.parent('li').addClass('card-selected');
            popupObj.open();
          }, 200);
          $('.programs-app').removeClass("programs-app_half-row");
          pageCartsJs.reInit();
        }

        e.preventDefault();
      });

      close.click(function(e) {
          popupObj.close();
        e.preventDefault();
      });

      $('.editor-popup__bg').click(function(e) {
          popupObj.close();
        e.preventDefault();
      });


      $(window).on('keyup', function(event){
        if (event.keyCode == 27) {
          popupObj.close();
        }
      });

      $(window).resize(function () {
        popupObj.close();
      });

    }
  };

  this.initSimplePopup = function () {
    if($('.simple-popup').length){
      var simplePopup = $('.simple-popup');
      var opener = $('.jsSimplePopupOpen');
      var close = $('.simple-popup__close');


      opener.click(function(e){
        simplePopup.show();
        var t = setTimeout(function(){
          simplePopup.addClass('simple-popup_visible')
        },300);
        e.preventDefault();
      });

      close.click(function(e) {
        simplePopup.removeClass('simple-popup_visible');
        var t = setTimeout(function(){
          simplePopup.hide();
        },300);

        e.preventDefault();
      });

      $('.simple-popup__bg').click(function(e) {
        simplePopup.removeClass('simple-popup_visible');
        var t = setTimeout(function(){
          simplePopup.hide();
        },300);
        e.preventDefault();
      });

      $(window).on('keyup', function(event){
        if (event.keyCode == 27) {
          simplePopup.removeClass('simple-popup_visible');
          var t = setTimeout(function(){
            simplePopup.hide();
          },300);
        }
      });
    }
  };

	this.initFixedStrategyApp = function () {
		if($('.strategy-app').length){

			var strategyApp = $('.vex .strategy-app');
			var strategyList = $('.vex .strategy-app__holder_recommented');
			var strategyTop = $('.vex .strategy-app__holder_goal');


			$('.strategy-app').on({
				mousewheel: function(event, delta, deltaX, deltaY) {
					var t;
					// requires jquery.mousewheel plugin
					if (delta > 0){
						$('.strategy-app').addClass('strategy-app_up').removeClass('strategy-app_down');
						t = setTimeout(function () {
							scope.initStrategyList();
						}, 350);
					} else {
            $('.strategy-app').addClass('strategy-app_down').removeClass('strategy-app_up');
            t = setTimeout(function () {
              scope.initStrategyList();
            }, 350);
          }
				}
			});
		}
	};

  this.initSwitcher = function (container) {
    (function( $ ) {
      $.fn.switcherCheckbox = function(options) {
        var defaults = {
          newElementClass: 'tog',
          activeElementClass: 'on',
          activeParentClass: 'switchActive'
        };
        var options = $.extend(defaults, options);
        this.each(function() {
          //Assign the current checkbox to obj
          var input = $(this);

          var parent = $(this).parent().parent().parent().parent();
          //Create new element to be styled
          var newObj = $('<div/>', {
//            'id': '#' + obj.attr('id'),
            'class': options.newElementClass,
            'style': 'display: block;'
          }).insertAfter(this);
          //Make sure pre-checked boxes are rendered as checked
          if(input.is(':checked')) {
            newObj.addClass(options.activeElementClass);
              if($('.information__price').length){
                  newObj.parent().parent().parent().prev().removeClass("information__price_light-blue").addClass("information__price_blue");
                  newObj.siblings().removeClass("active").siblings(".switcher__label_btm").addClass("active");
              }
              parent.addClass(options.activeParentClass);
          }
          input.hide();
          //Attach a click handler
          newObj.click(function() {
            //Assign current clicked object
            var obj = $(this);
            //Check the current state of the checkbox
            if(obj.hasClass(options.activeElementClass)) {
              obj.removeClass(options.activeElementClass);
                if($('.information__price').length){
                    obj.parent().parent().parent().prev().removeClass("information__price_blue").addClass("information__price_light-blue");
                    obj.siblings().removeClass("active").siblings(".switcher__label_top").addClass("active");
                }
              input.prop("checked", false).trigger('change');
              parent.removeClass(options.activeParentClass);
            } else {
              obj.addClass(options.activeElementClass);
                if($('.information__price').length){
                    obj.parent().parent().parent().prev().removeClass("information__price_light-blue").addClass("information__price_blue");
                    obj.siblings().removeClass("active").siblings(".switcher__label_btm").addClass("active");
                }
              input.prop("checked", true).trigger('change');
              parent.addClass(options.activeParentClass);
            }
            if($('.editor__prods-tooltip').is(':visible')) {
              $('.editor__prods-tooltip').hide();
              $('.editor__prods-info').removeClass('editor__prods-info_active');
            }
            //Kill the click function
            return false;
          });
        });
      };
    })(jQuery);

	var switcher = $('.jsSwitcher', container );
    if(switcher.length){
      switcher.switcherCheckbox();
    }
  };

	this.initChoiceClose = function () {
		if($('.jsCloseChoice').length){
//			var choiceContainer = $('.editor__right');
      var prodsContainer = $('.editor');
			$('.jsCloseChoice').click(function(e){
        prodsContainer.removeClass('choice-visible');
				e.preventDefault();
			});
		}
	};

	this.initChoiceOpen = function () {
		if($('.jsAddMoreClose').length){
//			var choiceContainer = $('.editor__right');
      var prodsContainer = $('.editor');
			$('.jsAddMoreClose').click(function(e){
        prodsContainer.addClass('choice-visible');
				e.preventDefault();
			});
		}
	};

	this.initDelEditCards = function () {
		if($('.editor__cards-item').length){
			var cardsItem = $('.editor__cards-item');
			cardsItem.each(function(){
				var thisItem = $(this);
				var btnDel = thisItem.find('.editor__cards-del');
				btnDel.click(function(e){
					thisItem.remove();
          scope.initCheckEditCards();
          e.preventDefault();
				});
			});
		}
	};

	this.initCheckEditCards = function () {
		var cardsItem = $('.editor__cards-item');
		if (cardsItem.length){
			$('.editor__cards-box').removeClass('editor__cards-box_empty');
		} else {
			$('.editor__cards-box').addClass('editor__cards-box_empty');
		}
	};

	this.initEditorHelp = function () {
		if($('.editor__help').length){
			var blockHelp = $('.editor__help');
			var helpCnt = blockHelp.find('.editor__help-cnt');
			var btnOpener = $('.editor__help-head');
			btnOpener.click(function(){
				blockHelp.toggleClass('editor__help_open');
				helpCnt.slideToggle(300);
			});
		}
	};

  this.initEditorTooltip = function () {
    if ($('.editor__prods').length){
      var prodsContainer = $('.editor');
      var prodsContainerWidth = prodsContainer.outerWidth();
      var prodsItem = $('.editor__prods-item');
      var tooltip = $('.editor__prods-tooltip');
      prodsItem.each(function(){
        var thisItem = $(this);
        var openTooltip = thisItem.find('.editor__prods-info');
        var closeTooltip = $('.editor__prods-tooltip-close');
        openTooltip.click(function(e){
          var tooltipheight = tooltip.outerHeight();
          var tooltipwidth = tooltip.outerWidth();
          var openerTop = $(this).position().top - tooltipheight + 40;
          var openerLeft = $(this).position().left + prodsContainerWidth - tooltipwidth - 45;
          openTooltip.addClass('editor__prods-info_active');
          tooltip.css({
            top: openerTop,
            left: openerLeft
          });
          tooltip.fadeIn(300);
          e.preventDefault();
        });
        closeTooltip.click(function(e){
          tooltip.fadeOut(300);
          openTooltip.removeClass('editor__prods-info_active');
          e.preventDefault();
        });
      });
    }
  };

	this.initFloatLabel = function () {
		if ($('.floatlabel').length){
			$('input.floatlabel').floatlabel({
				ransitionDuration: 2,
				transitionEasing: 'ease'
			});
		}
	};

	this.init = function() {
		for (var prop in this) {
			if (prop !== 'init' && typeof this[prop] === "function") {
				this[prop]();
			}
		}
	};

	this.initAutocomplete = function () {
		if ($('.autocomplete').length){
			var autoselect = $(".autocomplete");
			autoselect.select2({
				placeholder: "Select destination",
				allowClear: true,
        dropdownCssClass: "autocomplete-search",
        minimumInputLength: 1
			});

      $('#jsStartFrom').select2({
        'placeholder': "Select location",
        allowClear: true,
        dropdownCssClass: "autocomplete-search",
        minimumInputLength: 1
      });
      $('#jsStartFrom').on("select2-opening", function(e) {
        var scope = $(this);
        console.log(scope);
      });
      $('#jsStartFrom').on("select2-close", function(e) {
        var scope = $(this);
        console.log(scope);
      });
		}
	};

  this.initTopbar = function () {
    if ($('.jsTopbarBoxOpen').length){
      var topBar = $('.jsTopbar');
      var topBarParent = $('.jsTopbar').parent();
      var topbarBox = $('.topbar__box', topBar);
      var opener = $('.jsTopbarBoxOpen');
      var closeBtn = $('.topbar__close', topBar);
      var topbarText = $('.topbar__txt', topBar);

      opener.on({
        'click': function(e){
          var thisBtn = $(this);
          if(topBarParent.hasClass('topbar-open')){
            topBarParent.toggleClass('topbar-open');
            topbarBox.height(0);
          } else {
            scope.initTopbarBoxHeight();
            topBarParent.toggleClass('topbar-open');
            e.preventDefault();
          }
        }
      });

      closeBtn.on({
        'click': function(e){
          opener.click();
          e.preventDefault();
        }
      });

      topbarText.on({
        'click': function(e){
          opener.click();
          e.preventDefault();
        },
        'mouseenter': function(){
          topBar.addClass('topbar_hover');
        },
        'mouseout': function(){
          topBar.removeClass('topbar_hover');
        }
      });
    }
  };

  this.initTopbarBoxHeight = function () {
    var windowHeight = $(window).height();
    var topBar = $('.jsTopbar');
    var topBarParent = $('.jsTopbar').parent();
    var topbarBox = $('.topbar__box', topBar);
    topbarBox.height((windowHeight <= 690) ? 650 : (windowHeight - 26));

    $(window).resize(function(){
      if(topBarParent.hasClass('topbar-open')){
        var windowHeight = $(window).height();
        var topbarBox = $('.topbar__box');
        topbarBox.height((windowHeight <= 690) ? 650 : (windowHeight - 26));
      } else {

      }
    });
  };


  this.initNavSteps = function () {
    if ($('.jsNavToggle').length){
      var opener = $('.jsNavToggle');
      var stepNav = opener.parent('.step__nav');
      opener.on({
        'click':function(){
          stepNav.toggleClass('step__nav_open');
        }
      })
    }
  };

	this.initDigitDisplay = function (container) {
		if ($('.jsDigitDisplay').length){
			var $digitDisplay = $('.jsDigitDisplay',container);
			var value = $digitDisplay.val();
			var valueLength = value.toString().length;
			$digitDisplay.flapper({
				width: valueLength,
				chars_preset: 'alpha'
			});
			setTimeout(function(){
				$digitDisplay.val(value).change();
			}, 100);

      var flapper = $('.flapper');

      var index = value.indexOf(',');
      flapper.each(function(){
        var digit = $('.digit');
        console.log(digit[index]);
        var digitDivider = $(digit[index]);
        digitDivider.addClass('digit-divider');
      })
		}
	};

  this.initTooltip = function () {
    if ($('.jsTooltip').length){
      var tooltip = $('.jsTooltip');
      var opener = $('.tooltip__btn',tooltip);
      var closeBtn = $('.tooltip__close',tooltip);
      var tooltipBox = $('.tooltip__info',tooltip);

      opener.click(function(e){
        $(this).addClass('tooltip__btn_active');
        tooltipBox.fadeIn(300);
        e.preventDefault();
      });

      closeBtn.click(function(e){
        opener.removeClass('tooltip__btn_active');
        tooltipBox.fadeOut(300);
        e.preventDefault();
      });
    }
  };

  this.initCarousel = function () {
    $(".jsCarousel").carouFredSel({
      circular: false,
      infinite: false,
      auto    : true,
      scroll  : {
        items   : 1,
        pauseOnHover    : true,
        duration    : 1000
      },
      responsive	: true,
      items		: {
        width		: 200,
        visible		: {
          min			: 2,
          max			: 4
        }
      },
      prev    : {
        button  : function(){
          return $(this).parents('.card-list__slider').find('.card-list__slider-prev');
        }
      },
      next    : {
        button  : function(){
          return $(this).parents('.card-list__slider').find('.card-list__slider-next');
        }
      }
    });
  };


  $(function(){
    $(window).resize(function(){
      scope.initStrategyList();
      scope.initCardsList();
      scope.initVexPopupPosition();
    });

     scope.initTabTrigger();
     scope.initCastomCheckbox();
      //scope.initStepsSlider();
     scope.initRegPageSlider();
     scope.initRangeSlider();
     scope.initPanelMove();
     scope.initVexPopup();
     scope.initVexPopupPosition();
     scope.initChooseProgram();
     // scope.initSwitcher();
     scope.initChoiceClose();
     scope.initChoiceOpen();
     scope.initDelEditCards();
     scope.initEditorHelp();
     scope.initEditorTooltip();
     scope.initFloatLabel();
     scope.initAutocomplete();
     scope.initTopbar();
     scope.initNavSteps();
     scope.initCarousel();
    });
}
