function goToPage(pageName){
    if(typeof pageName === 'string'){
        window.location.href = pageName + '.html';
    }
    else{
        console.error("Invalid page name.");
    }
   
}