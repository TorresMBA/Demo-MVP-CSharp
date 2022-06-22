function chkdatetime(fecha){
	var cadenadefecha = fecha;

	f=cadenadefecha.search(" ");
	
	if (f>=0){
		pfecha=cadenadefecha.substring(0,f);
		phora=cadenadefecha.substring(f+1,cadenadefecha.length);
		if (phora=="") return false;
   }
	else{
		pfecha=cadenadefecha
		phora = "";		
	}
	
	
   //alert("*" + pfecha + "*"); 
	//alert("*" + phora + "*"); 
	/*** Validamos fecha **********/
	if (pfecha.length>=1 && pfecha.length<5) return false;
	
	if (chkdateValue(pfecha) == false) {
		return false;
	}
	else {
	   if (chkdate2(pfecha) == false) {
		  return false;
	   }
	}
	
	/**** Validamos hora ****/
	if (phora!=""){
		return checkhoraValue(phora);
   }
	
   return true;
}


function convertir_fechatexto_fechamilisegundos(fecha){
	var cadenadefecha = fecha;

	f=cadenadefecha.search("/");
	dia=cadenadefecha.substring(0,f);

	cadenadefecha=cadenadefecha.substring(f+1,cadenadefecha.length);
	f=cadenadefecha.search("/");

	mes_aux=parseFloat(cadenadefecha.substring(0,f))-1;
	mes=mes_aux.toString();

donde=cadenadefecha.search(":");

if (donde<=0){

	anyo_aux2=cadenadefecha.substring(f+1,cadenadefecha.length)

	anyo_aux=parseFloat(anyo_aux2);

	if (anyo_aux<100) anyo_aux=anyo_aux+1900;
	if (anyo_aux>=100 && anyo_aux<2000) anyo_aux=anyo_aux+100;
	anyo=anyo_aux.toString();

	horas="00";
	minutos="00";
	segundos="00";
}
else{
	cadenadefecha=cadenadefecha.substring(f+1,cadenadefecha.length);
	f=cadenadefecha.search(" ");

	anyo_aux2=cadenadefecha.substring(0,f)
	anyo_aux=parseFloat(anyo_aux2);
	if (anyo_aux<100) anyo_aux=anyo_aux+1900;
	if (anyo_aux>=100 && anyo_aux<2000) anyo_aux=anyo_aux+100;
	anyo=anyo_aux.toString();

	cadenadefecha=cadenadefecha.substring(f+1,cadenadefecha.length);
	f=cadenadefecha.search(":");

	horas=cadenadefecha.substring(0,f);

	cadenadefecha=cadenadefecha.substring(f+1,cadenadefecha.length);
	f=cadenadefecha.search(":");

	minutos=cadenadefecha.substring(0,f);

	segundos=cadenadefecha.substring(f+1,cadenadefecha.length);

}


	var fecha_sal=Date.UTC(anyo,mes,dia,horas,minutos,segundos);

	return fecha_sal;
}

// MCA 09/12/04 : Nueva función para convertir una cadena con formato hh:mm:ss en milisegundos
function convertir_horatxt_horams(hora){
	var cadenadehora = hora;
	var fechaactual= new Date();

	var anyo= parseInt(fechaactual.getYear());
	var mes=  parseInt(fechaactual.getMonth());
	var dia=  parseInt(fechaactual.getDay());
	
	f= 		cadenadehora.search(":");

	if (f<=0) {
		horas= parseInt(cadenadehora);
		minutos= 0;
		segundos= 0;
	}
	else {
	
		horas=	parseInt(cadenadehora.substring(0,f));

		cadenadehora=	cadenadehora.substring(f+1,cadenadehora.length);

		f=		cadenadehora.search(":");

		if (f<=0)	{
			minutos= 	parseInt(cadenadehora);
			segundos= 0;
		}
		else	{
			minutos=	parseInt(cadenadehora.substring(0,f));

			segundos=	parseInt(cadenadehora.substring(f+1,cadenadehora.length));
		}
	}
	fechaactual= Date.UTC(anyo,mes,dia,horas,minutos,segundos);

	return fechaactual;
}

function DiferenciaTiempo(fechamayor,fechamenor,que) {


	var ant_fecha=convertir_fechatexto_fechamilisegundos(fechamenor);


	var nuev_fecha=convertir_fechatexto_fechamilisegundos(fechamayor);

	var diferencia = nuev_fecha - ant_fecha;

	var df=new Date(diferencia);


	//los comentarios siguientes es por si queremos que nos digan cuantos dias, horas,minutos y segundos, no por separado
	var diferencia_dias = Math.floor(diferencia/1000/60/60/24);
	//diferencia -= diferencia_dias*1000*60*60*24
	var diferencia_horas = Math.floor(diferencia/1000/60/60);
	//diferencia -= diferencia_horas*1000*60*60
	var diferencia_minutos = Math.floor(diferencia/1000/60);
	//diferencia -= diferencia_minutos*1000*60
	var diferencia_segundos = Math.floor(diferencia/1000);


	if (que=="dias"){
		return diferencia_dias;
	}
	if (que=="horas"){
		return diferencia_horas;
	}
	if (que=="minutos"){
		return diferencia_minutos;
	}
	if (que=="segundos"){
		return diferencia_segundos;
	}
	if (que!="dias" && que!="horas" && que!="minutos" && que!="segundos"){
		return -1;
	}	
}

function checkhora (objName){

   var hora = "";
	var mi   = "";
	var sec  = "";
	var lon    = 0;
	var i;
	var puntos;
	var caracter;
	
	lon = objName.value.length;
	
	if (lon>8 || lon<5) return false;
	if (lon==6) return false;
	 
	i = 0;
	puntos = false;
	
	while(i<lon && !puntos){
	   caracter = objName.value.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			hora = hora + caracter;
		else
			puntos = true;
	}	
	
	if (isNaN(hora)) {
		return false;
	}
	var ihora = parseInt(hora)
	if (ihora<0 || ihora>23) return false;	
	
	puntos = false;
	while(i<lon && !puntos){
	   caracter = objName.value.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			mi = mi + caracter;
		else
			puntos = true;
	}	
	
	if (isNaN(mi)) return false;
	var imin = parseInt(mi);
	if (imin<0 || imin>59) return false;
	
	puntos = false;
	while(i<lon && !puntos){
	   caracter = objName.value.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			sec = sec + caracter;
		else
			puntos = true;
	}		
	
	if (puntos && sec=="") return false;
	
	if (sec>""){
		if (isNaN(sec)) return false;
		var isec = parseInt(sec);
		if (isec<0 || isec>59) return false;
	}

	return true;
}


function checkhoraValue (strHora){

   var hora = "";
	var mi   = "";
	var sec  = "";
	var lon    = 0;
	var i;
	var puntos;
	var caracter;
	
	lon = strHora.length;
	
	//alert("Hora recibida: *" + strHora + "*");
	
	if (lon>8 || lon<5) return false;
	if (lon==6) return false;
	 
	i = 0;
	puntos = false;
	
	while(i<lon && !puntos){
	   caracter = strHora.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			hora = hora + caracter;
		else
			puntos = true;
	}	
	
	if (isNaN(hora)) {
	   //alert("La hora no es numérica");
		return false;
	}
	var ihora = parseInt(hora)
	if (ihora<0 || ihora>23) {
		//alert("Hora erronea: " + ihora);
		return false;	
	}
	
	puntos = false;
	while(i<lon && !puntos){
	   caracter = strHora.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			mi = mi + caracter;
		else
			puntos = true;
	}	
	
	if (isNaN(mi)) {
	   //alert("Los minutos no son numéricos");
		return false;
	}
	var imin = parseInt(mi);
	if (imin<0 || imin>59) {
		//alert("Minutos erroneos:" + imin);
		return false;
	}
	
	puntos = false;
	while(i<lon && !puntos){
	   caracter = strHora.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			sec = sec + caracter;
		else
			puntos = true;
	}		
	
	if (puntos && sec=="") {
	   //alert("hay puntos pero no hay segundos");
		return false;
	}
	
	if (sec>""){
		if (isNaN(sec)) {
			//alert("los segundos no son numéricos");
			return false;
		}
		var isec = parseInt(sec);
		if (isec<0 || isec>59) {
			//alert("segundos erroneos: " + isec);
			return false;
		}
	}

	return true;
}

// MCA 07/12/04 : Nueva función. Como checkhoraValue(), pero sin prohibir longitudes menores de 5.
//					Admite entradas del tipo "9:00" y "14"
function checkFormatohoraValue (strHora){

   var hora = "";
	var mi   = "";
	var sec  = "";
	var lon    = 0;
	var i;
	var puntos;
	var caracter;
	
	lon = strHora.length;
	
	//alert("Hora recibida: *" + strHora + "*");
	
	if (lon>8) return false;
	 
	i = 0;
	puntos = false;
	
	while(i<lon && !puntos){
	   caracter = strHora.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			hora = hora + caracter;
		else
			puntos = true;
	}	
	
	if (isNaN(hora)) {
	   //alert("La hora no es numérica");
		return false;
	}
	var ihora = parseInt(hora)
	if (ihora<0 || ihora>23) {
		//alert("Hora erronea: " + ihora);
		return false;	
	}
	
	puntos = false;
	while(i<lon && !puntos){
	   caracter = strHora.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			mi = mi + caracter;
		else
			puntos = true;
	}	
	
	if (isNaN(mi)) {
	   //alert("Los minutos no son numéricos");
		return false;
	}
	var imin = parseInt(mi);
	if (imin<0 || imin>59) {
		//alert("Minutos erroneos:" + imin);
		return false;
	}
	
	puntos = false;
	while(i<lon && !puntos){
	   caracter = strHora.substr(i, 1);
		i = i +1;
		if (caracter!=":")
			sec = sec + caracter;
		else
			puntos = true;
	}		
	
	if (puntos && sec=="") {
	   //alert("hay puntos pero no hay segundos");
		return false;
	}
	
	if (sec>""){
		if (isNaN(sec)) {
			//alert("los segundos no son numéricos");
			return false;
		}
		var isec = parseInt(sec);
		if (isec<0 || isec>59) {
			//alert("segundos erroneos: " + isec);
			return false;
		}
	}

	return true;
}



