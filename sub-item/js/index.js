function g (selector) {
	var method = selector.substr(0,1) == '.' ? 'getElementsByClassName': 'getElementById';
	return document[method](selector.substr(1))
}
//随机函数，支持取值范围（包括负数），random([min,max]);
function random (range) {
	var max = Math.max( range[0],range[1] );
	var min = Math.min( range[0],range[1] );
	//差值
	var diff = max-min;
	var number = Math.ceil((Math.random()*diff + min));
	return number;
}
//输出照片
var data = data;
function addPhotos(){
   var template = g('#mainwrap').innerHTML;
	var html = [];
	var nav=[];
	for (var s = 0;s<data.length;s++) {
		var _html = template 
						.replace('{{index}}',s)
						.replace('{{img}}',data[s].img)
						.replace('{{caption}}',data[s].caption)
						.replace('{{desc}}',data[s].desc);
		html.push(_html);
		
		nav.push('<span id="nav_'+ s +'" onclick="turn(g(\'#photo_'+ s +'\'))" class="i">&nbsp;</span>');
	}
	html.push('<div class="nav">'+nav.join('')+'</div>"')
	
	g('#mainwrap').innerHTML = html.join('');
	
	rsort( random([0,data.length]));
}
addPhotos();

//计算切分范围
function range () {
	var range = { left:{x:[],y:[]},right:{x:[],y:[]}};
	
	var wrap ={
		w:g('#mainwrap').clientWidth,
		h:g('#mainwrap').clientHeight
	}
	var photo ={
		w:g('.photo')[0].clientWidth,
		h:g('.photo')[0].clientHeight
	}
	range.wrap = wrap;
	range.photo = photo;
	
	range.left.x = [0-photo.w, wrap.w/2-photo.w/2 ];
	range.left.y = [0-photo.h, wrap.h ];
	
	range.right.x = [wrap.w/2 + photo.w/2 , wrap.w+photo.w];
	range.right.y = [0-photo.h, wrap.h ];
	
	return range;
}
//给照片排序
function rsort (n) {
	
	var _photo = g('.photo');
	var photos = [];
	for (s in data) {
		_photo[s].className = _photo[s].className.replace(/\s*photo_center\s*/,' ');
		_photo[s].className = _photo[s].className.replace(/\s*photo_front\s*/,' ');
		_photo[s].className = _photo[s].className.replace(/\s*photo_back\s*/,' ');00
		_photo[s].className += ' photo_front';
		_photo[s].style.left='';
		_photo[s].style.top='';
		
		_photo[s].style['-webkit-transform']='rotate(360deg) scale(1.3)';
		photos.push(_photo[s]);
	}
	
	var photo_center = g('#photo_'+n);
	photo_center .className += ' photo_center ';
	photo_center = photos.splice(n,1)[0];
	
	//切分
	var phptos_left = photos.splice(0,Math.ceil(photos.length/2));
	var phptos_right = photos;
	
	var ranges = range();
	for (s in phptos_left) {
		var photo = phptos_left[s];
		photo.style.left = random(ranges.left.x)+'px';
		photo.style.top  = random(ranges.left.y)+'px';	
		
		photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
	}
	for (s in phptos_right) {
		var photo = phptos_right[s];
		photo.style.left = random(ranges.right.x)+'px';
		photo.style.top  = random(ranges.right.y)+'px';
		photo.style['-webkit-transform'] = 'rotate('+random([-150,150])+'deg) scale(1)';
	}
	
	//处理控制按钮
	var navs = g('.i');
	for (var i = 0; i < navs.length; i++) {
		navs[i].className = navs[i].className.replace(/\s*i_current\s*/,' ');
		navs[i].className = navs[i].className.replace(/\s*i_back\s*/,' ');
	}
	g('#nav_'+n).className  +=' i_current ';
	
	
} 
//翻面控制
function turn (elem) {
	var cls = elem.className;
	var n = elem.id.split('_')[1];
	if (!/photo_center/.test(cls)) {
		return rsort(n);
	}
	
	if(/photo_front/.test(cls)){
		cls = cls.replace(/photo_front/,'photo_back');
		g('#nav_'+n).className += ' i_back ';
	}else{
		cls = cls.replace(/photo_back/,'photo_front');
		g('#nav_'+n).className = g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
	}
	return elem.className = cls;
}
