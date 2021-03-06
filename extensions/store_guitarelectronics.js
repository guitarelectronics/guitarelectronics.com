/* **************************************************************

   Copyright 2013 Zoovy, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

************************************************************** */



//    !!! ->   TODO: replace 'username' in the line below with the merchants username.     <- !!!

var store_guitarelectronics = function() {
	var theseTemplates = new Array('');
	var r = {


////////////////////////////////////   CALLBACKS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



	callbacks : {
//executed when extension is loaded. should include any validation that needs to occur.
		init : {
			onSuccess : function()	{
				var r = false; //return false if extension won't load for some reason (account config, dependencies, etc).
				
				app.rq.push(['templateFunction', 'categoryTemplate','onCompletes',function(P) {
					var $context = $(app.u.jqSelector('#',P.parentID));		
					$('#sidebarRight').show();
					$('.contentArea').css({"width":"800px","margin":"0px 0px 0px 5px"});
				}]);

				app.rq.push(['templateFunction', 'productTemplate','onCompletes',function(P) {
					var $context = $(app.u.jqSelector('#',P.parentID));		
					$('#sidebarRight').show();
					$('.contentArea').css({"width":"800px","margin":"0px 0px 0px 5px"});
				}]);
				
				app.rq.push(['templateFunction', 'searchTemplate','onCompletes',function(P) {
					var $context = $(app.u.jqSelector('#',P.parentID));		
					$('#sidebarRight').show();
					$('.contentArea').css({"width":"800px","margin":"0px 0px 0px 5px"});
				}]);
				
				app.rq.push(['templateFunction', 'homepageTemplate','onCompletes',function(P) {
					var $context = $(app.u.jqSelector('#',P.parentID));	
					$('#sidebarRight').hide();
					$('.contentArea').css({"width":"962px"});
				}]);
				
				app.rq.push(['templateFunction', 'checkoutTemplate','onCompletes',function(P) {
					var $context = $(app.u.jqSelector('#',P.parentID));	
					$('#sidebarRight').hide();
					$('.contentArea').css({"width":"962px"});
					$('.footerButtons').hide();
				}]);
				
				app.rq.push(['templateFunction', 'checkoutTemplate','onDeparts',function(P) {
					$('.footerButtons').show();
				}]);
				
				app.rq.push(['templateFunction', 'companyTemplate','onCompletes',function(P) {
					var $context = $(app.u.jqSelector('#',P.parentID));	
					$('#sidebarRight').hide();
					$('.contentArea').css({"width":"962px"});
				}]);
				
				app.rq.push(['templateFunction', 'customerTemplate','onCompletes',function(P) {
					var $context = $(app.u.jqSelector('#',P.parentID));	
					$('#sidebarRight').hide();
					$('.contentArea').css({"width":"962px"});
				}]);
				
				
				//if there is any functionality required for this extension to load, put it here. such as a check for async google, the FB object, etc. return false if dependencies are not present. don't check for other extensions.
				r = true;

				return r;
			
				},
			onError : function()	{
//errors will get reported for this callback as part of the extensions loading.  This is here for extra error handling purposes.
//you may or may not need it.
				app.u.dump('BEGIN admin_orders.callbacks.init.onError');
				}
			}
		}, //callbacks



////////////////////////////////////   ACTION    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//actions are functions triggered by a user interaction, such as a click/tap.
//these are going the way of the do do, in favor of app events. new extensions should have few (if any) actions.
		a : {
			showDropDown : function ($tag) {
				//app.u.dump('showing');
				//console.log($tag.data('timeoutNoShow'));
				if(!$tag.data('timeoutNoShow') || $tag.data('timeoutNoShow')=== "false") {
					var $dropdown = $(".dropdown", $tag);
					var $hoverouts = $(".hoverout", $tag);
					var height = 0;
					$dropdown.show();
					if($dropdown.data('width')){
						$dropdown.css("width",$dropdown.data('width'));
					}
					$hoverouts.each(function(){
						$(this).css('left',$dropdown.outerWidth()-6);
						});
					if($dropdown.data('height')){
						height = $dropdown.data('height');
					} else{
						$dropdown.children().each(function(){
							height += $(this).outerHeight();
						});
					}
					if($tag.data('timeout') && $tag.data('timeout')!== "false"){
						clearTimeout($tag.data('timeout'));
						$tag.data('timeout','false');
					}
					$dropdown.stop().animate({"height":height+"px"}, 500);
					return true;
				}
				return false;
			},
			

			hideDropDown : function ($tag) {
				//app.u.dump('hiding');
				$(".dropdown", $tag).stop().animate({"height":"0px"}, 500);
				if($tag.data('timeout') && $tag.data('timeout')!== "false"){
				$tag.data('timeout')
				$tag.data('timeout','false');
				}
				$tag.data('timeout',setTimeout(function(){$(".dropdown", $tag).hide();},500));
				return true;
			},

			hideDropDownOnSelect : function($tag){
				this.hideDropDown($tag);
				$tag.data('timeoutNoShow', setTimeout(function(){$tag.data('timeoutNoShow', 'false');}, 500));
				},
				
			reviewScroll : function(name, type, $parent) {
				var type = type == 'class' ? '.' : '#'; //is the element a class or an id
				 
				$('html,body').animate({ scrollTop: $(type + name,$parent).offset().top }, 'slow'); //scroll to it
				}
		
			}, //Actions

////////////////////////////////////   RENDERFORMATS    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//renderFormats are what is used to actually output data.
//on a data-bind, format: is equal to a renderformat. extension: tells the rendering engine where to look for the renderFormat.
//that way, two render formats named the same (but in different extensions) don't overwrite each other.
		renderFormats : {
			shipInfoMiniCart : function($tag,data)	{
				$tag.empty();
				var o = '';
//				app.u.dump('BEGIN app.renderFormats.shipInfo. (formats shipping for minicart)');
//				app.u.dump(data);
				var L = app.data.cartDetail['@SHIPMETHODS'].length;
				for(var i = 0; i < L; i += 1)	{
//					app.u.dump(' -> method '+i+' = '+app.data.cartShippingMethods['@methods'][i].id);
					if(app.data.cartDetail['@SHIPMETHODS'][i].id == data.value)	{
						var pretty = app.u.isSet(app.data.cartDetail['@SHIPMETHODS'][i]['pretty']) ? app.data.cartDetail['@SHIPMETHODS'][i]['pretty'] : app.data.cartDetail['@SHIPMETHODS'][i]['name'];  //sometimes pretty isn't set. also, ie didn't like .pretty, but worked fine once ['pretty'] was used.

//only show amount if not blank.
// * 201324 -> bug fix: amount not showing up if zero. feature: support for zeroText for zero amounts (ex: zeroText: Free!;)
						if(Number(app.data.cartDetail['@SHIPMETHODS'][i].amount) >= 0)	{
							o += "<span class='orderShipAmount'>";
							o += (data.bindData.zeroText) ? data.bindData.zeroText : app.u.formatMoney(app.data.cartDetail['@SHIPMETHODS'][i].amount,' $',2,false);
							o += "<\/span>"
							}
						else	{} //amount is undefined.
						break; //once we hit a match, no need to continue. at this time, only one ship method/price is available.
						}
					}
				$tag.html(o);
				},
			checkIfLoggedOut : function($tag, data){
				if(app.u.buyerIsAuthenticated()){
					//do nothing
					}
				else {
					$tag.prop('checked',true);
					}
				}
			}, //renderFormats
////////////////////////////////////   UTIL [u]   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//utilities are typically functions that are exected by an event or action.
//any functions that are recycled should be here.
		u : {
			updateSideBarMiniCart : function(){
				var ts = app.data.cartDetail.ts;
				var $miniCart = $('#miniCart');
				if(!$miniCart.data('ts') || ts > $miniCart.data('ts')){
					$miniCart.empty().data('ts',ts).anycontent({'templateID':'miniCartTemplate','datapointer':'cartDetail'});
					}
				}
			}, //u [utilities]

//app-events are added to an element through data-app-event="extensionName|functionName"
//right now, these are not fully supported, but they will be going forward. 
//they're used heavily in the admin.html file.
//while no naming convention is stricly forced, 
//when adding an event, be sure to do off('click.appEventName') and then on('click.appEventName') to ensure the same event is not double-added if app events were to get run again over the same template.
		e : {
			} //e [app Events]
		} //r object.
	return r;
	}