/*
<!-- Original:  Mike Welagen (welagenm@hotmail.com) -->

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

<!-- Begin*/
var ventana

function checkdate(objName) {
	var datefield = objName;
	
	if (objName.value.length>=1 && objName.value.length<5) return false;
	
	if (chkdate(objName) == false) {
		datefield.select();
		datefield.focus();
		return false;
	}
	else {
	   if (chkdate2(objName.value) == false) {
		  datefield.select();
		  datefield.focus();
		  return false;
	   }
	
//	return true;
   }
   return true;
}
function chkdate(objName) {
	//var strDatestyle = "US"; //United States date style
	var strDatestyle = "EU";  //European date style
	var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intday;
	var intMonth;
	var intYear;
	var booFound = false;
	var estamos = false;
	var datefield = objName;
	var strSeparatorArray = new Array("-"," ","/",".");
	var intElementNr;
	var err = 0;
	var strMonthArray = new Array(12);

	strMonthArray[0] = "Jan";
	strMonthArray[1] = "Feb";
	strMonthArray[2] = "Mar";
	strMonthArray[3] = "Apr";
	strMonthArray[4] = "May";
	strMonthArray[5] = "Jun";
	strMonthArray[6] = "Jul";
	strMonthArray[7] = "Aug";
	strMonthArray[8] = "Sep";
	strMonthArray[9] = "Oct";
	strMonthArray[10] = "Nov";
	strMonthArray[11] = "Dec";
	strDate = datefield.value;
	if (strDate.length < 1) {
		return true;
	}
	
	//Se divide la fecha en día , mes y año
	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
   		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
	    	strDateArray = strDate.split(strSeparatorArray[intElementNr]);
    	  	if (strDateArray.length != 3) {
        		err = 1;
         		return false;
			}
      		else {
         		strDay = strDateArray[0];
         		strMonth = strDateArray[1];
         		strYear = strDateArray[2];
      		}
      		booFound = true;
   		}
	}

	if (booFound == false) {
   		if (strDate.length>5) {
      		strDay = strDate.substr(0, 2);
      		strMonth = strDate.substr(2, 2);
      		strYear = strDate.substr(4);
	  		estamos = true
   		}
	}

	if (strYear.length == 2) {
    	strYear = '20' + strYear;
   	}
	

	// Formato Americano
	if (strDatestyle == "US") {
		strTemp = strDay;
		strDay = strMonth;
		strMonth = strTemp;
	}//------------------------
	
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) {
		err = 2;
		return false;
	}
	intMonth = parseInt(strMonth, 10);
	if (isNaN(intMonth)) {
		for (i = 0;i<12;i++) {
			if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
				intMonth = i+1;
				strMonth = strMonthArray[i];
				i = 12;
		   }
		}
		if (isNaN(intMonth)) {
			err = 3;
			return false;
	   }
	}
	if (strYear.length != 2 && strYear.length != 4) {
		err = 4;
		return false;
	}
	
	intYear = parseInt(strYear, 10);
	if (isNaN(intYear)) {
		err = 4;
		return false;
	}
	if (intMonth>12 || intMonth<1) {
		err = 5;
		return false;
	}
	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
		err = 6;
		return false;
	}
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
		err = 7;
		return false;
	}
	if (intMonth == 2) {
		if (intday < 1) {
			err = 8;
			return false;
		}
		if (LeapYear(intYear) == true) {
			if (intday > 29) {
				err = 9;
				return false;
			}
		}
		else {
			if (intday > 28) {
				err = 10;
				return false;
			}
		}
	}

	if (intYear<=1500 || intYear>=2079){
		return false;
	}

	/*if (strDatestyle == "US") {
		datefield.value = strMonthArray[intMonth-1] + " " + intday+" " + strYear;
	}
	else {
	datefield.value = intday + " " + strMonthArray[intMonth-1] + " " + strYear;
	}*/

return true;
}


function chkdateValue(strDate) {
	//var strDatestyle = "US"; //United States date style
	var strDatestyle = "EU";  //European date style
	//var strDate;
	var strDateArray;
	var strDay;
	var strMonth;
	var strYear;
	var intday;
	var intMonth;
	var intYear;
	var booFound = false;
	var estamos = false;
	var strSeparatorArray = new Array("-"," ","/",".");
	var intElementNr;
	var err = 0;
	var strMonthArray = new Array(12);

	strMonthArray[0] = "Jan";
	strMonthArray[1] = "Feb";
	strMonthArray[2] = "Mar";
	strMonthArray[3] = "Apr";
	strMonthArray[4] = "May";
	strMonthArray[5] = "Jun";
	strMonthArray[6] = "Jul";
	strMonthArray[7] = "Aug";
	strMonthArray[8] = "Sep";
	strMonthArray[9] = "Oct";
	strMonthArray[10] = "Nov";
	strMonthArray[11] = "Dec";

	if (strDate.length < 1) {
		return true;
	}
	
	//Se divide la fecha en día , mes y año
	for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
   		if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
		    	strDateArray = strDate.split(strSeparatorArray[intElementNr]);
    		  	if (strDateArray.length != 3) {
        			err = 1;
         			return false;
				}
      		else {
         			strDay = strDateArray[0];
         			strMonth = strDateArray[1];
	         		strYear = strDateArray[2];
      		}
      		booFound = true;
   		}
	}

	if (booFound == false) {
   		if (strDate.length>5) {
      		strDay = strDate.substr(0, 2);
      		strMonth = strDate.substr(2, 2);
      		strYear = strDate.substr(4);
	  		estamos = true
   		}
		else{
			strDay=""
			strMonth=""
			strYear=""
		}
	}

	if (strYear.length == 2) {
    		strYear = '20' + strYear;
   	}
	
	//Comprobación de rango de años correcto para evitar el error en SQLSERVER
	if (parseInt(strYear)<1900 || parseInt(strYear)>2079) {
		return false;
	}

	// Formato Americano
	if (strDatestyle == "US") {
		strTemp = strDay;
		strDay = strMonth;
		strMonth = strTemp;
	}//------------------------
	
	intday = parseInt(strDay, 10);
	if (isNaN(intday)) {
		err = 2;
		return false;
	}
	intMonth = parseInt(strMonth, 10);
	if (isNaN(intMonth)) {
		for (i = 0;i<12;i++) {
			if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
				intMonth = i+1;
				strMonth = strMonthArray[i];
				i = 12;
		   }
		}
		if (isNaN(intMonth)) {
			err = 3;
			return false;
	   }
	}
	if (strYear.length != 2 && strYear.length != 4) {
		err = 4;
		return false;
	}
	
	intYear = parseInt(strYear, 10);
	if (isNaN(intYear)) {
		err = 4;
		return false;
	}
	if (intMonth>12 || intMonth<1) {
		err = 5;
		return false;
	}
	if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
		err = 6;
		return false;
	}
	if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
		err = 7;
		return false;
	}
	if (intMonth == 2) {
		if (intday < 1) {
			err = 8;
			return false;
		}
		if (LeapYear(intYear) == true) {
			if (intday > 29) {
				err = 9;
				return false;
			}
		}
		else {
			if (intday > 28) {
				err = 10;
				return false;
			}
		}
	}

	/*if (strDatestyle == "US") {
		datefield.value = strMonthArray[intMonth-1] + " " + intday+" " + strYear;
	}
	else {
	datefield.value = intday + " " + strMonthArray[intMonth-1] + " " + strYear;
	}*/

return true;
}



function chkdate2(fecha){

	var fecha_ar=new Array();
	if (fecha!=""){

		suma=0;
		fecha_ar[suma]="";
		l=0
		while (l<=fecha.length){
			if (fecha.substring(l,l+1)=='/'){
				suma++;
				fecha_ar[suma]="";
			}
			else{
				if (fecha.substring(l,l+1)!=''){
					fecha_ar[suma]=fecha_ar[suma] + fecha.substring(l,l+1);
				}
			}
			l++;
		}
		if (suma!=2) {
			return false;
		}
		else {
			nonumero=0;
			while (suma>=0 && nonumero==0){
				if (isNaN(fecha_ar[suma])) {
					nonumero=1;
				}
				if (fecha_ar[suma].length>2 && suma!=2) {
					nonumero=1;
				}
				if (fecha_ar[suma].length>4 && suma==2) {
					nonumero=1;
				}
				suma--;
			}
	
			if (nonumero==1){
				return false;
			}
		}
	}
	return true;

}


function LeapYear(intYear) {
if (intYear % 100 == 0) {
if (intYear % 400 == 0) { return true; }
}
else {
if ((intYear % 4) == 0) { return true; }
}
return false;
}

function doDateCheck(from, to) {
if (Date.parse(from.value) <= Date.parse(to.value)) {
alert("The dates are valid.");
}
else {
if (from.value == "" || to.value == "") 
alert("Both dates must be entered.");
else 
alert("To date must occur after the from date.");
   }
}
//  End -->

