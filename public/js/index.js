


let ketqua = document.getElementById('ketqua');

let end = false;

let doi_phep_tinh = false;

let phep_tinh_cu = '';

let uu_tien = 0;

let mang_so_max_index = 0;
let mang_so = new Array();

let mang_pt_max_index = 0;
let mang_pt = new Array();

let str_ketqua = '';

let phim_moi = '';

function ClickButton(object){
	
	if(end){
		ketqua.value = '';
		end = false;
	}
	
	if(str_ketqua=='' && phim_moi == ''){
		str_ketqua = ketqua.value;
	}
	if(str_ketqua=='0'){
		str_ketqua = '';
	}
	
	let type = object.innerHTML;
	
	if(	type=='0' ||type=='1' || type=='2' || type=='3' || type=='4' || type=='5' || type=='6' || type=='7' || type=='8' || type=='9' || type=='+/-' || type=='.')
	{
        doi_phep_tinh = false;
		phim_moi += type;
		ketqua.value = str_ketqua + phim_moi;
	}
	else if(type=='+' || type=='-' || type=='x' || type=='/')
	{
		if(doi_phep_tinh){

			if((phep_tinh_cu=='x' || phep_tinh_cu == '/') && (type == '+' || type == '-')){
				uu_tien--;
			}
			else if((phep_tinh_cu=='+' || phep_tinh_cu == '-') && (type == 'x' || type == '/')){
				uu_tien++;
			}
			
			mang_pt[mang_pt_max_index-1] = type;
			ketqua.value = ketqua.value.substring(0,ketqua.value.length-1) + type;			
		}
		else{
			phep_tinh_cu = type;
			
			mang_so[mang_so_max_index] = parseFloat(phim_moi);		
			mang_so_max_index++;						
			
			mang_pt[mang_pt_max_index] = type;		
			mang_pt_max_index++;
			
			ketqua.value = ketqua.value + type;
			
			if(type=='x' || type == '/'){
				uu_tien++;
			}
		}
		doi_phep_tinh = true;
		str_ketqua = '';
		phim_moi = '';
	}
	else if(type == '=' || type == '%')
	{		
		end	= true;
		if(phim_moi!=''){
			mang_so[mang_so_max_index] = parseFloat(phim_moi);
		}
		if(type == '='){			
			GetValue();
		}
		else
		{
			GetPercent();
		}	
		
		str_ketqua = '';
		phim_moi = '';
		mang_so = new Array();
		mang_pt = new Array();
		mang_pt_max_index = 0;
		mang_so_max_index = 0;	
		uu_tien = 0;
	}

	else if(type == 'CE'){
		phim_moi = '';
		
		ketqua.value = str_ketqua + phim_moi;
	}
	
	else
	{
		if(phim_moi.length > 1){
			phim_moi = phim_moi.substring(0, phim_moi.length-1);
		}else{
			phim_moi = '';
		}

		ketqua.value = str_ketqua + phim_moi;
	}	
}


function GetPercent(){
	mang_pt_max_index--;
	
	if(mang_so_max_index!=1 || mang_so[1]==0){
		ketqua.value = "0";
	}
	
	else if(mang_pt_max_index!=0){
		ketqua.value = "0";
	}
	
	else if(mang_pt[0] != '/'){
		ketqua.value = "0";
	}

	else{
		let _kq = mang_so[0] / mang_so[1] * 100;
		ketqua.value = _kq;
	}
	
	
}


function GetValue(){
	mang_pt_max_index--;	
	
	
	while(uu_tien>0){
		for(let i = 0 ; i <= mang_pt_max_index; i ++){
			if(mang_pt[i]=='x' || mang_pt[i]=='/'){
				
				let sh1 = mang_so[i];
				let sh2 = mang_so[i+1];
				
				let kqt = 0;
				if(mang_pt[i]=='x'){
					kqt = sh1 *  sh2;
				} 
				else if(sh2==0)
				{
					ketqua.value = "0";
				}
				else
				{
					kqt = sh1 /  sh2;
				}
				
				mang_so[i] = kqt;
			
				for(let new_index = i + 1 ; new_index < mang_so_max_index ; new_index++){
					mang_so[new_index] = mang_so[new_index+1];					
				}
				mang_so_max_index--;
				
				for(let new_index = i ; new_index < mang_pt_max_index ; new_index++){
					mang_pt[new_index] = mang_pt[new_index+1];					
				}
				mang_pt_max_index--;	
				
				uu_tien--;
																	
				break;
			}
		}
	}
	

	while(mang_so_max_index>0){
		
		let sh1 = mang_so[0];
		let sh2 = mang_so[1];
		
		let kqt = 0;
		if(mang_pt[0]=='+'){
			kqt = sh1 + sh2;
		}else{
			kqt = sh1 - sh2;
		}
	
		mang_so[0] = kqt;
		
		for(let new_index = 1 ; new_index < mang_so_max_index ; new_index++){
			mang_so[new_index] = mang_so[new_index+1];					
		}
		mang_so_max_index--;
		
		for(let new_index = 0 ; new_index < mang_pt_max_index ; new_index++){
			mang_pt[new_index] = mang_pt[new_index+1];					
		}
		mang_pt_max_index--;
	}
	
	ketqua.value = mang_so[0];
}
