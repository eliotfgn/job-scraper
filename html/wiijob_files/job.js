(function($){"use strict";var __cache=[];$.extend($.apusThemeCore,{job_init:function(){var self=this;self.select2Init();self.searchAjaxInit();self.listingDetail();self.filterListingFnc();self.listingBtnFilter();self.portfolio();self.sendPrivateMessage();self.changeHeightJobsDetail();setTimeout(function(){self.changePaddingTopContent();$(window).trigger('resize')},100);self.checkSidebar();$(window).resize(function(){setTimeout(function(){self.changePaddingTopContent();self.changeHeightJobsDetail()},50)});self.userLoginRegister();self.dashboardChart();if($('.jobs-listing-wrapper.main-items-wrapper, .employers-listing-wrapper.main-items-wrapper, .candidates-listing-wrapper.main-items-wrapper').length){$(document).on('change','form.filter-listing-form-wrapper input, form.filter-listing-form-wrapper select',function(e){var form=$(this).closest('form.filter-listing-form-wrapper');if($(this).attr('name')=='filter-salary-type'){form.find('input[name=filter-salary-from]').val('');form.find('input[name=filter-salary-to]').val('')}
setTimeout(function(){form.trigger('submit')},200)});$(document).on('submit','form.filter-listing-form-wrapper',function(e){e.preventDefault();var url=$(this).attr('action');var formData=$(this).find(":input").filter(function(index,element){return $(element).val()!=''}).serialize();if(url.indexOf('?')!=-1){url=url+'&'+formData}else{url=url+'?'+formData}
self.jobsGetPage(url);return!1})}
$(document).on('change','form.jobs-ordering select.orderby',function(e){e.preventDefault();$('form.jobs-ordering').trigger('submit')});$(document).on('submit','form.jobs-ordering',function(e){var url=$(this).attr('action');var formData=$(this).find(":input").filter(function(index,element){return $(element).val()!=''}).serialize();if(url.indexOf('?')!=-1){url=url+'&'+formData}else{url=url+'?'+formData}
self.jobsGetPage(url);return!1});if($('.ajax-pagination').length){self.ajaxPaginationLoad()}
$(document).on('click','.advance-search-btn',function(e){e.preventDefault();$(this).closest('.filter-listing-form').find('.advance-search-wrapper').slideToggle('fast','swing')});$('.message-notification').on('click',function(e){e.stopPropagation();$('.notifications-wrapper').toggleClass('active');$('.message-top .notifications-wrapper.active').perfectScrollbar()});$('body').on('click',function(){if($('.notifications-wrapper').hasClass('active')){$('.notifications-wrapper').removeClass('active')}});$('.notifications-wrapper').on('click',function(e){e.stopPropagation()});$('body').on('click','.close-filter-sidebar',function(){var parent=$(this).closest('.inner-left');parent.find('.filter-sidebar').removeClass('active');parent.find('.over-dark').removeClass('active')})},checkSidebar:function(){$('.sidebar-job > .widget').each(function(){var $this=$(this);if($this.find('> *').length>0){$this.addClass('has-content')}})},dashboardChart:function(){var self=this;if($('#dashboard_chart_wrapper').length){var $this=$('#dashboard_chart_wrapper');var labels=$this.data('labels');var values=$this.data('values');var label=$this.data('label');var chart_type=$this.data('chart_type');var bg_color=$this.data('bg_color');var border_color=$this.data('border_color');var ctx=$this.get(0).getContext("2d");var data={labels:labels,datasets:[{label:label,backgroundColor:bg_color,borderColor:border_color,borderWidth:1,data:values},]};var options={scaleBeginAtZero:!0,scaleShowGridLines:!1,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!1,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legend:{display:!1},tooltips:{enabled:!0,mode:'x-axis',cornerRadius:4},}
var myBarChart=new Chart(ctx,{type:chart_type,data:data,options:options})}
$('.dashboard-notifications-wrapper').perfectScrollbar();var self=this;var $this=$('#dashboard_job_chart_wrapper');if($this.length<=0){return}
if($.isFunction($.fn.select2)&&typeof wp_job_board_pro_select2_opts!=='undefined'){var select2_args=wp_job_board_pro_select2_opts;select2_args.allowClear=!1;select2_args.minimumResultsForSearch=10;select2_args.language={noResults:function(){return wp_job_board_pro_select2_opts.language_result}};select2_args.width='100%';$('.stats-graph-search-form select').select2(select2_args)}
var job_id=$this.data('job_id');var nb_days=$this.data('nb_days');self.dashboardChartAjaxInit($this,job_id,nb_days);$('form.stats-graph-search-form select[name="job_id"]').on('change',function(){$('form.stats-graph-search-form').trigger('submit')});$('form.stats-graph-search-form select[name="nb_days"]').on('change',function(){$('form.stats-graph-search-form').trigger('submit')});$('form.stats-graph-search-form').on('submit',function(e){e.preventDefault();var job_id=$('form.stats-graph-search-form select[name="job_id"]').val();var nb_days=$('form.stats-graph-search-form select[name="nb_days"]').val();self.dashboardChartAjaxInit($this,job_id,nb_days);return!1})},dashboardChartAjaxInit:function($this,job_id,nb_days){var self=this;if($this.length<=0){return}
if($this.hasClass('loading')){return}
$this.addClass('loading');var ajaxurl=superio_job_opts.ajaxurl;if(typeof wp_job_board_pro_opts.ajaxurl_endpoint!=='undefined'){ajaxurl=wp_job_board_pro_opts.ajaxurl_endpoint.toString().replace('%%endpoint%%','superio_get_job_chart')}
$.ajax({url:ajaxurl,type:'POST',dataType:'json',data:{action:'superio_get_job_chart',job_id:job_id,nb_days:nb_days,nonce:$this.data('nonce'),}}).done(function(response){if(response.status=='error'){$this.remove()}else{var ctx=$this.get(0).getContext("2d");var data={labels:response.stats_labels,datasets:[{label:response.stats_view,backgroundColor:response.bg_color,borderColor:response.border_color,borderWidth:1,data:response.stats_values},]};var options={scaleBeginAtZero:!0,scaleShowGridLines:!1,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!1,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legend:{display:!1},tooltips:{enabled:!0,mode:'x-axis',cornerRadius:4},}
if(typeof self.myBarChart!=='undefined'){self.myBarChart.destroy()}
self.myBarChart=new Chart(ctx,{type:response.chart_type,data:data,options:options})}
$this.removeClass('loading')})},portfolio:function(){$('.portfolio').each(function(){var $this=$(this);$('.view-more-gallery',$this).on('click',function(e){$('.item',$this).removeClass('hidden');$('.popup-image-gallery').removeClass('view-more-image');$(this).addClass('hidden');$(document).trigger('resize')})})},sendPrivateMessage:function(){var self=this;$('.send-private-message-btn').magnificPopup({mainClass:'apus-mfp-zoom-in login-popup',type:'inline',midClick:!0})},select2Init:function(){var self=this;if($.isFunction($.fn.select2)&&typeof wp_job_board_pro_select2_opts!=='undefined'){var select2_args=wp_job_board_pro_select2_opts;select2_args.allowClear=!0;select2_args.minimumResultsForSearch=10;select2_args.language={noResults:function(params){return select2_args.language_result}}
$('.select-taxonomy-search').each(function(){self.select2SearchInit($(this),select2_args,!1)});$('.select-field-region-search').each(function(){self.select2SearchInit($(this),select2_args,!0)});$('body').on('change','select.select-field-region-search',function(){var val=$(this).val();var next=$(this).data('next');var main_select='select.select-field-region-search'+next;if($(main_select).length>0){$(main_select).val(null).trigger("change")}});$('.filter-listing-form select:not(.select-taxonomy-search, .select-field-region-search)').select2(select2_args);select2_args.allowClear=!1;$('select[name=jobs_ppp]').select2(select2_args);$('select[name=candidates_ppp]').select2(select2_args);$('select[name=employers_ppp]').select2(select2_args);$('select[name=email_frequency]').select2(select2_args)}},select2SearchInit:function($element,select2_args,region){$element.select2({allowClear:!0,width:'100%',dir:select2_args.dir,language:{noResults:function(params){return select2_args.language_result},inputTooShort:function(){return select2_args.formatInputTooShort_text}},minimumInputLength:2,ajax:{url:wp_job_board_pro_opts.ajaxurl_endpoint.toString().replace('%%endpoint%%','wpjb_search_terms'),dataType:'json',delay:250,data:function(params){if(region){var parent_id=0;var prev=$element.data('prev');var prev_select=$('.select-field-region-search'+prev);if(prev_select.length){parent_id=prev_select.val();if(!parent_id){parent_id='lost-parent'}}
var query={search:params.term,page:params.page||1,taxonomy:$element.data('taxonomy'),parent:parent_id,prev:prev}}else{var query={search:params.term,page:params.page||1,taxonomy:$element.data('taxonomy'),parent:'',prev:'',}}
return query},processResults:function(data,params){params.page=params.page||1;return{results:$.map(data.results,function(item){return{text:item.name,id:item.id}}),pagination:{more:params.page<data.pages}}},transport:function(params,success,failure){var __cachekey=params.data.search+'-'+params.data.taxonomy+'-'+params.data.page+'-'+params.data.parent+params.data.prev;if('undefined'!==typeof __cache[__cachekey]){success(__cache[__cachekey]);return}
var $request=$.ajax(params);$request.then(function(data){__cache[__cachekey]=data;success(__cache[__cachekey])});$request.fail(failure);return $request},cache:!0}})},changeHeightJobsDetail:function(){var heightdetail=0;if($('#job-details-wrapper .top-detail-job').length){var heightdetail=$('#job-details-wrapper .top-detail-job').outerHeight()}
$('#job-details-wrapper .job-content-area').css({'height':'calc( 100vh - '+(heightdetail+20)+'px'})},changePaddingTopContent:function(){var admin_bar_h=0;if($('#wpadminbar').length){var admin_bar_h=$('#wpadminbar').outerHeight()}
if($(window).width()>=1200){var header_h=$('#apus-header').outerHeight();var header_top_h=header_h;var header_main_content_h=header_h-admin_bar_h;$('body.page-template-page-dashboard #apus-main-content').css({'padding-top':header_h});if($('.layout-type-fullwidth .filter-sidebar').length){$('.layout-type-fullwidth .filter-sidebar').css({'top':header_h,'height':'calc( 100vh - '+header_h+'px )'});$('#apus-main-content').css({'padding-top':header_main_content_h})}}else{var header_h=$('#apus-header-mobile').outerHeight();if($('#jobs-google-maps').is('.fix-map')){var header_top_h=header_h+admin_bar_h;var header_main_content_h=header_h-admin_bar_h}else if($('.layout-type-fullwidth .filter-sidebar').length){if($(window).width()>=992){var header_top_h=header_h+admin_bar_h}else{var header_top_h=header_h-admin_bar_h}
$('.layout-type-fullwidth .filter-sidebar').css({'padding-top':header_top_h,'height':'calc( 100vh - '+header_top_h+'px )'});$('#apus-main-content').css({'padding-top':header_top_h})}
$('body.page-template-page-dashboard #apus-main-content').css({'padding-top':header_h})}
if($('#jobs-google-maps').is('.fix-map')){$('#jobs-google-maps').css({'top':header_top_h,'height':'calc(100vh - '+header_top_h+'px)'});$('#apus-main-content').css({'padding-top':header_main_content_h})}
$('.offcanvas-filter-sidebar .filter-scroll, .layout-type-fullwidth .filter-sidebar').perfectScrollbar()},searchAjaxInit:function(){if($.isFunction($.fn.typeahead)){$('.apus-autocompleate-input').each(function(){var $this=$(this);$this.typeahead({'hint':!0,'highlight':!0,'minLength':2,'limit':10},{name:'search',source:function(query,processSync,processAsync){processSync([superio_job_opts.empty_msg]);$this.closest('.twitter-typeahead').addClass('loading');var values={};$.each($this.closest('form').serializeArray(),function(i,field){values[field.name]=field.value});return $.ajax({url:wp_job_board_pro_opts.ajaxurl_endpoint.toString().replace('%%endpoint%%','superio_autocomplete_search_jobs'),type:'GET',data:{'search':query,'data':values},dataType:'json',success:function(json){$this.closest('.twitter-typeahead').removeClass('loading');$this.closest('.has-suggestion').removeClass('active');return processAsync(json)}})},templates:{empty:['<div class="empty-message">',superio_job_opts.empty_msg,'</div>'].join('\n'),suggestion:function(data){return'<a href="'+data.url+'" class="media autocompleate-media">\
                                    <div class="media-left media-middle">\
                                        <img src="'+data.image+'" class="media-object" height="50" width="50">\
                                    </div>\
                                    <div class="media-body media-middle">\
                                        <h4>'+data.title+'</h4>\
                                        '+data.salary+'\
                                    </div></a>'}},});$this.on('typeahead:selected',function(e,data){e.preventDefault();setTimeout(function(){$('.apus-autocompleate-input').val(data.title)},5);return!1})})}},listingDetail:function(){var self=this;$(document).on('click','.add-a-review',function(e){e.preventDefault();var $id=$(this).attr('href');if($($id).length>0){$('html,body').animate({scrollTop:$($id).offset().top-100},1000)}})},listingBtnFilter:function(){$('.btn-view-map').on('click',function(e){e.preventDefault();$('#jobs-google-maps').removeClass('hidden-sm').removeClass('hidden-xs');$('.content-listing .jobs-listing-wrapper').addClass('hidden-sm').addClass('hidden-xs');$('.content-listing .candidates-listing-wrapper').addClass('hidden-sm').addClass('hidden-xs');$('.content-listing').addClass('no-padding');$('.btn-view-listing').removeClass('hidden-sm').removeClass('hidden-xs');$(this).addClass('hidden-sm').addClass('hidden-xs');$('.jobs-pagination-wrapper').addClass('p-fix-pagination');$('.candidates-pagination-wrapper').addClass('p-fix-pagination');setTimeout(function(){$(window).trigger('pxg:refreshmap')})});$('.btn-view-listing').on('click',function(e){e.preventDefault();$('#jobs-google-maps').addClass('hidden-sm').addClass('hidden-xs');$('.content-listing .jobs-listing-wrapper').removeClass('hidden-sm').removeClass('hidden-xs');$('.content-listing .candidates-listing-wrapper').removeClass('hidden-sm').removeClass('hidden-xs');$('.content-listing').removeClass('no-padding');$('.btn-view-map').removeClass('hidden-sm').removeClass('hidden-xs');$(this).addClass('hidden-sm').addClass('hidden-xs');$('.jobs-pagination-wrapper').removeClass('p-fix-pagination');$('.candidates-pagination-wrapper').removeClass('p-fix-pagination')});$(document).on('click','.show-filter-jobs, .filter-in-sidebar',function(){$('.offcanvas-filter-sidebar').toggleClass('active');$('.offcanvas-filter-sidebar + .over-dark').toggleClass('active')});$(document).on('click','.offcanvas-filter-sidebar + .over-dark',function(){$('.offcanvas-filter-sidebar').removeClass('active');$('.offcanvas-filter-sidebar + .over-dark').removeClass('active')})},userLoginRegister:function(){var self=this;$('.user-login-form, .must-log-in').on('click',function(e){e.preventDefault();if($('.apus-user-login').length){$('.apus-user-login').trigger('click')}});$('.apus-user-login, .apus-user-register').magnificPopup({mainClass:'apus-mfp-zoom-in login-popup',type:'inline',midClick:!0,modal:!0,callbacks:{open:function(){self.layzyLoadImage()}}});$('.meesage-meeting-wrapper').perfectScrollbar();$(".show_hide_password a").on('click',function(event){event.preventDefault();if($(this).siblings('input').attr("type")=="text"){$(this).attr('title',superio_job_opts.show);$(this).siblings('input').attr('type','password');$(this).find('span').addClass("dashicons-hidden");$(this).find('span').removeClass("dashicons-visibility")}else if($(this).siblings('input').attr("type")=="password"){$(this).attr('title',superio_job_opts.hide);$(this).siblings('input').attr('type','text');$(this).find('span').removeClass("dashicons-hidden");$(this).find('span').addClass("dashicons-visibility")}})},filterListingFnc:function(){var self=this;$('body').on('click','.btn-show-filter, .offcanvas-filter-sidebar + .over-dark',function(){$('.offcanvas-filter-sidebar, .offcanvas-filter-sidebar + .over-dark').toggleClass('active');$('.offcanvas-filter-sidebar').perfectScrollbar()});$('body').on('click','.tax-radios-field .form-group-inner ul span.caret-wrapper, .tax-checklist-field .form-group-inner ul span.caret-wrapper',function(){var con=$(this).closest('.list-item');con.find('> ul').slideToggle()});$('form .toggle-field.hide-content .heading-label i').removeClass('fa-angle-down').addClass('fa-angle-up');$('body').on('click','form .toggle-field .heading-label',function(){if($(this).find('i').hasClass('fa-angle-down')){$(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up')}else{$(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down')}
var parent_e=$(this).closest('.form-group');setTimeout(function(){if(parent_e.hasClass('tax-viewmore-field')){var height=parent_e.find('.terms-list').outerHeight();if(height>231){parent_e.addClass('show-more')}}},300)});$('.tax-viewmore-field').each(function(){var height=$(this).find('.terms-list').outerHeight();if(height>231){$(this).addClass('show-more')}});$(document).on('click','.toggle-filter-viewmore',function(){var $this=$(this);var container=$(this).closest('.tax-viewmore-field');if(container.hasClass('show-more')){container.addClass('show-less').removeClass('show-more');$this.find('.text').text(wp_job_board_pro_opts.show_less)}else{container.addClass('show-more').removeClass('show-less');$this.find('.text').text(wp_job_board_pro_opts.show_more)}});if($('input.field-datetimepicker').length>0&&$.isFunction($.fn.datetimepicker)){jQuery.datetimepicker.setLocale(superio_job_opts.lang_code);$('input.field-datetimepicker').datetimepicker({timepicker:!1,'scrollInput':!1,format:'Y/m/d',})}
if($(window).width()>991){$(document).on('click','.layout-type-half-job-details .item-job',function(e){if(self.showJobAjax){return!1}
var $this=$(this);self.loadJobDetail($this)});$(document).on('click','.layout-type-half-job-details .item-job .job-title a',function(e){e.preventDefault();if(self.showJobAjax){return!1}
var $this=$(this).closest('.item-job');self.loadJobDetail($this)})}},loadJobDetail($this){var self=this;$('#job-details-wrapper').addClass('loading');self.showJobAjax=$.ajax({url:wp_job_board_pro_opts.ajaxurl_endpoint.toString().replace('%%endpoint%%','superio_show_job_details'),data:{job_id:$this.attr('data-job_id')},dataType:'json',cache:!1,headers:{'cache-control':'no-cache'},method:'POST',error:function(XMLHttpRequest,textStatus,errorThrown){console.log('Apus: AJAX error - '+errorThrown);$('#job-details-wrapper').removeClass('loading');self.showJobAjax=!1},success:function(response){if(response.status){$('#job-details-wrapper').html(response.html);self.changeHeightJobsDetail();$this.closest('.row-items').find('.item-job').removeClass('active');$this.addClass('active');self.initSlick($('#job-details-wrapper').find('.slick-carousel'));$('#job-details-wrapper').find('.btn-apply-job-email:not(.filled), .btn-apply-job-call:not(.filled)').magnificPopup({mainClass:'apus-mfp-zoom-in apus-mfp-zoom-call-in',type:'inline',midClick:!0});$('#job-details-wrapper').find('.btn-apply-job-email:not(.filled)').magnificPopup({mainClass:'apus-mfp-zoom-in',type:'inline',midClick:!0});if(wp_job_board_pro_opts.recaptcha_enable){setTimeout(function(){var recaptchas=document.getElementsByClassName("ga-recaptcha");for(var i=0;i<recaptchas.length;i++){var recaptcha=recaptchas[i];var sitekey=recaptcha.dataset.sitekey;grecaptcha.render(recaptcha,{'sitekey':sitekey})}},1000)}}
$('#job-details-wrapper').removeClass('loading');self.showJobAjax=!1}})},jobsGetPage:function(pageUrl,isBackButton){var self=this;if(self.filterAjax){return!1}
self.jobsSetCurrentUrl();if(pageUrl){self.jobsShowLoader();pageUrl=pageUrl.replace(/\/?(\?|#|$)/,'/$1');if(!isBackButton){self.setPushState(pageUrl)}
self.filterAjax=$.ajax({url:pageUrl,data:{load_type:'full'},dataType:'html',cache:!1,headers:{'cache-control':'no-cache'},method:'POST',error:function(XMLHttpRequest,textStatus,errorThrown){console.log('Apus: AJAX error - jobsGetPage() - '+errorThrown);self.jobsHideLoader();self.filterAjax=!1},success:function(response){self.jobsUpdateContent(response);self.filterAjax=!1}})}},jobsHideLoader:function(){$('body').find('.main-items-wrapper').removeClass('loading')},jobsShowLoader:function(){$('body').find('.main-items-wrapper').addClass('loading')},setPushState:function(pageUrl){window.history.pushState({apusShop:!0},'',pageUrl)},jobsSetCurrentUrl:function(){var self=this;self.searchAndTagsResetURL=window.location.href},jobsUpdateContent:function(ajaxHTML){var self=this,$ajaxHTML=$('<div>'+ajaxHTML+'</div>');var $jobs=$ajaxHTML.find('.main-items-wrapper'),$pagination=$ajaxHTML.find('.main-pagination-wrapper');if($jobs.length){$('.main-items-wrapper').replaceWith($jobs)}
if($pagination.length){$('.main-pagination-wrapper').replaceWith($pagination)}
self.layzyLoadImage();if($('.ajax-pagination').length){self.infloadScroll=!1;self.ajaxPaginationLoad()}
if($.isFunction($.fn.select2)&&typeof wp_job_board_pro_select2_opts!=='undefined'){var select2_args=wp_job_board_pro_select2_opts;select2_args.allowClear=!1;select2_args.minimumResultsForSearch=10;select2_args.language={noResults:function(params){return select2_args.language_result}}
select2_args.minimumResultsForSearch=10;select2_args.width='auto';$('select.orderby').select2(select2_args);$('select[name=jobs_ppp]').select2(select2_args);$('select[name=candidates_ppp]').select2(select2_args);$('select[name=employers_ppp]').select2(select2_args)}
$('.main-items-wrapper').find('.btn-apply-job-email:not(.filled), .btn-apply-job-call:not(.filled)').magnificPopup({mainClass:'apus-mfp-zoom-in apus-mfp-zoom-call-in',type:'inline',midClick:!0});$('.main-items-wrapper').find('.btn-apply-job-email:not(.filled)').magnificPopup({mainClass:'apus-mfp-zoom-in',type:'inline',midClick:!0});if(wp_job_board_pro_opts.recaptcha_enable){setTimeout(function(){var recaptchas=document.getElementsByClassName("ga-recaptcha");for(var i=0;i<recaptchas.length;i++){var recaptcha=recaptchas[i];var sitekey=recaptcha.dataset.sitekey;grecaptcha.render(recaptcha,{'sitekey':sitekey})}},1000)}
self.initSlick($('.main-items-wrapper').find('.slick-carousel'));self.updateMakerCards();setTimeout(function(){self.jobsHideLoader()},100)},ajaxPaginationLoad:function(){var self=this,$infloadControls=$('body').find('.ajax-pagination'),nextPageUrl;self.infloadScroll=($infloadControls.hasClass('infinite-action'))?!0:!1;if(self.infloadScroll){self.infscrollLock=!1;var pxFromWindowBottomToBottom,pxFromMenuToBottom=Math.round($(document).height()-$infloadControls.offset().top);var to=null;$(window).resize(function(){if(to){clearTimeout(to)}
to=setTimeout(function(){var $infloadControls=$('.ajax-pagination');pxFromMenuToBottom=Math.round($(document).height()-$infloadControls.offset().top)},100)});$(window).scroll(function(){if(self.infscrollLock){return}
pxFromWindowBottomToBottom=0+$(document).height()-($(window).scrollTop())-$(window).height();if(pxFromWindowBottomToBottom<pxFromMenuToBottom){self.ajaxPaginationGet()}})}else{var $productsWrap=$('body');$productsWrap.on('click','.main-pagination-wrapper .apus-loadmore-btn',function(e){e.preventDefault();self.ajaxPaginationGet()})}
if(self.infloadScroll){$(window).trigger('scroll')}},ajaxPaginationGet:function(){var self=this;if(self.filterAjax)return!1;var $nextPageLink=$('.apus-pagination-next-link').find('a'),$infloadControls=$('.ajax-pagination'),nextPageUrl=$nextPageLink.attr('href');if(nextPageUrl){$infloadControls.addClass('apus-loader');self.filterAjax=$.ajax({url:nextPageUrl,data:{load_type:'items'},dataType:'html',cache:!1,headers:{'cache-control':'no-cache'},method:'GET',error:function(XMLHttpRequest,textStatus,errorThrown){console.log('APUS: AJAX error - ajaxPaginationGet() - '+errorThrown)},complete:function(){$infloadControls.removeClass('apus-loader')},success:function(response){var $response=$('<div>'+response+'</div>'),$gridItemElement=$('.items-wrapper',$response).html(),$resultCount=$('.results-count .last',$response).html(),$display_mode=$('.main-items-wrapper').data('display_mode');$('.main-items-wrapper .items-wrapper .row').append($gridItemElement);$('.main-items-wrapper .results-count .last').html($resultCount);self.updateMakerCards(response);self.layzyLoadImage();nextPageUrl=$response.find('.apus-pagination-next-link').children('a').attr('href');if(nextPageUrl){$nextPageLink.attr('href',nextPageUrl)}else{$('.main-items-wrapper').addClass('all-jobs-loaded');if(self.infloadScroll){self.infscrollLock=!0}
$infloadControls.find('.apus-loadmore-btn').addClass('hidden');$nextPageLink.removeAttr('href')}
self.filterAjax=!1;if(self.infloadScroll){$(window).trigger('scroll')}}})}else{if(self.infloadScroll){self.infscrollLock=!0}}},addCommas:function(str){var parts=(str+"").split("."),main=parts[0],len=main.length,output="",first=main.charAt(0),i;if(first==='-'){main=main.slice(1);len=main.length}else{first=""}
i=len-1;while(i>=0){output=main.charAt(i)+output;if((len-i)%3===0&&i>0){output=wp_job_board_pro_opts.money_thousands_separator+output}
--i}
output=first+output;if(parts.length>1){output+=wp_job_board_pro_opts.money_dec_point+parts[1]}
return output}});$.apusThemeExtensions.job=$.apusThemeCore.job_init})(jQuery)