/***************************************************************************/
/*Funcion para redondear un número a la cantidad de decimales especificada */
function Redondear(cuInValue,ndec) {
    	var iNumDecimals = ndec;
    	var dbInVal = cuInValue;
    	var bNegative = false;
    	var iInVal = 0;
    	var strInVal
    	var strWhole = "", strDec = "";
    	var strTemp = "", strOut = "";
    	var iLen = 0;
    	


       	if (dbInVal < 0) {
       		bNegative = true;
       		dbInVal *= -1;
       	}
       	
       	dbInVal = dbInVal * Math.pow(10, iNumDecimals)
       	iInVal = parseInt(dbInVal);


	if ((dbInVal - iInVal) >= .5) {
        	iInVal++;
	}
	strInVal = iInVal + "";
	strWhole = strInVal.substring(0, (strInVal.length - iNumDecimals));
	if (strWhole=="") strWhole="0";
	strDec = strInVal.substring((strInVal.length - iNumDecimals), strInVal.length);


	while (strDec.length < iNumDecimals) {
		strDec = "0" + strDec;
		}
	iLen = strWhole.length;


	if (iLen >= 3) {

		while (iLen > 0) {
			strTemp = strWhole.substring(iLen - 3, iLen);

			if (strTemp.length == 3) {
				strOut = "." + strTemp + strOut;
				iLen -= 3;

			} else {
				strOut = strTemp + strOut;
				iLen = 0;
			}
		}

		if (strOut.substring(0, 1) == ".") {
			strWhole = strOut.substring(1, strOut.length);

		} else {
			strWhole = strOut;
			}
	}

	if (strDec==''){
		if (bNegative) {
			return "-" + strWhole;
		} else {
			return strWhole;
		}
	}
	else{
		if (bNegative) {
			return "-" + strWhole + "," + strDec;
		} else {
			return strWhole + "," + strDec;
		}
	}
}

/* Funciones para el calculo de pvp y margenes */
function precioventa(coste,margen) {
	return coste/(1-(margen/100));
}

function precioventarecargo(coste,recargo) {
	return coste + ((coste*recargo)/100);
}

function recargoventa(coste,pvp) {
	return (100*(pvp-coste))/coste;
}

function margenventa(coste,pvp) {
	if (pvp==0) {
		return 0;
	} else {
		return 100*(1-(coste/pvp));
	}
}

function margenventamayor(coste,pvp,margenventa,tiva) {
	if (margenventa<14.5) {
		return 10;
	} else {
		if (margenventa>=14.5 && margenventa<20.5) {
			return 11;
		} else {
			if (margenventa>=20.5 && margenventa<26.5) {
				return 12;
			} else {
				if (margenventa>=26.5 && margenventa<=30) {
					return 13;
				} else {
					pvpiva = pvp + ((pvp*tiva)/100);
					pvpmayor = pvpiva - ((pvpiva*30)/100);
					margenmayor = (1-(coste/pvpmayor))*100;
					return margenmayor;
				}
			}
		}
	}
}

function letramargen(coste,pvp,margenventa) {
	if (margenventa<14.5) {
		return "P";
	} else {
		if (margenventa>=14.5 && margenventa<20.5) {
			return "M";
		} else {
			if (margenventa>=20.5 && margenventa<23.5) {
				return "R";
			} else {
				if (margenventa>=23.5 && margenventa<26.5) {
					return "B";
				} else {
					return "E";
				}
			}
		}
	}
}
/*
//******************************************************************************
<!-- Función para los controlar el salto a una página cualquiera*/

function IrAPagina(dedonde,campo,criterio,texto,maximo,NomParamPag) {
	if (document.forms[0].all("waitBoxOculto")=="[object]"){
		document.forms[0].all("waitBoxOculto").style.visibility="visible";
	}
	elemento="SaltoPagina" + dedonde;
	if (document.forms[0].name == "opciones") {
		indiceform=1;
	}
	else {
		indiceform=0;
	}
	if (isNaN(document.forms[indiceform].elements[elemento].value)) {
		npagina=1;
	}
	else {
		if (document.forms[indiceform].elements[elemento].value > maximo) {
			npagina=maximo;
		}
		else {
			if (document.forms[indiceform].elements[elemento].value <= 0) {
				npagina=1;
			}
			else {
				npagina=document.forms[indiceform].elements[elemento].value;
			}
		}
	}
	if (NomParamPag=="cliente") {
		document.location=document.forms[indiceform].name + ".asp?npagina=" + npagina +
		"&campo=" + campo + "&criterio=" + criterio + "&texto=" + texto + "&ndoc=" + document.forms[indiceform].h_ncliente.value;
	}
	else {
		if (NomParamPag=="proveedor") {
			
			document.forms[indiceform].action=document.forms[indiceform].name + ".asp?lote=" + npagina +
			"&campo=" + campo + "&criterio=" + criterio + "&texto=" + texto + "&ndoc=" + document.forms[indiceform].ndoc.value + "&mode=search";
			document.forms[indiceform].submit();
			
			//document.location=document.forms[indiceform].name + ".asp?lote=" + npagina +
			//"&campo=" + campo + "&criterio=" + criterio + "&texto=" + texto + "&nproveedor=" + document.forms[indiceform].nproveedor.value + "&mode=search";
		}
		else {
			//document.location=document.forms[indiceform].name + ".asp?" + NomParamPag + "=" + npagina +
			//"&campo=" + campo + "&criterio=" + criterio + "&texto=" + texto + "&mode=search";
			document.forms[indiceform].action=document.forms[indiceform].name + ".asp?" + NomParamPag + "=" + npagina +
			"&campo=" + campo + "&criterio=" + criterio + "&texto=" + texto + "&mode=search";
			document.forms[indiceform].submit();
		}
	}
}

//******************************************************************************
//Función para los controlar el salto a una página cualquiera (Version para listados)
function IrAPaginaListados(dedonde,campo,criterio,texto,maximo,NomParamPag) {
	if (document.forms[0].all("waitBoxOculto")=="[object]"){
		document.forms[0].all("waitBoxOculto").style.visibility="visible";
	}
	elemento="SaltoPagina" + dedonde;
	if (isNaN(document.forms[0].elements[elemento].value)) {
		npagina=1;
	}
	else {
		if (document.forms[0].elements[elemento].value > maximo) {
			npagina=maximo;
		}
		else {
			if (document.forms[0].elements[elemento].value <= 0) {
				npagina=1;
			}
			else {
				npagina=document.forms[0].elements[elemento].value;
			}
		}
	}
	document.forms[0].action=document.forms[0].name + ".asp?" + NomParamPag + "=" + npagina +
	"&campo=" + campo + "&criterio=" + criterio + "&texto=" + texto + "&mode=browse";
	document.forms[0].submit();
}

//******************************************************************************
//funcion para avanzar o retroceder páginas en los listados según la variable sentido
function Mas(sentido,lote,campo,criterio,texto) {
	if (document.forms[0].all("waitBoxOculto")=="[object]"){
		document.forms[0].all("waitBoxOculto").style.visibility="visible";
	}
	document.forms[0].action=document.forms[0].name + ".asp?mode=browse&sentido=" + sentido + "&lote=" + lote + "&campo=" + campo + "&criterio=" + criterio + "&texto=" + texto;
	document.forms[0].submit();
}


//******************************************************************************
//funcion para redondeo de números
function cuadrar(numero,x){
   return Math.round(numero * Math.pow(10,x)) / Math.pow(10,x);
}

//******************************************************************************
function PonerCero(objName){
   var inputfield = objName;
   if (inputfield.value==""){
      inputfield.value=0;
   }
}

//****************************************************************************

function AbrirVentana(pagina,tipo,alto,ancho) {
	
	var str = "height=" + alto + ",innerHeight=" + alto;
  	str += ",width=" + ancho + ",innerWidth=" + ancho;
  
  	if (window.screen) {
    	var ah = screen.availHeight - 30;
    	var aw = screen.availWidth - 10;

    	var xc = (aw - ancho) / 2;
    	var yc = (ah - alto) / 2;

    	str += ",left=" + xc + ",screenX=" + xc;
    	str += ",top=" + yc + ",screenY=" + yc;
  	}
	if (tipo=="I") {
		str += ",resizable=yes,status=no,toolbar=yes,menubar=yes,scrollbars=yes"
		ventana=window.open(pagina,"",str);
	}
	else {
		if (tipo=="P") {
			str += ",resizable=yes,status=no,toolbar=no,menubar=no,scrollbars=yes"
			ventana=window.open(pagina,"",str);
		}
		else {
			if (tipo=="TALLAS") {
				str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=no"
				ventana=window.open(pagina,"TALLAS",str);
			}
			else {
				if (tipo=="SC") {
					str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=yes"
					ventana=window.open(pagina,"TALLAS",str);
				}
				else {
					str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=no"
					ventana=window.open(pagina,"",str);
				}
			}
		}
	}
	//ricardo 16-4-2004 esto son pruebas para cambiar el titulo a todas las ventanas
	//cuando se han abierto
	//if (ventana && ventana.closed==false){
		//while (ventana.document.readyState != 'complete');
		//var titulo=ventana.document.title;
		//ventana.document.title="hola" + " - " + titulo;
	//}
	
}

/*function abrirventana(pagina,tipo,alto,ancho) {
	
	var str = "height=" + alto + ",innerHeight=" + alto;
  	str += ",width=" + ancho + ",innerWidth=" + ancho;
  
  	if (window.screen) {
    	var ah = screen.availHeight - 30;
    	var aw = screen.availWidth - 10;

    	var xc = (aw - ancho) / 2;
    	var yc = (ah - alto) / 2;

    	str += ",left=" + xc + ",screenX=" + xc;
    	str += ",top=" + yc + ",screenY=" + yc;
  	}
	if (tipo=="I") {
		str += ",resizable=yes,status=no,toolbar=yes,menubar=yes,scrollbars=yes"
		ventana=window.open(pagina,"",str);
	}
	else {
		if (tipo=="P") {
			str += ",resizable=yes,status=no,toolbar=no,menubar=no,scrollbars=yes"
			ventana=window.open(pagina,"",str);
		}
		else {
			if (tipo=="TALLAS") {
				str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=no"
				ventana=window.open(pagina,"TALLAS",str);
			}
			else {
				str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=no"
				ventana=window.open(pagina,"",str);
			}
		}
	}
	//ricardo 16-4-2004 esto son pruebas para cambiar el titulo a todas las ventanas
	//cuando se han abierto
	//if (ventana && ventana.closed==false){
		//while (ventana.document.readyState != 'complete');
		//var titulo=ventana.document.title;
		//ventana.document.title="hola" + " - " + titulo;
	//}
}*/

