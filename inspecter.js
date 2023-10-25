
(function(document) {
	var last;
		
	
	function cssPath(el) {
		var fullPath    = 0,  
		    useNthChild = 0,  
		    cssPathStr = '',
		    testPath = '',
		    parents = [],
		    parentSelectors = [],
		    tagName,
		    cssId,
		    cssClass,
		    tagSelector,
		    vagueMatch,
		    nth,
		    i,
		    c;
		
		
		while ( el ) {
			vagueMatch = 0;

			
			tagName = el.nodeName.toLowerCase();
			
			
			cssId = ( el.id ) ? ( '#' + el.id ) : false;
			
			
			cssClass = ( el.className ) ? ( '.' + el.className.replace(/\s+/g,".") ) : '';

			
			if ( cssId ) {
				
				tagSelector = tagName + cssId + cssClass;
			} else if ( cssClass ) {
				
				tagSelector = tagName + cssClass;
			} else {
			
				vagueMatch = 1;
				tagSelector = tagName;
			}
			
			
			parentSelectors.unshift( tagSelector )

			
			if ( cssId && !fullPath )
				break;
			
			
			el = el.parentNode !== document ? el.parentNode : false;
			
		} 
		
		
		
		for ( i = 0; i < parentSelectors.length; i++ ) {
			cssPathStr += ' ' + parentSelectors[i];
			
			
			if ( useNthChild && !parentSelectors[i].match(/#/) && !parentSelectors[i].match(/^(html|body)$/) ) {
				
				
				if ( !parentSelectors[i].match(/\./) || $( cssPathStr ).length > 1 ) {
					
					
					for ( nth = 1, c = el; c.previousElementSibling; c = c.previousElementSibling, nth++ );
					
					
					cssPathStr += ":nth-child(" + nth + ")";
				}
			}
			
		}
	
		return cssPathStr.replace(/^[ \t]+|[ \t]+$/, '');
	}


	function inspectorMouseOver(e) {
		
		var element = e.target;
		
		
		element.style.outline = '2px solid #f00';
		

		last = element;
	}
	
	
	
	function inspectorMouseOut(e) {
		
		e.target.style.outline = '';
	}
	
	
	function inspectorOnClick(e) {
		e.preventDefault();
		
		
		console.log( cssPath(e.target) );
		
		
		return false;
	}


	
	function inspectorCancel(e) {
		
		if (e === null && event.keyCode === 27) {
			document.detachEvent("mouseover", inspectorMouseOver);
			document.detachEvent("mouseout", inspectorMouseOut);
			document.detachEvent("click", inspectorOnClick);
			document.detachEvent("keydown", inspectorCancel);
			last.style.outlineStyle = 'none';
		} else if(e.which === 27) { 
			document.removeEventListener("mouseover", inspectorMouseOver, true);
			document.removeEventListener("mouseout", inspectorMouseOut, true);
			document.removeEventListener("click", inspectorOnClick, true);
			document.removeEventListener("keydown", inspectorCancel, true);
			
			
			last.style.outline = 'none';
		}
	}
	

	
	if ( document.addEventListener ) {
		document.addEventListener("mouseover", inspectorMouseOver, true);
		document.addEventListener("mouseout", inspectorMouseOut, true);
		document.addEventListener("click", inspectorOnClick, true);
		document.addEventListener("keydown", inspectorCancel, true);
	} else if ( document.attachEvent ) {
		document.attachEvent("mouseover", inspectorMouseOver);
		document.attachEvent("mouseout", inspectorMouseOut);
		document.attachEvent("click", inspectorOnClick);
		document.attachEvent("keydown", inspectorCancel);
	}
	
})(document);