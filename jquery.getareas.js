/**
 * 省市区级联插件
 * @param  {object} 初始化参数
 *         elem：省市html代码的父元素
 *         update：是否为更新，为true时回默认选中地区
 *         pro_id:省id
 *         city_id:市id
 *         county_id:区县id
 * @return {object}  jQuery Object
 */
	(function($){
		$.fn.getAreas = function( options ) {
			var defaults = {
				elem:'#area',
				update:false,
				pro_id:'',
				city_id:'',
				county_id:''
			};
			var options = $.extend(defaults, options);		
           	return this.each(function() {
           		var o = options;
           		function init(){
					var selStr='<select class="d_province" name="d_province" id="d_province"></select><select class="d_city" name="d_city" id="d_city"><option value="">请选择城市</option></select><select class="d_zone" name="d_zone" id="d_zone"><option value="">请选择地区</option></select>';
					$(options.elem).html(selStr);
				}
           		function tplFun(elem,params,deep) {
					var pros='';
					var deep=deep || 1;
					$.getJSON(
						'getAreas.php',params,function(res){
							if(params.area_deeppath==3){
								pros+='<option value="">不限</option>';
							}
							$.each(res,function(i,p){
								pros+='<option value="'+p.area_id+'"';
								if(p.area_id==params.area_id) {
									pros+=' selected="selected" ';
								}
								pros+='>'+p.area_name+'</option>';
							});
							$("select[name='"+elem+"']").html(pros);
							if(deep==2){
								$("select[name='d_city']").change();
							}
						}
					);					
				};
				init();
           		tplFun('d_province',{act:'getProvince',area_id:o.pro_id});
           		if(o.update){
           			tplFun('d_city',{act:'getCity',parentId:o.pro_id,area_deeppath:2,area_id:o.city_id});
           			tplFun('d_zone',{act:'getCity',parentId:o.city_id,area_deeppath:3,area_id:o.county_id});
           		}
           		$("select[name='d_province']").change(function(){
					tplFun('d_city',{act:'getCity',parentId:$(this).val(),area_deeppath:2,area_id:o.city_id},2);
				});
				$("select[name='d_city']").bind('change',function(){
					var pid = $(this).val();
					tplFun('d_zone',{act:'getCity',parentId:pid,area_deeppath:3,area_id:o.county_id});
				});
           });
		}
	})( jQuery );