//****************************************************************************
function AbrirVentanaRef(pagina,tipo,alto,ancho) {
	
	var str = "height=" + alto + ",innerHeight=" + alto;
  	str += ",width=" + ancho + ",innerWidth=" + ancho;
  
  	if (window.screen) {
    	var ah = screen.availHeight - 30;
    	var aw = screen.availWidth - 10;

    	var xc = (aw - ancho) / 2;
    	var yc = (ah - alto) / 2;

    	str += ",left=" + xc + ",screenX=" + xc;
    	str += ",top=" + yc + ",screenY=" + yc;
  	}
	if (tipo=="I") {
		str += ",resizable=yes,status=no,toolbar=yes,menubar=yes,scrollbars=yes"
		ventana=window.open(pagina,"",str);
	}
	else {
		if (tipo=="P") {
			str += ",resizable=yes,status=no,toolbar=no,menubar=no,scrollbars=yes"
			ventana=window.open(pagina,"",str);
		}
		else {
			if (tipo=="TALLAS") {
				str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=no"
				ventana=window.open(pagina,"TALLAS",str);
			}
			else {
				str += ",resizable=no,status=no,toolbar=no,menubar=no,scrollbars=no"
				ventana=window.open(pagina,tipo,str);
			}
		}
	}
	return ventana;
}

//*****************************************************************************
// Quita espacios en blanco al principio y al final
function trim(str)
   {
   var begin,end;

   for(begin=0;begin<str.length;begin++)
      if(str.charAt(begin) != unescape("%20"))
         break;

   for(end=str.length-1;end>=0;end--)
      if(str.charAt(end) != unescape("%20"))
         break;

   return(str.substring(begin,end + 1));

}
   
//******************************************************************************
// Numero de veces que la cadena lookfor aparece en la source
function numInString(source,lookfor)
   {
   return (source.split(lookfor).length - 1)
   }

//******************************************************************************
// Función de gestión de las pestañas
function ShowTab(tabs,intNum,color_principal,color_secundario)
{
	id="idMenu" + intNum;
	Tab="Tab" + intNum;
	document.all(id).style.visibility='visible';
	document.all(Tab).style.backgroundColor=color_principal;
	document.all(Tab).style.fontFamily='verdana';
	document.all(Tab).style.fontWeight='bold';
	document.all(Tab).style.fontSize='8.0pt';
	document.all(Tab).style.borderTopColor=color_principal;
	document.all(Tab).style.borderLeftColor=color_principal;
	document.all(Tab).style.borderRightColor=color_principal;
	document.all(Tab).style.borderBottom='none';
	document.all(Tab).style.borderLeft='#cccccc outset';
	document.all(Tab).style.borderRight='black outset';
	document.all(Tab).style.borderTop='thick outset';
	for(var i=1;i<=tabs;i++)
	{
		if(i!=intNum)
		{
			id="idMenu" + i;
			Tab="Tab" + i;
			document.all(id).style.visibility='hidden';
			document.all(Tab).style.backgroundColor=color_secundario;
			document.all(Tab).style.fontFamily='arial';
			document.all(Tab).style.fontWeight='normal';
			document.all(Tab).style.fontSize='8.0pt';
			document.all(Tab).style.borderTopColor='#CCCCCC';
			document.all(Tab).style.borderLeftColor='#CCCCCC';
			document.all(Tab).style.borderRightColor='#CCCCCC';
			document.all(Tab).style.borderBottomColor='#CCCCCC';
			document.all(Tab).style.borderBottom='#CCCCCC thin groove';
			document.all(Tab).style.borderRight='#CCCCCC thin groove';
			document.all(Tab).style.borderLeft='#CCCCCC thin groove';
			document.all(Tab).style.borderTop='#CCCCCC thin outset';
		}
	}
}

//******************************************************************************   
//Comprueba una direccion de email
//ricardo 5/11/2003 se cambia la funcion checkmail para que acepte dos o mas email en la misma linea
function checkmail(campoemail)
{
	ok=true
	if(campoemail.value=="")
	{
		alert("Debe especificar una direcciónn de Email.")
		campoemail.select()
		campoemail.focus()
		ok=false
	}
	else
	{
		mail=campoemail.value
		at_pos=mail.indexOf("@")
		dot_pos=mail.indexOf(".")
		if(at_pos<1 || dot_pos<1)
		{
			alert("Error en la posición de '@' y de '.' en la dirección de Email.")
			campoemail.select()
			campoemail.focus()
			ok=false
		}
		else
		{
			mail=campoemail.value
			condition="yes"
			var at_count=0
			var dot_count=0
			var temp=0
			for(var i=0;i<mail.length;i++)
			{
				if((mail.charCodeAt(i)>0 && mail.charCodeAt(i)<48)||(mail.charCodeAt(i)>57 && mail.charCodeAt(i)<65)||(mail.charCodeAt(i)>91 && mail.charCodeAt(i)<97)||mail.charCodeAt(i)>122)
				{
					if(mail.charAt(i)=="@"||mail.charAt(i)=="."||mail.charAt(i)=="-"||mail.charAt(i)=="_"||mail.charAt(i)==";")
					{
							if(mail.charAt(i)=="@"){at_count++}else{dot_count++} // cuenta el número de @
							if(mail.charAt(i)==";"){at_count=0} // si hay un ; entonces el contador de @ se pone a cero
							if(dot_count>=1)
							{
								dot_pos=i
								if((dot_pos>at_pos) && temp==0)
								{
									pos=dot_pos-at_pos
									temp++
								}								
							}
					}
					else
					{
						condition="no"
						i=mail.length
					}
				}
			}
			if(condition=="no")
			{
				alert("La dirección de Email contiene espacios en blanco o caracteres especiales.")
				campoemail.select()
				campoemail.focus()
				ok=false
			}
			else
			{
				if(at_count>1)
				{
					alert("la dirección de Email contiene más de un @")
					campoemail.select()
					campoemail.focus()
					ok=false
				}
				else
				{
					if(pos<2)
					{
						alert("Falta el nombre de dominio entre '@' y '.'")
						campoemail.select()
						campoemail.focus()
						ok=false
						i=mail.length
					}
					else
					{	
						count=dot_pos+1
						domain=""
						for(count;count<mail.length;count++)
						{
							domain=domain+mail.charAt(count)		
						}
						dom=new Array("au","com","net","org","edu","in","mil","gov","arpa","biz","aero","name","coop","info","pro","museum")
						error="yes"
						for(var k=0;k<dom.length;k++)
						{
							if(domain==dom[k])
							{
								k=dom.length
								error="no"
							}
						}
						if((error=="yes" && (domain.length>2)) || (domain.length<2))
						{
							alert("El nombre del dominio debe acabar con dominios conocidos o la abreviatura de dos letras del país. Ej com,net,es etc.")
							campoemail.select()
							campoemail.focus()
							ok=false
						}								
					}
				}
			}
		}
	}
	return ok
}


//******************************************************************************
//Borra un fichero del path especificado
function BorrarFichero(path,fichero)
{
	var nom_fich
	
    nom_fich = path + fichero;
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (fso.FileExists(nom_fich)) {
    	fso.DeleteFile(nom_fich);
	}
}

//******************************************************************************
//Comprobar si existe un fichero
function ExisteFichero(path,fichero)
{
	var nom_fich
	
	nom_fich = path + fichero;
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (fso.FileExists(nom_fich)) {
    		return(true);
	}
	else{
		return(false);
	}
}

//******************************************************************************
//Escribe en un fichero del path especificado
function WriteLineaFichero(linea,path,fichero)
{
	var f,nom_fich
	
    nom_fich = path + fichero;
	var ForAppending = 8;
	var ForWriting = 2;
	var TriStateFalse = 0;

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (fso.FileExists(nom_fich)) {
		//alert("SI EXISTE " + nom_fich);
		var a = fso.OpenTextFile(nom_fich,ForAppending, true, TriStateFalse);
		a.write(linea + '\r\n');
		//a.writeln(linea);
		a.close();
	}
	else {
		//alert("NO EXISTE " + nom_fich);
		var a = fso.CreateTextFile(nom_fich,true);
		a.write(linea + '\r\n');
		//a.writeln(linea);
		a.close();
	}
}

//******************************************************************************
//Lee de un fichero del path especificado
function ReadTodoFichero(path,fichero)
{
	var f,nom_fich
	var contenido
	
 	nom_fich = path + fichero

	var ForReading = 1;

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (fso.FileExists(nom_fich)) {
		
		var a = fso.OpenTextFile(nom_fich,ForReading, true);
		contenido = a.readAll();
		
		a.close();
	}
	else {
		contenido=""
	} 	

	return(contenido);
}

//******************************************************************************
//Escribe en un fichero UNIX en el path especificado
function WriteLineaFicheroUNIX(linea,path,fichero)
{
	var f,nom_fich

    nom_fich = path + fichero;
	var ForAppending = 8;
	var ForWriting = 2;
	var TriStateFalse = 0;

	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (fso.FileExists(nom_fich)) {
		//alert("SI EXISTE " + nom_fich);
		var a = fso.OpenTextFile(nom_fich,ForAppending, true, TriStateFalse);
		a.write(linea + String.fromCharCode(10));
		//a.writeln(linea);
		a.close();
	}
	else {
		//alert("NO EXISTE " + nom_fich);
		var a = fso.CreateTextFile(nom_fich,true);
		a.write(linea + String.fromCharCode(10));
		//a.writeln(linea);
		a.close();
	}
}

//******************************************************************************
//Recupera el tamaño en bytes de un fichero del path especificado
function SizeFichero(path,fichero)
{
	var nom_fich

    nom_fich = path + fichero;
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	if (fso.FileExists(nom_fich)) {
    	var fichero=fso.getFile(nom_fich);
		var longitud=fichero.size;
		return(longitud);
	}
	else{
		return(-1);
	}
}

//******************************************************************************
//Mueve un fichero desde el path origen al path destino
function MoveFichero(pathOrigen,pathDestino,fichero)
{
	var nom_fich_origen;

    nom_fich_origen  = pathOrigen + fichero;

	var fso = new ActiveXObject("Scripting.FileSystemObject");

	if (fso.FileExists(nom_fich_origen)) {
    	var fichero=fso.getFile(nom_fich_origen);
		fichero.Move(pathDestino);
	}
	else{
		alert("No existe el fichero " + nom_fich_origen + ", no se puede mover a " + pathDestino);
	}
}

