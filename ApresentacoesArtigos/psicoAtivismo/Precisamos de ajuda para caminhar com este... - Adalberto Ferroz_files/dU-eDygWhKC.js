/*!CK:950019588!*//*1418086538,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["aXToZ"]); }

__d("InstanceProxy",[],function(a,b,c,d,e,f){function g(h){"use strict";this.$InstanceProxy0=h;}g.prototype.getInstance=function(){"use strict";return this.$InstanceProxy0;};e.exports=g;},null);
__d("CensorLogger",["Event","Banzai","DOM","debounce","ge","Keys"],function(a,b,c,d,e,f,g,h,i,j,k){var l=10*60*1000,m=b('Keys').RETURN,n=function(q){var r=(q.target||q.srcElement).id,s=(q.target||q.srcElement).value.trim().length,t=o.tracker(r);if(!t)return;if(s>5&&!t.submitted){if(t.type=='comment'&&t.parent_fbid=='unknown'){if(!o.syncTrackerWithForm(r))o.snowliftSync(r);t=o.tracker(r);}h.post('censorlogger',{impid:t.impid,clearcounter:t.clearcounter,instrument:t.type,elementid:r,parent_fbid:(t.parent_fbid=='unknown'?null:t.parent_fbid),version:"original"},h.VITAL);o.setSubmitted(r,true);}else if(s===0&&t.submitted&&q.which!=m){o.debouncers[r]=p(r);o.debouncers[r]();}else if(s>0&&t.submitted)if(o.debouncers[r])o.debouncers[r].reset();},o={init:function(q){this.impressionID=q;for(var r in this.trackedElements)if(!k(r))this.stopTracking(r);for(var s in this.unmatchedForms)if(!k(s))delete this.unmatchedForms[s];},trackElement:function(q,r,s){var t,u,v;this.debouncers=this.debouncers||{};this.trackedElements=this.trackedElements||{};this.unmatchedForms=this.unmatchedForms||{};r=r.toLowerCase();if(r=='composer'){t=(s?i.find(q,'div.uiMetaComposerMessageBox textarea.input'):i.find(q,'div.uiComposerMessageBox textarea.input'));u=i.find(q,'form.attachmentForm');var w=i.scry(q,'input[name="xhpc_targetid"]')[0];if(w)v=w.value;}else if(r=='comment')t=i.find(q,'div.commentBox textarea.textInput');if(t==null)return;var x=i.getID(t);if(u)this.addJoinTableInfoToForm(u,i.getID(t));g.listen(t,'keyup',n.bind(this));this.trackedElements[x]={submitted:false,clearcounter:0,type:r,impid:this.impressionID,parent_fbid:v||'unknown',formID:(u?i.getID(u):null)};if(r=='comment')this.syncTrackerWithForm(x);},registerForm:function(q,r){this.unmatchedForms=this.unmatchedForms||{};this.unmatchedForms[q]=r;},syncTrackerWithForm:function(q){for(var r in this.unmatchedForms){var s=k(r);if(s){var t=i.scry(s,'div.commentBox textarea.textInput')[0];if(t){var u=i.getID(t);if(u&&u==q){this.trackedElements[q].parent_fbid=this.unmatchedForms[r];this.trackedElements[q].formID=r;this.addJoinTableInfoToForm(s,q);delete this.unmatchedForms[r];return true;}}}}return false;},snowliftSync:function(q){var r,s=k(q);if(s&&(r=i.scry(s,'^.fbPhotosSnowboxFeedbackInput')[0])){var t=i.find(r,'input[name="feedback_params"]'),u=JSON.parse(t.value).target_fbid;this.trackedElements[q].parent_fbid=u;this.trackedElements[q].formID=r.id;this.addJoinTableInfoToForm(r,q);return true;}return false;},stopTracking:function(q){delete this.trackedElements[q];if(this.debouncers[q]){this.debouncers[q].reset();delete this.debouncers[q];}},tracker:function(q){return this.trackedElements[q];},getSubmitted:function(q){return (this.trackedElements[q]?this.trackedElements[q].submitted:false);},setSubmitted:function(q,r){if(this.trackedElements[q])this.trackedElements[q].submitted=r;},incrementClearCounter:function(q){if(!this.tracker(q))return;this.trackedElements[q].clearcounter++;this.trackedElements[q].submitted=false;var r=i.scry(k(this.trackedElements[q].formID),'input[name="clp"]')[0];if(r)r.value=JSON.stringify({censorlogger_impid:this.trackedElements[q].impid,clearcounter:this.trackedElements[q].clearcounter,element_id:q});},addJoinTableInfoToForm:function(q,r){i.prependContent(q,i.create('input',{type:'hidden',name:'clp',value:JSON.stringify({censorlogger_impid:this.impressionID,clearcounter:0,element_id:r,version:"original"})}));}},p=function(q){return j(function(){o.incrementClearCounter(q);},l,o);};e.exports=o;},null);
__d("UFIOrderingModeSelector.react",["InlineBlock.react","Link.react","LoadingIndicator.react","React","Image.react","ReactXUIMenu","PopoverMenu.react","cx","ix"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p=l.SelectableMenu,q=l.SelectableItem,r=j.createClass({displayName:"UFIOrderingModeSelector",propTypes:{currentOrderingMode:j.PropTypes.string,onOrderChanged:j.PropTypes.func,orderingmodes:j.PropTypes.array.isRequired},getInitialState:function(){var s=null;this.props.orderingmodes.map(function(t){if(t.selected)s=t;});return {selectedMode:s};},onMenuItemClick:function(s,t){var u=t.item.getValue();this.props.orderingmodes.map(function(v){if(v.value===u)this.setState({selectedMode:v});}.bind(this));this.props.onOrderChanged(u);},render:function(){var s=null;if(this.props.currentOrderingMode!=this.state.selectedMode.value)s=j.createElement(i,{className:"UFIOrderingModeSelectorLoading",color:"white",size:"small"});var t=j.createElement(p,{onItemClick:this.onMenuItemClick},this.props.orderingmodes.map(function(u){return (j.createElement(q,{key:u.value,value:u.value,selected:u.value===this.state.selectedMode.value},u.name));}.bind(this)));return (j.createElement("div",{className:"UFIOrderingModeSelector"},s,j.createElement(g,null,j.createElement(m,{className:"UFIOrderingModeSelectorPopover",menu:t,alignh:"right"},j.createElement(h,null,this.state.selectedMode.name,j.createElement(k,{className:"UFIOrderingModeSelectorDownCaret",src:o('/images/ui/xhp/link/more/down_caret.gif')}))))));}});e.exports=r;},null);
__d("legacy:ScrollAwareDOM",["ScrollAwareDOM"],function(a,b,c,d){a.ScrollAwareDOM=b('ScrollAwareDOM');},3);
__d("XPubcontentInlinePhotoPivotsEventsControllerURIBuilder",["XControllerURIBuilder"],function(a,b,c,d,e,f){e.exports=b("XControllerURIBuilder").create("\/pubcontent\/inline_photo_pivots_chaining\/events\/",{});},null);
__d("EntstreamAttachmentRelatedShare",["Arbiter","AsyncRequest","AttachmentRelatedShareConstants","csx","cx","CSS","DOM","Event","ge","tidyEvent","XPubcontentInlinePhotoPivotsEventsControllerURIBuilder"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r=2,s=3,t={createRelatedAttachmentDelay:function(u,v,w){var x=null;if(typeof u==="string"){x=o(u);}else x=u;if(!x)return;setTimeout(function(){g.inform(i.ARTICLE_CLICK,{attachment:x,global_share_id:v,is_auto_expand:true,is_right_click:false});},1000);},loadRelatedAttachment:function(u,v,w){var x=null;if(typeof u==="string"){x=o(u);}else x=u;if(!x)return;var y=n.listen(x,'click',function(){y.remove();g.inform(i.ARTICLE_CLICK,{attachment:x,global_share_id:v,is_right_click:false,share_id:w});}),z=n.listen(x,'mousedown',function(event){if(event.which===s||event.button===r){z.remove();g.inform(i.ARTICLE_CLICK,{attachment:x,global_share_id:v,is_right_click:true});}});},loadInlineStoryPivotAttachment:function(u,v){var w=o(u);if(!w)return;var x=n.listen(w,'click',function(){x.remove();g.inform(i.PHOTO_CLICK,{attachment:w,storyid:v});});},loadRelatedGameAttachment:function(u,v){var w=null;if(typeof u==="string"){w=o(u);}else w=u;if(!w)return;p(n.listen(w,'click',function(){g.inform(i.GAME_CLICK,{attachment:w,global_share_id:v});}));p(n.listen(w,'mousedown',function(event){if(event.which===s||event.button===r)g.inform(i.GAME_CLICK,{attachment:w,global_share_id:v});}));},loadRelatedLSCVideoAttachment:function(u,v){var w=null;if(typeof u==='string'){w=o(u);}else w=u;if(!w)return;var x="^div._4-u2",y=m.scry(w,x),z=n.listen(w,'click',function(){z.remove();g.inform(i.VIDEO_CLICK,{attachment:w,global_share_id:v});});},loadRelatedLSCInlineVideoAttachment:function(u,v){var w=null;if(typeof u==='string'){w=o(u);}else w=u;if(!w)return;n.listen(w,'click',function(){var x="^div._4-u2",y="_1d8v",z=m.scry(w,x),aa=z.length===1?z[0]:null,ba=aa.parentNode,ca=ba.previousSibling;while(!ca){ba=ba.parentNode;ca=ba.previousSibling;}if(!l.hasClass(ca,y)){var da=m.create('div',{className:y}),ea=m.insertBefore(aa.parentNode,da),fa=ea.length>=1?ea[0]:null;}else fa=ca;var ga=m.getID(fa);new h().setURI('/ajax/flash/expand_inline.php').setData({share_id:v,target_div:ga,max_width:470,max_height:264,replace_target_div:true,expand_you_tube_video:true}).setMethod('GET').setReadOnly(true).setRelativeTo(w.parentNode).send();});},closeButton:function(u,v){n.listen(u,'click',function(){m.remove(v);});},closeButtonPhotoPivots:function(u,v,w,x){n.listen(u,'click',function(){var y=new q(),z={story_id:w,search_query_type:x,event:'hide'};new h().setMethod('POST').setURI(y.getURI()).setData(z).send();m.remove(v);});},seeAllLinkPhotoPivots:function(u,v,w){n.listen(u,'click',function(){var x=new q(),y={story_id:v,search_query_type:w,event:'see_all'};new h().setMethod('POST').setURI(x.getURI()).setData(y).send();});},loadRelatedVideos:function(u,v,w){var x=o(u);if(!x)return;var y=o(v);if(!y)return;var z={global_share_id:w,attachment_div_id:m.getID(x.parentNode),video_div_id:v},aa=n.listen(y,'click',function(){aa.remove();g.inform(i.VIDEO_CLICK,{attachment:x.parentNode,attachment_div_id:m.getID(x.parentNode),video_div_id:v,global_share_id:w});});},removeOldSuggestions:function(u){var v=o(u);if(!v)return;var w=m.scry(v.parentNode,"._5d73");for(var x=1;x<w.length;x++)m.remove(w[x]);setTimeout(function(){l.show(w[0]);},1000);},showHiddenSuggestions:function(u){var v=n.listen(u,'click',function(){v.remove();var w="^._1ui8",x=m.scry(u,w);if(!x)return;l.hide(x[0]);var y=x[0].previousSibling;while(y){l.show(y);y=y.previousSibling;}});}};e.exports=t;},null);
__d("FeedTrackingAsync",["Arbiter","collectDataAttributes","copyProperties"],function(a,b,c,d,e,f,g,h,i){function j(){g.subscribe('AsyncRequest/send',function(k,l){var m=l.request,n=m.getRelativeTo();if(n){var o=m.getData(),p=h(n,['ft']);if(Object.keys(p.ft).length)i(o,p);}});}e.exports={init:j};},null);
__d("FbFeedCommentUFIScroller",["Arbiter","DOMScroll","containsNode","ge"],function(a,b,c,d,e,f,g,h,i,j){g.subscribe('comment/focus',function(k,l){var m=l.element,n=j('content');if(n&&i(n,m))h.ensureVisible(m,null,60,250);});e.exports={};},null);
__d("Hovercard",["AccessibleLayer","Arbiter","AsyncRequest","ContextualDialog","ContextualDialogXUITheme","ContextualThing","DOM","Event","JSXDOM","LayerAutoFocus","LayerRefocusOnHide","Parent","Style","Vector","clickRefAction","csx","cx","getInlineBoundingRect","fbt","userAction"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z){var aa={},ba={},ca=null,da=null,ea=null,fa=null,ga=150,ha=700,ia=1000,ja=250,ka=50,la=null,ma=null,na=null,oa=null;function pa(event){var fb=r.byTag(event.getTarget(),'a');eb.processNode(fb)&&event.stop();}function qa(fb){da=fb;if(!ra(fb)){var gb;if(!fb||!(gb=sa(fb))||cb(fb)){ba.moveToken&&ba.moveToken.remove();ba={};return false;}if(ba.node!=fb){ba.moveToken&&ba.moveToken.remove();ba={node:fb,endpoint:gb,pos:null};}}return true;}function ra(fb){return fb&&ca&&ba.node==fb;}function sa(fb){return fb.getAttribute('data-hovercard');}function ta(fb){var gb=m.scry(fb,"^._5jmm ._2orz").length;if(gb)return;var hb=n.listen(fb,'mouseleave',function(){clearTimeout(la);clearTimeout(ma);hb.remove();da=null;if(!eb.contains(fb))eb.hide();});if(!ba.moveToken)ba.moveToken=n.listen(fb,'mousemove',function(event){ba.pos=t.getEventPosition(event);});clearTimeout(la);clearTimeout(ma);clearTimeout(oa);var ib=ga,jb=ca?ja:ha;if(fb.getAttribute('data-hovercard-instant'))ib=jb=ka;la=setTimeout(xa.bind(null,fb),ib);ma=setTimeout(ua.bind(null,fb),jb);}function ua(fb,gb){if(ba.node!=fb)return;var hb=aa[sa(fb)];if(hb){wa(hb);}else if(gb){wa(ab());}else{var ib=ca?ja:ha;na=setTimeout(ua.bind(null,fb,true),ia-ib);}}function va(){eb.hide(true);clearTimeout(ma);}function wa(fb){var gb=ba.node,hb=ca,ib=hb!=gb,jb=gb.getAttribute('data-hovercard-position');jb&&fb.setPosition(jb);if(fa){var kb=fa.getContentRoot();if(!l.containsIncludingLayers(kb,gb))fa.hide();}if(!m.contains(document.body,gb)){eb.hide(true);return;}ca=gb;fa=fb;fb.setContextWithBounds(gb,x(gb,ba.pos)).show();if(ib)setTimeout(function(){u('himp',ca,null,'FORCE',{ft:{evt:39}});z('hovercard',ca).uai('show');},0);}function xa(fb){if(fb.id&&aa[fb.id]!=null)return;var gb=sa(fb);if(aa[gb]!=null)return;ya(gb);var hb=function(){eb.dirty(gb);va();};new i(gb).setData({endpoint:gb}).setMethod('GET').setReadOnly(true).setErrorHandler(hb).setTransportErrorHandler(hb).send();}function ya(fb){aa[fb]=false;}function za(fb){var gb=ba.node.getAttribute('data-hovercard-offset-x')||0;fb.setOffsetX(parseInt(gb,10));var hb=ba.node.getAttribute('data-hovercard-offset-y')||0;fb.setOffsetY(parseInt(hb,10));}var ab=function(){if(!ea){ea=new j({width:275,theme:k},o.div({className:"_7lk"},"Loading..."));ea.disableBehavior(g).disableBehavior(p).disableBehavior(q);bb(ea);}var fb=ba.node.getAttribute('data-hovercard-position');ea.setPosition(fb);za(ea);return ea;};function bb(fb){var gb=[fb.subscribe('mouseenter',function(){clearTimeout(oa);da=ba.node;}),fb.subscribe('mouseleave',function(){fb.hide();da=null;}),fb.subscribe('destroy',function(){while(gb.length)gb.pop().unsubscribe();gb=null;})];}function cb(fb){return (r.byClass(fb,"_7lu")!==null);}var db=true,eb={hide:function(fb){if(!ca)return;if(fb){if(fa)fa.hide();da=null;ca=null;fa=null;}else{var gb=ba.node.getAttribute('data-hovercard-instant')?ka:ja;oa=setTimeout(eb.hide.bind(null,true),gb);}},setDialog:function(fb,gb){gb.disableBehavior(g).disableBehavior(p).disableBehavior(q);aa[fb]=gb;bb(gb);if(ba.endpoint==fb&&da==ba.node){ab().hide();za(gb);wa(gb);}},getDialog:function(fb){return aa[fb];},contains:function(fb){if(fa)return l.containsIncludingLayers(fa.getContentRoot(),fb);return false;},dirty:function(fb){var gb=aa[fb];if(gb){gb.destroy();delete aa[fb];}},dirtyAll:function(){for(var fb in aa){var gb=aa[fb];gb&&eb.dirty(fb);}h.inform('Hovercard/dirty');},processNode:function(fb){if(fb&&qa(fb)){ta(fb);return true;}return false;},setDirtyAllOnPageTransition:function(fb){db=fb;},getLoadingDelay:function(){return ia;},getHideDelay:function(){return ja;}};(function(){n.listen(document.documentElement,'mouseover',pa);n.listen(window,'scroll',function(){if(ca&&s.isFixed(ca))eb.hide(true);});h.subscribe('page_transition',function(){va();db&&eb.dirtyAll();},h.SUBSCRIBE_NEW);})();e.exports=eb;},null);