//******************************************************************************
//Copia un fichero desde el path origen al path destino
function CopyFichero(pathOrigen,pathDestino,fichero,sobreescribir)
{
	var nom_fich_origen;

    nom_fich_origen  = pathOrigen + fichero;

	var fso = new ActiveXObject("Scripting.FileSystemObject");

	if (fso.FileExists(nom_fich_origen)) {
    	var fichero=fso.getFile(nom_fich_origen);

    	if (sobreescribir=='1'){
    		fichero.Copy(pathDestino,true);
    	}
    	else{
    		fichero.Copy(pathDestino,false);
    	}
	}
	else{
		alert("No existe el fichero " + nom_fich_origen + ", no se puede copiar en " + pathDestino);
	}
}


//*********************
//Esta funcion comprueba caracteres extraños en los codigos
//valor: es el valor a comprobar
//modo: si el valor acepta(0) o no el valor nulo(1)
// MCA 30/05/05: Se añade el modo 3 para los códigos de talla y color.
function comp_car_ext(valor,modo)
{

	resul=0;
	if (modo==1 || modo==3)
	{
		//Se comprueba primera la doble comilla, ya que el metodo search, da error con este caracter
		for (i=0;i<valor.length;i++){
			if(valor.substring(i,i+1)=="\""){
				resul=1;
			}
		}
		//Se comprueba primera la suma, ya que el metodo search, da error con este caracter
		for (i=0;i<valor.length;i++){
			if(valor.substring(i,i+1)=="+"){
				resul=1;
			}
		}
		//Se comprueba primera la suma, ya que el metodo search, da error con este caracter
		for (i=0;i<valor.length;i++){
			if(valor.substring(i,i+1)=="{"){
				resul=1;
			}
		}
		//Se comprueba primera la suma, ya que el metodo search, da error con este caracter
		for (i=0;i<valor.length;i++){
			if(valor.substring(i,i+1)=="}"){
				resul=1;
			}
		}
		//Se comprueba primera la suma, ya que el metodo search, no busca bien con este caracter
		for (i=0;i<valor.length;i++){
			if(valor.substring(i,i+1)=="%"){
				resul=1;
			}
		}
	}

	if (resul==0)
	{
		if (modo==1 || modo==3) {
			if (valor.search("&")>0 || valor.search(" ")>0 || valor.search("'")>0 || valor.search("%")>0)
			{
				resul=1;
			}
		}
		else
		{
			if (modo==2) 
			{ //el modo 2 sera el nombre del articulo y se permitira el apostrofe
				if (valor.search("<")>0 || valor.search(">")>0){
					resul=1;
				}
			}
			else{
				if (valor.search("<")>0 || valor.search("'")>0 || valor.search(">")>0){
					resul=1;
				}
			}
		}
		
		if (modo==3)
		{
			if (valor.indexOf("-") >= 0 || valor.indexOf("+") >= 0 || valor.indexOf("{") >= 0 || valor.indexOf("}") >= 0 || valor.indexOf("%") >= 0 || valor.indexOf("\"") >= 0)
			{
				resul=1;
			}
		}
	}
	return resul;
}

function lenmensaje(Target,cant_a_restar,cantidad,campo_a_cambiar) {
		
		StrLen = Target.value.length;
	  	
	  	//type = document.Main.HEADER_TYPE.value;
		
	  	maxLeght = parseInt(cantidad) - parseInt(cant_a_restar);

	  	
	  	if (StrLen > maxLeght ) {
	  		Target.value = Target.value.substring(0,( maxLeght-1 ));
	  		CharsLeft = 0;
  		} else {
  			CharsLeft = maxLeght - StrLen;
  		}
 		//document.mensajes_sms.CharsLeft.value = CharsLeft;
		if (campo_a_cambiar==''){
		}
		else{
			campo_a_cambiar.value=CharsLeft;
		}
		//lenmensaje=CharsLeft;
}
function ContarMaxCarateresj(texto){
	if(texto.length>0) {
		resul=0;
		for (i=0;i<texto.length;i++){
			if(texto.substring(i,i+1)==","){
				resul=1;
			}
		}
		if (resul==1){
			maximo=0;
			suma=0;
			devolver=0;
			for(i=0;i<texto.length;i++){
				if(texto.substring(i,i+1)!=","){
					suma=suma + 1;
				}
				else{
					if(maximo!=0){
						if (suma!=maximo){
							devolver=1;
						}
					}
					maximo=suma;
					suma=0;
				}
			}
			if(devolver==0 && maximo==suma){
				ContarMaxCarateres=maximo;
			}	
			else{
				ContarMaxCarateres=0;
			}
		}
		else{
			ContarMaxCarateres=texto.length;
		}
	}	
	else{
		ContarMaxCarateres=-1;
	}
	return ContarMaxCarateres;
}

//****************************************************************************************************************
//funcion para completar una cadena con caracteres
	//cadena   : string a completar
	//longitud : longitud que debe tener la cadena resultante 
	//caracter : caracter para rellenar la cadena
	//sentido  : A completar por la izda (i) o por la derecha (d)
function completar(cadena,longitud,caracter,sentido) {
    if (cadena.length>=longitud) {
	   return cadena;
	} else {
	   cadena=trim(cadena);
	   var straux="";
	   for (i=0;i<(longitud-cadena.length);i++) {
			straux=straux + caracter;
		}
	   if (sentido=="i") {
		   	return (straux + cadena);
	   } else {
	   		return (cadena + straux);
	   }
	}
}

//****************************************************************************************************************
//funcion que devuelve una cadena con la hora actual (OJO del equipo local) de forma hh:mm:ss

function HoraActual() {
	hoy=new Date();
	fecha=completar(hoy.getHours().toString(),2,"0","i") + ":" + completar(hoy.getMinutes().toString(),2,"0","i") + ":" + completar(hoy.getSeconds().toString(),2,"0","i");
	return fecha
}


//Formatea un campo hora
function formatHora(Target){
   //window.alert(window.event.keyCode);
	tecla = window.event.keyCode;	
	if (tecla!=8){
   	StrLen = Target.value.length;
		if (StrLen==2 && Target.value.substring(StrLen-1, StrLen)!=":"){
	   	Target.value = Target.value + ":";
		}		
	}
}

//Formatea un campo hora
function formatHora(Target, segundos){
   //window.alert(window.event.keyCode);
	tecla = window.event.keyCode;	
	if (tecla!=8){
   	StrLen = Target.value.length;
		if (StrLen==2 && Target.value.substring(StrLen-1, StrLen)!=":"){
	   	Target.value = Target.value + ":";
		}
		if (segundos==true){
			//alert(Target.value.substring(1, 2));
			if (StrLen==4 && Target.value.substring(1, 2)==":"){			   
	   		Target.value = Target.value + ":";
			}
			if (StrLen==5 && Target.value.substring(StrLen-1, StrLen)!=":"){
	   		Target.value = Target.value + ":";
			}
		}		
	}
}



// Funcion para recuperar la cookie

function getCookie(Name){
	var search= Name + "="
	if (document.cookie.length > 0) { 		// Si hay alguna cookie
		offset = document.cookie.indexOf(search)
		if (offset != -1) { 			// si existe la cookie
			offset += search.length
			// poner el indice al inicio del valor
			end = document.cookie.indexOf(";",offset)
			// poner el indice al final del valor
			if (end == -1)
				end = document.cookie.length
			// Decodificar la cookie
			return unescape(document.cookie.substring(offset,end))
		}
	}
}

function poner_imagen(Verdadero,formulario,capa,foto_w,foto_h,texto_mostrar_foto,foto_empresa,pagina,form_pagina,ancho,largo){

	Verd=Verdadero;
eval("total_paginas=document." + form_pagina + "." + pagina + ".value");


for(i=1;i<total_paginas;i++){

	eval("mostrar_foto=document." + formulario + "." + texto_mostrar_foto + i + ".value");


	if (mostrar_foto==Verd){

		eval("document.all('" + capa + i + "').style.display=''");

		//cogemos las propiedades actuales de la foto
		eval("w=document." + formulario + "." + foto_empresa + i + ".width");
		eval("h=document." + formulario + "." + foto_empresa + i + ".height");

		//cogemos las propiedades actuales y las ponemos como antiguas de la foto
		eval("document." + formulario + "." + foto_w + i + ".value=w");
		eval("document." + formulario + "." + foto_h + i + ".value=h");

//if (formulario=="albaranes_cli_impSinDtos" || formulario=="facturas_cli_impSinDtos" || formulario=="presupuestos_per_imp" || formulario=="presupuestos_resimp"){
    		if (w>ancho){
			ratio=w/ancho;
			w = w/ratio;
			h=h/ratio;
		}
		if (h>largo){
			ratio=h/largo;
			h = h/ratio;
			w=w/ratio;
		}
//}
//else{
//	h=largo;
//	w=ancho;
//}

		eval("document." + formulario + "." + foto_empresa + i + ".height=h");
		eval("document." + formulario + "." + foto_empresa + i + ".width=w");

		eval("document.all('" + capa + i + "').style.display=''");
	}
}
}

function luhnCheck(CardNumber) {


	if (isNaN(CardNumber)) {
		return false;
	}

	var no_digit = CardNumber.length;
	var oddoeven = no_digit & 1;
	var sum = 0;

	for (var count = 0; count < no_digit; count++) {
		var digit = parseInt(CardNumber.charAt(count));
		if (!((count & 1) ^ oddoeven)) {
			digit *= 2;
			if (digit > 9)
				digit -= 9;
		}
		sum += digit;
	}
	if (sum % 10 == 0)
		return true;
	else
		return false;
}

function comprobar_maxreg(formulario,maxnregistros){

	nregistros=eval("document." + formulario + ".h_nfilas.value");

	maxnregistros=parseInt(maxnregistros);

	suma=0;

	for (i=1;i<=nregistros;i++) {
		nombre="check" + i;
		if  (eval("document." + formulario + ".elements[nombre].checked")){
			suma++;
		}
	}

	if (suma>maxnregistros){
		return false
	}
	else{
		return true;
	}
}

function trimCodEmpresa(strDato) {
	var strCodigo
	strCodigo=strDato.substring(5,strDato.length);
	return strCodigo;
}

function CerrarVentanaPrincipalSinPreguntar(){
	window.opener=self;
	window.close();
}

function fullscreen(){
	var hdiff;
	window.resizeTo(screen.width/2,screen.height/2)
	window.moveTo(0,10)

	hdiff=window.screenTop;

	//si no queremos que se vea la barra de titulo,el menu , ni las barras de herramientas
	window.moveTo(-6,-hdiff+6);
	//si no queremos que se vea la barra de titulo pero todo lo demas si
	//window.moveTo(-6,-hdiff+100);

	//con esto no se vera la barra de estado
	window.resizeTo(screen.width+13,screen.height+hdiff+26)
}

function pantallaCompleta(pagina) {

//opion1
	//window.open(pagina, '', 'channelmode=1,fullscreen=yes, scrollbars=auto');

//opcion2
	//Ancho=screen.availWidth;
	//Alto=screen.availHeight;
	//window.open(pagina, '', 'channelmode=1,toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=1,width='+Ancho+','+'height='+Alto+',top=0,left=0','replace');

//opcion3
	window.open(pagina, '', 'channelmode=1,toolbar=yes,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=1,fullscreen=0,top=0,left=0','replace');
}

function pantallaNormal(pagina) {

	window.open(pagina, '', 'channelmode=0,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=auto,resizable=yes,copyhistory=1,fullscreen=0','replace');
}


function esperarretornoModal()
{
	if (retornoModal==0){
		setTimeout( "esperarretornoModal()",6000);
	}
}

function VentanaPrompt(titulo,ancho,alto,unidad_medida,centrado,texto_innerHTML) {

	var WindowTitle = titulo;

	if (centrado==1){
		var posxm = (screen.width-ancho)/2;
		var posym = (screen.height-alto)/2;
		poxtopM=posym;
		poxleftM=posxm;
	}
	else{
		poxtopM=0;
		poxleftM=0;
	}
	InputWindow=window.open("","myWindow","titlebar=0,toolbar=no,resizable=no,scrollbars=no,location=no,status=no,directories=no,menubar=no,width=" + ancho + unidad_medida + ",height=" + alto + unidad_medida + ",top=" + poxtopM + ",left=" + poxleftM + ",marginwidth=0,marginheight=0");
	InputWindow.document.write("<html><head><title>" + WindowTitle + "</title></head>");

/* Prompt the user for some data. When the user presses the Close button,
return the input data and close the window. */
	InputWindow.document.write("<h3>" + WindowTitle + "</h3>");
	InputWindow.document.write("<p>Supply some input.</p>");
	InputWindow.document.write('<form name="InputPrompt">');
	InputWindow.document.write('<p><input type="text" name="input" size="15" maxlength="12"></p>');
	InputWindow.document.write('<p><input type="button" value="Close" onClick="retornoModal=document.InputPrompt.input.value;opener.ya_llego_retornoModal=1;window.close()"></p>');
	InputWindow.document.write("</form></html>");

	var retornoModal;
	var ya_llego_retornoModal;
	retornoModal=0;
	esperarretornoModal();

	return retornoModal;
}

function CrearVentanaModal(url,ancho,alto,centrado){

//NO olvidar poner en la url que se abre
//function PerderFoco()
//{
//        if (self.closed) return
//        self.focus()
//}
//function Cerrar()
//{
//        self.returnvalue="ESTO NO FUNCIONA";
//        self.close();
//}
//
//y en el body "onblur=PerderFoco() onunload=Cerrar()"
///////////////////////////////////////////////////
	if (centrado==1){
		var posxm = (screen.width-ancho)/2;
		var posym = (screen.height-alto)/2;
		poxtopM=posxm;
		poxleftM=posym;
	}
	else{
		poxtopM=0;
		poxleftM=0;
	}
    //create the window
     ventana_modal=window.open(url,"Nombre_Ventana_Modal","titlebar=0,toolbar=no,resizable=no,scrollbars=no,location=no,status=no,directories=no,menubar=no,width=ancho,height=alto,top=poxtopM,left=poxleftM,marginwidth=0,marginheight=0");

    //some versions of ie dont support opener, so lets define it here
    if (window.Nombre_Ventana_Modal.opener == null){
        window.Nombre_Ventana_Modal.opener = self
    }

	return ventana_modal.document.riesgo_contrasenya.password.value;
}
function getPassword(accionR,tdocumentoR,ndocumentoR,itemR,contrasenya_riesgoR) {
/*
    WinId = window.open('','newwin','width=200,height=100');
    if (!WinId.opener) WinId.opener = self;
    Text = '<form ';
    Text += 'onSubmit="window.returnValue=this.password.value; self.close()">';
    Text += '<input type="password" name="password" value="">';
    Text += '<input type="submit" name="aceptar" value="ACEPTAR">';
    Text += '<\/form>';
    WinId.document.open();
    WinId.document.write(Text);
    WinId.document.close();
*/

	//var cSearchValue=VentanaPrompt("contraseña para ventas","260","150","px",1,"");
	//window.alert(cSearchValue + "-" + retornoModal);

	var pagGetPass="../ventas/riesgo_contrasenya.asp?accionR=" + accionR + "&tdocumentoR=" + tdocumentoR + "&ndocumentoR=" + ndocumentoR + "&itemR=" + itemR + "&contrasenya_riesgoR=" + contrasenya_riesgoR;
	//var padreGetPassword=new Object();
	//padreGetPassword.location=document.location;
	//padreGetPassword.pantalla=document;
	//padreGetPassword.botones=parent.botones.document;
	var cSearchValue=showModalDialog(pagGetPass,0,"dialogWidth:260px;dialogHeight:200px;center:yes;status:no;scroll:no;help:no;");

	return cSearchValue;

}

//ricardo 23/4/2004 comprobamos el riesgo
function comprobarRiesgo(viene,formulario,formulario_det,preguntar_riesgo_conf,texto_aviso1,texto_aviso2,texto_aviso3,texto_aviso4,texto_aviso5,contrasenya_riesgo,texto_preguntar,tdocumentoR,ndocumentoR,itemR,accionR){
//window.alert(formulario + "-" + formulario_det + "-" + accionR + "-" + tdocumentoR + "-" + ndocumentoR + "-" + itemR);
	if (viene!=""){
		cad_ventana="window.top.opener.";
	}
	else{
		cad_ventana="";
	}
	if (formulario_det=="albaranes_clidet_fast"){
		cad_ventana2="frDetalles.";
		formulario_det=formulario;
	}
	else{
		cad_ventana2="";
	}
	if (formulario!=formulario_det){
		eval("rmaxaut=parseFloat(" + cad_ventana + "parent.document." + formulario + ".rmaxaut.value.replace(',','.'))");
		if (isNaN(rmaxaut)){
			rmaxaut=0;
		}
		eval("ralc=parseFloat(" + cad_ventana + "parent.document." + formulario + ".ralc.value.replace(',','.'))");
		if (isNaN(ralc)){
			ralc=0;
		}
		eval("dto1_gen_riesgo=parseFloat(" + cad_ventana + "parent.document." + formulario + ".dto1_riesgo.value.replace(',','.'))");
		eval("dto2_gen_riesgo=parseFloat(" + cad_ventana + "parent.document." + formulario + ".dto2_riesgo.value.replace(',','.'))");
		eval("dto3_gen_riesgo=parseFloat(" + cad_ventana + "parent.document." + formulario + ".dto3_riesgo.value.replace(',','.'))");
		eval("ndecimales_gen_riesgo=parseFloat(" + cad_ventana + "parent.document." + formulario + ".ndecimales_riesgo.value.replace(',','.'))");
		eval("tot_doc_ahora=parseFloat(" + cad_ventana + "parent.document." + formulario + ".tot_doc_ahora.value.replace(',','.'))");
		eval("tot_doc_ahora_ant=parseFloat(" + cad_ventana + "parent.document." + formulario + ".tot_doc_ahora_ant.value.replace(',','.'))");
	}
	else{
		eval("rmaxaut=parseFloat(" + cad_ventana + "document." + formulario + ".rmaxaut.value.replace(',','.'))");
		if (isNaN(rmaxaut)){
			rmaxaut=0;
		}
		eval("ralc=parseFloat(" + cad_ventana + "document." + formulario + ".ralc.value.replace(',','.'))");
		if (isNaN(ralc)){
			ralc=0;
		}
		eval("dto1_gen_riesgo=parseFloat(" + cad_ventana + "document." + formulario + ".dto1_riesgo.value.replace(',','.'))");
		eval("dto2_gen_riesgo=parseFloat(" + cad_ventana + "document." + formulario + ".dto2_riesgo.value.replace(',','.'))");
		eval("dto3_gen_riesgo=parseFloat(" + cad_ventana + "document." + formulario + ".dto3_riesgo.value.replace(',','.'))");
		eval("ndecimales_gen_riesgo=parseFloat(" + cad_ventana + "document." + formulario + ".ndecimales_riesgo.value.replace(',','.'))");
		eval("tot_doc_ahora=parseFloat(" + cad_ventana + "document." + formulario + ".tot_doc_ahora.value.replace(',','.'))");
		eval("tot_doc_ahora_ant=parseFloat(" + cad_ventana + "document." + formulario + ".tot_doc_ahora_ant.value.replace(',','.'))");
	}
	
	//si no hay riesgo maximo para este cliente que no pregunte
	if (rmaxaut!=0){

		if (formulario_det!="ordenes" && formulario_det!="incidencias"){
			eval("importe_det=parseFloat(" + cad_ventana2 + "document." + formulario_det + ".importe.value.replace(',','.'))");
			if (formulario_det!="facturas_cli"){
				eval("importe_det_ant=parseFloat(" + cad_ventana2 + "document." + formulario_det + ".importe_ant.value.replace(',','.'))");
			}
			else{
				eval("importe_det_ant=parseFloat(document." + formulario_det + ".importec_ant.value.replace(',','.'))");
			}

			eval("iva_riesgo=parseFloat(" + cad_ventana2 + "document." + formulario_det + ".iva.value.replace(',','.'))");
	
			valor1_riesgo=importe_det-((importe_det*dto1_gen_riesgo)/100);
			valor2_riesgo=valor1_riesgo-((valor1_riesgo*dto2_gen_riesgo)/100);
			valor3_riesgo=valor2_riesgo-((valor2_riesgo*dto3_gen_riesgo)/100);
			valor4_riesgo=valor3_riesgo + ((valor3_riesgo*iva_riesgo)/100);
			importe_det=valor4_riesgo;

			valor1_riesgo=importe_det_ant-((importe_det_ant*dto1_gen_riesgo)/100);
			valor2_riesgo=valor1_riesgo-((valor1_riesgo*dto2_gen_riesgo)/100);
			valor3_riesgo=valor2_riesgo-((valor2_riesgo*dto3_gen_riesgo)/100);
			valor4_riesgo=valor3_riesgo + ((valor3_riesgo*iva_riesgo)/100);
			importe_det_ant=valor4_riesgo;

			//window.alert(tot_doc_ahora + "  " + tot_doc_ahora_ant);

			total_documento_riesgo=tot_doc_ahora-tot_doc_ahora_ant;

			//window.alert(ralc + "  " + total_documento_riesgo + "  " + importe_det + "  " + importe_det_ant)
	
			riesgototal=(ralc + total_documento_riesgo) + (importe_det-importe_det_ant);

			//si el importe del detalle no se ha modificado que no pregunte
			//if ((importe_det-importe_det_ant)!=0){

			//window.alert(tot_doc_ahora + "-" + ralc + "-+-(" + importe_det + "-" + importe_det_ant + "-)=-" + riesgototal + "-no debe ser sup a-" + rmaxaut + "-")
		}
		else{
			riesgototal=ralc;
		}

			if (riesgototal>rmaxaut){
				texto_aviso=texto_aviso1 + "\n" + texto_aviso2 + "\n" + texto_aviso3 + Redondear(rmaxaut,ndecimales_gen_riesgo) + "\n" + texto_aviso4 + Redondear(riesgototal,ndecimales_gen_riesgo);
				//si en la tabla configuracion en el campo riesgooblig para esta empresa es false que no pregunte
				if (preguntar_riesgo_conf==-1){
					if (contrasenya_riesgo!=""){
						if (window.confirm(texto_aviso + "\n" + texto_aviso5)!=true){
							return false;
						}
						else{
							//valor=prompt(texto_preguntar,"");
							valor=getPassword(accionR,tdocumentoR,ndocumentoR,itemR,contrasenya_riesgo);
							if (valor==contrasenya_riesgo){
								return true;
							}
							else{
								return false;
							}
						}
					}
					else{
						window.alert(texto_aviso);
						return false;
					}
				}
				else{
					if (window.confirm(texto_aviso)!=true){
						return false;
					}
				}
			}
		//}
	}
	return true;
}

//ricardo 23/4/2004 comprobamos el riesgo
function comprobarRiesgoFast(preguntar_riesgo_conf,texto_aviso1,texto_aviso2,texto_aviso3,texto_aviso4,texto_aviso5,contrasenya_riesgo,texto_preguntar,tdocumentoR,ndocumentoR,itemR,accionR){
	rmaxaut=parseFloat(document.albaranes_cli_fast.rmaxaut.value.replace(",","."));
	if (isNaN(rmaxaut)){
		rmaxaut=0;
	}
	ralc=parseFloat(document.albaranes_cli_fast.ralc.value.replace(",","."));
	if (isNaN(ralc)){
		ralc=0;
	}
	dto1_gen_riesgo=parseFloat(document.albaranes_cli_fast.dto1_riesgo.value.replace(",","."));
	dto2_gen_riesgo=parseFloat(document.albaranes_cli_fast.dto2_riesgo.value.replace(",","."));
	dto3_gen_riesgo=parseFloat(document.albaranes_cli_fast.dto3_riesgo.value.replace(",","."));
	ndecimales_gen_riesgo=parseFloat(document.albaranes_cli_fast.ndecimales_riesgo.value.replace(",","."));
	tot_doc_ahora_ant=parseFloat(document.albaranes_cli_fast.tot_doc_ahora_ant.value.replace(",","."));
	tot_doc_con_ahora_ant=parseFloat(document.albaranes_cli_fast.tot_doc_con_ahora_ant.value.replace(",","."));
	tot_doc_pag_ahora_ant=parseFloat(document.albaranes_cli_fast.tot_doc_pag_ahora_ant.value.replace(",","."));
	
	//si no hay riesgo maximo para este cliente que no pregunte
	if (rmaxaut!=0){
		suma_importes=0;
		filasRiesgo=parseInt(frDetalles.document.albaranes_clidet_fast.fila.value)-1
		//filasRiesgo=15;
		for (iRiesgo=1;iRiesgo<=filasRiesgo;iRiesgo++){
			if (eval("frDetalles.document.albaranes_clidet_fast.importe" + iRiesgo)!=null) {
				eval("importe_det=parseFloat(frDetalles.document.albaranes_clidet_fast.importe" + iRiesgo + ".value.replace(',','.'))");
				eval("iva_riesgo=parseFloat(frDetalles.document.albaranes_clidet_fast.iva" + iRiesgo + ".value.replace(',','.'))");

				valor1_riesgo=importe_det-((importe_det*dto1_gen_riesgo)/100);
				valor2_riesgo=valor1_riesgo-((valor1_riesgo*dto2_gen_riesgo)/100);
				valor3_riesgo=valor2_riesgo-((valor2_riesgo*dto3_gen_riesgo)/100);
				valor4_riesgo=valor3_riesgo + ((valor3_riesgo*iva_riesgo)/100);
				importe_det=valor4_riesgo;
				suma_importes=suma_importes + importe_det;
			}
		}
		tot_doc_ahora=suma_importes;

		total_documento_riesgo=(tot_doc_ahora + tot_doc_con_ahora_ant - tot_doc_pag_ahora_ant)-tot_doc_ahora_ant;
//window.alert("tot_doc_ahora=" + ralc + "=" + tot_doc_ahora + "=" + tot_doc_ahora_ant + "=" + tot_doc_con_ahora_ant + "=" + tot_doc_pag_ahora_ant + "=" + total_documento_riesgo);

		riesgototal=(ralc + total_documento_riesgo);
//window.alert("riesgototal=" + riesgototal + "=" + rmaxaut);

		if (riesgototal>rmaxaut){
			texto_aviso=texto_aviso1 + "\n" + texto_aviso2 + "\n" + texto_aviso3 + Redondear(rmaxaut,ndecimales_gen_riesgo) + "\n" + texto_aviso4 + Redondear(riesgototal,ndecimales_gen_riesgo);
			//si en la tabla configuracion en el campo riesgooblig para esta empresa es false que no pregunte
			if (preguntar_riesgo_conf==-1){
				if (contrasenya_riesgo!=""){
					if (window.confirm(texto_aviso + "\n" + texto_aviso5)!=true){
						document.albaranes_cli_fast.all("idDiskette").style.display="";
						document.albaranes_cli_fast.all("idRelojArenaD").style.display="none";
						document.albaranes_cli_fast.all("idFlechaAnim").style.display="";
						return false;
					}
					else{
						//valor=prompt(texto_preguntar,"");
						valor=getPassword(accionR,tdocumentoR,ndocumentoR,itemR,contrasenya_riesgo);
						if (valor==contrasenya_riesgo){
							document.albaranes_cli_fast.all("idDiskette").style.display="";
							document.albaranes_cli_fast.all("idRelojArenaD").style.display="none";
							document.albaranes_cli_fast.all("idFlechaAnim").style.display="";
							return true;
						}
						else{
							document.albaranes_cli_fast.all("idDiskette").style.display="";
							document.albaranes_cli_fast.all("idRelojArenaD").style.display="none";
							document.albaranes_cli_fast.all("idFlechaAnim").style.display="";
							return false;
						}
					}
				}
				else{
					window.alert(texto_aviso);
					document.albaranes_cli_fast.all("idDiskette").style.display="";
					document.albaranes_cli_fast.all("idRelojArenaD").style.display="none";
					document.albaranes_cli_fast.all("idFlechaAnim").style.display="";
					return false;
				}
			}
			else{
				if (window.confirm(texto_aviso)!=true){
					document.albaranes_cli_fast.all("idDiskette").style.display="";
					document.albaranes_cli_fast.all("idRelojArenaD").style.display="none";
					document.albaranes_cli_fast.all("idFlechaAnim").style.display="";
					//document.albaranes_cli_fast.all("idLiteralImprimir").style.display="";
					//document.albaranes_cli_fast.all("idVinculoImprimir").style.display="";
					return false;
				}
			}
		}
	}
	return true;
}

function comprobarLimite(limite,alcanzado,importe,dto1,dto2,si_preguntar_riesgo,contrasenya,mes,anyo,ndoc,accion)
{

 //primero comprobaremos si nos pasamos del límite o no
 //le aplicamos los descuentos al importe
 //importe=parseFloat(importe.replace(",","."));

 dto1=parseFloat(dto1.replace(",","."));
 dto2=parseFloat(dto2.replace(",","."));
 
 
 desc=(importe*dto1)/100;
 importe=importe-desc;
 desc=(importe*dto2)/100;
 importe=importe-desc;

 alcanzado=alcanzado.replace(".","");
 alcanzado=parseFloat(alcanzado.replace(",","."));
 total=alcanzado+importe;
 limite=parseFloat(limite);

 //ahora comprobamos si nos pasamos del límite
 if( total>limite )
 { 
   if(si_preguntar_riesgo!=-1)  //no hay que preguntar la contraseña
   {
     //pero aviso
     texto_aviso="Superado limite de compras\n" + " Mes: " + mes + "\n Año: " + anyo +"\n Límite máximo autorizado: " + limite + "\n Alcanzado: " 
	                                            + alcanzado;
   	 if (window.confirm(texto_aviso)!=true)
	 {
		 return 0;
	 }
   }
   else
   {
     if(contrasenya=="") //no permito superar el límite de ninguna forma
	 {
	  alert("Superado límite de compras permitido\n" + " Mes: " + mes + "\n Año: " + anyo +"\n Límite máximo autorizado: " + limite + "\n Alcanzado: " 
	                                            + alcanzado);
	  return 0;
	 }
     //primero aviso
     texto_aviso="Superado limite de compras\n" + " Mes: " + mes + "\n Año: " + anyo +"\n Límite máximo autorizado: " + limite + "\n Alcanzado: " 
	                                            + alcanzado + "\n ¿Desea permitir la compra?";
   	 if (window.confirm(texto_aviso)!=true)
	 {
		 return 0;
	 }
	 
	 //después pregunto la contraseña
	 valor=getPassword(accion,"PEDIDO PROVEEDOR",ndoc,importe,contrasenya);
	 //valor=getPassword(accionR,tdocumentoR,ndocumentoR,itemR,contrasenya_riesgo);
	 //auditar_ins_bor dni,ndocumentoR,tdocumentoR,"alta",itemR,accionR,"permitir_riesgo"
	 if (valor==contrasenya)
	 {
		return 1;
	 }
	 else
	 {
		return 0;
	 }
     
   }
  
 }
 return 1;
}


function ComprobarDispLote(formulario,modo){
	okDisp=1;
	eval("cantidadDoc=parseFloat(document." + formulario + ".cantidad.value.replace(',','.'))");
	if (modo==2){
		eval("cantidadAntDoc=parseFloat(document." + formulario + ".cantidadAnt.value.replace(',','.'))");
	}
	else{
		cantidadAntDoc=0;
	}
	cantidadreal=cantidadDoc-cantidadAntDoc
	eval("disponibleDoc=parseFloat(document." + formulario + ".disponibilidad.value)");
	if (cantidadDoc>disponibleDoc){
		okDisp=0;
	}
	else{
		eval("num_disponibles=parseFloat(document." + formulario + ".num_disponibles.value)");
		iDisp=1;
		ComDisp=0;
		while(iDisp<=num_disponibles && ComDisp==0){
			eval("disponibleDocDet=parseFloat(document." + formulario + ".disponibilidad" + iDisp + ".value)");
			if (iDisp==1){
				disponibleDocDet=disponibleDocDet + cantidadAntDoc;
			}
			if (cantidadDoc<=disponibleDocDet){
				ComDisp=1;
			}
			iDisp++;
		}
		if(ComDisp==0){
			okDisp=0;
		}
	}
	return okDisp;
}

function comprobarCampPerso(posi_form,num_campos,formulario){

	//ok=1;
	ok=0;
	for (ki=1;ki<=num_campos;ki++){
		eval("tipo_campo=" + posi_form + "document." + formulario + ".tipo_campo" + ki + ".value");
		eval("valor_campo=" + posi_form + "document." + formulario + ".campo" + ki + ".value");
//alert("tipo_campo="+tipo_campo);
//alert("valor_campo="+valor_campo);
		// el tipo 1 es texto,el 2 es checkbox y el 3 es lista de valores
		// por lo que no hace falta comprobar nada
		if (tipo_campo==4){
			//se debe comprobar que es un numero correcto
			while (valor_campo.search(" ")!=-1){
				valor_campo=valor_campo.replace(" ","");
			}
			valor_campo=valor_campo.replace(",","."); 
			if (isNaN(valor_campo)){
				//ok=0;
				ok=ki;
			}
			else{
				//si tenemos el numero "1200," no es un numero aunque isNaN diga que si
				si_coma=0;
				for(jkilio=0;jkilio<=valor_campo.length;jkilio++){
					if (valor_campo.substring(jkilio,jkilio+1)=="."){
						si_coma=jkilio;
					}
				}
				if (si_coma!=0){
					if (si_coma + 1==valor_campo.length){
						ok=ki;
					}
				}
				if (ok==0){
					eval(posi_form + "document." + formulario + ".campo" + ki + ".value=valor_campo.replace('.',',')");
				}
			}
		}

/*		eval("dato=" + posi_form + "document." + formulario + ".objListadoClientes.value");
		if (dato=="106") alert("uno");
		else  alert("dos");*/
		

		if (tipo_campo==5){
			//se debe comprobar que es una fecha correcta
/*			if (valor_campo.length>=1 && valor_campo.length<5){
				 //ok=0;
				 ok=ki;
			}
			if (!chkdatetime(valor_campo)) {
				//ok=0;
				ok=ki;
			}*/
			if (valor_campo.length>=1 && valor_campo.length<5){
				 //ok=0;
				 ok=ki;
			}

			if (!chkdatetime(valor_campo)) {
				//ok=0;
				ok=ki;
				return ok;
			}
			else {
				if (eval(posi_form + "document." + formulario + ".objListadoClientes!=undefined") ||
					 eval(posi_form + "document." + formulario + ".objetoListadoCentros!=undefined") ||
					 	eval(posi_form + "document." + formulario + ".objetoListadoSeguimientoComercial2!=undefined") ) {
					if (ok==0) {
						eval("tipo_campoB=" + posi_form + "document." + formulario + ".tipo_campo" + ki + "B.value");
						eval("valor_campoB=" + posi_form + "document." + formulario + ".campo" + ki + "B.value");
						if (valor_campoB.length>=1 && valor_campoB.length<5){
								 ok=ki+"B";
						}
						if (!chkdatetime(valor_campoB)) 	
						{
								 ok=ki+"B";
						}
						if (valor_campo>valor_campoB && valor_campoB>"") {
								 ok=ki+"B";
						}
			/*				alert(valor_campo+" "+chkdatetime(valor_campo));
							alert(valor_campoB+" "+chkdatetime(valor_campoB));*/
					}
				}
			}

//			if (chkdateValue(valor_campo)==false) {
//				//ok=0;
//				ok=ki;
//			}
//			else {
//				if (chkdate2(valor_campo)==false) {
//					//ok=0;
//					ok=ki;
//				}
//			}
		}

	}
	return ok;
}

//  End -->

function lanzaConsulta(fecha,usuario)
{
	AbrirVentana("listado_personal_param.asp?fecha=" + fecha + "&mode=getParams&confirma=NO&ges=NO&ndoc=" + usuario,"I",600,400);
}


/*
Función para controlar el movimiento entre campos en una tabla mediante las teclas de cursor(flechitas)
Argumentos:
   field=this del objeto en el cual se ejecuta esta función
   carnom= nº de caracteres del nombre del campo, que preceden al índice del nº de fila del campo
Funcionamiento:
   el campo se debe crear con un nombre compuesto por el nombre del campo+nº de fila: ejemplo pvp1, pvp2,pvp3
   el numero de filas(registros) de campos incluidos en la página se deberá guardar en el formulario origen en un 
     campo 'input' tipo 'hidden' que se llamara 'hNRegs'
*/
function movimiento_campos( field, carnom){
	tecla=window.event.keyCode;
	form=field.form;
	switch (tecla){
		case 39:
			var i=0, next=2;
			next=form.elements[field.name].sourceIndex;
			tope=document.all.length-next-1;
			for (i=1; (i<tope && ((document.all(next+i).disabled==true) || (document.all(next+i).type!="text")) ); i++)
			{
			}
			if( document.all(next+i).disabled==false && document.all(next+i).type!= "hidden" && document.all(next+i).type.length!="0" )
			{
				document.all(next+i).focus();
				document.all(next+i).select();
				event.returnValue = false;
			}else{
				event.returnValue = false;
			}
			break;
		case 37:
			var i=0, next=2;
			next=form.elements[field.name].sourceIndex;
			for (i=1; (next-i>0 && ((document.all(next-i).disabled==true) || (document.all(next-i).type!="text")) ) ; i++)
			{
			}
			if( next-i>0 && document.all(next-i).disabled==false && document.all(next-i).type!= "hidden" ){
				document.all(next-i).focus();
				document.all(next-i).select();
				event.returnValue = false;
			}else{
				event.returnValue = false;
			}
			break;
		case 38:
			mover=field.name.substring(0,carnom);
			num=parseInt(field.name.substring(carnom,field.name.length))-1;
			mover=mover+num;
			if (num>0 && eval("document.forms[0]."+mover+".disabled==false") ){
				eval("document.forms[0]."+mover+".select();");
				eval("document.forms[0]."+mover+".focus();");
				event.returnValue = false;
			}
			break;
		case 40:
			mover=field.name.substring(0,carnom);
			num=parseInt(field.name.substring(carnom,field.name.length))+1;
			mover=mover+num;
			if (num<document.forms[0].hNRegs.value && eval("document.forms[0]."+mover+".disabled==false") ){
				eval("document.forms[0]."+mover+".select();");
				eval("document.forms[0]."+mover+".focus();");
				event.returnValue = false;
			}
			break;
	}
}


//(EJM 08/02/2007) Implementar funcionalidad AJAX
function getHTTPObject() {
    var xmlhttp;
       try {
          xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
       } catch (e) {
          try {
             xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (E) { xmlhttp = false; 
		  				alert("error XMLHTTP")}
       }

    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
       try {
          xmlhttp = new XMLHttpRequest();
       } catch (e) { xmlhttp = false; }
    }
    return xmlhttp;
}

//  GPD (22/10/2008)
function JavaCheckObligatorio(sender, args) {
    
    if(args.Value == '')
    {
        args.IsValid = false;
    } else { args.IsValid = true; }
    
}

//  GPD (22/10/2008)
function JavaCheckFecha(sender, args) {                               
    
    if(chkdate2(args.Value)==true) {
        args.IsValid = true;
    } else {
        args.IsValid = false;
    }
    
}